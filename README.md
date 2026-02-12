# ⚡ AgentStack — The Definitive AI Agent Directory

> Discover, compare, and deploy the best AI agents. 42 agents across 9 categories.

![AgentStack](https://img.shields.io/badge/agents-42-a78bfa?style=for-the-badge) ![Categories](https://img.shields.io/badge/categories-9-06b6d4?style=for-the-badge) ![Tests](https://img.shields.io/badge/tests-110%20passing-34d399?style=for-the-badge)

## 🚀 What is AgentStack?

AgentStack is a curated directory of AI agents — both commercial and open source — designed to help developers, founders, and teams discover the right autonomous AI tools for their use case.

### Features
- **42 AI Agents** — curated listings with ratings, pricing, and tags
- **9 Categories** — Coding, Support, Sales, Marketing, Research, Assistants, Automation, Data, Open Source
- **18 Open-Source Agents** — AutoGPT, LangChain, MetaGPT, SWE-Agent, Aider, and more
- **Instant Search** — real-time filtering by name, company, tags, or category (⌘K shortcut)
- **Agent Detail Modals** — full descriptions, metadata, and website links
- **Submit Your Agent** — listing form with free, featured ($49/mo), and premium ($149/mo) tiers
- **Premium UI** — dark glassmorphism design with animated gradients and scroll reveals
- **SEO Optimized** — JSON-LD structured data, Open Graph, sitemap, robots.txt
- **110 E2E Tests** — comprehensive Playwright test suite
- **Deploy Anywhere** — Vercel & Netlify configs included

## 📁 Project Structure

```
├── index.html              # Main page (SPA)
├── css/style.css           # Premium dark UI (734 lines)
├── js/app.js               # All interactivity (399 lines)
├── data/agents.js          # 42 agents + 9 categories
├── tests/e2e/
│   └── agentstack.spec.js  # 110 Playwright E2E tests
├── playwright.config.js    # Test configuration
├── package.json            # Scripts & dependencies
├── vercel.json             # Vercel deployment config
├── netlify.toml            # Netlify deployment config
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Crawler directives
└── .gitignore              # Git ignore rules
```

## 🛠 Getting Started

### Prerequisites
- Node.js 18+

### Install & Run

```bash
# Install dependencies
npm install

# Start development server (port 4000)
npm run dev

# Or production server (port 3000)
npm start
```

Open [http://localhost:4000](http://localhost:4000) in your browser.

### Run Tests

```bash
# Run all 110 E2E tests
npm test

# Run with browser visible
npm run test:headed

# Run with Playwright UI
npm run test:ui

# View test report
npm run test:report
```

## 🌐 Deployment

### Vercel
```bash
# Deploy to Vercel (zero config needed)
npx vercel
```

### Netlify
```bash
# Deploy to Netlify
npx netlify deploy --prod
```

Both platforms will use the included config files (`vercel.json` / `netlify.toml`) with proper rewrites and security headers.

## 💰 Business Model

| Tier | Price | Features |
|------|-------|----------|
| **Basic** | Free | Listing, category, website link, 4 tags |
| **Featured** | $49/mo | ⚡ Badge, homepage spotlight, analytics, 8 tags |
| **Premium** | $149/mo | 🏆 Badge, top of search, lead capture, social promo |

## 🧪 Tech Stack

- **Frontend:** Pure HTML, CSS, JavaScript (no framework)
- **Fonts:** Inter + JetBrains Mono (Google Fonts)
- **Design:** Glassmorphism, CSS Grid, CSS custom properties, animated gradients
- **Testing:** Playwright (Chromium)
- **Deployment:** Vercel / Netlify (static site)

## 📊 Agent Categories

| Category | Count | Description |
|----------|-------|-------------|
| 💻 Coding | 7 | AI agents that write, review, and deploy code |
| 🎧 Customer Support | 3 | AI agents that handle tickets and conversations |
| 📈 Sales & Outreach | 3 | AI SDRs, prospecting, and deal-closing |
| 📣 Marketing | 3 | AI agents for content, campaigns, and growth |
| 🔬 Research | 4 | AI agents that research and synthesize information |
| 🤖 Personal Assistants | 5 | AI agents for personal productivity |
| ⚡ Workflow Automation | 4 | AI agents that automate business workflows |
| 📊 Data & Knowledge | 3 | AI agents for data processing and knowledge |
| 🔓 Open Source | 18 | Free, community-driven AI agents and frameworks |

## 📄 License

Proprietary. All rights reserved.
