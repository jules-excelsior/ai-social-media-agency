'use strict';

/* ── Module Definitions ─────────────────────────────────── */
const MODULES = [
  {
    id: 'growth-strategy',
    name: 'Growth Strategy Commander',
    icon: '⚡', color: '#3B82F6',
    gradient: 'linear-gradient(135deg,#3B82F6,#60A5FA)',
    desc: 'Elite social media manager mode — audience psychology, platform algorithms, viral distribution & scalable content ops.',
    inputs: [
      { id: 'niche',    label: 'Your Niche',  type: 'text',   ph: 'e.g., fitness coaching, SaaS, personal finance' },
      { id: 'platform', label: 'Platform',     type: 'select', opts: ['Instagram','TikTok','YouTube','LinkedIn','Twitter/X','Facebook','Pinterest','Threads'] },
      { id: 'goal',     label: 'Growth Goal',  type: 'text',   ph: 'e.g., reach 10K followers in 90 days' }
    ],
    system: 'You are an elite social media manager and growth strategist. Respond with richly structured markdown.',
    prompt: (v) => `Act as an elite social media manager and growth strategist.\n\nNiche: ${v.niche}\nPlatform: ${v.platform}\nGrowth Goal: ${v.goal}\n\nDeliver a comprehensive growth strategy:\n## Strategic Positioning\n## Core Content Pillars (5–7)\n## Posting Schedule & Cadence\n## Algorithm-Specific Engagement Tactics\n## KPIs & Success Metrics\n## 30-Day Action Plan (week by week)`
  },
  {
    id: 'audience-psychology',
    name: 'Audience Psychology Decoder',
    icon: '🧠', color: '#60A5FA',
    gradient: 'linear-gradient(135deg,#60A5FA,#93C5FD)',
    desc: 'Deep audience analysis — desires, frustrations, emotional triggers, attention patterns & psychological motivations.',
    inputs: [{ id: 'niche', label: 'Your Niche', type: 'text', ph: 'e.g., online fitness coaching, B2B SaaS, crypto investing' }],
    system: 'You are an expert audience psychologist. Use markdown with clear section headers.',
    prompt: (v) => `Analyze the target audience for "${v.niche}" deeply.\n\n## Core Demographics & Psychographics\n## Top 5 Desires & Aspirations\n## Top 5 Frustrations & Pain Points\n## Key Emotional Triggers\n## Attention Patterns & Scroll Behavior\n## Content Format Preferences\n## Psychological Motivations\n## Identity & Self-Perception Gap\n## Content Strategy Implications`
  },
  {
    id: 'viral-content',
    name: 'Viral Content Idea Engine',
    icon: '🚀', color: '#2563EB',
    gradient: 'linear-gradient(135deg,#2563EB,#3B82F6)',
    desc: 'Generate 30 highly engaging content ideas using curiosity triggers, emotional reactions & proven viral frameworks.',
    inputs: [{ id: 'niche', label: 'Your Niche', type: 'text', ph: 'e.g., productivity for entrepreneurs, vegan recipes, web design' }],
    system: 'You are a viral content strategist. Generate specific, high-potential ideas in clear markdown sections.',
    prompt: (v) => `Generate 30 highly engaging content ideas for "${v.niche}".\n\n## 🔍 Curiosity & Mystery (5 ideas)\n## 💥 Emotional Story & Transformation (5 ideas)\n## 🔥 Controversy & Hot Takes (5 ideas)\n## 😣 Pain Point Solutions (5 ideas)\n## ✅ Proof & Social Validation (5 ideas)\n## 📚 Education & Value Bombs (5 ideas)\n\nFor each: **Concept** | **Why it works** | **Hook line**`
  },
  {
    id: 'hook-engineering',
    name: 'Hook Engineering Lab',
    icon: '🎯', color: '#3B82F6',
    gradient: 'linear-gradient(135deg,#3B82F6,#60A5FA)',
    desc: 'Scroll-stopping opening hooks engineered to capture attention instantly using psychology & proven triggers.',
    inputs: [{ id: 'niche', label: 'Your Niche', type: 'text', ph: 'e.g., real estate investing, mindset coaching, AI tools' }],
    system: 'You are a master copywriter and hook engineer. Write powerful, copy-ready hooks in clear markdown sections.',
    prompt: (v) => `Generate 20 scroll-stopping hooks for "${v.niche}".\n\n## 🕳️ Curiosity Gap Hooks (4)\n## 🪞 Identity & Relatability Hooks (4)\n## 📊 Shocking Stat & Fact Hooks (3)\n## ⏰ Urgency & Stakes Hooks (3)\n## 🚫 Contrarian & Controversy Hooks (3)\n## 🔄 Transformation Hooks (3)\n\nEach hook: **exact text** (copy-ready) + (psychological trigger)`
  },
  {
    id: 'algorithm-strategy',
    name: 'Algorithm Intelligence Briefing',
    icon: '📡', color: '#60A5FA',
    gradient: 'linear-gradient(135deg,#60A5FA,#2563EB)',
    desc: 'Platform-specific algorithm playbook for maximum organic reach, distribution & visibility.',
    inputs: [
      { id: 'platform', label: 'Platform', type: 'select', opts: ['Instagram','TikTok','YouTube','LinkedIn','Twitter/X','Facebook','Pinterest','Threads'] },
      { id: 'niche',    label: 'Your Niche', type: 'text', ph: 'e.g., fashion, tech reviews, business coaching' }
    ],
    system: 'You are a platform algorithm expert. Deliver specific, actionable intelligence in markdown.',
    prompt: (v) => `Algorithm intelligence briefing for ${v.platform} in "${v.niche}".\n\n## How the ${v.platform} Algorithm Works\n## Key Engagement Signals (ranked)\n## Optimal Content Structure & Format\n## Posting Strategy (timing, frequency)\n## Niche-Specific Tactics for "${v.niche}"\n## Engagement Loop Strategy\n## Reach Killers — What to Avoid\n## 30-Day Algorithm Reset Plan`
  },
  {
    id: 'content-repurposing',
    name: 'Content Repurposing Multiplier',
    icon: '♻️', color: '#2563EB',
    gradient: 'linear-gradient(135deg,#2563EB,#93C5FD)',
    desc: 'Transform one content idea into 6+ platform-native formats for scalable, high-output content production.',
    inputs: [{ id: 'content', label: 'Your Content Idea', type: 'textarea', ph: 'Paste your content idea, topic, script, or core message here…' }],
    system: 'You are a content repurposing strategist. Use markdown ## headers for each format.',
    prompt: (v) => `Repurpose this into 6 platform-specific formats:\n\n**Original Idea:**\n${v.content}\n\n## 1. Short-Form Video Script (TikTok/Reels/Shorts)\n## 2. Carousel Post (Instagram/LinkedIn)\n## 3. Long-Form Caption (Instagram/Facebook)\n## 4. Twitter/X Thread\n## 5. LinkedIn Post\n## 6. Engagement Bait Post\n\nEach format: platform-native and copy-ready.`
  },
  {
    id: 'image-prompts',
    name: '20 High-Converting ChatGPT Image Prompts for Brands',
    icon: '🖼️', color: '#3B82F6',
    gradient: 'linear-gradient(135deg,#3B82F6,#60A5FA)',
    desc: 'Select a category, click Generate, and get a ready-to-use image prompt for ChatGPT or any AI image generator.',
    isReference: true,
    inputs: [
      { id: 'prompt-category', label: 'Choose Category', type: 'select',
        opts: [
          '1. 🎨 Background Removal',
          '2. 📦 Product Mockup Placement',
          '3. 💎 Luxury Brand Visual',
          '4. 🎨 Product Color Variations',
          '5. 📱 Social Media Creative',
          '6. 🔄 Before and After Comparison',
          '7. 🏠 Lifestyle Scene Integration',
          '8. 🌐 Website Hero Banner',
          '9. 🔍 Exploded Product View',
          '10. 🏟️ Trade Show Display',
          '11. 📦 Product Packaging Design',
          '12. 🛒 Product in Retail Shelf',
          '13. 📘 Product Catalog Image',
          '14. 📰 Magazine Advertisement',
          '15. 🚀 Product Launch Teaser',
          '16. 📊 Corporate Presentation Slide',
          '17. 📋 Product Comparison Display',
          '18. 🎄 Seasonal Marketing Campaign',
          '19. 🔬 Product Feature Highlight',
          '20. 🤖 AI-Enhanced Product Visualization'
        ]
      }
    ],
    system: '',
    prompt: (v) => {
      const prompts = {
        '1. 🎨 Background Removal': 'Remove the background from the attached image. Preserve the original subject exactly as photographed, including edges, textures, shadows, and fine details. Create a clean transparent background with professional cutout accuracy. Avoid halos, blur, color contamination, or artificial smoothing. Maintain original resolution and proportions. Suitable for ecommerce, catalogs, and marketing materials.',
        '2. 📦 Product Mockup Placement': 'Place the attached product into a realistic studio mockup environment. Use professional lighting, realistic shadows, and natural reflections. Match the original perspective and scale. Do not alter product color, shape, branding, or materials. The final image should resemble a professional product photoshoot.',
        '3. 💎 Luxury Brand Visual': 'Create a premium branding image using the attached product. Use minimalist composition, elegant lighting, and refined visual balance. Highlight craftsmanship, texture, and material quality. Avoid text, logos, and promotional graphics. Suitable for luxury brand websites and presentations.',
        '4. 🎨 Product Color Variations': 'Generate multiple realistic color and finish variations of the attached product. Keep geometry, perspective, lighting, and proportions identical. Change only colors and surface finishes. Ensure each variation appears naturally manufactured.',
        '5. 📱 Social Media Creative': 'Create an organic social media image using the attached product. Use natural lighting and modern composition. Avoid sales-heavy visuals, badges, or promotional clutter. Focus on authenticity and visual appeal.',
        '6. 🔄 Before and After Comparison': 'Create a realistic before-and-after comparison using the attached product. Use identical environments, lighting, and camera angles. Present a believable transformation without exaggeration.',
        '7. 🏠 Lifestyle Scene Integration': 'Place the attached product into a realistic lifestyle environment where it would naturally be used. Match shadows, lighting, and perspective. Maintain authenticity and visual realism.',
        '8. 🌐 Website Hero Banner': 'Create a homepage hero banner featuring the attached product. Use clean composition, premium lighting, and sufficient negative space for future marketing copy. Make the product the primary focal point.',
        '9. 🔍 Exploded Product View': 'Create a professional exploded-view visualization of the attached product. Separate components logically while maintaining scale and alignment. Showcase materials, construction, and assembly details.',
        '10. 🏟️ Trade Show Display': 'Create a realistic trade show booth featuring the attached product. Use professional exhibition design, clean branding, and modern presentation techniques. Make the product the centerpiece.',
        '11. 📦 Product Packaging Design': 'Design premium packaging concepts for the attached product. Create realistic packaging materials, printing details, and retail presentation. Ensure the packaging complements the product category.',
        '12. 🛒 Product in Retail Shelf': 'Place the attached product on a realistic retail shelf. Match industry-specific store layouts, lighting, and shelf organization. Ensure the product stands out naturally among surrounding items.',
        '13. 📘 Product Catalog Image': 'Create a clean catalog-style image using the attached product. Use a neutral background, balanced lighting, and professional composition. Suitable for printed catalogs and digital brochures.',
        '14. 📰 Magazine Advertisement': 'Create a high-end magazine advertisement featuring the attached product. Use editorial-quality photography, sophisticated composition, and premium visual storytelling. Do not add text.',
        '15. 🚀 Product Launch Teaser': 'Create a dramatic product launch visual using the attached product. Use cinematic lighting, controlled shadows, and premium presentation. Build anticipation while maintaining realism.',
        '16. 📊 Corporate Presentation Slide': 'Create a presentation-ready visual featuring the attached product. Use a clean business-oriented layout with professional lighting and clear product visibility. Suitable for investor and client presentations.',
        '17. 📋 Product Comparison Display': 'Create a side-by-side comparison visual featuring the attached product and its variations. Maintain identical lighting, scale, and camera angle across all versions. Highlight differences clearly.',
        '18. 🎄 Seasonal Marketing Campaign': 'Create a seasonal marketing visual featuring the attached product. Integrate subtle seasonal elements while maintaining focus on the product. Keep the design elegant and commercially appealing.',
        '19. 🔬 Product Feature Highlight': 'Create a detailed close-up visual emphasizing the key features of the attached product. Showcase materials, craftsmanship, texture, and functional elements through professional macro photography styling.',
        '20. 🤖 AI-Enhanced Product Visualization': 'Transform the attached product into a futuristic concept visualization. Preserve its core identity while presenting advanced materials, premium finishes, and next-generation design aesthetics. Maintain realism and professional quality.'
      };
      const selected = prompts[v['prompt-category']] || '';
      const cat = v['prompt-category'];
      return `## ${cat}\n\n<span class="ip-actions"><button class="ip-btn ip-copy" onclick="window.copyPrompt(\`${cat}\`)">📋 Copy</button>&nbsp;<button class="ip-btn ip-save" onclick="window.savePrompt()">💾 Save</button></span>\n\n\n\`\`\`\n${selected}\n\`\`\`\n\n---\n*Paste this prompt into ChatGPT, Midjourney, DALL-E, or any AI image generator.*`;
    }
  }
];

