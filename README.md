# Malan de Mel — Portfolio

Personal portfolio site. Plain HTML, CSS and JavaScript — no framework, no build
step, no dependencies. Hosted on GitHub Pages at **https://demel0729.github.io**

---

## Running it locally

Open `index.html` in a browser, or serve the folder so everything behaves exactly
as it will online:

```bash
python -m http.server 5173
```

Then visit <http://localhost:5173>.

---

## Adding a project

Everything on the Projects page is generated from one array in
[`js/projects-data.js`](js/projects-data.js). Copy an existing block, paste it at
the top of the list, and fill it in. Nothing else needs to change — the cards,
the technology filter chips and the detail popup all update themselves.

```js
{
  id: "my-project",              // unique slug, no spaces
  title: "My Project",
  year: "2026",
  role: "Solo build",
  featured: true,                // also show it on the home page
  summary: "One or two sentences for the card.",
  description: ["Paragraph one.", "Paragraph two."],
  highlights: ["Does this", "Does that"],
  tech: ["JavaScript", "CSS"],   // these become the filter chips
  thumb: "assets/img/projects/my-project-cover.jpg",
  media: [
    { type: "image",   src: "assets/img/projects/shot-1.jpg", alt: "Dashboard" },
    { type: "video",   src: "assets/video/demo.mp4", poster: "assets/img/projects/shot-1.jpg" },
    { type: "youtube", id: "dQw4w9WgXcQ", title: "Walkthrough" }
  ],
  links: [
    { label: "View repo", url: "https://github.com/deMel0729/my-project", icon: "github" },
    { label: "Live demo", url: "https://example.com", icon: "external" }
  ]
}
```

### Images

Drop them in `assets/img/projects/`.

| Image | Recommended size | Notes |
|---|---|---|
| Card thumbnail (`thumb`) | 1200 × 750 (16:10) | The one people see first — make it the best one |
| Gallery images (`media`) | 1600 × 900 (16:9) | Screenshots, diagrams, anything |

Missing images do not break anything — a neutral placeholder shows until the real
file exists. Save as `.jpg` for screenshots and photos (smaller), `.png` only when
you need transparency.

### Video

Two options:

1. **Self-hosted** — put an `.mp4` in `assets/video/` and use
   `{ type: "video", src: "...", poster: "..." }`. Keep it **under about 20 MB**.
   GitHub hard-rejects files over 100 MB and Pages gets slow long before that.
2. **YouTube** — upload as *Unlisted*, then use `{ type: "youtube", id: "..." }`.
   The id is the part after `watch?v=`. This costs your repository nothing and is
   the better option for anything longer than about 30 seconds.

---

## Your photo

Save it as **`assets/img/profile.jpg`** and it appears automatically — no code
change needed. A roughly 4:5 portrait crop (e.g. 800 × 1000) works best. Until
that file exists, a placeholder is shown.

---

## Changing the look

| What | Where |
|---|---|
| Accent colour | `--accent` in [`css/style.css`](css/style.css) — appears twice, once per theme |
| All other colours | The `:root` blocks at the top of `css/style.css` |
| Bio, skills, education | Directly in [`index.html`](index.html) |
| Page width | `--wrap` in `css/style.css` |

Dark and light themes follow the visitor's system setting, and the toggle in the
header overrides it. The choice is remembered in `localStorage`.

---

## Structure

```
.
├── index.html              Home — hero, selected work, about, contact
├── projects.html           Projects grid + detail popup
├── 404.html
├── css/style.css           All styling, design tokens at the top
├── js/
│   ├── projects-data.js    ← the only file you edit to add projects
│   ├── main.js             Theme, navigation, scroll reveal, card template
│   └── projects.js         Projects grid, filters, gallery popup
└── assets/
    ├── img/profile.jpg     Your photo
    ├── img/projects/       Project screenshots
    └── video/              Self-hosted clips
```

`.nojekyll` tells GitHub Pages to serve the files as-is rather than running them
through Jekyll.
