# 🔮 DeepSeek Social Media Guide

> Using DeepSeek AI (DeepSeek-V3 & DeepSeek-R1) for social media strategy, content creation, and audience growth

---

## About DeepSeek

DeepSeek is a powerful AI model family developed by DeepSeek (深度求索). Two models are available in PromptMaster:

| Model | ID | Best For |
|-------|-----|----------|
| **DeepSeek-V3** | `deepseek-chat` | General social media content, fast generation, captions, hooks, and repurposing |
| **DeepSeek-R1** | `deepseek-reasoner` | Deep strategy, audience psychology analysis, algorithm breakdowns, complex planning |

---

## Key Differences: DeepSeek vs Claude

| Aspect | DeepSeek | Claude |
|--------|----------|--------|
| **API endpoint** | `api.deepseek.com` | `api.anthropic.com` |
| **API format** | OpenAI-compatible | Anthropic Messages API |
| **Strengths** | Reasoning (R1), cost-efficiency, long context | Nuanced tone, structured markdown, creative writing |
| **Thinking mode** | R1 has internal CoT (like o1) | Opus uses direct generation |
| **Max tokens** | 8K output (V3), 8K output (R1) | 8K output (Opus), 8K (Sonnet) |

---

## When to Use Each for Social Media

### Use DeepSeek-V3 When You Need:
- **Fast content generation** — captions, hooks, quick posts
- **Data-driven strategy** — analytical breakdowns of audience behavior
- **Threads & long-form** — Twitter/X threads, LinkedIn articles
- **Multi-format repurposing** — transforming one idea into many formats
- **Cost-effective scaling** — generating large volumes of content

### Use DeepSeek-R1 When You Need:
- **Deep strategic thinking** — 30-day growth plans, competitive analysis
- **Algorithm intelligence** — understanding platform mechanics
- **Audience psychology** — uncovering deep motivations and triggers
- **Complex problem-solving** — diagnosing engagement drops, content audit

### Use Claude When You Need:
- **Polished, brand-aligned copy** — nuanced tone and style control
- **Creative storytelling** — emotional narratives, brand voice
- **Highly structured markdown** — formatted reports with exact section control

---

## Optimizing Prompts for DeepSeek

### DeepSeek-V3 Best Practices

1. **Be direct and specific** — V3 responds best to clear instructions with expected output format
2. **Use markdown structure** — Include `##` headers in your prompt to guide the output shape
3. **Keep system prompts concise** — V3 works well with a focused system prompt + detailed user message
4. **Add examples where format matters** — Few-shot examples significantly improve consistency

**Example optimized prompt:**
```
You are a social media strategist. Create a 30-day content plan.

Niche: Fitness coaching for busy professionals
Platform: Instagram
Goal: 5K followers in 90 days

Format each week as:
## Week [N]: [Theme]
- Day 1: [Post type] — [Hook]
- Day 2: [Post type] — [Hook]
...
- Day 7: [Post type] — [Hook]
```

### DeepSeek-R1 Best Practices

1. **DO NOT add Chain of Thought** — R1 thinks internally. Adding "think step by step" degrades output quality
2. **Frame as analysis/reasoning tasks** — R1 excels at "analyze," "diagnose," "compare," "evaluate"
3. **Request structured output after reasoning** — R1 can think deeply then output a structured result
4. **Set a context window** — R1 can over-reason; specifying scope helps

**Example R1-optimized prompt:**
```
Analyze why my Instagram engagement dropped 40% this month.

Niche: Sustainable fashion
Audience: Women 25-40, eco-conscious
Current engagement rate: 1.2% (was 2.0%)
Recent changes: Posting 5x/week instead of 3x, more carousel posts

Diagnose the likely causes and provide a 14-day recovery plan.
```

---

## Platform-Specific Tips for DeepSeek

### Instagram
- V3 excels at **caption writing** with CTA hooks
- R1 is great for **algorithm analysis** and hashtag strategy
- Best prompt: "Write 5 Instagram captions for [topic]. Each: hook (2 lines), body (3 lines), CTA (1 line). Include emojis."

### TikTok
- V3 can generate **short-form video scripts** with hook → body → CTA
- R1 can analyze **trend patterns** and recommend content angles
- Best prompt: "Create 3 TikTok scripts for [niche]. Each: hook (0-3s), content (3-30s), CTA (30-60s). Platform-native language."