/* ── State ──────────────────────────────────────────────── */
let activeModuleId = null;
let isGenerating   = false;
let fullOutput     = '';
let completedIds   = new Set(JSON.parse(localStorage.getItem('pm_done') || '[]'));

/* ── DOM ─────────────────────────────────────────────────── */
const loginScreen   = document.getElementById('login-screen');
const dashboard     = document.getElementById('dashboard');
const pwInput       = document.getElementById('pw-input');
const userInput     = document.getElementById('user-input');
const loginError    = document.getElementById('login-error');
const settingsModal = document.getElementById('settings-modal');
const modelSelect   = document.getElementById('model-select');
const savedMsg      = document.getElementById('saved-msg');
const moduleGrid    = document.getElementById('module-grid');
const viewOverview  = document.getElementById('view-overview');
const viewModule    = document.getElementById('view-module');
const mIcon         = document.getElementById('m-icon');
const mTitle        = document.getElementById('m-title');
const mDesc         = document.getElementById('m-desc');
const inputFields   = document.getElementById('input-fields');
const btnGenerate   = document.getElementById('btn-generate');
const btnText       = document.getElementById('btn-text');
const btnSpinner    = document.getElementById('btn-spinner');
const btnClear      = document.getElementById('btn-clear');
const btnCopy       = document.getElementById('btn-copy');
const btnSave       = document.getElementById('btn-save');
const outputPlaceholder = document.getElementById('output-placeholder');
const outputContent = document.getElementById('output-content');
const statusDot     = document.getElementById('status-dot');
const statusLabel   = document.getElementById('status-label');
const statDone      = document.getElementById('stat-done');
const modelPill     = document.getElementById('model-pill');
const docDrawer     = document.getElementById('doc-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const drawerTitle   = document.getElementById('drawer-title');
const drawerLoader  = document.getElementById('drawer-loader');
const docsBody      = document.getElementById('docs-body');

/* ── Auth ────────────────────────────────────────────────── */
(function checkAuth() {
  if (sessionStorage.getItem('pm_admin') === 'true') showDashboard();
})();

document.getElementById('toggle-pw').onclick = () => {
  pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
};
document.getElementById('btn-login').onclick = login;
document.getElementById('user-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') login(); });
pwInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') login(); });

