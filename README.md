# Tadhagath Marepalli — Portfolio

A dark, interactive personal portfolio. No build step, no dependencies — just HTML, CSS and vanilla JS. Open `index.html` and it runs.

## ✦ Features
- **Boot sequence** intro animation (plays once per browser session)
- **Custom cursor** with a trailing ring that reacts to hover
- **Interactive constellation** background in the hero
- **⌘K command palette** — fuzzy nav, copy email, switch accent color, launch games
- **Commit Snake** mini-game (arrows / WASD / swipe)
- **Konami code** easter egg (↑↑↓↓←→←→ b a) → Matrix rain
- **3D tilt** project cards, magnetic buttons, tag filtering, scroll reveals
- **5 accent themes**, remembered between visits
- Fully responsive + respects `prefers-reduced-motion`

## ✎ How to edit your content
**Everything lives in one file: [`assets/data.js`](assets/data.js).**
Open it and edit the values — the page rebuilds from it automatically.

- **Add a project** → copy a `{ ... }` block inside `projects` and edit it. Its `tags` automatically appear in the filter bar.
- **Add a job / role** → copy a `{ ... }` block inside `experience` (set `type` to `"work"` or `"leadership"`).
- **Change skills** → edit the `items` arrays inside `skills`.
- **Update name / blurb / links / email** → edit the `identity` block at the top.
- **Add your résumé** → drop a PDF in `assets/` and set `identity.links.resume` to `"assets/resume.pdf"`. A Résumé button appears automatically.

No HTML/CSS knowledge needed for content changes.

## ▸ Run locally
Just open `index.html` in a browser. Or serve it (better, avoids any file:// quirks):

```bash
# Python
python -m http.server 8000
# then visit http://localhost:8000

# or Node
npx serve
```

## ⤴ Deploy (free)
Any static host works. Easiest options:

**GitHub Pages**
```bash
git add -A && git commit -m "portfolio"
git push
```
Then in your repo: **Settings → Pages → Branch: main / root**. Done.

**Netlify / Vercel** — drag the folder onto netlify.com, or `vercel` in the directory.

## File map
```
index.html        structure
assets/styles.css design system (dark technical)
assets/data.js    ← YOUR CONTENT lives here
assets/fx.js      cursor, particles, boot, matrix, typewriter
assets/game.js    snake mini-game
assets/app.js     renders data + wires interactivity
```

## Tweaks
- **Default accent color**: change `--accent` / `--accent-bright` in `assets/styles.css` (`:root`).
- **Turn off the boot intro**: in `assets/fx.js`, make `FX.runBoot` call `done()` immediately.
- **Section rhythm / spacing**: `--section-pad` in `:root`.
