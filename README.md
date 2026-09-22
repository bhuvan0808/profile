# Bhuvan Boddu — portfolio

Live at **https://bhuvanbodduprofile.vercel.app/** (moving to **bhuvan.linkyaar.com**).

One person, three worlds. The site opens in Founder mode; the switch in the top bar (or keys `1` / `2` / `3`) changes everything: copy, hero scene, reveal motion, page transition, contact stage and optional sound.

| Mode | World | What you get |
| --- | --- | --- |
| **Founder** (default) | Gotham | Night city drawn live in three parallax layers, two depths of rain, a signal that follows the cursor while you are in the sky, lightning with thunder. Case files with equal weight, a pinned "ground truth" story, principles, market instinct, "Light the signal" contact. |
| **Builder** | Shadow Fight | A sunlit bamboo forest painted into the hero, a samurai silhouette with a katana versus an opponent called Excuses. Click the arena to strike; knock an excuse out and the next steps in. Paper sections, ink type, "Bhuvan vs your problem" contact. |
| **AI Engineer** | Stark | A live arc reactor with counter-rotating rings, a core that tilts toward the pointer and repulsor pulses on click, HUD readouts, warm workshop palette, "Open a channel" typed contact. |

Sound is off by default. The toggle enables synthesized cues (sword, hits, thunder, reactor hum, beeps) generated with the Web Audio API. No audio files, no copyrighted assets: every scene is drawn in code.

## Stack

Static HTML, CSS and vanilla JS. GSAP 3.13 with ScrollTrigger, ScrollSmoother and SplitText from cdnjs for smooth scrolling, masked line reveals and pinning. Canvas engines, silhouettes, skyline, reactor, terminals and sounds are hand-written. No build step.

```
index.html          page skeleton, transition overlays, per-mode hero and contact stages
css/base.css        layout, type, shared components
css/founder.css     Gotham tokens and stage
css/builder.css     Shadow Fight tokens, arena HUD and stage
css/engineer.css    Stark tokens, reactor HUD and channel
js/data.js          all content: per-mode copy, case files, story beats, principles, views, track record, repos, world, education
js/sound.js         Web Audio sound design and ambience
js/fx-founder.js    skyline layers, rain, clouds, signal, lightning
js/fx-builder.js    bamboo forest, samurai vs excuses, slashes, leaves
js/fx-engineer.js   arc reactor, HUD values, typed channel
js/app.js           mode manager, rendering, smooth scroll, reveals, transitions, nav, form
```

## Editing content

Everything textual lives in `js/data.js`. Per-mode copy sits under `modes.founder`, `modes.builder` and `modes.engineer`; the shared pools (case files, principles, experience, repos, world, education, recognition) sit next to them.

## Running locally

Any static server works, for example `npx serve .`. Deep-link a mode with `?mode=founder`, `?mode=builder` or `?mode=engineer`. The last chosen mode is remembered. `prefers-reduced-motion` disables the canvases, smooth scrolling and reveal motion.

## Deploy

Pushes to `main` deploy automatically through the Vercel GitHub integration.