async function login() {
  const username = document.getElementById('user-input').value.trim();
  const password = pwInput.value.trim();
  if (!username || !password) return;
  loginError.classList.add('hidden');
  try {
    const res  = await fetch('/api/verify-admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
    const data = await res.json();
    if (data.success) { sessionStorage.setItem('pm_admin', 'true'); showDashboard(); }
    else { loginError.classList.remove('hidden'); pwInput.value = ''; pwInput.focus(); }
  } catch { loginError.textContent = 'Connection error — is the server running?'; loginError.classList.remove('hidden'); }
}

document.getElementById('btn-logout').onclick = () => { sessionStorage.removeItem('pm_admin'); location.reload(); };

/* ── Show Dashboard ──────────────────────────────────────── */
async function showDashboard() {
  loginScreen.classList.add('hidden');
  dashboard.classList.remove('hidden');
  await checkServerConfig();
  loadSettings();
  buildModuleGrid();
  buildNavHandlers();
  updateStats();
}

/* ── Check server config ─────────────────────────────────── */
async function checkServerConfig() {
  try {
    const res  = await fetch('/api/config');
    const data = await res.json();
    if (data.apiReady) {
      statusDot.classList.add('on');
      statusLabel.textContent = 'DeepSeek ready';
    }
    if (data.defaultModel) {
      modelSelect.value = data.defaultModel;
      localStorage.setItem('pm_model', data.defaultModel);
    }
  } catch { /* server config fetch failed */ }
}

/* ── Settings ────────────────────────────────────────────── */
function loadSettings() {
  const model = localStorage.getItem('pm_model') || 'deepseek-chat';
  modelSelect.value = model;
  updateModelPill(model);
}

function saveSettings() {
  const model = modelSelect.value;
  localStorage.setItem('pm_model', model);
  updateModelPill(model);
  savedMsg.classList.remove('hidden');
  setTimeout(() => savedMsg.classList.add('hidden'), 2000);
}

function updateModelPill(model) {
  if (modelPill) {
    const n = model.includes('reasoner') ? 'R1' : 'V3';
    modelPill.textContent = 'DeepSeek ' + n;
  }
}

document.getElementById('open-settings').onclick = () => settingsModal.classList.remove('hidden');
document.getElementById('open-settings-sb').onclick = () => settingsModal.classList.remove('hidden');
document.getElementById('close-settings').onclick = () => settingsModal.classList.add('hidden');
document.getElementById('save-settings').onclick  = saveSettings;
settingsModal.addEventListener('click', (e) => { if (e.target === settingsModal) settingsModal.classList.add('hidden'); });

/* ── Toggle Password Visibility ──────────────────────────── */
['toggle-cp-old', 'toggle-cp-new', 'toggle-cp-confirm'].forEach(id => {
  const btn = document.getElementById(id);
  if (btn) btn.onclick = () => {
    const input = document.getElementById(id.replace('toggle-', ''));
    if (input) input.type = input.type === 'password' ? 'text' : 'password';
  };
});

/* ── Change Password ────────────────────────────────────── */
document.getElementById('btn-change-pw').onclick = changePassword;

async function changePassword() {
  const currentPw = document.getElementById('cp-old').value.trim();
  const newPw = document.getElementById('cp-new').value.trim();
  const confirmPw = document.getElementById('cp-confirm').value.trim();
  const errEl = document.getElementById('cp-error');
  const successEl = document.getElementById('cp-success');

  errEl.classList.add('hidden');
  successEl.classList.add('hidden');

  if (!currentPw) { errEl.textContent = 'Enter your current password.'; errEl.classList.remove('hidden'); return; }
  if (newPw.length < 6) { errEl.textContent = 'New password must be at least 6 characters.'; errEl.classList.remove('hidden'); return; }
  if (newPw !== confirmPw) { errEl.textContent = 'Passwords do not match.'; errEl.classList.remove('hidden'); return; }

  try {
    const res = await fetch('/api/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw })
    });
    const data = await res.json();
    if (res.ok) {
      successEl.classList.remove('hidden');
      document.getElementById('cp-old').value = '';
      document.getElementById('cp-new').value = '';
      document.getElementById('cp-confirm').value = '';
    } else {
      errEl.textContent = data.error || 'Failed to change password.';
      errEl.classList.remove('hidden');
    }
  } catch {
    errEl.textContent = 'Connection error.';
    errEl.classList.remove('hidden');
  }
}

