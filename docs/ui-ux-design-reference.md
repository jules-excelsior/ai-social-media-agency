# UI/UX Design Reference

> Source: [saifyxpro/ui-ux-design-pro-skill](https://github.com/saifyxpro/ui-ux-design-pro-skill)
> 107 styles · 127 palettes · 107 font pairings · 150+ reasoning rules

---

## Design Directions Quick Reference

| Direction | Feel | Best For |
|-----------|------|----------|
| **Precision & Density** | Tight, technical, monochrome | Dev tools, admin dashboards |
| **Warmth & Approachability** | Generous spacing, soft shadows | Collaborative tools, consumer apps |
| **Sophistication & Trust** | Cool tones, layered depth | Finance, enterprise B2B |
| **Boldness & Clarity** | High contrast, dramatic space | Modern dashboards, data-heavy |
| **Utility & Function** | Muted, functional density | GitHub-style tools |
| **Data & Analysis** | Chart-optimized, numbers-first | Analytics, BI tools |
| **Playful & Expressive** | Rounded, colorful, animated | Creative tools, portfolio |
| **Fintech Pro** | Deep navy, gold, precise data | Trading, Banking, Crypto |
| **SaaS Launch** | Vibrant purple, clean, motion | Marketing, Startups |
| **Dark Mode (OLED)** | Deep black, vibrant accents | Night-mode apps, coding platforms |

---

## Craft Principles

### Surface Elevation
Stack surfaces: base → cards → dropdowns → overlays. In dark mode, higher elevation = slightly lighter. Sidebars: same background as canvas + subtle border.

### Borders
Low opacity rgba blends with background. Progression: default → subtle → strong → strongest (focus rings).

### Squint Test
Blur your eyes. Perceive hierarchy without harsh lines. If borders are the first thing you see, they're too strong.

### Color Meaning
Gray builds structure. Color communicates — status, action, emphasis. One accent color with intention beats five without thought.

### Depth Strategy
Pick ONE and commit:
- Borders-only (dense tools)
- Subtle shadows (approachable)
- Layered shadows (premium cards)
- Surface shifts (background tints)

### Defaults to Reject
- Harsh borders
- Dramatic surface jumps
- Inconsistent spacing
- Mixed depth strategies
- Missing interaction states (hover, focus, disabled, loading, error)
- Pure white cards on colored backgrounds
- Multiple accent colors
- Pure black (#000000) for dark mode — use #0a0a0a or #121212

---

## Token Architecture

Build four text levels: primary → secondary → tertiary → muted
Build four border levels: default → subtle → strong → strongest

### Typography
Build distinct levels via size + weight + letter-spacing:
- Headlines: heavy, tight tracking
- Body: comfortable weight
- Labels: medium, smaller
- Data: monospace, tabular-nums

### Spacing
Pick a base (4px or 8px), stick to multiples.
Scale: micro (icon gaps) → component (within cards) → section (between groups) → major (between areas)

### Animation
- Micro-interactions: 150ms
- Modals: 250ms
- Deceleration easing
- GPU-friendly: transform and opacity only
- Respect prefers-reduced-motion

---

## UI Styles (Top 20)

| # | Style | Best For |
|---|-------|----------|
| 1 | Minimalism & Swiss Style | Enterprise apps, dashboards, documentation |
| 2 | Neumorphism | Health/wellness apps, meditation platforms |
| 3 | Glassmorphism | Modern SaaS, financial dashboards |
| 4 | Brutalism | Design portfolios, artistic projects |
| 5 | 3D & Hyperrealism | Gaming, product showcase, immersive |
| 6 | Vibrant & Block-based | Startups, creative agencies, gaming |
| 7 | **Dark Mode (OLED)** | Night-mode apps, coding platforms |
| 8 | Accessible & Ethical | Government, healthcare, education |
| 9 | Claymorphism | Educational apps, children's apps |
| 10 | Aurora UI | Modern SaaS, creative agencies |
| 11 | Retro-Futurism | Gaming, entertainment, music platforms |
| 12 | Flat Design | Web apps, mobile apps, startup MVPs |
| 13 | Skeuomorphism | Legacy apps, gaming, luxury |
| 14 | Liquid Glass | Premium SaaS, high-end e-commerce |
| 15 | Motion-Driven | Portfolio sites, storytelling platforms |
| 16 | Micro-interactions | Mobile apps, touchscreen UIs |
| 17 | Inclusive Design | Public services, education, healthcare |
| 18 | Zero Interface | Voice assistants, AI platforms |
| 19 | Soft UI Evolution | Modern apps with improved contrast |
| 20 | Cyberpunk UI | Gaming, tech brands, artistic projects |

---

## Color Palettes by Industry

| Industry | Primary | Type |
|----------|---------|------|
| Fintech | #2563EB (Blue) | Professional, Trust |
| Healthcare | #059669 (Green) | Calm, Healing |
| E-commerce | #DC2626 (Red) | Urgency, Energy |
| SaaS | #7C3AED (Purple) | Modern, Creative |
| Education | #2563EB (Blue) | Trust, Learning |
| Gaming | #EF4444 (Red) | Energy, Excitement |
| Luxury | #1E293B (Navy) | Premium, Exclusive |
| Startup | #8B5CF6 (Purple) | Innovative, Bold |

---

## Font Pairings

| Pairing | Heading | Body | Mood |
|---------|---------|------|------|
| Classic Professional | Inter | Inter | Clean, Modern |
| Premium Editorial | Playfair Display | Source Sans Pro | Luxury, Trust |
| Modern SaaS | DM Sans | DM Sans | Friendly, Clean |
| Tech/Dev | JetBrains Mono | Inter | Technical, Precise |
| Creative | Fraunces | Plus Jakarta Sans | Warm, Unique |
| Minimal | Cabinet Grotesk | Archivo | Clean, Bold |

---

## WCAG Accessibility Minimums

- Text contrast: 4.5:1 (AA), 7:1 (AAA)
- Touch targets: 44x44px minimum
- Focus-visible: 3-4px ring
- Keyboard navigation: every action
- prefers-reduced-motion respected