### LinkedIn
- V3 handles **thought leadership posts** well
- R1 excels at **industry analysis** and authority-building content
- Best prompt: "Write a LinkedIn post about [topic]. Opening hook, personal story, 3 key insights, discussion CTA. Professional but conversational."

### Twitter/X
- V3 is good at **thread structuring**
- R1 can find **angle and argument logic**
- Best prompt: "Create a Twitter thread on [topic]. 7 tweets. Tweet 1: hook. Tweets 2-6: value. Tweet 7: CTA + summary."

### YouTube
- V3 can generate **script outlines** and **title variations**
- R1 is strong at **SEO analysis** and **audience retention strategies**
- Best prompt: "Create a YouTube video outline for [topic]. Title (clickable), hook, 5 sections with timestamps, CTA, end screen elements."

---

## Pricing Comparison

| Provider | Model | Input Cost (per 1M tokens) | Output Cost (per 1M tokens) |
|----------|-------|---------------------------|----------------------------|
| DeepSeek | V3 | $0.27 | $1.10 |
| DeepSeek | R1 | $0.55 | $2.19 |
| Anthropic | Opus 4.8 | $15.00 | $75.00 |
| Anthropic | Sonnet 4.6 | $3.00 | $15.00 |
| Anthropic | Haiku 4.5 | $0.80 | $4.00 |

**DeepSeek V3 is ~50x cheaper than Opus and ~10x cheaper than Sonnet** for similar-quality social media content. R1 is ~25x cheaper than Opus for deep analysis tasks.

---

## UI/UX Design Reference