/* ── Stats ───────────────────────────────────────────────── */
function updateStats() { if (statDone) statDone.textContent = completedIds.size; }

/* ── Module Grid ─────────────────────────────────────────── */
function buildModuleGrid() {
  if (!moduleGrid) return;
  moduleGrid.innerHTML = '';
  MODULES.forEach(m => {
    const card = document.createElement('div');
    card.className = 'module-card';
    card.style.setProperty('--module-color', m.color);
    card.style.setProperty('--module-gradient', m.gradient);
    const done = completedIds.has(m.id);
    card.innerHTML = `
      <div class="mc-header">
        <div class="mc-icon-sm" style="background:${m.gradient}">${m.icon}</div>
      </div>
      <div class="mc-name">${m.name}</div>
      <div class="mc-desc">${m.desc}</div>
      ${done ? '<div class="mc-done">✓ Completed</div>' : ''}
    `;
    card.addEventListener('click', () => openModule(m.id));
    moduleGrid.appendChild(card);
  });
}

/* ── Nav Handlers ────────────────────────────────────────── */
function buildNavHandlers() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    const view = btn.dataset.view;
    btn.onclick = () => {
      if (view === 'overview') switchView('overview');
      if (view === 'saved')    openSaved();
      if (view === 'module')   openModule(btn.dataset.id);
      setActiveNav(btn);
    };
    if (view === 'module' && completedIds.has(btn.dataset.id)) btn.classList.add('done');
  });

  document.querySelectorAll('.header-doc-btn').forEach(btn => {
    btn.onclick = () => openDrawer(btn.dataset.doc);
  });
}

