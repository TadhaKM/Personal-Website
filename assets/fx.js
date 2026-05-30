/* =============================================================================
   fx.js  —  visual effects engine
   custom cursor · constellation · boot sequence · matrix rain · tilt · toast
   Exposed as window.FX
============================================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const FX = {};

  /* ----------------------------------------------------------- TOAST */
  let toastTimer;
  FX.toast = function (msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  };

  /* ----------------------------------------------------- CUSTOM CURSOR */
  FX.initCursor = function () {
    if (!fine) return;
    document.body.classList.add("has-cursor");
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    let mx = innerWidth / 2, my = innerHeight / 2;
    let rx = mx, ry = my;

    addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      document.body.classList.add("cursor-active");
    });
    addEventListener("mousedown", () => ring.classList.add("clicking"));
    addEventListener("mouseup", () => ring.classList.remove("clicking"));
    addEventListener("mouseleave", () => document.body.classList.remove("cursor-active"));

    // hover-grow on interactive elements (event delegation)
    const interactive = "a, button, .chip, .filter-chip, [data-cursor], input";
    addEventListener("mouseover", (e) => { if (e.target.closest(interactive)) ring.classList.add("hovering"); });
    addEventListener("mouseout", (e) => { if (e.target.closest(interactive)) ring.classList.remove("hovering"); });

    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
  };

  /* --------------------------------------------------- MAGNETIC BUTTONS */
  FX.initMagnetic = function () {
    if (!fine || reduceMotion) return;
    document.querySelectorAll(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  };

  /* ------------------------------------------------------- 3D CARD TILT */
  FX.initTilt = function () {
    if (!fine || reduceMotion) return;
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.transform =
          `perspective(900px) rotateY(${(px - 0.5) * 9}deg) rotateX(${(0.5 - py) * 9}deg) translateY(-4px)`;
        card.style.setProperty("--mx", px * 100 + "%");
        card.style.setProperty("--my", py * 100 + "%");
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  };

  /* ------------------------------------------------ HERO GLOW FOLLOW */
  FX.initHeroGlow = function () {
    const glow = document.getElementById("hero-glow");
    const hero = document.getElementById("home");
    if (!glow || !hero || !fine) return;
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      glow.style.left = e.clientX - r.left + "px";
      glow.style.top = e.clientY - r.top + "px";
      glow.style.opacity = "0.8";
    });
    hero.addEventListener("mouseleave", () => { glow.style.opacity = "0.4"; });
  };

  /* ------------------------------------------------- CONSTELLATION BG */
  FX.initConstellation = function () {
    const canvas = document.getElementById("constellation");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, points = [], mouse = { x: -999, y: -999 };
    const COUNT = reduceMotion ? 28 : Math.min(90, Math.floor(innerWidth / 18));

    function accentRGB() {
      const c = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      // expects #rrggbb
      const m = c.match(/^#?([0-9a-f]{6})$/i);
      if (!m) return [94, 106, 210];
      const n = parseInt(m[1], 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    let rgb = accentRGB();

    function resize() {
      const r = canvas.getBoundingClientRect();
      w = canvas.width = r.width * devicePixelRatio;
      h = canvas.height = r.height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      w = r.width; h = r.height;
    }
    function seed() {
      points = [];
      for (let i = 0; i < COUNT; i++) {
        points.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
        });
      }
    }
    function step() {
      ctx.clearRect(0, 0, w, h);
      rgb = accentRGB();
      for (const p of points) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        // mouse repel
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 130) { p.x += dx / d * 1.4; p.y += dy / d * 1.4; }
      }
      // links
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${(1 - d / 130) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // dots
      for (const p of points) {
        const near = Math.hypot(p.x - mouse.x, p.y - mouse.y) < 130;
        ctx.fillStyle = near
          ? `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.9)`
          : `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.45)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, near ? 2.6 : 1.6, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(step);
    }

    resize(); seed();
    addEventListener("resize", () => { resize(); seed(); });
    const hero = document.getElementById("home");
    hero.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener("mouseleave", () => { mouse.x = -999; mouse.y = -999; });
    step();
  };

  /* ------------------------------------------------------ BOOT SEQUENCE */
  FX.runBoot = function (done) {
    const boot = document.getElementById("boot");
    const log = document.getElementById("boot-log");
    const fill = document.getElementById("boot-fill");
    const skip = document.getElementById("boot-skip");

    // play once per browser session
    const seen = sessionStorage.getItem("booted");
    if (seen || reduceMotion) {
      boot.classList.add("done");
      document.body.removeAttribute("data-loading");
      done && done();
      return;
    }

    const lines = [
      ['<span class="b-dim">$</span> initializing portfolio…', 90],
      ['<span class="b-dim">·</span> loading <span class="b-accent">tadhagath.marepalli</span>', 80],
      ['<span class="b-dim">·</span> mounting modules: hero, projects, skills', 70],
      ['<span class="b-dim">·</span> compiling experience [████████] 100%', 70],
      ['<span class="b-dim">·</span> establishing connection to brain…', 90],
      ['<span class="b-ok">✓ systems online — welcome.</span>', 120],
    ];

    let finished = false;
    function finish() {
      if (finished) return; finished = true;
      sessionStorage.setItem("booted", "1");
      boot.classList.add("done");
      document.body.removeAttribute("data-loading");
      setTimeout(() => done && done(), 200);
    }
    skip.addEventListener("click", finish);
    const onKey = (e) => { if (e.key === "Escape" || e.key === "Enter") finish(); };
    addEventListener("keydown", onKey, { once: true });
    // safety net: never let the intro trap the page
    setTimeout(finish, 4000);

    let i = 0, html = "";
    function next() {
      if (finished) return;
      if (i >= lines.length) { setTimeout(finish, 450); return; }
      html += lines[i][0] + "\n";
      log.innerHTML = html;
      fill.style.width = Math.round(((i + 1) / lines.length) * 100) + "%";
      i++;
      setTimeout(next, lines[i - 1] ? lines[i - 1][1] + 180 : 200);
    }
    next();
  };

  /* ----------------------------------------------------- TYPEWRITER */
  FX.typewriter = function (el, words) {
    if (!el || !words || !words.length) return;
    if (reduceMotion) { el.textContent = words[0]; return; }
    let wi = 0, ci = 0, deleting = false;
    function tick() {
      const word = words[wi];
      el.textContent = word.slice(0, ci);
      if (!deleting) {
        if (ci < word.length) { ci++; setTimeout(tick, 70); }
        else { deleting = true; setTimeout(tick, 1500); }
      } else {
        if (ci > 0) { ci--; setTimeout(tick, 38); }
        else { deleting = false; wi = (wi + 1) % words.length; setTimeout(tick, 320); }
      }
    }
    tick();
  };

  /* -------------------------------------------------- TERMINAL TYPING */
  FX.typeTerminal = function (el, lines) {
    if (!el) return;
    if (reduceMotion) {
      el.innerHTML = lines.map(l =>
        l.cmd ? `<span class="t-cmd">${l.cmd}</span>` :
        l.ok ? `<span class="t-ok">${l.ok}</span>` :
        `<span class="t-out">${l.out}</span>`).join("\n");
      return;
    }
    let li = 0, ci = 0, html = "";
    function tick() {
      if (li >= lines.length) { el.innerHTML = html + '<span class="term__cursor">▋</span>'; return; }
      const line = lines[li];
      const text = line.cmd || line.out || line.ok || "";
      const cls = line.cmd ? "t-cmd" : line.ok ? "t-ok" : "t-out";
      const partial = text.slice(0, ci);
      el.innerHTML = html + `<span class="${cls}">${partial}</span><span class="term__cursor">▋</span>`;
      if (ci < text.length) {
        ci++;
        setTimeout(tick, line.cmd ? 32 : 12);
      } else {
        html += `<span class="${cls}">${text}</span>\n`;
        li++; ci = 0;
        setTimeout(tick, line.cmd ? 240 : 120);
      }
    }
    tick();
  };

  /* ------------------------------------------------------- MATRIX RAIN */
  let matrixOn = false, matrixRAF;
  FX.matrixRain = function () {
    const canvas = document.getElementById("matrix");
    if (!canvas) return;
    if (matrixOn) return;
    matrixOn = true;
    canvas.classList.add("on");
    const ctx = canvas.getContext("2d");
    canvas.width = innerWidth; canvas.height = innerHeight;
    const chars = "01アイウエオカ{}[]()=>+-*/$#@λ∑01".split("");
    const size = 16, cols = Math.floor(innerWidth / size);
    const drops = Array(cols).fill(1);
    const rgb = getComputedStyle(document.documentElement).getPropertyValue("--accent-bright").trim() || "#8b95ff";

    function draw() {
      ctx.fillStyle = "rgba(11, 11, 14, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = rgb;
      ctx.font = size + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * size, drops[i] * size);
        if (drops[i] * size > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      matrixRAF = requestAnimationFrame(draw);
    }
    draw();
    FX.toast("⚡ matrix mode — wake up, neo");
    setTimeout(() => {
      cancelAnimationFrame(matrixRAF);
      canvas.classList.remove("on");
      setTimeout(() => { ctx.clearRect(0, 0, canvas.width, canvas.height); matrixOn = false; }, 600);
    }, 6000);
  };

  /* -------------------------------------------------- KONAMI DETECTOR */
  FX.initKonami = function (cb) {
    const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let pos = 0;
    addEventListener("keydown", (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = (k === seq[pos]) ? pos + 1 : (k === seq[0] ? 1 : 0);
      if (pos === seq.length) { pos = 0; cb && cb(); }
    });
  };

  window.FX = FX;
})();
