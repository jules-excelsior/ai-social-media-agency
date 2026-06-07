require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const path = require('path');
const fs = require('fs');

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
  const { password } = req.body;
  if (password === getAdminPassword()) res.json({ success: true });
  else res.status(401).json({ success: false, error: 'Invalid password' });
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
    console.log(`Admin password    → ${ADMIN_PASSWORD}`);
    console.log(`DeepSeek API      → ${DEEPSEEK_API_KEY ? '✓ Configured (from .env)' : '⚠ Not configured — add DEEPSEEK_API_KEY to .env'}`);
  });
}
