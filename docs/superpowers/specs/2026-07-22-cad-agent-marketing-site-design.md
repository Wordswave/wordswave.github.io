# CAD Agent Product Website Design Specification

## Objective

Create a runnable, responsive product website for CAD Agent that explains the product, demonstrates its core interaction, and provides a credible path into the existing workspace. The site is a separate front-end project in `/Users/wentao/CAD_Web`.

## Product story

CAD Agent turns natural-language engineering intent into editable CAD geometry, then exposes parameters, validation evidence, manufacturing checks, history, and export. The website must make the distinction between a visual AI demo and an engineering workflow obvious.

Primary promise:

> Describe the part. Shape the model. Prove it is ready.

## Audience

- Mechanical engineers evaluating AI-assisted CAD.
- Product designers building fixtures, enclosures, brackets, and prototypes.
- Engineering leads who need traceability, validation, and export rather than image generation.

## Approved direction

Use an editorial product landing page adapted from the OFF+BRAND. Refero style. The reference's warm paper canvas, monumental typography, single iridescent sphere, concentric outlines, square white cards, and museum-label typography are mandatory.

The homepage combines that brand language with an interactive CAD workspace simulation. The simulation is deliberately labeled as an interactive product preview and does not pretend to call the production backend.

## Information architecture

### 1. Header

- CAD/AGENT wordmark.
- Anchors for Workflow, Product, Evidence, and Use cases.
- Compact “Explore workspace” CTA. Until a deployed workspace URL is supplied, it resolves to the in-page `#product` preview. A `VITE_WORKSPACE_URL` value may replace that destination without changing components.
- Mobile menu with a native button and accessible expanded state.

### 2. Hero

- Three lines: `DESCRIBE IT`, `SHAPE IT`, `PROVE IT`.
- One CSS iridescent sphere behind the type.
- Thin concentric rings around the sphere.
- A compact explanation and “See the workflow” action.
- Scroll cue on desktop.

### 3. Promise

- Left: section label and short navigation cue.
- Right: 46px statement explaining prompt-to-verified-model.
- Supporting body copy about editable geometry and evidence.

### 4. Workflow

- Three connected horizontal stages, not three floating generic cards.
- 01 Describe, 02 Build, 03 Verify.
- Each stage lists its input and tangible output.

### 5. Interactive product preview

- Prompt selector with three realistic CAD requests.
- Central line-art CAD viewport.
- Parameter and verification rails.
- Status text, measurements, constraint count, and export formats update with the selected request.
- Keyboard-operable selection and an announcement region for changes.

Deterministic preview fixtures:

| Example | Envelope | Key parameters | Validation | History | Exports |
|---|---|---|---|---|---|
| Mounting bracket | 120 × 80 × 36 mm | plate 6 mm, hole Ø8.5 mm, fillet 4 mm | 8 constraints, watertight solid, minimum wall 6 mm | sketch → extrude → holes → fillet | STEP, STL, SVG |
| Electronics enclosure | 160 × 96 × 42 mm | wall 2.4 mm, clearance 0.3 mm, corner 8 mm | 14 constraints, lid clearance verified, draft check passed | shell → bosses → vents → lid | STEP, STL, DXF |
| Alignment jig | 210 × 70 × 24 mm | datum spacing 96 mm, pin Ø6 mm, pocket 3 mm | 11 constraints, datum alignment verified, tool access clear | base → pockets → pins → labels | STEP, STL, PDF |

### 6. Evidence

- An asymmetric grid of square Paper panels.
- Parameter record, geometry checks, DFM status, operation history, and export manifest.
- No fabricated performance percentages or customer claims.

### 7. Use cases

- Brackets and mounts.
- Jigs and fixtures.
- Product enclosures.
- Prototype mechanisms.
- Presented as a ruled editorial list rather than pill badges.

### 8. Closing CTA and footer

- Large statement: `MOVE FROM INTENT TO ENGINEERING EVIDENCE.`
- Primary action to explore the workspace preview. It uses `VITE_WORKSPACE_URL` when configured and otherwise targets `#product`.
- Secondary action to inspect the product flow.
- Footer clarifies that the website preview is illustrative and the workspace contains the real CAD pipeline.

## Interactions

- Smooth anchor navigation unless reduced motion is requested.
- Mobile navigation opens and closes with Escape support.
- Prompt examples update the CAD drawing, dimensions, validation summary, and export manifest.
- Active example uses text, an arrow, and border treatment, not color alone.
- Header obtains an Ink bottom rule after scrolling.

## Responsive behavior

- 1440px: full editorial composition, three hero lines placed around the sphere, 12-column grids.
- 1024px: maintain asymmetric composition with reduced display scale.
- 768px: collapse product rails beneath the viewport and use a 6-column content grid.
- 375px: stack hero lines, reduce sphere size, use one-column cards, and expose a compact menu.

## Technical direction

- React 19, TypeScript, Vite.
- Tailwind CSS v4 with `@theme` variables.
- DTCG-compatible `design-tokens.json` as the documented machine-readable token source.
- CSS variables organized into primitive, semantic, and component layers.
- Lucide React for UI icons.
- Pretext for measured text layout where long editorial copy needs resize-safe height calculation.
- Vitest and Testing Library for interaction tests.
- `design-tokens.json` is canonical; `src/styles/tokens.css` is its reviewed runtime mapping and must remain synchronized with this document.

## Acceptance criteria

- `npm run build`, `npm run typecheck`, and `npm test -- --run` pass.
- No raw hex colors in React component files.
- No shadows or rounded card containers.
- The only gradient is the hero sphere token.
- Main CTA is 32px high, 10px radius, and uses Ink/Parchment inversion.
- The interactive preview works with mouse and keyboard.
- No horizontal overflow at 375, 768, 1024, or 1440px.
- All decorative visuals have appropriate `aria-hidden` treatment.
- Ash `#bfbebe` is used only for non-text structure; all readable labels and statuses use Ink.
- The final handoff includes a token and visual-rule audit.
