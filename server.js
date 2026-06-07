require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const CONFIG_PATH = path.join(__dirname, 'data', 'config.json');
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEFAULT_MODEL    = process.env.DEFAULT_MODEL    || 'deepseek-chat';

// Load admin password from config file (persists across restarts)
function getAdminPassword() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
      if (cfg.adminPassword) return cfg.adminPassword;
    }
  } catch {}
  return process.env.ADMIN_PASSWORD || 'admin2025';
}

function saveAdminPassword(newPw) {
  const dir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  let cfg = {};
  try { if (fs.existsSync(CONFIG_PATH)) cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8')); } catch {}
  cfg.adminPassword = newPw;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2));
}

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

function hashPassword(pw) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(pw, salt, 100000, 64, 'sha512').toString('hex');
  return salt + ':' + hash;
}

function verifyPassword(pw, stored) {
  const [salt, hash] = stored.split(':');
  const check = crypto.pbkdf2Sync(pw, salt, 100000, 64, 'sha512').toString('hex');
  return hash === check;
}

/* ── Register ────────────────────────────────────────────── */
app.post('/api/register', (req, res) => {
  const { firstName, email, password } = req.body;
  if (!firstName || !email || !password) return res.status(400).json({ error: 'All fields required' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
  const users = getUsers();
  if (users.find(u => u.email === email)) return res.status(409).json({ error: 'Email already registered' });
  if (users.find(u => u.username === firstName)) return res.status(409).json({ error: 'Username already taken' });
  const user = {
    id: Date.now().toString(36),
    username: firstName,
    email,
    passwordHash: hashPassword(password),
    tier: 'free',
    createdAt: new Date().toISOString()
  };
  users.push(user);
  saveUsers(users);
  res.json({ success: true, username: user.username, tier: user.tier });
});

/* ── Login ───────────────────────────────────────────────── */
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const users = getUsers();
  const user = users.find(u => u.username === username || u.email === username);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  res.json({ success: true, username: user.username, tier: user.tier });
});

/* ── Config endpoint — tells frontend DeepSeek is ready ── */
app.get('/api/config', (req, res) => {
  res.json({
    apiReady: !!DEEPSEEK_API_KEY,
    defaultModel: DEFAULT_MODEL
  });
});

/* ── Generate (streaming) — DeepSeek only ──────────────── */
app.post('/api/generate', async (req, res) => {
  const { systemPrompt, userPrompt, model } = req.body;

  if (!DEEPSEEK_API_KEY) return res.status(400).json({ error: 'API not configured. Contact admin.' });
  if (!userPrompt)       return res.status(400).json({ error: 'Prompt required' });

  const selectedModel = model || DEFAULT_MODEL;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Accel-Buffering', 'no');

  try {
    const deepseek = new OpenAI({
      apiKey: DEEPSEEK_API_KEY,
      baseURL: 'https://api.deepseek.com'
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
    const msg = err.message || 'Unknown error';
    if (!res.headersSent) res.status(500).json({ error: msg });
    else { res.write(`\n\n[Error: ${msg}]`); res.end(); }
  }
});

/* ── Admin auth ─────────────────────────────────────────── */
app.post('/api/verify-admin', (req, res) => {
  const { username, password } = req.body;
  if (username !== 'admin') return res.status(401).json({ error: 'Invalid credentials' });
  if (password === getAdminPassword()) res.json({ success: true, username: 'admin' });
  else res.status(401).json({ success: false, error: 'Invalid credentials' });
});

/* ── Change password ────────────────────────────────────── */
app.post('/api/change-password', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (currentPassword !== getAdminPassword()) {
    return res.status(403).json({ error: 'Current password is incorrect' });
  }
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }
  saveAdminPassword(newPassword);
  res.json({ success: true });
});

/* ── Docs content ───────────────────────────────────────── */
app.get('/api/content/:type', (req, res) => {
  const allowed = ['workflow', 'documentation', 'changelog', 'deepseek-guide'];
  const type = req.params.type;
  if (!allowed.includes(type)) return res.status(404).json({ error: 'Not found' });
  const filePath = path.join(__dirname, 'docs', `${type}.md`);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });
  res.json({ content: fs.readFileSync(filePath, 'utf-8') });
});

module.exports = app;

// Local development only — Vercel imports the app as a module
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PromptMaster running → http://localhost:${PORT}`);
    console.log(`                      http://127.0.0.1:${PORT}`);
    console.log(`Admin dashboard   → http://localhost:${PORT}/admin.html`);
    console.log(`Admin password    → ${getAdminPassword()}`);
    console.log(`DeepSeek API      → ${DEEPSEEK_API_KEY ? '✓ Configured (from .env)' : '⚠ Not configured — add DEEPSEEK_API_KEY to .env'}`);
  });
}