function setActiveNav(target) {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  target.classList.add('active');
}

/* ── View Switcher ───────────────────────────────────────── */
function switchView(name) {
  viewOverview.classList.toggle('active', name === 'overview');
  viewModule.classList.toggle('active',   name === 'module');
  const vs = document.getElementById('view-saved');
  if (vs) vs.classList.toggle('active', name === 'saved');
}

/* ── Open Module ─────────────────────────────────────────── */
function openModule(id) {
  const m = MODULES.find(x => x.id === id);
  if (!m) return;
  activeModuleId = id;
  switchView('module');

  const navBtn = document.querySelector(`.nav-item[data-id="${id}"]`);
  if (navBtn) setActiveNav(navBtn);

  mIcon.style.background = m.gradient;
  mIcon.textContent = m.icon;
  mTitle.textContent = m.name;
  mDesc.textContent  = m.desc;
  btnGenerate.style.background = m.gradient;

  buildInputs(m);
  clearOutput();
}

/* ── Build Inputs ────────────────────────────────────────── */
function buildInputs(m) {
  inputFields.innerHTML = '';
  m.inputs.forEach(inp => {
    const group = document.createElement('div');
    group.className = 'form-group';
    const label = document.createElement('label');
    label.textContent = inp.label;
    label.setAttribute('for', `inp-${inp.id}`);
    group.appendChild(label);
    let el;
    if (inp.type === 'select') {
      el = document.createElement('select');
      inp.opts.forEach(o => { const opt = document.createElement('option'); opt.value = o; opt.textContent = o; el.appendChild(opt); });
    } else if (inp.type === 'textarea') {
      el = document.createElement('textarea'); el.placeholder = inp.ph;
    } else {
      el = document.createElement('input'); el.type = 'text'; el.placeholder = inp.ph;
    }
    el.id = `inp-${inp.id}`;
    group.appendChild(el);
    inputFields.appendChild(group);
  });
}

