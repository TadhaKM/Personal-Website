/* =============================================================================
   data.js  —  THE ONLY FILE YOU NEED TO EDIT TO UPDATE YOUR PORTFOLIO
   -----------------------------------------------------------------------------
   Everything on the site (hero text, projects, experience, skills, links) is
   read from the PORTFOLIO object below. Edit the values, save, refresh.

   • Add a project        → copy a {...} block inside `projects` and edit it
   • Add a job/role        → copy a {...} block inside `experience`
   • Change skills         → edit the `skills` arrays
   • Reorder anything      → just move the {...} blocks up or down
   • Tags drive the project filter automatically — no extra steps.
============================================================================= */

const PORTFOLIO = {

  /* ---------------------------------------------------------------- IDENTITY */
  identity: {
    name: "Tadhagath Marepalli",
    nameLines: ["Tadhagath", "Marepalli"],   // how the big hero name wraps
    handle: "tadhagath",                       // shown in nav + footer
    status: "available for opportunities",     // little blinking line in hero
    // The rotating typewriter words after "I'm a ___"
    roles: [
      "Computer Science student",
      "AI developer",
      "full-stack builder",
      "open-source contributor",
      "Claude Builder Club secretary",
    ],
    blurb:
      "Third-year CS student at Trinity College Dublin building intelligent, " +
      "well-crafted software — from AI agent platforms to LLM-powered apps. " +
      "I like shipping things that feel inevitable.",
    // Quick stat chips under the hero CTAs
    meta: [
      { label: "based in", value: "Dublin, IE" },
      { label: "studying", value: "cs @ Trinity" },
      { label: "grad", value: "June 2028" },
    ],
    email: "tmarepalli@gmail.com",
    phone: "+353 89 989 1601",
    location: "Dublin, Ireland",
    links: {
      github: "https://github.com/TadhaKM",
      linkedin: "https://www.linkedin.com/in/tadhagath-marepalli-a3260832b",
      // Put your résumé PDF next to index.html and point here, e.g. "assets/resume.pdf"
      resume: "",
    },
  },

  /* ------------------------------------------------------------------- ABOUT */
  about: {
    paragraphs: [
      "I'm a Computer Science student at <strong>Trinity College Dublin</strong> " +
        "who spends most of my time building with AI."
      ,"My favourite work lives where solid engineering meets language models - " +
        "agent orchestration, semantic search, and tools that quietly make hard " +
        "things easy. ",
    ],
    // Faux-terminal lines in the About card. Format: { cmd } prints "$ cmd",
    // { out } prints a result line, { ok } prints a green line.
    terminal: [
      { cmd: "whoami" },
      { out: "tadhagath marepalli — cs student & ai developer" },
      { cmd: "cat focus.txt" },
      { out: "llm integration · agents · full-stack · open source" },
      { cmd: "ls ~/currently" },
      { out: "trinity-college  claude-builder-club  side-projects/" },
      { cmd: "echo $STATUS" },
      { ok: "open to internships & collaborations ✓" },
    ],
    // Little fact tiles below the about grid
    facts: [
      { k: "200+", v: "devs in the community I help run" },
      { k: "7", v: "languages I build in" },
      { k: "∞", v: "ideas in the backlog" },
    ],
  },

  /* -------------------------------------------------------------- EXPERIENCE */
  // type: "work" or "leadership"  (shown as a small label on the node)
  experience: [
    {
      type: "leadership",
      role: "Secretary",
      org: "Claude Builder Club",
      location: "Dublin",
      start: "Jan 2025",
      end: "Present",
      points: [
        "Streamlined meeting scheduling and member comms for a 200-person student AI developer community.",
        "Coordinated and documented weekly build sessions, supporting members shipping AI projects with Claude's API.",
      ],
      tags: ["Community", "AI", "Ops"],
    },
    {
      type: "work",
      role: "Computer Science Exam Corrector",
      org: "The Institute of Education",
      location: "Dublin",
      start: "Sep 2024",
      end: "Present",
      points: [
        "Evaluate and grade Leaving Certificate Computer Science exams (Python + theory) to high accuracy under standardized marking schemes.",
        "Provide structured feedback on code quality, improving student understanding of best practices.",
        "Suggest improvements to teaching and assessment methods based on observed trends.",
      ],
      tags: ["Python", "Teaching", "Assessment"],
    },
    {
      type: "work",
      role: "Guide",
      org: "Sandbox VR",
      location: "Dublin",
      start: "Mar 2025",
      end: "Present",
      points: [
        "Guide guests through VR gameplay, safety, and equipment.",
        "Troubleshoot and resolve technical issues during live VR sessions, ensuring a smooth experience.",
        "Escalate complex system issues via Slack and collaborate with technical teams.",
      ],
      tags: ["Support", "VR", "Troubleshooting"],
    },
  ],

  /* ---------------------------------------------------------------- PROJECTS */
  // Each project: name, year, blurb (short), tags (drive the filter),
  // highlights (bullet list), links (github/demo, optional).
  projects: [
    {
      name: "Flowithm — Runtime Memory for AI Agents",
      year: "2026",
      blurb:
        "A runtime memory layer that turns tribal knowledge buried in Slack, docs and tickets into structured workflows humans can follow and AI agents can execute.",
      tags: ["Python", "FastAPI", "Supabase", "pgvector", "LLM", "Agents"],
      highlights: [
        "Continuously ingests from Slack, Notion, GitHub, Gmail and Intercom, chunking and embedding content with SHA-256 dedup per org.",
        "Extracts real workflow specs — triggers, ordered steps, owners, decision rules and approvals — not just summaries.",
        "Exposes a public Agent API: `/skills/match` tells an agent how to act, `/skills/check` is a fail-closed guardrail on whether it may.",
        "Stays honest with background loops for drift detection and staleness flagging so agents escalate instead of acting on stale process.",
      ],
      links: { github: "https://github.com/TadhaKM/Flowithm", demo: "https://flowithm.vercel.app" },
      featured: true,
    },
    {
      name: "TCD Tickets — Event Ticketing Platform",
      year: "2025",
      blurb:
        "A production-quality full-stack ticketing platform for Trinity College societies covering the full lifecycle: discovery, booking, payment, check-in and analytics.",
      tags: ["Next.js", "TypeScript", "Stripe", "Mapbox", "LLM"],
      highlights: [
        "Built the complete event lifecycle with Next.js + TypeScript: discovery, booking, QR check-in, organiser analytics and an admin panel.",
        "Integrated a Claude-powered event assistant with tool-calls for natural-language event search and booking.",
        "Implemented Stripe payments (card, Apple/Google Pay), coupons, full/partial refunds, waitlists and ticket transfer.",
        "Added role-based auth, an interactive Mapbox campus map, SEO metadata and social sharing per event.",
      ],
      links: { github: "https://github.com/TadhaKM/Trinity-Booking-System", demo: "https://trinity-booking-system.vercel.app/" },
      featured: true,
    },
    {
      name: "IBM MCP Context Forge",
      year: "2025",
      blurb:
        "Open-source contributions to IBM's MCP conversational gateway — a semantic search system and a DAG-based agent orchestration engine.",
      tags: ["Python", "FastAPI", "GraphQL", "SQLAlchemy", "Open Source"],
      highlights: [
        "Designed a semantic search system using embeddings + multi-provider LLM APIs, improving tool discovery and retrieval accuracy.",
        "Built an agent orchestration engine with DAG-based workflows for modular multi-step task execution across services.",
        "Achieved 92.9% test coverage.",
        "Developed real-time analytics and anomaly-detection pipelines with dashboards and alerting.",
      ],
      links: { github: "https://github.com/TadhaKM/context-forge-contribution", demo: "" },
      featured: true,
    },
    {
      name: "Redio — Repo-to-Walkthrough Video",
      year: "2026",
      blurb:
        "Turns any public GitHub repo into a short narrated onboarding walkthrough — spoken script, talking-avatar video per section, architecture diagram and a chat grounded in the code. Built at a Cursor hackathon.",
      tags: ["React", "Node", "FastAPI", "Claude", "HeyGen", "RAG"],
      highlights: [
        "Ingests a repo from the GitHub API into a token-budgeted JSON snapshot (file tree, README, key files, commits).",
        "Uses Claude (sonnet-5) to produce an architecture summary, a sectioned narration script and a Mermaid diagram.",
        "Renders each section into a HeyGen talking-avatar video and the diagram to a PNG via Kroki.",
        "Ships a BM25 RAG chat box that answers questions grounded in the repo's actual code.",
      ],
      links: { github: "https://github.com/TadhaKM/cursor-hackathon", demo: "https://rediio.netlify.app/" },
      featured: true,
    },
    {
      name: "Recall — AI Memory Notes App",
      year: "2025",
      blurb:
        "An Android notes app built on one idea: information should fade by default, and only ideas that prove their value earn permanence. Capture anything; AI organises it; the right notes resurface at the right time.",
      tags: ["Kotlin", "Jetpack Compose", "Supabase", "Claude API", "ML Kit"],
      highlights: [
        "Multi-modal capture: text with auto-save, voice recording with transcription, and camera OCR via ML Kit.",
        "An LLM pipeline (Claude Haiku) auto-classifies notes into tasks, ideas, references, journal entries, questions and quotes.",
        "Adaptive memory-decay: notes resurface by relevance, recency and interaction — ideas get boosted after 21 days to incubate.",
        "Semantic search over pgvector embeddings alongside full-text search.",
      ],
      links: { github: "https://github.com/TadhaKM/Memory-App", demo: "" },
      featured: true,
    },
    {
      name: "ClearMoney — Budget Tracker",
      year: "2026",
      blurb:
        "A full-stack personal-finance app with open-banking sync, automatic transaction categorisation, budgets and spending insights.",
      tags: ["TypeScript", "Fastify", "Prisma", "Open Banking", "BullMQ"],
      highlights: [
        "Monorepo API on Fastify + Prisma with encrypted credential storage, OAuth account linking and webhook sync.",
        "Background job workers for account sync, budget alerts and weekly summaries via a queue/scheduler.",
        "Merchant normalisation and recurring-payment detection to clean up raw bank feeds automatically.",
        "Analytics and insights endpoints powering budgets, categories and spending breakdowns.",
      ],
      links: { github: "https://github.com/TadhaKM/Budget-Tracker", demo: "" },
      featured: false,
    },
    {
      name: "My Health Buddy",
      year: "2026",
      blurb:
        "A health simulator that projects how your habits affect your body over time, visualised on an interactive 3D anatomical model.",
      tags: ["Next.js", "TypeScript", "Three.js", "LLM"],
      highlights: [
        "Interactive 3D body visualisation with anatomical models (neurology, angiology, splanchnology) rendered in the browser.",
        "Parses free-text habits into structured inputs and simulates their impact on a health score over time.",
        "AI summary card plus KPI strip, progress bars and an exportable health-report PDF.",
        "Built on Next.js with a habit selector, demographics input and health-data connector.",
      ],
      links: { github: "https://github.com/TadhaKM/My-Health-Buddy", demo: "" },
      featured: false,
    },
    {
      name: "pmbot — Prediction Market Trading Bot",
      year: "2026",
      blurb:
        "A production-style bot for trading on Polymarket and Kalshi — paper-trading by default, with Kelly-criterion sizing, risk gates and structured logging.",
      tags: ["Python", "Pydantic", "Typer", "Quant"],
      highlights: [
        "Modular pipeline: market scanners → probability/category filters → news-sentiment research → predictor → risk gates → executor.",
        "Kelly-criterion position sizing with configurable risk limits and a paper executor (live stubs).",
        "YAML config with env-var overrides, pydantic validation and a pre-flight config checker.",
        "A learning layer logs predictions and tracks performance, with backtest tooling over trade logs.",
      ],
      links: { github: "https://github.com/TadhaKM/StockBot", demo: "" },
      featured: false,
    },
    {
      name: "PolicyPal — Insurance Policy Analysis",
      year: "2025",
      blurb:
        "AI-powered insurance analysis that makes your coverage crystal clear — upload a policy PDF and get a coverage breakdown, gaps, exclusions and next steps. Built for a Tech Ireland event.",
      tags: ["JavaScript", "Claude API", "Chart.js", "PDF.js", "Vercel"],
      highlights: [
        "Client-side PDF parsing (PDF.js) feeding a Claude-powered analysis of coverage, limits and exclusions.",
        "Interactive dashboard with Chart.js: coverage breakdown, location-based risk assessment and gap detection.",
        "Generates prioritised recommended actions and smart questions to ask your broker.",
        "No signup required, with a demo mode; deployed on Vercel serverless functions.",
      ],
      links: { github: "https://github.com/TadhaKM/PolicyPal-TechIreland", demo: "https://policy-pal-tech-ireland.vercel.app" },
      featured: false,
    },
    {
      name: "AI Assignment Grader",
      year: "2026",
      blurb:
        "An AI web app that grades assignments across many subjects against custom rubrics and returns detailed, constructive feedback.",
      tags: ["JavaScript", "Claude API", "Express", "Helmet"],
      highlights: [
        "Grades programming, maths, science, essays, history and more, with multiple assessment types and customisable rubrics.",
        "Image upload for handwritten work, diagrams or artwork analysed by Claude's vision.",
        "Security-hardened: IP rate limiting, schema-based input validation, Helmet CSP headers and sanitised errors.",
        "Returns specific, actionable feedback on strengths and areas to improve.",
      ],
      links: { github: "https://github.com/TadhaKM/Assignment-Grader", demo: "" },
      featured: false,
    },
    {
      name: "ELI5 — Explain Like I'm Five",
      year: "2026",
      blurb:
        "A chatbot that explains anything at your level — from 'like I'm 5' to full detail — with re-explain and real-world-example shortcuts.",
      tags: ["React", "Vite", "OpenAI API"],
      highlights: [
        "Age-based explanation levels (5 / 10 / 15 / normal) that reshape the answer's depth and vocabulary.",
        "Interactive chat with 'even simpler' and 'give example' buttons plus suggested starter questions.",
        "React 18 + Vite front end; the API key stays in the browser only.",
      ],
      links: { github: "https://github.com/TadhaKM/Explain-App", demo: "" },
      featured: false,
    },
    {
      name: "Odeon Dublin Movie Tracker",
      year: "2025",
      blurb:
        "A tool that scrapes Odeon Dublin cinemas and notifies you when a movie you want becomes bookable at your chosen location.",
      tags: ["Node", "Express", "Cheerio", "Vue", "node-cron"],
      highlights: [
        "Scrapes Odeon Dublin showtimes with Axios + Cheerio and checks tracked movies every 30 minutes via node-cron.",
        "Track multiple movies across cinemas with real-time availability notifications and manual on-demand search.",
        "Vue 3 interface with persistent JSON storage for tracked movies and notifications.",
      ],
      links: { github: "https://github.com/TadhaKM/CinemaBookings-Scraper", demo: "" },
      featured: false,
    },
    {
      name: "Todo App",
      year: "2025",
      blurb:
        "A clean, responsive todo list built with React and Vite — add, edit, complete and delete tasks with an optional due date.",
      tags: ["React", "Vite", "JavaScript"],
      highlights: [
        "Full CRUD task management with a minimal, responsive UI.",
        "Optional due-date and time picker per task.",
        "Built with React + Vite as a focused front-end exercise.",
      ],
      links: { github: "https://github.com/TadhaKM/todo-app", demo: "" },
      featured: false,
    },
  ],

  /* ------------------------------------------------------------------ SKILLS */
  skills: [
    {
      group: "Languages",
      items: ["Python", "TypeScript", "JavaScript", "Java", "Kotlin", "C", "VHDL"],
    },
    {
      group: "Frameworks & Tools",
      items: ["React", "Next.js", "FastAPI", "GraphQL", "Jetpack Compose", "MySQL", "Supabase", "Git"],
    },
    {
      group: "Concepts",
      items: ["LLM Integration", "AI Agents", "REST APIs", "Authentication", "Distributed Systems", "Semantic Search"],
    },
    {
      group: "Coursework",
      items: ["Data Structures & Algorithms", "Discrete Mathematics", "Applied Probability", "Concurrent & Operating Systems", "Microprocessor Systems"],
    },
  ],

  /* ----------------------------------------------------------------- CONTACT */
  contact: {
    blurb:
      "I'm always up for interesting problems or to just talk" +
      "about AI and good software!. The fastest way to reach me is email.",
  },

  /* -------------------------------------------------------------------- MISC */
  footerNote: "",
};

// makes the data available to the rest of the site — don't remove this line
window.PORTFOLIO = PORTFOLIO;
