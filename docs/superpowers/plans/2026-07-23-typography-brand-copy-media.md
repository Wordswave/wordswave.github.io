# WordsWave Typography, Brand, Copy, and Media Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved balanced typography system, replace CAD / AGENT branding with WordsWave, rewrite all bilingual website copy, and add the supplied autoplaying product video without changing routes or existing CAD interactions.

**Architecture:** The existing three-layer token system gains complete typography primitives, semantic roles, and component aliases. All visible copy remains in the typed bilingual content tree. A reusable `BrandMark` consumes the supplied logo in shared chrome, while a focused `ProductVideo` component owns media behavior and reduced-motion handling on the Product page.

**Tech Stack:** React 19, TypeScript, React Router, Vite, Tailwind CSS v4, CSS custom properties, Vitest, Testing Library

---

## File map

| Path | Responsibility |
|---|---|
| `design-tokens.json` | Canonical primitive, semantic, and component typography values |
| `src/styles/tokens.css` | Runtime mapping for responsive typography tokens |
| `DESIGN.md` | Human-readable typography, brand, and media contract |
| `src/styles/global.css` | Role-based typography application and responsive media/brand styling |
| `src/i18n/content.ts` | Complete professional English and Chinese website copy |
| `src/i18n/content.test.ts` | Full bilingual content-tree contract and snapshots |
| `src/i18n/__snapshots__/content.test.ts.snap` | Exact English and Chinese runtime-copy snapshot |
| `src/styles/typographyTokens.test.ts` | Three-source typography token contract |
| `public/media/wordswave-logo.jpg` | Unchanged supplied WordsWave source logo |
| `public/media/wordswave-product-demo.mp4` | Unchanged supplied product demo |
| `src/components/BrandMark.tsx` | Shared responsive WordsWave lockup |
| `src/components/ProductVideo.tsx` | Autoplay, muted, looping, inline video with reduced-motion behavior |
| `src/components/ProductVideo.test.tsx` | Video attributes and reduced-motion tests |
| `src/components/SiteHeader.tsx` | Shared brand, navigation, and workspace action |
| `src/components/SiteFooter.tsx` | Shared brand, routes, and disclosure |
| `src/components/ProductDemo.tsx` | Revised professional sample-workspace labels |
| `src/pages/ProductPage.tsx` | Product hero, video, interactive preview, and checks |
| `src/App.test.tsx` | Route, copy, language, metadata, and brand integration |
| `src/components/SiteHeader.test.tsx` | Brand, route, menu, and language behavior |
| `src/components/ProductDemo.test.tsx` | Revised localized sample-result behavior |
| `src/test/setup.ts` | Test media and matchMedia support if required |
| `index.html` | WordsWave default title, description, and favicon |
| `README.md` | Media source and local configuration note |
| `.gitignore` | Ignore visual-companion design artifacts |

