require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const cookieParser = require('cookie-parser');
const app = express();

// ── Security headers ────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    }
  }
}));

// ── CORS ────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ── Request size limit ──────────────────────────────────────
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ── Rate limiters ───────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: 'Too many requests. Try again in a minute.' },
  standardHeaders: true,
  legacyHeaders: false
});

const generateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many requests. Try again in a minute.' },
  standardHeaders: true,
  legacyHeaders: false
});

const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: 'Too many requests. Try again in a minute.' },
  standardHeaders: true,
  legacyHeaders: false
});

const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false
});

// ── Config ──────────────────────────────────────────────────
const CONFIG_PATH    = path.join(__dirname, 'data', 'config.json');
const SECURITY_LOG   = path.join(__dirname, 'data', 'security.log');
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEFAULT_MODEL    = process.env.DEFAULT_MODEL    || 'deepseek-chat';
const BCRYPT_ROUNDS    = 12;
const TOKEN_TTL_MS     = 24 * 60 * 60 * 1000; // 24 hours
const TOKEN_COOKIE     = 'pm_token';
const isProduction     = process.env.NODE_ENV === 'production';
const cookieOptions    = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'strict',
  maxAge: TOKEN_TTL_MS,
  path: '/'
};

// ── Security logging ────────────────────────────────────────
function securityLog(event, details) {
  const entry = {
    timestamp: new Date().toISOString(),
    event,
    details
  };
  try {
    const dir = path.dirname(SECURITY_LOG);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.appendFileSync(SECURITY_LOG, JSON.stringify(entry) + '\n');
  } catch {}
}

function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || 'unknown';
}

// ── CSRF protection (double-submit cookie pattern) ────────────
const CSRF_COOKIE  = 'csrf_token';
const csrfCookieOptions = {
  httpOnly: false,
  secure: isProduction,
  sameSite: 'strict',
  path: '/'
};

function setCsrfToken(req, res) {
  if (!req.cookies || !req.cookies[CSRF_COOKIE]) {
    const token = crypto.randomBytes(32).toString('hex');
    res.cookie(CSRF_COOKIE, token, csrfCookieOptions);
  }
}

function csrfMiddleware(req, res, next) {
  // Skip GET/HEAD/OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    setCsrfToken(req, res);
    return next();
  }

  const cookieToken = req.cookies && req.cookies[CSRF_COOKIE];
  const headerToken = req.headers['x-csrf-token'];

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    securityLog('CSRF_MISMATCH', { ip: getClientIP(req), method: req.method, path: req.path });
    return res.status(403).json({ error: 'Invalid or missing CSRF token' });
  }

  next();
}

// ── Admin password (bcrypt hashed, persisted) ────────────────
function getAdminHash() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
      if (cfg.adminHash) return cfg.adminHash;
    }
  } catch {}
  const envPw = process.env.ADMIN_PASSWORD;
  if (envPw) {
    const hash = bcrypt.hashSync(envPw, BCRYPT_ROUNDS);
    saveAdminHash(hash);
    return hash;
  }
  return null;
}

function saveAdminHash(hash) {
  const dir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  let cfg = {};
  try { if (fs.existsSync(CONFIG_PATH)) cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8')); } catch {}
  cfg.adminHash = hash;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2));
}

// ── Users ───────────────────────────────────────────────────
const USERS_PATH = path.join(__dirname, 'data', 'users.json');

function getUsers() {
  try {
    if (fs.existsSync(USERS_PATH)) return JSON.parse(fs.readFileSync(USERS_PATH, 'utf-8'));
  } catch {}
  return [];
}

