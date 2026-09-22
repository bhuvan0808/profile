# bhuvan.build — Bhuvan Boddu's portfolio

Live at **https://bhuvanbodduprofile.vercel.app/**

One person, three modes. Pick a world on first visit or switch any time from the top bar (or press `1` / `2` / `3`):

| Mode | World | What changes |
| --- | --- | --- |
| **Builder** | Shadow Fight | Ember ambience, silhouette fighters in the hero (click the arena to strike — knock out the bugs), diagonal slash reveals, strike buttons, ember cursor trail, a "VS" contact stage. |
| **Founder** | Gotham | Rain, generated skyline, a signal that follows the cursor, lightning on click, searchlight reveals, a case-file card, "Light the signal" contact stage. |
| **AI Engineer** | Neural | Node-graph with travelling pulses that react to the pointer, glitch + scramble reveals, holographic tilt cards, typed terminals in the hero and contact. |

Each mode has its own copy, hero widget, stats, featured work, section titles, reveal animation, button and click effects, cursor, and page transition (slash cut / bat iris / glitch stripes).

## Stack

Static HTML, CSS and vanilla JS. [GSAP 3](https://gsap.com/) + ScrollTrigger from cdnjs for reveals and transitions; everything else (canvas engines, fighters, skyline, node graph, terminals) is hand-written. No build step.

```
index.html          page skeleton, intro chooser, transition overlay
css/base.css        layout + shared components
css/builder.css     Shadow Fight theme
css/founder.css     Gotham theme
css/ai.css          Neural theme
js/data.js          all content (profile, per-mode copy, ventures, repos, skills…)
js/fx-builder.js    arena engine: fighters, embers, slashes, sparks, cursor trail
js/fx-founder.js    skyline, rain, clouds, signal, lightning
js/fx-ai.js         node graph, pulses, terminals
js/app.js           mode manager, rendering, reveals, transitions, cursor, nav, form
```

## Editing content

Everything textual lives in `js/data.js`. Per-mode headlines, stats and featured picks are under `modes.<builder|founder|ai>`; the featured pool, ventures ledger, experience, repos, skills, countries, education and "beyond" lists sit next to it.

## Running locally

Any static server works, for example:

```
npx serve .
```

Deep-link a mode with `?mode=builder`, `?mode=founder` or `?mode=ai`. The last chosen mode is remembered in `localStorage`. `prefers-reduced-motion` disables the canvases, custom cursor and reveal animations.

## Deploy

Pushes to `main` deploy automatically through the Vercel GitHub integration.