> Source: [saifyxpro/ui-ux-design-pro-skill](https://github.com/saifyxpro/ui-ux-design-pro-skill)
> 107 styles · 127 palettes · 107 font pairings · 150+ reasoning rules

---

### Design Directions

| Direction | Feel | Best For |
|-----------|------|----------|
| **Precision & Density** | Tight, technical, monochrome | Dev tools, admin dashboards |
| **Warmth & Approachability** | Generous spacing, soft shadows | Collaborative tools, consumer apps |
| **Sophistication & Trust** | Cool tones, layered depth | Finance, enterprise B2B |
| **Boldness & Clarity** | High contrast, dramatic space | Modern dashboards, data-heavy |
| **Dark Mode (OLED)** | Deep black, vibrant accents | Night-mode apps, social media |
| **Vibrant & Block-based** | Bold, energetic, playful | Startups, social media, gaming |
| **Motion-Driven** | Animation-heavy, scroll effects | Portfolios, storytelling, social |
| **Micro-interactions** | Tactile feedback, gestures | Mobile apps, touchscreen UIs |

### Craft Principles

**Surface Elevation** — Stack surfaces: base → cards → dropdowns → overlays. Dark mode: higher elevation = slightly lighter.

**Borders** — Low opacity rgba blends with background. Progression: default → subtle → strong → focus rings.

**Depth Strategy** — Pick ONE: borders-only (dense), subtle shadows (approachable), layered shadows (premium), surface shifts (tints).

**Color Meaning** — Gray builds structure. Color communicates. One accent color with intention beats five without thought.

### Token Architecture

- **Text**: primary → secondary → tertiary → muted (4 levels)
- **Borders**: default → subtle → strong → strongest (4 levels)
- **Spacing base**: 4px or 8px multiples
- **Animation**: micro 150ms, modals 250ms, GPU-friendly (transform + opacity only)

### Color Palettes by Industry

| Industry | Primary Hex | Tone |
|----------|------------|------|
| Fintech | `#2563EB` | Professional, Trust |
| Healthcare | `#059669` | Calm, Healing |
| E-commerce | `#DC2626` | Urgency, Energy |
| SaaS | `#7C3AED` | Modern, Creative |
| Education | `#2563EB` | Trust, Learning |
| Gaming | `#EF4444` | Energy, Excitement |
| Social Media | `#4F9CF9` | Vibrant, Engaging |
| Startup | `#8B5CF6` | Innovative, Bold |

### Font Pairings

| Pairing | Heading | Body | Mood |
|---------|---------|------|------|
| Classic Professional | Inter | Inter | Clean, Modern |
| Premium Editorial | Playfair Display | Source Sans Pro | Luxury, Trust |
| Modern SaaS | DM Sans | DM Sans | Friendly, Clean |
| Tech/Dev | JetBrains Mono | Inter | Technical, Precise |
| Social Media | Inter | Inter | Clean, Readable |
| Minimal | Cabinet Grotesk | Archivo | Clean, Bold |

### Accessibility Minimums

- Text contrast: 4.5:1 (AA), 7:1 (AAA)
- Touch targets: 44x44px minimum
- Focus-visible: 3-4px ring
- Keyboard navigation for every action
- `prefers-reduced-motion` respected

---

## Global Reference (CLAUDE.md)

> This section is the full CLAUDE.md content — security standards, development methodology, workflow preferences, and business context. Use as reference when coding.

---

## My Workflow Preferences

> Added June 2026. Applies across all projects and environments.

- **Never stop mid-task without asking.** If something needs a fix, ask whether to proceed with the fix rather than stopping silently.
- **Always ask before any commit or push.** Never commit or push without my explicit go-ahead — this prevents conflicts.
- **Offer to run commands instead of assuming.** When Git Bash / a terminal is available, ask *"Would you like me to run this in Git Bash for you?"* before running anything that changes state — don't silently run it, and don't make me run it manually if you're able to do it yourself.
- **Quick read-only checks** (`git status`, `git diff`, `git log`) you may run directly to investigate.
- **If I decline, or you can't execute**, hand me the exact Git Bash commands to run myself.

---

## Development Standards

### Development Methodology

> *"You don't need to know everything to build something real. You need clarity, structure, and the discipline to keep iterating."*

**Workflow:** Git Bash → Claude → Localhost Test → Supabase/Neon → Vercel Deploy

| # | Principle | Rule |
|---|-----------|------|
| 01 | **Propose Before You Build** | No code until the plan is clear. Always define scope, architecture, and sequence first. |
| 02 | **Feature Branches, Always** | Every new feature lives on its own Git branch. Nothing touches master until it's tested and stable. |
| 03 | **Real Database From Day One** | Supabase or Neon from the start — not JSON, not local workarounds. |
| 04 | **Localhost First, Deploy Last** | Test at localhost first — iterate until stable. Then push via Git Bash → Vercel auto-deploys. Only skip localhost if explicitly requested. |
| 05 | **One AI, Fully Mastered** | Standardized on Claude across architecture, code, copy, and strategy. |
| 06 | **Document As You Go** | SOPs, changelogs, and briefs are built alongside the product — not written after the fact. |
| 07 | **Iteration Is The Real Skill** | Clear communication and precise problem framing produce better software than memorized syntax. |
| 08 | **Security by Default** | Every deployment passes basic security validation before release. |
| 09 | **Structured Project Memory** | Every project carries a CLAUDE.md — stack details, branch rules, session context. |
| 10 | **Conventional Commits** | Every commit: `feat`, `fix`, `docs`, `security`, `refactor`. Feeds the changelog automatically. |

### Default Tech Stack

- **Framework**: Next.js 14/15 App Router • **Language**: TypeScript (strict mode)
- **Database**: Supabase (primary), Neon (secondary)
- **Deployment**: Vercel (primary), Render (secondary, Singapore region)
- **AI**: Anthropic Claude API (`claude-sonnet-4-6`)
- **Email**: Resend • **Auth**: Supabase Auth • **Styling**: Tailwind CSS
- **Automation**: Zapier • **Cron**: cron.org
- **Package manager**: npm • **Version control**: GitHub
- **Terminal**: Windows Git Bash

### Currency Rules

- **Local projects** (Philippine clients) → ₱ Philippine Peso
- **Global projects** (international audience) → $ USD
- **Dual-currency** → show both, lead with ₱

### How I Work with Claude

- Offer to run terminal commands in Git Bash first
- Show full code blocks — never truncate or summarize
- Tell me the file and line — always specify where changes go
- Flag breaking changes before they happen
- Plain-language input style — I describe what I want, you translate to code
- Prefer single-file solutions unless architecture demands otherwise
- Localhost first, deploy last
- Security flag always — before marking anything done, flag exposed env variables, missing RLS rules, unprotected routes
- No filler — skip "Great question!", "Certainly!" — just answer
- Lead with the solution — don't explain what you're about to do, just do it
- One question max — ask only the most important clarification

### Content & Writing Style

- **Tone:** Professional, precise, no fluff
- **Format:** Tables and code blocks liberally; bullet lists sparingly
- **Documents:** Formal Philippines business English
- **Technical writing:** Clear, sequential, numbered steps
- **Marketing copy:** Benefit-led, authoritative — not hype

**Forbidden words:** `delve`, `leverage`, `synergy`, `empower`, `utilize`, `seamlessly`, `cutting-edge`, `game-changer`, `robust`, `holistic`, `ecosystem`, `streamline`, `transformative`, `unlock`, `elevate`, `groundbreaking`, `tailored solutions`, `in today's fast-paced world`, `it's important to note`, `absolutely`, `certainly`, `of course`, `I'd be happy to`

**No em-dashes as sentence connectors** — use plain sentence structure.

---

## Security Standards

### Four Security Tools

| Tool | Surface | Auto-activates when |
|---|---|---|
| `/security-review` | Code — OWASP Top 10, secrets, SQL, XSS, CSRF, auth, rate limiting | Writing code that touches auth, user input, API, payments, sensitive data |
| `/security-scan` (AgentShield) | Claude Code — hooks, MCPs, agent configs, permissions | `.claude/settings.json` changes, new MCP or hook added |
| `cloud-infrastructure-security` | Infrastructure — IAM, network, CI/CD, CDN/WAF, backups | Deploying to cloud, configuring infra, setting up CI/CD |
| **`security report`** | Everything — all four merged into one scored report | When user says "security report" |

### Non-Negotiable Security Rules

1. **Secrets — Always Server-Side** — NEVER put API keys in frontend code
2. **Database — No SQLite on Serverless** — Vercel, Netlify, Railway, Fly.io → reject SQLite
3. **Authorization — Ownership Checks Are Mandatory** — always verify `record.userId === authenticatedUser.id`
4. **Input Validation — Server-Side Always** — every endpoint validates with Zod or equivalent
5. **SQL — Parameterized Queries Only** — never string interpolation with user input
6. **Passwords — bcrypt or argon2 Only** — cost 12 minimum
7. **Error Handling — Never a White Screen** — every component needs loading, error, empty states
8. **CORS — Explicit Origins Only** — never `origin: '*'` on authenticated routes
9. **Rate Limiting — Required on Key Endpoints** — auth: max 5 req/min/IP
10. **Secure Headers** — Express: `helmet` middleware. Next.js: headers in config
11. **Session Store — Never MemoryStore in Production**
12. **VPS Hardening** — `apt install fail2ban -y && systemctl enable fail2ban`

### Security Pre-Commit Checklist

- [ ] No hardcoded API keys, tokens, passwords, or SSH keys
- [ ] `.env.local` in `.gitignore` and not staged
- [ ] No `NEXT_PUBLIC_` used for secrets
- [ ] All AI output escaped before rendering in UI
- [ ] No `eval()`, `exec()`, or `spawn()` with user input
- [ ] `npm audit --audit-level=high` passing
- [ ] All external API calls have a timeout (10s max)

### Security Pre-Deploy Checklist

- [ ] All secrets in Vercel environment variables
- [ ] Supabase RLS active on all tables
- [ ] Admin endpoints protected by authentication middleware
- [ ] HTTPS enforced — no mixed content
- [ ] Privacy Policy linked on all pages that collect PII

---

## Operations & Workflow

### Vercel Deployment Rules

- `export const runtime = "nodejs"` for API routes using Node APIs
- `maxDuration = 60` for routes calling external APIs
- Confirm production branch before pushing
- Add env vars to Vercel dashboard, not just `.env.local`

### Supabase Rules

- Use `supabaseAdmin` (service role) for ALL server-side writes
- Never expose service role key to the client
- Always enable RLS on new tables
- Test RLS after every schema change
- Use `upsert` over `insert` when row may already exist

### Claude API Rules

- Default model: `claude-sonnet-4-6`
- Use prompt caching for long system prompts
- For streaming: use `anthropic.messages.stream()` not `.create()`
- Always set `max_tokens` explicitly
- 429 errors → exponential backoff, not immediate retry

### AI App Development Rules

- System prompts are sacred — never change without asking
- Use prompt caching for system prompts >1000 tokens
- Never expose API keys client-side
- Log token usage for cost tracking
- Fallback behavior — if AI API is down, graceful error, never white screen
- Conversation history cap — limit to MAX_MESSAGES_IN_HISTORY (e.g. 20)
- Rate limit AI endpoints — API calls cost money

---

## Getting Started with DeepSeek

1. Sign up at [platform.deepseek.com](https://platform.deepseek.com)
2. Create an API key
3. Open PromptMaster **Settings** → Switch provider to **🔮 DeepSeek**
4. Paste your DeepSeek API key
5. Select model: **V3** for general content, **R1** for deep strategy
6. Select any module and generate