function saveUsers(users) {
  const dir = path.dirname(USERS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

// ── Token auth ───────────────────────────────────────────────
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function setTokenCookie(res, token) {
  res.cookie(TOKEN_COOKIE, token, cookieOptions);
}

function clearTokenCookie(res) {
  res.clearCookie(TOKEN_COOKIE, { path: '/' });
}

function authMiddleware(req, res, next) {
  const token = req.cookies && req.cookies[TOKEN_COOKIE];
  if (!token) {
    securityLog('AUTH_MISSING_TOKEN', { ip: getClientIP(req), path: req.path });
    return res.status(401).json({ error: 'Authentication required' });
  }

  const users = getUsers();
  const user = users.find(u => u.token === token);
  if (!user) {
    securityLog('AUTH_INVALID_TOKEN', { ip: getClientIP(req), path: req.path, tokenPrefix: token.slice(0, 8) });
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  if (user.tokenExpiresAt && new Date(user.tokenExpiresAt) < new Date()) {
    securityLog('AUTH_EXPIRED_TOKEN', { username: user.username, ip: getClientIP(req) });
    return res.status(401).json({ error: 'Token expired. Please log in again.' });
  }

  req.user = user;
  next();
}

// ── Input sanitization ──────────────────────────────────────
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Register ────────────────────────────────────────────────
app.post('/api/register', csrfMiddleware, authLimiter, async (req, res) => {
  const firstName = sanitize(req.body.firstName || '');
  const email = sanitize(req.body.email || '');
  const password = req.body.password || '';

  if (!firstName || !email || !password) return res.status(400).json({ error: 'All fields required' });
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email format' });
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });
  if (firstName.length > 50) return res.status(400).json({ error: 'Name is too long' });

  const users = getUsers();
  if (users.find(u => u.email === email)) return res.status(409).json({ error: 'Email already registered' });
  if (users.find(u => u.username === firstName)) return res.status(409).json({ error: 'Username already taken' });

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const token = generateToken();
  const user = {
    id: crypto.randomUUID(),
    username: firstName,
    email,
    passwordHash,
    token,
    tokenExpiresAt: new Date(Date.now() + TOKEN_TTL_MS).toISOString(),
    tier: 'free',
    createdAt: new Date().toISOString()
  };
  users.push(user);
  saveUsers(users);
  setTokenCookie(res, token);
  res.json({ success: true, username: user.username, tier: user.tier });
});

// ── Login ───────────────────────────────────────────────────
app.post('/api/login', csrfMiddleware, authLimiter, async (req, res) => {
  const username = sanitize(req.body.username || '');
  const password = req.body.password || '';

  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  const users = getUsers();
  const user = users.find(u => u.username === username || u.email === username);
  if (!user) {
    securityLog('LOGIN_FAILED', { username, ip: getClientIP(req), reason: 'user_not_found' });
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    securityLog('LOGIN_FAILED', { username, ip: getClientIP(req) });
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  user.token = generateToken();
  user.tokenExpiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();
  saveUsers(users);
  setTokenCookie(res, user.token);
  res.json({ success: true, username: user.username, tier: user.tier });
});

// ── Config ──────────────────────────────────────────────────
app.get('/api/config', generalLimiter, (req, res) => {
  res.json({
    apiReady: !!DEEPSEEK_API_KEY,
    defaultModel: DEFAULT_MODEL
  });
});

// ── Generate (streaming) ────────────────────────────────────
app.post('/api/generate', csrfMiddleware, authMiddleware, generateLimiter, async (req, res) => {
  const { systemPrompt, userPrompt, model } = req.body;

  if (!DEEPSEEK_API_KEY) return res.status(503).json({ error: 'Service unavailable' });
  if (!userPrompt)       return res.status(400).json({ error: 'Prompt required' });
  if (typeof userPrompt !== 'string' || userPrompt.length > 8000) {
    return res.status(400).json({ error: 'Prompt too long' });
  }

  const selectedModel = model || DEFAULT_MODEL;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Accel-Buffering', 'no');

  try {
    const deepseek = new OpenAI({
      apiKey: DEEPSEEK_API_KEY,
      baseURL: 'https://api.deepseek.com',
      timeout: 30000
    });

    const stream = await deepseek.chat.completions.create({
      model: selectedModel,
      messages: [
        { role: 'system', content: systemPrompt || 'You are an expert social media strategist.' },
        { role: 'user', content: userPrompt }
      ],
      stream: true,
      max_tokens: 4096
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) res.write(text);
    }
    res.end();
  } catch (err) {
    if (!res.headersSent) {
      return res.status(502).json({ error: 'Generation failed. Please try again.' });
    }
    res.write('\n\n[Generation interrupted. Please try again.]');
    res.end();
  }
});

// ── Logout ───────────────────────────────────────────────────
app.post('/api/logout', csrfMiddleware, (req, res) => {
  clearTokenCookie(res);
  res.json({ success: true });
});

// ── Session check ────────────────────────────────────────────
app.get('/api/me', authMiddleware, (req, res) => {
  res.json({ username: req.user.username, tier: req.user.tier });
});

// ── Admin auth ──────────────────────────────────────────────
app.post('/api/verify-admin', csrfMiddleware, adminLimiter, async (req, res) => {
  const { username, password } = req.body;
  if (username !== 'admin') return res.status(401).json({ error: 'Invalid credentials' });

  const adminHash = getAdminHash();
  if (!adminHash) return res.status(503).json({ error: 'Admin not configured' });

  const valid = await bcrypt.compare(password, adminHash);
  if (valid) return res.json({ success: true, username: 'admin' });
  securityLog('ADMIN_AUTH_FAILED', { ip: getClientIP(req) });
  res.status(401).json({ success: false, error: 'Invalid credentials' });
});

// ── Change password ─────────────────────────────────────────
app.post('/api/change-password', csrfMiddleware, adminLimiter, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const adminHash = getAdminHash();
  if (!adminHash) return res.status(503).json({ error: 'Admin not configured' });

  const valid = await bcrypt.compare(currentPassword, adminHash);
  if (!valid) return res.status(403).json({ error: 'Current password is incorrect' });

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters' });
  }

  const newHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
  saveAdminHash(newHash);
  res.json({ success: true });
});

// ── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: Math.floor(process.uptime()) });
});

// ── Session storage ──────────────────────────────────────────
const SESSIONS_PATH = path.join(__dirname, 'data', 'sessions.json');

function getAllSessions() {
  try {
    if (fs.existsSync(SESSIONS_PATH)) return JSON.parse(fs.readFileSync(SESSIONS_PATH, 'utf-8'));
  } catch {}
  return {};
}

function saveAllSessions(all) {
  const dir = path.dirname(SESSIONS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(SESSIONS_PATH, JSON.stringify(all, null, 2));
}

// GET /api/sessions — list user sessions
app.get('/api/sessions', authMiddleware, (req, res) => {
  const all = getAllSessions();
  res.json(all[req.user.id] || []);
});

// POST /api/sessions — save a session
app.post('/api/sessions', csrfMiddleware, authMiddleware, (req, res) => {
  const { moduleId, moduleName, moduleIcon, output } = req.body;
  if (!moduleId || !output) return res.status(400).json({ error: 'moduleId and output required' });
  if (typeof output !== 'string' || output.length > 100000) {
    return res.status(400).json({ error: 'Output too large' });
  }

  const all = getAllSessions();
  if (!all[req.user.id]) all[req.user.id] = [];

  const ts = new Date();
  const session = {
    id: crypto.randomUUID(),
    moduleId: sanitize(moduleId),
    moduleName: sanitize(moduleName || ''),
    moduleIcon: String(moduleIcon || '').slice(0, 2),
    timestamp: ts.toISOString(),
    date: ts.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    output
  };
  all[req.user.id].unshift(session);
  saveAllSessions(all);
  res.json({ success: true, session });
});

// DELETE /api/sessions/:id — delete a session
app.delete('/api/sessions/:id', csrfMiddleware, authMiddleware, (req, res) => {
  const all = getAllSessions();
  const sessions = all[req.user.id];
  if (!sessions) return res.status(404).json({ error: 'Not found' });
  const idx = sessions.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  sessions.splice(idx, 1);
  saveAllSessions(all);
  res.json({ success: true });
});

// ── Docs content ────────────────────────────────────────────
app.get('/api/content/:type', generalLimiter, (req, res) => {
  const allowed = ['workflow', 'documentation', 'changelog', 'deepseek-guide'];
  const type = req.params.type;
  if (!allowed.includes(type)) return res.status(404).json({ error: 'Not found' });
  const filePath = path.join(__dirname, 'docs', `${type}.md`);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });

  // Prevent directory traversal
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(path.join(__dirname, 'docs')))) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  res.json({ content: fs.readFileSync(filePath, 'utf-8') });
});

module.exports = app;

// ── Local development ───────────────────────────────────────
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log('PromptMaster running → http://localhost:' + PORT);
    console.log('Admin dashboard   → http://localhost:' + PORT + '/admin.html');
    console.log('DeepSeek API      → ' + (DEEPSEEK_API_KEY ? 'Configured' : 'Not configured — add DEEPSEEK_API_KEY to .env'));
  });
}