/* ── Generate ────────────────────────────────────────────── */
btnGenerate.onclick = generate;
btnClear.onclick    = clearOutput;
btnCopy.onclick     = copyOutput;
btnSave.onclick     = saveSession;

async function generate() {
  if (isGenerating) return;

  const m = MODULES.find(x => x.id === activeModuleId);
  if (!m) return;

  // Reference modules — use prompt function directly, no API call
  if (m.isReference) {
    const values = {};
    m.inputs.forEach(inp => { const el = document.getElementById(`inp-${inp.id}`); values[inp.id] = el ? el.value.trim() : ''; });
    setGenerating(true); clearOutput(); showOutputArea();
    fullOutput = m.prompt(values);
    renderStreaming(fullOutput);
    setTimeout(() => { renderFinal(fullOutput); markDone(m.id); setGenerating(false); }, 100);
    return;
  }

  const values = {}; let valid = true;
  m.inputs.forEach(inp => { const el = document.getElementById(`inp-${inp.id}`); values[inp.id] = el ? el.value.trim() : ''; if (!values[inp.id] && inp.type !== 'select') valid = false; });
  if (!valid) { alert('Please fill in all fields before generating.'); return; }
  setGenerating(true); clearOutput(); showOutputArea(); fullOutput = '';

  const model = localStorage.getItem('pm_model') || 'deepseek-chat';

  try {
    const resp = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemPrompt: m.system, userPrompt: m.prompt(values), model })
    });
    if (!resp.ok) { const err = await resp.json().catch(() => ({ error: resp.statusText })); throw new Error(err.error || resp.statusText); }
    const reader = resp.body.getReader(); const decoder = new TextDecoder();
    while (true) { const { done, value } = await reader.read(); if (done) break; fullOutput += decoder.decode(value, { stream: true }); renderStreaming(fullOutput); }
    renderFinal(fullOutput); markDone(m.id);
  } catch (err) { renderError(err.message); }
  finally { setGenerating(false); }
}

