/* =============================================================================
   game.js  —  "commit snake"
   Collect ◆ commits, don't hit yourself. Exposed as window.Game
============================================================================= */
(function () {
  "use strict";

  const Game = {};
  const GRID = 21;            // cells per side
  let cell, ctx, canvas;
  let snake, dir, nextDir, food, score, best, loop, running, started;

  best = parseInt(localStorage.getItem("snakeBest") || "0", 10);

  function styleVar(name, fallback) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  }

  function reset() {
    snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    dir = { x: 1, y: 0 }; nextDir = { x: 1, y: 0 };
    score = 0; started = false;
    placeFood();
    updateScore();
    draw();
  }

  function placeFood() {
    do {
      food = { x: (Math.random() * GRID) | 0, y: (Math.random() * GRID) | 0 };
    } while (snake && snake.some((s) => s.x === food.x && s.y === food.y));
  }

  function updateScore() {
    document.getElementById("game-score").textContent = score;
    document.getElementById("game-best").textContent = best;
  }

  function tick() {
    dir = nextDir;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    // wall = wrap-around (more forgiving + fun)
    head.x = (head.x + GRID) % GRID;
    head.y = (head.y + GRID) % GRID;

    // self collision
    if (snake.some((s) => s.x === head.x && s.y === head.y)) { gameOver(); return; }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score++;
      if (score > best) { best = score; localStorage.setItem("snakeBest", best); }
      updateScore();
      placeFood();
    } else {
      snake.pop();
    }
    draw();
  }

  function draw() {
    const accent = styleVar("--accent", "#5e6ad2");
    const accentB = styleVar("--accent-bright", "#8b95ff");
    const surface = styleVar("--surface-2", "#181a1f");
    const hairline = "rgba(255,255,255,0.04)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // subtle grid
    ctx.strokeStyle = hairline; ctx.lineWidth = 1;
    for (let i = 1; i < GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * cell, 0); ctx.lineTo(i * cell, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * cell); ctx.lineTo(canvas.width, i * cell); ctx.stroke();
    }

    // food (diamond commit)
    const fx = food.x * cell + cell / 2, fy = food.y * cell + cell / 2;
    ctx.save();
    ctx.translate(fx, fy); ctx.rotate(Math.PI / 4);
    ctx.fillStyle = accentB;
    ctx.shadowColor = accentB; ctx.shadowBlur = 12;
    const s = cell * 0.34;
    ctx.fillRect(-s / 2, -s / 2, s, s);
    ctx.restore();

    // snake
    snake.forEach((seg, i) => {
      const t = i / snake.length;
      ctx.fillStyle = i === 0 ? accentB : accent;
      ctx.globalAlpha = i === 0 ? 1 : 0.85 - t * 0.45;
      const pad = 2;
      roundRect(ctx, seg.x * cell + pad, seg.y * cell + pad, cell - pad * 2, cell - pad * 2, 4);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function roundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }

  function start() {
    if (started) return;
    started = true; running = true;
    document.getElementById("game-hint").innerHTML = "◆ collected: <b id='live'>0</b> · arrows / WASD";
    clearInterval(loop);
    loop = setInterval(tick, 110);
  }

  function gameOver() {
    clearInterval(loop); running = false; started = false;
    const hint = document.getElementById("game-hint");
    hint.innerHTML = `game over — <b>${score}</b> commits · press <b>space</b> to retry`;
    // flash
    ctx.fillStyle = "rgba(255,80,80,0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function setDir(x, y) {
    // prevent reversing
    if (dir.x === -x && dir.y === -y) return;
    nextDir = { x, y };
  }

  function onKey(e) {
    const k = e.key.toLowerCase();
    let handled = true;
    if (k === "arrowup" || k === "w") setDir(0, -1);
    else if (k === "arrowdown" || k === "s") setDir(0, 1);
    else if (k === "arrowleft" || k === "a") setDir(-1, 0);
    else if (k === "arrowright" || k === "d") setDir(1, 0);
    else if (k === " ") { if (!running) { reset(); start(); } }
    else handled = false;
    if (handled) e.preventDefault();
  }

  // swipe support (mobile)
  let touchStart = null;
  function onTouchStart(e) { touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY }; if (!running) { reset(); start(); } }
  function onTouchMove(e) {
    if (!touchStart) return;
    const dx = e.touches[0].clientX - touchStart.x;
    const dy = e.touches[0].clientY - touchStart.y;
    if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return;
    if (Math.abs(dx) > Math.abs(dy)) setDir(dx > 0 ? 1 : -1, 0);
    else setDir(0, dy > 0 ? 1 : -1);
    touchStart = null;
    e.preventDefault();
  }

  Game.open = function () {
    const modal = document.getElementById("game");
    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");
    // size canvas to a clean multiple of GRID
    const px = 420;
    canvas.width = px; canvas.height = px;
    cell = px / GRID;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.getElementById("game-hint").innerHTML =
      "collect the ◆ commits · arrows / WASD to move · <b>space</b> to start";
    reset();
    addEventListener("keydown", onKey);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
  };

  Game.close = function () {
    const modal = document.getElementById("game");
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    clearInterval(loop); running = false;
    removeEventListener("keydown", onKey);
    canvas.removeEventListener("touchstart", onTouchStart);
    canvas.removeEventListener("touchmove", onTouchMove);
  };

  Game.isOpen = function () {
    return document.getElementById("game").classList.contains("open");
  };

  window.Game = Game;
})();
