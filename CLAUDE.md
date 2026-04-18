# EE Games - Claude Guide

## Project Overview

Static retro-themed game portal. Vanilla HTML5, CSS3, JS — no framework, no build system, no dependencies. Each HTML file is self-contained with inline styles.

---

## Adding a New Game Page

### Step 1: Add to the games array in `index.html`

Find the `const games = [...]` array and append a new entry:

```javascript
{
  id: <next number>,
  title: "GAME NAME",
  desc: "Short description of gameplay",
  tags: ["arcade"],         // Options: arcade, puzzle, action, platformer, strategy
  thumb: "thumb-space",     // CSS class: thumb-space, thumb-dungeon, thumb-puzzle, thumb-race, thumb-platform, thumb-fight
  icon: "🎮",               // Emoji or <img> tag pointing to /images/icons/game-name.png
  plays: "—",
  rating: "★★★★★",
  isNew: true,              // Shows a "NEW" badge on the card
  url: "game-name.html"
}
```

### Step 2: Create the game page (`game-name.html`)

Copy an existing game page (e.g., `avoid-the-walls.html`) and update:

1. `<title>` and `<meta>` tags
2. Breadcrumb: `<span class="current">GAME NAME</span>`
3. Game title bar content (title, tags, rating)
4. `game-frame-container` — embed your game logic or an `<iframe src="game.html">`
5. Tab content: About, Controls, Tips
6. Sidebar stats box

**Two-column layout structure:**
```
<div class="page">
  <div class="game-title-bar">...</div>
  <div class="game-column">   ← main content (game + tabs)
  <aside class="sidebar">     ← right sidebar
```

### Step 3: Add assets (optional)

- Card icon image: `/images/icons/game-name.png`
- Screenshots (if app detail page): `/images/game-name/screenshot1.png`

### Step 4: Update navigation (optional)

All pages share the same header nav. No changes needed unless you're adding a new top-level section.

---

## Key Patterns

### CSS Variables (defined at top of each file)

```css
--accent: #00ff88   /* neon green */
--accent2: #ff3e6c  /* neon pink */
--accent3: #ffe033  /* neon yellow */
--accent4: #3eb8ff  /* cyan */
```

Per-game accent color: customize placeholder backgrounds and play icon borders to give each game a distinct feel.

### Tag classes

```html
<span class="tag tag-arcade">ARCADE</span>
<span class="tag tag-action">ACTION</span>
<span class="tag tag-puzzle">PUZZLE</span>
<span class="tag tag-strategy">STRATEGY</span>
<span class="tag tag-platformer">PLATFORMER</span>
```

### Tab switching (standard JS on all game pages)

```javascript
function switchTab(tabName, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');
  btn.classList.add('active');
}
```

### Game placeholder / play button

The game frame starts with a placeholder overlay. Clicking "PLAY" hides it:

```javascript
function playGame() {
  document.getElementById('placeholder').classList.add('hidden');
  // optionally inject iframe here
}
```

---

## File Map

| File | Purpose |
|------|---------|
| `index.html` | Home — game grid, filter/search, `games` data array |
| `game-page.html` | Blank template — copy this for new games |
| `avoid-the-walls.html` | Game page example |
| `ultimate-button-clicker.html` | Game page example |
| `lemonade-stand.html` | Game page example |
| `briannas-game.html` | Game page example |
| `apps.html` | Apps/projects hub |
| `some-grid-puzzle-game.html` | App detail page (single-column layout) |
| `about.html` / `support.html` / `privacy-policy.html` | Info pages |

---

## Styling Conventions

- Fonts: **Press Start 2P** for headings/buttons, **VT323** for body text
- All styles are inline per-file — no shared stylesheet
- CRT scanline effect via `body::before` pseudo-element
- Pixel-art cursor defined in `body` cursor property
- Buttons use offset `box-shadow` for 3D "pressed" feel; hover shifts with `transform: translate(-2px, -2px)`