function renderStreaming(text) {
  outputContent.classList.remove('hidden'); outputPlaceholder.classList.add('hidden');
  outputContent.style.whiteSpace = 'pre-wrap';
  outputContent.innerHTML = escapeHtml(text) + '<span class="cursor"></span>';
  outputContent.parentElement.scrollTop = outputContent.parentElement.scrollHeight;
}
function renderFinal(text) {
  outputContent.style.whiteSpace = '';
  outputContent.innerHTML = window.marked ? marked.parse(text) : escapeHtml(text).replace(/\n/g,'<br>');
  // Hide bottom save/copy for reference modules (they have inline buttons)
  if (activeModuleId === 'image-prompts') {
    btnCopy.classList.add('hidden'); btnSave.classList.add('hidden');
  } else {
    btnCopy.classList.remove('hidden'); btnSave.classList.remove('hidden');
  }
  btnClear.classList.remove('hidden');
}
function renderError(msg) {
  outputContent.classList.remove('hidden'); outputPlaceholder.classList.add('hidden');
  outputContent.style.whiteSpace = 'pre-wrap';
  outputContent.innerHTML = `<span style="color:#ef4444">⚠ Error: ${escapeHtml(msg)}</span>`;
}
function showOutputArea() { outputContent.classList.remove('hidden'); outputPlaceholder.classList.add('hidden'); outputContent.innerHTML = ''; }
function clearOutput() { outputContent.classList.add('hidden'); outputContent.innerHTML = ''; outputPlaceholder.classList.remove('hidden'); btnCopy.classList.add('hidden'); btnSave.classList.add('hidden'); btnClear.classList.add('hidden'); fullOutput = ''; }
function setGenerating(state) { isGenerating = state; btnGenerate.disabled = state; btnText.classList.toggle('hidden', state); btnSpinner.classList.toggle('hidden', !state); }
function copyOutput() {
  if (!fullOutput) return;
  navigator.clipboard.writeText(fullOutput).then(() => { btnCopy.textContent = 'Copied!'; btnCopy.classList.add('copied'); setTimeout(() => { btnCopy.textContent = 'Copy'; btnCopy.classList.remove('copied'); }, 2000); });
}
function markDone(id) {
  completedIds.add(id); localStorage.setItem('pm_done', JSON.stringify([...completedIds]));
  document.querySelectorAll(`.nav-item[data-id="${id}"]`).forEach(b => b.classList.add('done'));
  updateStats(); buildModuleGrid();
}

/* ── Saved Sessions ──────────────────────────────────────── */
function getSessions() {
  return JSON.parse(localStorage.getItem('pm_sessions') || '[]');
}

function saveSessions(sessions) {
  localStorage.setItem('pm_sessions', JSON.stringify(sessions));
  updateSavedCount(sessions.length);
}

function updateSavedCount(count) {
  const badge = document.getElementById('saved-count');
  const header = document.getElementById('saved-count-header');
  if (badge) badge.textContent = count;
  if (header) header.textContent = count;
}