### Task 1: Lock the professional bilingual copy contract

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/components/SiteHeader.test.tsx`
- Modify: `src/components/ProductDemo.test.tsx`
- Create: `src/i18n/content.test.ts`
- Create: `src/i18n/__snapshots__/content.test.ts.snap`
- Modify: `src/i18n/content.ts`
- Modify: `index.html`

- [ ] **Step 1: Replace route expectations with approved copy**

Update integration tests to assert the new English and Chinese H1 text for Home, Product, Use cases, Docs, About, and Not found. Assert WordsWave document titles, home accessible labels, professional footer disclosure, and persisted Chinese selection.

- [ ] **Step 2: Add abstract-copy regression assertions**

Read the runtime content source and assert it does not include the retired phrases:

```text
Build with evidence
Geometry, decisions, and evidence stay connected
Evidence stays with the geometry
让模型带上证据
让几何、决策与证据始终相连
证据始终与几何相连
CAD / AGENT
```

Use `CAD\\s*/\\s*AGENT` for the old-brand audit so spacing variants cannot escape detection.

- [ ] **Step 3: Add a complete content-tree contract**

Snapshot the entire `content.en` and `content.zh` trees at the data layer. The snapshot must include navigation, actions, page metadata, accessibility labels, Home, Product, video, evidence, Use cases, Docs, About, Not found, and every CAD example string. Add structural parity assertions so both locales expose identical keys and list lengths.

- [ ] **Step 4: Run focused tests and verify failure**

Run:

```bash
npm test -- --run src/App.test.tsx src/components/SiteHeader.test.tsx src/components/ProductDemo.test.tsx
```

Expected: FAIL because runtime copy, complete snapshots, and brand labels still use the old wording.

- [ ] **Step 5: Rewrite the complete content tree**

Apply the exact terminology and page copy from the approved spec. Review every navigation label, page hero, section title, support sentence, action, card, workflow step, CAD workspace label, validation label, accessible label, 404 message, and footer disclosure in both languages.

Keep sample geometry dimensions, material values, constraint counts, operation meaning, and export-format values unchanged.

- [ ] **Step 6: Update document defaults**

Change the static title, meta description, and favicon reference to WordsWave. The React route-title behavior remains the runtime authority after hydration.

- [ ] **Step 7: Verify content tests**

Run:

```bash
npm test -- --run src/App.test.tsx src/components/SiteHeader.test.tsx src/components/ProductDemo.test.tsx
npm test -- --run src/i18n/content.test.ts
npm run typecheck
```

Expected: revised bilingual copy passes and the content schema remains complete.

### Task 2: Build the three-layer typography system

**Files:**
- Modify: `design-tokens.json`
- Modify: `src/styles/tokens.css`
- Modify: `DESIGN.md`
- Modify: `src/styles/global.css`
- Create: `src/styles/typographyTokens.test.ts`

- [ ] **Step 1: Extend primitive typography tokens**

Add the approved responsive size values, weights, line heights, and tracking values. Preserve Inter and the existing color, spacing, radius, and motion primitives.

- [ ] **Step 2: Add semantic typography roles**

Define display, page title, section title, module title, lead, body, supporting, navigation, and metadata roles. Define component aliases for buttons, navigation, card titles, product labels, and footer copy.

- [ ] **Step 3: Map existing selectors to roles**

Refactor all typography declarations in `global.css` so equivalent information levels share semantic or component tokens. Remove repeated primitive font-size, weight, line-height, and letter-spacing combinations.

Apply:

- Home hero → display;
- internal page H1 → page title;
- page section H2 → section title;
- cards and steps → module title;
- hero and section support → lead;
- descriptions → body or supporting;
- navigation and text links → navigation;
- eyebrows, rails, status, toolbar, and manifests → metadata;
- buttons → component button tokens.

- [ ] **Step 4: Add exact responsive overrides**

At 900px and 767px, update semantic title tokens to the approved tablet and mobile values. Set English heading tracking to the approved negative values and override heading tracking to zero under `html[lang='zh-CN']`.

- [ ] **Step 5: Update the design contract**

Replace the old 103/70/46/34 scale in `DESIGN.md` with the approved hierarchy, type measures, weights, line heights, responsive table, and media/brand guidance. Keep the three sources synchronized.

- [ ] **Step 6: Add a three-source typography contract test**

Read `design-tokens.json`, `src/styles/tokens.css`, and `DESIGN.md` in a Vitest contract test. Assert:

- every approved primitive size, weight, line height, and tracking value exists;
- semantic display, page-title, section-title, module-title, lead, body, supporting, navigation, and metadata roles exist;
- component aliases for button, navigation, card title, product label, and footer exist;
- the 900px tablet values and 767px mobile values match the approved table;
- `html[lang='zh-CN']` sets heading tracking to zero;
- all three sources document the same 82/68/52/30/17/16/14/12 desktop hierarchy.

- [ ] **Step 7: Audit token use**

Run:

```bash
rg -n "font-size: var\\(--primitive-text|font-weight: [0-9]|line-height: (0\\.|1\\.)|letter-spacing: [-0-9.]+em" src/styles/global.css
```

Expected: no component selector bypasses semantic/component typography tokens except explicit non-typographic SVG or axis handling documented in CSS.

- [ ] **Step 8: Run the token contract, typecheck, and build**

Run:

```bash
npm test -- --run src/styles/typographyTokens.test.ts
npm run typecheck
npm run build
```

Expected: exit code 0.

### Task 3: Replace shared branding with WordsWave

**Files:**
- Create: `public/media/wordswave-logo.jpg`
- Create: `src/components/BrandMark.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/components/ProductDemo.tsx`
- Modify: `src/styles/global.css`
- Modify: `src/components/SiteHeader.test.tsx`

- [ ] **Step 1: Copy the supplied logo unchanged**

Create `public/media/` and copy:

```text
/Users/wentao/Desktop/Owen/wordswave_logo.jpg
→ public/media/wordswave-logo.jpg
```

Verify the copied file remains 1267×1280.

- [ ] **Step 2: Add failing brand assertions**

Assert header and footer expose `WordsWave home`, show visible WordsWave text, and contain the supplied logo path. In `ProductDemo.test.tsx`, assert the interactive toolbar displays WordsWave in both languages. Assert no `CAD\\s*/\\s*AGENT` visible wordmark remains.

- [ ] **Step 3: Implement `BrandMark`**

Render the supplied image inside a square overflow-hidden symbol wrapper and a visible `WordsWave` text label. Support a concise className prop only; do not duplicate route or accessibility behavior inside the component.

- [ ] **Step 4: Replace brand consumers**

Use `BrandMark` in header and footer links. Replace the interactive toolbar brand with WordsWave and use the WordsWave asset as the favicon.

- [ ] **Step 5: Style the lockup**

Use existing surface, border, radius, type, and spacing tokens. Crop the vertical source non-destructively with CSS positioning; do not generate or redraw logo assets.

- [ ] **Step 6: Verify brand tests and asset requests**

Run:

```bash
cmp -s /Users/wentao/Desktop/Owen/wordswave_logo.jpg public/media/wordswave-logo.jpg
npm test -- --run src/components/SiteHeader.test.tsx src/App.test.tsx
npm test -- --run src/components/ProductDemo.test.tsx
npm run build
```

Expected: `cmp` exits 0, tests pass, `index.html` points its favicon at `/media/wordswave-logo.jpg`, and the built media path resolves.

### Task 4: Add the accessible autoplay product video

**Files:**
- Create: `public/media/wordswave-product-demo.mp4`
- Create: `src/components/ProductVideo.tsx`
- Create: `src/components/ProductVideo.test.tsx`
- Modify: `src/pages/ProductPage.tsx`
- Modify: `src/i18n/content.ts`
- Modify: `src/styles/global.css`
- Modify: `src/test/setup.ts`

- [ ] **Step 1: Copy the supplied video unchanged**

Copy:

```text
/Users/wentao/Downloads/简单demo.mp4
→ public/media/wordswave-product-demo.mp4
```

Verify the result remains H.264, 2416×1440, approximately 32.07 seconds.

Run:

```bash
cmp -s /Users/wentao/Downloads/简单demo.mp4 public/media/wordswave-product-demo.mp4
```

Expected: exit code 0, proving the runtime asset is byte-identical to the supplied video.

- [ ] **Step 2: Write video behavior tests**

Assert:

- localized visible title and support;
- localized accessible label;
- source path;
- `muted`, `loop`, `playsInline`, `controls`, and `preload="metadata"`;
- autoplay when reduced motion is not requested;
- no autoplay when `prefers-reduced-motion: reduce` matches.

- [ ] **Step 3: Run the focused test and verify failure**

Run:

```bash
npm test -- --run src/components/ProductVideo.test.tsx
```

Expected: FAIL because the component does not exist.

- [ ] **Step 4: Implement `ProductVideo`**

Use a native video element, the localized content tree, and a small reduced-motion media-query hook. Keep the component isolated from route composition and do not add custom playback controls.

- [ ] **Step 5: Add the media section to Product**

Render it after `PageHero` and before `ProductDemo`. Renumber Product section labels to keep a logical 01 Video, 02 Interactive preview, 03 Model review sequence.

- [ ] **Step 6: Add token-based media styling**

Use the source `2416 / 1440` aspect ratio, square corners, 1px ruled border, surface background, no shadow, and responsive page-shell spacing. Use `object-fit: contain`.

- [ ] **Step 7: Verify video and product tests**

Run:

```bash
npm test -- --run src/components/ProductVideo.test.tsx src/components/ProductDemo.test.tsx src/App.test.tsx
npm run typecheck
```

Expected: all video, product, route, and localization tests pass.

### Task 5: Complete visual, responsive, and copy verification

**Files:**
- Modify: `README.md`
- Modify: `.gitignore`
- Modify only source files implicated by verified failures.

- [ ] **Step 1: Ignore visual-companion artifacts**

Add `.superpowers/` to `.gitignore`; do not commit brainstorming mockups or copied media previews.

- [ ] **Step 2: Document supplied media**

Add a concise README note naming the runtime media paths, autoplay behavior, reduced-motion behavior, and `VITE_WORKSPACE_URL` configuration.

- [ ] **Step 3: Run the full static suite**

Run:

```bash
npm run typecheck
npm test -- --run
npm run build
git diff --check
```

Expected: all commands exit 0.

- [ ] **Step 4: Run content and brand audits**

Run:

```bash
rg -n "Build with evidence|Geometry, decisions|Evidence stays|让模型带上证据|几何、决策|证据始终与几何|CAD / AGENT" src index.html
rg -n "font-size: var\\(--primitive-text|font-weight: [0-9]|letter-spacing: [-0-9.]+em" src/styles/global.css
```

Replace the final brand term with the spacing-tolerant regex `CAD\\s*/\\s*AGENT`.

Expected: no old slogans, old visible brand label, or bypassed type-role declarations.

- [ ] **Step 5: Browser-test every route**

At 1440×900, 1024×768, 768×1024, and 375×812, directly visit `/`, `/product`, `/use-cases`, `/docs`, `/about`, and an invalid route.

Check:

- title hierarchy and matching role consistency;
- readable body/supporting text;
- Chinese tracking;
- navigation and CTA fit;
- WordsWave header/footer lockup;
- no overflow or console errors.

- [ ] **Step 6: Verify product media and CAD interactions**

On Product:

- confirm the MP4 request returns 200;
- confirm `/media/wordswave-logo.jpg` and the favicon request return 200;
- confirm `videoWidth=2416`, `videoHeight=1440`, muted autoplay, loop, controls, inline playback, and nonzero current time;
- emulate reduced motion and confirm autoplay is absent;
- switch CAD examples in both languages and confirm engineering values remain unchanged.

- [ ] **Step 7: Inspect final screenshots**

Capture and inspect full-page Home and Product screenshots at desktop, tablet, and mobile sizes. Compare type proportions against the approved Balanced Editorial reference.

- [ ] **Step 8: Commit the verified implementation**

```bash
git add .gitignore DESIGN.md README.md design-tokens.json index.html package.json package-lock.json public src docs
git commit -m "feat: refine typography copy brand and product media"
```
