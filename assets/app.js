/* =============================================================================
   app.js  —  orchestrator
   Renders the page from PORTFOLIO (data.js) and wires all interactivity.
============================================================================= */
(function () {
  "use strict";
  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ----------------------------------------------------------- ICONS */
  const ICON = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.4.5 0 5.9 0 12.6c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C24 5.9 18.6.5 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-.9-.8-1.7-1.8-1.7z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  };

  /* ===================================================== RENDER: HERO */
  function renderHero() {
    const id = D.identity;
    $("#nav-name").textContent = id.handle;
    $("#hero-status").textContent = id.status;
    $("#hero-name").innerHTML = id.nameLines.map(esc).join("<br>");
    $("#hero-blurb").textContent = id.blurb;
    document.title = `${id.name} — AI Developer`;

    $("#hero-meta").innerHTML = id.meta.map((m) =>
      `<div class="hero__meta-item"><span class="k">${esc(m.label)}</span><span class="v">${esc(m.value)}</span></div>`
    ).join("");

    FX.typewriter($("#typewriter"), id.roles);
  }

  /* ==================================================== RENDER: ABOUT */
  function renderAbout() {
    $("#about-text").innerHTML = D.about.paragraphs.map((p) => `<p>${p}</p>`).join("");
    $("#about-facts").innerHTML = D.about.facts.map((f, i) =>
      `<div class="fact reveal" style="--delay:${i * 80}ms"><div class="fact__k">${esc(f.k)}</div><div class="fact__v">${esc(f.v)}</div></div>`
    ).join("");
    // terminal types when scrolled into view
    const term = $("#term-body");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { FX.typeTerminal(term, D.about.terminal); io.disconnect(); }
      });
    }, { threshold: 0.4 });
    io.observe(term);
  }

  /* =============================================== RENDER: EXPERIENCE */
  function renderExperience() {
    $("#timeline").innerHTML = D.experience.map((e, i) => `
      <div class="tl-item reveal" style="--delay:${i * 90}ms">
        <div class="tl-card">
          <span class="tl-type ${e.type}">${e.type === "leadership" ? "leadership" : "work"}</span>
          <div class="tl-top">
            <div>
              <span class="tl-role">${esc(e.role)}</span>
              <span class="tl-org"> · ${esc(e.org)}</span>
            </div>
            <span class="tl-when">${esc(e.start)} → ${esc(e.end)} · ${esc(e.location)}</span>
          </div>
          <ul class="tl-points">${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          ${e.tags ? `<div class="tl-tags">${e.tags.map((t) => `<span class="tag-mini">${esc(t)}</span>`).join("")}</div>` : ""}
        </div>
      </div>`).join("");
  }

  /* ================================================= RENDER: PROJECTS */
  function renderProjects() {
    // filters
    const allTags = [...new Set(D.projects.flatMap((p) => p.tags))];
    $("#filters").innerHTML =
      `<button class="filter-chip active" data-filter="*" data-cursor>all</button>` +
      allTags.map((t) => `<button class="filter-chip" data-filter="${esc(t)}" data-cursor>${esc(t)}</button>`).join("");

    // cards
    $("#projects-grid").innerHTML = D.projects.map((p, i) => {
      const links = [];
      if (p.links && p.links.github) links.push(`<a class="proj__link" href="${esc(p.links.github)}" target="_blank" rel="noopener" data-cursor aria-label="GitHub repo">${ICON.github}</a>`);
      if (p.links && p.links.demo) links.push(`<a class="proj__link" href="${esc(p.links.demo)}" target="_blank" rel="noopener" data-cursor aria-label="Live demo">${ICON.external}</a>`);
      return `
      <article class="proj reveal ${p.featured ? "featured-flag" : ""}" data-tags="${esc(p.tags.join("|"))}" data-tilt style="--delay:${i * 70}ms">
        <div class="proj__head">
          <span class="proj__num">0${i + 1}</span>
          <span class="proj__year">${esc(p.year)}</span>
        </div>
        <h3 class="proj__name">${esc(p.name)}</h3>
        <p class="proj__blurb">${esc(p.blurb)}</p>
        <ul class="proj__highlights">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
        <div class="proj__tags">${p.tags.map((t) => `<span class="tag-mini">${esc(t)}</span>`).join("")}</div>
        <div class="proj__footer">
          <button class="proj__toggle" data-cursor><span class="chev">▸</span> <span class="proj__toggle-label">details</span></button>
          <div class="proj__links">${links.join("")}</div>
        </div>
      </article>`;
    }).join("");

    // toggle details
    $$(".proj__toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".proj");
        card.classList.toggle("open");
        btn.querySelector(".proj__toggle-label").textContent = card.classList.contains("open") ? "hide" : "details";
      });
    });

    // filtering
    $$(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        $$(".filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        const f = chip.dataset.filter;
        $$(".proj").forEach((card) => {
          const match = f === "*" || card.dataset.tags.split("|").includes(f);
          card.classList.toggle("hide", !match);
        });
      });
    });
  }

  /* =================================================== RENDER: SKILLS */
  function renderSkills() {
    $("#skills-grid").innerHTML = D.skills.map((g, i) => `
      <div class="skill-group reveal" style="--delay:${i * 80}ms">
        <div class="skill-group__title">${esc(g.group)}</div>
        <div class="skill-chips">${g.items.map((s) => `<span class="chip" data-cursor>${esc(s)}</span>`).join("")}</div>
      </div>`).join("");
  }

  /* ================================================== RENDER: CONTACT */
  function renderContact() {
    const id = D.identity;
    $("#contact-blurb").textContent = D.contact.blurb;
    const acts = [];
    acts.push(`<a class="btn btn--primary magnetic" href="mailto:${esc(id.email)}" data-cursor>${ICON.mail} Email me</a>`);
    if (id.links.github) acts.push(`<a class="btn btn--ghost magnetic" href="${esc(id.links.github)}" target="_blank" rel="noopener" data-cursor>${ICON.github} GitHub</a>`);
    if (id.links.linkedin) acts.push(`<a class="btn btn--ghost magnetic" href="${esc(id.links.linkedin)}" target="_blank" rel="noopener" data-cursor>${ICON.linkedin} LinkedIn</a>`);
    if (id.links.resume) acts.push(`<a class="btn btn--ghost magnetic" href="${esc(id.links.resume)}" target="_blank" rel="noopener" data-cursor>${ICON.doc} Résumé</a>`);
    $("#contact-actions").innerHTML = acts.join("");
    $("#footer-note").textContent = D.footerNote || "";
  }

  /* ============================================== SCROLL / REVEAL / NAV */
  function initScroll() {
    const nav = $("#nav");
    const prog = $("#scroll-progress");
    const onScroll = () => {
      nav.classList.toggle("scrolled", scrollY > 30);
      const h = document.documentElement.scrollHeight - innerHeight;
      prog.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // reveal
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el) => ro.observe(el));

    // active nav link
    const sections = $$("main section[id]");
    const navLinks = $$(".nav__links a");
    const so = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
        }
      });
    }, { threshold: 0.5 });
    sections.forEach((s) => so.observe(s));
  }

  /* ----------------------------------------------------- MOBILE MENU */
  function initMenu() {
    const nav = $("#nav");
    $("#nav-burger").addEventListener("click", () => nav.classList.toggle("menu-open"));
    $$(".nav__links a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("menu-open")));
  }

  /* =================================================== ACCENT SWITCHER */
  const ACCENTS = [
    { name: "Lavender", accent: "#5e6ad2", bright: "#8b95ff" },
    { name: "Emerald", accent: "#21a179", bright: "#46e3a8" },
    { name: "Amber", accent: "#cf8434", bright: "#ffb35c" },
    { name: "Rose", accent: "#d6517a", bright: "#ff7d9c" },
    { name: "Cyan", accent: "#2f97c9", bright: "#5fc7ff" },
  ];
  function hexRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function setAccent(a, announce) {
    const r = document.documentElement.style;
    const rgb = hexRgb(a.accent);
    r.setProperty("--accent", a.accent);
    r.setProperty("--accent-bright", a.bright);
    r.setProperty("--accent-glow", `rgba(${rgb.join(",")},0.30)`);
    r.setProperty("--accent-soft", `rgba(${rgb.join(",")},0.12)`);
    localStorage.setItem("accent", a.name);
    if (announce) FX.toast(`accent → ${a.name.toLowerCase()}`);
  }
  function restoreAccent() {
    const saved = ACCENTS.find((a) => a.name === localStorage.getItem("accent"));
    if (saved) setAccent(saved, false);
  }

  /* ==================================================== COMMAND PALETTE */
  const palette = $("#palette");
  const pInput = $("#palette-input");
  const pList = $("#palette-list");
  let cmds = [], filtered = [], active = 0;

  function buildCommands() {
    const id = D.identity;
    const go = (sel) => () => { closePalette(); $(sel).scrollIntoView({ behavior: "smooth" }); };
    cmds = [
      { cat: "go", title: "Home", sub: "back to top", icon: "⌂", run: go("#home") },
      { cat: "go", title: "About", sub: "who I am", icon: "◍", run: go("#about") },
      { cat: "go", title: "Experience", sub: "work & leadership", icon: "▤", run: go("#experience") },
      { cat: "go", title: "Projects", sub: "things I've built", icon: "◈", run: go("#projects") },
      { cat: "go", title: "Skills", sub: "languages & tools", icon: "✦", run: go("#skills") },
      { cat: "go", title: "Contact", sub: "let's talk", icon: "✉", run: go("#contact") },
      { cat: "open", title: "Copy email", sub: id.email, icon: "⧉", run: () => { navigator.clipboard?.writeText(id.email); closePalette(); FX.toast("email copied ✓"); } },
      { cat: "open", title: "Email me", sub: id.email, icon: "✉", run: () => { location.href = "mailto:" + id.email; } },
    ];
    if (id.links.github) cmds.push({ cat: "open", title: "GitHub", sub: id.links.github.replace(/^https?:\/\//, ""), icon: "◆", run: () => open(id.links.github, "_blank") });
    if (id.links.linkedin) cmds.push({ cat: "open", title: "LinkedIn", sub: "professional profile", icon: "in", run: () => open(id.links.linkedin, "_blank") });
    if (id.links.resume) cmds.push({ cat: "open", title: "Résumé", sub: "download PDF", icon: "▦", run: () => open(id.links.resume, "_blank") });
    cmds.push({ cat: "play", title: "Play Commit Snake", sub: "a little mini-game", icon: "▸", run: () => { closePalette(); Game.open(); } });
    cmds.push({ cat: "play", title: "Matrix rain", sub: "wake up, neo…", icon: "⚡", run: () => { closePalette(); FX.matrixRain(); } });
    ACCENTS.forEach((a) => cmds.push({ cat: "theme", title: `Accent: ${a.name}`, sub: "change brand color", icon: "●", run: () => { setAccent(a, true); }, swatch: a.bright }));
    cmds.push({ cat: "theme", title: "Surprise me", sub: "random accent", icon: "✲", run: () => { setAccent(ACCENTS[(Math.random() * ACCENTS.length) | 0], true); } });
  }

  function fuzzy(q, text) {
    q = q.toLowerCase(); text = text.toLowerCase();
    if (!q) return true;
    let i = 0;
    for (const ch of text) { if (ch === q[i]) i++; if (i === q.length) return true; }
    return text.includes(q);
  }

  function renderPalette() {
    const q = pInput.value.trim();
    filtered = cmds.filter((c) => fuzzy(q, c.title + " " + c.sub + " " + c.cat));
    active = 0;
    if (!filtered.length) { pList.innerHTML = `<li class="palette__empty">no matches for “${esc(q)}”</li>`; return; }
    pList.innerHTML = filtered.map((c, i) => `
      <li class="palette__item ${i === 0 ? "active" : ""}" data-i="${i}">
        <span class="palette__item-ico" ${c.swatch ? `style="color:${c.swatch}"` : ""}>${esc(c.icon)}</span>
        <span class="palette__item-body">
          <span class="palette__item-title">${esc(c.title)}</span>
          <span class="palette__item-sub">${esc(c.sub)}</span>
        </span>
        <span class="palette__item-cat">${esc(c.cat)}</span>
      </li>`).join("");
    $$(".palette__item", pList).forEach((li) => {
      li.addEventListener("mouseenter", () => setActive(+li.dataset.i));
      li.addEventListener("click", () => filtered[+li.dataset.i].run());
    });
  }
  function setActive(i) {
    active = i;
    $$(".palette__item", pList).forEach((li, k) => li.classList.toggle("active", k === i));
    const el = $$(".palette__item", pList)[i];
    el && el.scrollIntoView({ block: "nearest" });
  }
  function openPalette() {
    palette.classList.add("open"); palette.setAttribute("aria-hidden", "false");
    pInput.value = ""; renderPalette(); setTimeout(() => pInput.focus(), 30);
  }
  function closePalette() {
    palette.classList.remove("open"); palette.setAttribute("aria-hidden", "true");
  }

  function initPalette() {
    buildCommands();
    $("#palette-trigger").addEventListener("click", openPalette);
    $$("[data-palette-close]").forEach((el) => el.addEventListener("click", closePalette));
    pInput.addEventListener("input", renderPalette);

    addEventListener("keydown", (e) => {
      // global open
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); palette.classList.contains("open") ? closePalette() : openPalette(); return; }
      if (!palette.classList.contains("open")) return;
      if (e.key === "Escape") { closePalette(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setActive(Math.min(active + 1, filtered.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(Math.max(active - 1, 0)); }
      else if (e.key === "Enter") { e.preventDefault(); filtered[active] && filtered[active].run(); }
    });
  }

  /* ======================================================= GAME WIRING */
  function initGame() {
    $$("[data-game-close]").forEach((el) => el.addEventListener("click", () => Game.close()));
    $("#open-snake").addEventListener("click", () => Game.open());
    addEventListener("keydown", (e) => { if (e.key === "Escape" && Game.isOpen()) Game.close(); });
  }

  /* ===================================================== EASTER EGGS */
  function initEggs() {
    FX.initKonami(() => FX.matrixRain());
    $("#konami-hint").addEventListener("click", () => {
      FX.toast("↑ ↑ ↓ ↓ ← → ← → b a");
    });
    // console message
    const id = D.identity;
    console.log("%c👋 hey, curious dev.", "color:#8b95ff;font-size:18px;font-weight:bold");
    console.log("%cYou found the console. Try the Konami code (↑↑↓↓←→←→ba) on the page, or press ⌘K.", "color:#8a8f98;font-size:13px");
    console.log(`%c→ ${id.links.github}`, "color:#8b95ff;font-size:13px");
  }

  /* =============================================================== INIT */
  function render() {
    renderHero(); renderAbout(); renderExperience();
    renderProjects(); renderSkills(); renderContact();
  }

  document.addEventListener("DOMContentLoaded", () => {
    restoreAccent();
    render();
    FX.initCursor();
    FX.initConstellation();
    FX.initHeroGlow();
    FX.initMagnetic();
    FX.initTilt();
    initScroll();
    initMenu();
    initPalette();
    initGame();
    initEggs();
    // boot last so DOM is ready underneath it
    FX.runBoot();
  });
})();
