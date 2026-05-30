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
      "Second-year CS student at Trinity College Dublin building intelligent, " +
      "well-crafted software — from AI agent platforms to LLM-powered apps. " +
      "I like shipping things that feel inevitable.",
    // Quick stat chips under the hero CTAs
    meta: [
      { label: "based in", value: "Dublin, IE" },
      { label: "studying", value: "CS @ Trinity" },
      { label: "grad", value: "Jan 2028" },
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
        "(graduating Jan 2028) who spends most of his time building with AI. As " +
        "secretary of the <strong>Claude Builder Club</strong>, I help a 200-person " +
        "student community ship real AI projects.",
      "My favourite work lives where solid engineering meets language models — " +
        "agent orchestration, semantic search, and tools that quietly make hard " +
        "things easy. I've contributed to open source (IBM's MCP Context Forge), " +
        "built full-stack platforms, and shipped a mobile app with an adaptive " +
        "memory system.",
      "Outside the editor I correct Leaving Cert CS exams and guide people through " +
        "VR worlds at Sandbox VR — both are really just debugging in disguise.",
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
      { k: "92.9%", v: "test coverage on my agent engine" },
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
      name: "AI-Powered Event Ticketing Platform",
      year: "2025",
      blurb:
        "A full-stack ticketing platform for Trinity College societies with an AI chatbot that searches and books events in natural language.",
      tags: ["Next.js", "TypeScript", "Stripe", "LLM"],
      highlights: [
        "Built a full-stack event ticketing platform for TCD societies with Next.js + TypeScript.",
        "Integrated an AI chatbot with tool-use for natural-language event search and booking.",
        "Implemented Stripe payments, QR-based check-in, and real-time organiser analytics dashboards.",
        "Designed secure role-based access control and ensured GDPR compliance.",
      ],
      links: { github: "https://github.com/TadhaKM", demo: "" },
      featured: true,
    },
    {
      name: "IBM MCP Context Forge",
      year: "2025",
      blurb:
        "Open-source contributions to IBM's MCP gateway — a semantic search system and a DAG-based agent orchestration engine.",
      tags: ["Python", "FastAPI", "GraphQL", "SQLAlchemy", "Open Source"],
      highlights: [
        "Designed a semantic search system using embeddings + multi-provider LLM APIs, improving tool discovery and retrieval accuracy.",
        "Built an agent orchestration engine with DAG-based workflows for modular multi-step task execution across services.",
        "Achieved 92.9% test coverage.",
        "Developed real-time analytics and anomaly-detection pipelines with dashboards and alerting.",
      ],
      links: { github: "https://github.com/IBM/mcp-context-forge", demo: "" },
      featured: true,
    },
    {
      name: "AI Memory Notes App",
      year: "2025",
      blurb:
        "An Android notes app with multi-modal capture and an adaptive memory system that resurfaces notes by relevance, recency and use.",
      tags: ["Kotlin", "Jetpack Compose", "Supabase", "Claude API"],
      highlights: [
        "Built an Android app with multi-modal capture: text, voice recording, and camera OCR via ML Kit.",
        "Automatic AI classification into note types (tasks, ideas, references, journal entries).",
        "Adaptive memory-decay system: notes dynamically resurface based on relevance scoring, recency, and interaction patterns.",
        "Semantic search using pgvector embeddings alongside full-text search.",
      ],
      links: { github: "https://github.com/TadhaKM", demo: "" },
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
      "I'm always up for interesting problems, internships, or just talking shop " +
      "about AI and good software. The fastest way to reach me is email.",
  },

  /* -------------------------------------------------------------------- MISC */
  footerNote: "designed & built from scratch — no templates",
};

// makes the data available to the rest of the site — don't remove this line
window.PORTFOLIO = PORTFOLIO;
