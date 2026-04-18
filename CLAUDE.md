# EE Games - Claude Guide

## Project Overview

Static retro-themed game portal. Vanilla HTML5, CSS3, JS — retro pixel aesthetic with no runtime framework. Uses **Eleventy (11ty)** to generate HTML from Nunjucks templates and a single games data file.

**Build:** `npm run build` → outputs to `_site/`
**Dev server:** `npm run dev` → live-reloading dev server at `localhost:8080`

---

## Adding a New Game

**Only one step: add an entry to `src/_data/games.js`.**

```javascript
{
  id: <next number>,
  slug: "my-game-name",               // becomes my-game-name.html
  title: "MY GAME NAME",
  windowTitle: "MY GAME NAME",        // shown in the macOS window chrome
  desc: "Short description for cards",
  tags: ["arcade"],                   // Options: arcade, puzzle, action, platformer, strategy
  thumb: "thumb-space",               // CSS class for card background color
  cardIconType: "emoji",              // "emoji" or "image"
  cardIcon: "🎮",                     // emoji string OR image path like "images/icons/game.png"
  sidebarIcon: "🎮",                  // always emoji — used in "More Games" sidebar
  sidebarMeta: "ARCADE",             // genre text shown under title in sidebar
  plays: "—",
  rating: "★★★★★",
  ratingNum: "5.0",
  isNew: true,
  featured: false,                    // set true to feature on home page (only one should be true)
  iframeUrl: "https://...",           // URL loaded when player clicks PLAY
  accentColor: "#00ff88",             // color for play button border, stars, click-to-play text
  placeholderBg: "radial-gradient(ellipse at center, #001a0d 0%, #000510 60%, #000 100%)",
  pulseBoxShadow1: "0 0 30px rgba(0,255,136,0.3)",
  pulseBoxShadow2: "0 0 50px rgba(0,255,136,0.6)",
  genre: "ARCADE / CLICKER",         // shown in sidebar Game Info box
  difficulty: "★☆☆☆☆",
  mobile: "✓ SUPPORTED",
  about: [                            // each string = one paragraph in Description tab
    "First paragraph.",
    "Second paragraph."
  ],
  controls: [                         // each entry = one key/label row in Controls tab
    { key: "CLICK", label: "Click the button" },
    { key: "MOUSE", label: "Navigate menus" }
  ]
}
```

Then run `npm run build`. The game page, home page card, and "More Games" sidebar on every other page all update automatically.

**Optional:** Add a card icon image at `images/icons/my-game-name.png` and reference it with `cardIconType: "image"` and `cardIcon: "images/icons/my-game-name.png"`.

---

## File Map

| Path | Purpose |
|------|---------|
| `src/_data/games.js` | **Single source of truth** — all game metadata |
| `src/_includes/base.njk` | Shared HTML shell: `<head>`, CSS variables, header, body |
| `src/_includes/game-page.njk` | Game page layout template (extends base.njk) |
| `src/game.njk` | Pagination driver — generates one HTML page per game in `games.js` |
| `src/index.njk` | Home page template (extends base.njk) |
| `_site/` | Build output — deploy this directory (git-ignored) |
| `about.html` / `support.html` / `privacy-policy.html` / `apps.html` | Info pages (passed through as-is) |
| `images/` | Static assets (passed through to `_site/`) |

---

## Key Patterns

### CSS Variables (defined in `src/_includes/base.njk`)

```css
--accent: #00ff88   /* neon green */
--accent2: #ff3e6c  /* neon pink */
--accent3: #ffe033  /* neon yellow */
--accent4: #3eb8ff  /* cyan */
```

### Thumb classes (card background gradients)

```
thumb-space, thumb-dungeon, thumb-puzzle, thumb-race, thumb-platform, thumb-fight
```

### Tag classes

```html
<span class="tag tag-arcade">ARCADE</span>
<span class="tag tag-action">ACTION</span>
<span class="tag tag-puzzle">PUZZLE</span>
<span class="tag tag-strategy">STRATEGY</span>
<span class="tag tag-platformer">PLATFORMER</span>
```

### Per-game accent color

Each game gets a custom `accentColor` which controls:
- The play button border and glow
- The "CLICK TO PLAY" text color
- The twinkling star particles on the placeholder

Match `pulseBoxShadow1`/`pulseBoxShadow2` rgba values to the accent color.

---

## Styling Conventions

- Fonts: **Press Start 2P** for headings/buttons, **VT323** for body text
- Shared CSS lives in `base.njk` and `game-page.njk` — not per-file anymore
- CRT scanline effect via `body::before` pseudo-element
- Pixel-art cursor defined in `index.njk` (home page only)
- Buttons use offset `box-shadow` for 3D "pressed" feel; hover shifts with `transform: translate(-2px, -2px)`
