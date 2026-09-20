# Violet Control Plane

The portfolio keeps Sergey Frolov’s identity, public links, original three projects,
six skill groups, six contribution destinations, and the supported “7+ years in IT”
highlight. MLOps/AIOps is explicitly presented as exploration. No employers,
production metrics, screenshots of products, or contribution roles were invented.

## Visual system

Near-black plum and porcelain themes share violet signal lines, precise borders,
large editorial headings, a 1240px content limit, 28px desktop / 20px mobile gutters,
and 120px desktop / 72px mobile section spacing. The hero uses a 7:5 composition;
projects have an explicit lead item and two supporting illustrations. The mobile
map becomes a readable two-column button group. Preview artwork is labelled as
concept illustration, not a product screenshot.

Semantic colors, spacing, type, radius, and motion live in `src/styles/tokens.css`;
section layouts live in `global.css`. Inter Variable is locally hosted with Latin
and Cyrillic subsets, `font-display: swap`, system fallbacks, and the included OFL
license. Source: `@fontsource-variable/inter@5.3.0`. The primary visual is HTML/SVG.
The original GitHub avatar remains remote, with dimensions and lazy loading.

Motion consists of a short hero entrance, one-time section entrances, and control
transitions. Entrance text retains full opacity to preserve contrast throughout.
Content is visible without observers; reduced motion disables these effects and
smooth scrolling. All observers and listeners are cleaned up.

## Content and interactions

- `src/App.svelte`: composition, shared preference state, navigation actions, metadata.
- `src/data/`: original profile, projects, skill groups, and contributions. Each project
  chooses its illustration through `visual`; `lead` explicitly selects the main project.
- `src/i18n/original.js`: preserved source dictionaries. `src/i18n/index.js`: complete
  English/Russian interaction and redesigned editorial copy. Product/tool names retain
  their original spelling. No profile or project API is queried at runtime.
- `src/components/EngineeringMap.svelte` and `StackExplorer.svelte`: ordinary buttons
  expose selection with `aria-pressed`. Enter/Space selects; detail panels share skill
  data. Additional tools remain accessible through a native disclosure.
- `ProjectCard.svelte`: native inline `details`/`summary`, with purpose, stack, source,
  and demo links always available. Opening details never changes focus.
- `CommandPalette.svelte`: native modal dialog, labelled search, grouped ordinary button
  results. Cmd+K on Mac / Ctrl+K elsewhere opens it; Tab/Shift+Tab cycles within it;
  arrows navigate results, Enter selects, Escape closes and restores invoking focus.
  Queries search both languages. Navigation transfers focus to the destination.
- `Header.svelte`: active section marker, mobile disclosure with focus on the first
  destination, Escape-to-close, and visible language/theme controls. Opening the palette
  closes the mobile menu. The footer/palette can restore system-theme following.
- `Contact.svelte`: public email, mail link, separate copy action, and selectable fallback.
  A shared live region announces success only after clipboard completion, or localized failure.
- `src/lib/preferences.js` and the small `index.html` bootstrap preserve the original
  storage keys. Valid query → valid saved value → browser/system. Switching updates an
  existing matching query parameter, preserving other parameters and hash. Blocked
  storage is tolerated, including a throwing `localStorage` property.

Canonical URL, alternate language links, social tags, Person JSON-LD, robots, sitemap,
`/opsmon/` Vite base, and Pages permissions and deployment steps are preserved; a source/unit check now runs before the build. The new SVG icon and
1200×630 PNG social preview are local; sharing tags use the absolute public PNG URL.
`NotFound.svelte` uses the same languages/themes and configured base for return links.

## Commands

```sh
npm ci
npm run check       # Svelte diagnostics + focused Node tests
npm run build       # production assets and dist/404.html
npm test            # Playwright + axe against the production output
```

Tests use installed Google Chrome (`channel: 'chrome'`). On another machine, install
Chrome or configure Playwright to use its installed Chromium. `npm test` starts the
production test server if port 4173 is free; it deliberately serves unknown paths with
`dist/404.html` and HTTP 404. It does not rely on Vite’s development SPA fallback.
Build before browser tests so they exercise current output.

For local visual review:

```sh
node tests/server.mjs
npm run screenshots
node tests/capture.mjs social  # regenerate public/assets/social-preview.png, then rebuild
```

`tests/inspect.mjs` captures 360, 390, 768, 1024, and 1440px English/Russian views in the
system temporary directory and reports overflow. `docs/screenshots/` holds baseline
and final desktop/mobile captures, including English/dark and Russian/light variants.
Baseline full-page captures reflect the original hidden-until-intersection behavior.
Final capture scrolls through content to load below-the-fold media before saving.

## Verification

- Original profile, skills, projects, and contribution data were compared with the
  baseline and match exactly, apart from the new project presentation fields.
- `npm ci` completed; Svelte checks report zero errors/warnings; five Node tests pass.
- Fifteen production browser tests pass. The suite covers map/stack selection, native project disclosures,
  palette keyboard/focus/search, copy success/failure, both shortcut platforms,
  preference precedence and pre-app bootstrap, invalid values, unavailable storage,
  system changes, mobile menu, exact index routes, a real nested-path 404 response, and active navigation after returning to the hero.
- Both languages/themes checked at 360, 390, 768, 1024, and 1440px with no horizontal
  overflow; axe WCAG A/AA checks cover the page and open palette in all four combinations.
- Short 1440×720 viewport keeps the primary action visible. Reduced motion and 200%
  CSS page zoom are tested. Browser errors and failed local asset responses are checked.
- Keyboard interaction, visible focus, Russian expansion, and both theme treatments
  were inspected in Chrome. Baseline and final screenshots are saved for review.

| Production build | Baseline | Redesign |
| ---------------- | -------: | -------: |
| JavaScript, gzip | 23.92 KB | 31.31 KB |
| CSS, gzip        |  4.79 KB |  6.11 KB |
| HTML, gzip       |  0.86 KB |  1.51 KB |

JavaScript/CSS growth is 8.71 KB gzip. The deliberate additional font cost is 48.25 KB
Latin plus 18.74 KB Cyrillic (WOFF2, loaded by unicode coverage); it provides consistent
local typography in both languages without a third-party request. The 46 KB social
PNG is metadata only and is not loaded in the page. No new runtime dependencies.

Lighthouse mobile report: `docs/lighthouse-mobile.json`. Run configuration: Lighthouse
13.5.0, local production HTTP server, headless Chrome 137, mobile 412×823 at DPR 1.75,
simulated mobile throttling (150ms RTT, 1638.4 Kbps, 4× CPU slowdown). Measured scores:
**98 performance / 100 accessibility**; FCP 1.8s, LCP 1.9s, TBT 100ms, CLS 0.
Results are a local
lab measurement, not a claim about live Pages performance.

## Limits

No commit, push, or deployment was performed. Live GitHub Pages behavior is unverified;
the production fallback was tested locally with an actual 404 status. Safari, Firefox,
physical touch devices, and assistive-technology reading order were not manually tested.
Clipboard rejection and blocked storage are exercised through browser API denial mocks.
The zoom check uses CSS page zoom, not the browser toolbar. Automated axe/Lighthouse
checks do not replace a complete accessibility audit. The preserved GitHub avatar still
requires network access. Fonts/assets and all core interactions work locally.