function saveSession() {
  if (!fullOutput || !activeModuleId) return;
  const m = MODULES.find(x => x.id === activeModuleId);
  if (!m) return;
  const sessions = getSessions();
  const ts = new Date();
  const session = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2,6),
    moduleId: m.id,
    moduleName: m.name,
    moduleIcon: m.icon,
    timestamp: ts.toISOString(),
    date: ts.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    output: fullOutput
  };
  sessions.unshift(session);
  saveSessions(sessions);
  btnSave.textContent = '✓ Saved!';
  btnSave.classList.add('copied');
  setTimeout(() => { btnSave.textContent = '💾 Save'; btnSave.classList.remove('copied'); }, 2000);
}

function openSaved() {
  switchView('saved');
  const list = document.getElementById('saved-list');
  const empty = document.getElementById('saved-empty');
  if (!list) return;
  const sessions = getSessions();
  if (sessions.length === 0) {
    list.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');
  list.innerHTML = sessions.map(s => `
    <div class="saved-card" data-id="${s.id}">
      <div class="sc-top">
        <div class="sc-icon">${s.moduleIcon}</div>
        <div class="sc-info">
          <div class="sc-name">${s.moduleName}</div>
          <div class="sc-date">${s.date}</div>
        </div>
      </div>
      <div class="sc-preview">${escapeHtml(s.output.slice(0, 120))}${s.output.length > 120 ? '…' : ''}</div>
      <div class="sc-actions">
        <button class="sc-btn sc-load" data-id="${s.id}">📂 Load</button>
        <button class="sc-btn sc-del" data-id="${s.id}">🗑 Delete</button>
      </div>
    </div>
  `).join('');

  // Wire Load buttons
  list.querySelectorAll('.sc-load').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      loadSession(btn.dataset.id);
    };
  });
  // Wire Delete buttons
  list.querySelectorAll('.sc-del').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      deleteSession(btn.dataset.id);
    };
  });
}

function loadSession(id) {
  const sessions = getSessions();
  const s = sessions.find(x => x.id === id);
  if (!s) return;
  // Open the module
  openModule(s.moduleId);
  // Set the output
  fullOutput = s.output;
  showOutputArea();
  renderFinal(s.output);
}

function deleteSession(id) {
  let sessions = getSessions();
  sessions = sessions.filter(x => x.id !== id);
  saveSessions(sessions);
  openSaved(); // Re-render
}

/* ── Doc Drawer ──────────────────────────────────────────── */
const DOC_TITLES = { workflow: '⚙ Workflow', documentation: '📖 Documentation', changelog: '📋 Changelog', 'deepseek-guide': '🔮 DeepSeek Guide' };

async function openDrawer(type) {
  drawerTitle.textContent = DOC_TITLES[type] || type;
  drawerLoader.classList.remove('hidden');
  docsBody.classList.add('hidden');
  docsBody.innerHTML = '';
  docDrawer.classList.remove('hidden');
  drawerOverlay.classList.remove('hidden');

  try {
    const res  = await fetch(`/api/content/${type}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    docsBody.innerHTML = window.marked ? marked.parse(data.content) : `<pre>${data.content}</pre>`;
    drawerLoader.classList.add('hidden');
    docsBody.classList.remove('hidden');
  } catch (err) {
    drawerLoader.classList.add('hidden');
    docsBody.innerHTML = `<p style="color:#ef4444">Failed to load: ${err.message}</p>`;
    docsBody.classList.remove('hidden');
  }
}

function closeDrawer() {
  docDrawer.classList.add('hidden');
  drawerOverlay.classList.add('hidden');
}

document.getElementById('close-drawer').onclick = closeDrawer;
drawerOverlay.onclick = closeDrawer;
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

/* ── Global helpers for inline prompt buttons ──────────── */
window.copyPrompt = function(category) {
  const m = MODULES.find(x => x.id === 'image-prompts');
  if (!m) return;
  const prompts = m.prompt({ 'prompt-category': category });
  const text = prompts.split('```')[1] || prompts;
  navigator.clipboard.writeText(text.trim()).then(() => {
    const btn = document.querySelector('.ip-copy');
    if (btn) { btn.textContent = '✓ Copied!'; setTimeout(() => { btn.textContent = '📋 Copy'; }, 2000); }
  });
};
window.savePrompt = function() {
  btnSave.click();
};

/* ── Util ────────────────────────────────────────────────── */
function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
