# CAD Agent Marketing Site Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, runnable CAD Agent marketing homepage with a token-driven OFF+BRAND. visual system and an accessible interactive CAD product preview.

**Architecture:** A standalone React 19 and TypeScript application built with Vite. Design values flow from a DTCG JSON source into three CSS token layers and a Tailwind v4 `@theme inline` mapping; React components consume the resulting semantic utilities. Product-preview state is local and deterministic, while Pretext measures selected editorial text blocks during resize.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, @chenglou/pretext, Vitest, Testing Library

---

## File map

| Path | Responsibility |
|---|---|
| `package.json` | Scripts and runtime/development dependencies |
| `vite.config.ts` | Vite and Vitest configuration |
| `tsconfig.json` | Strict TypeScript configuration |
| `index.html` | Document shell and metadata |
| `design-tokens.json` | DTCG-compatible primitive, semantic, and component tokens |
| `DESIGN.md` | Human-readable visual source of truth |
| `src/styles/tokens.css` | Primitive → semantic → component CSS variables |
| `src/styles/theme.css` | Tailwind v4 `@theme inline` integration |
| `src/styles/global.css` | Reset, reusable patterns, motion, and responsive rules |
| `src/config.ts` | Workspace destination with `#product` fallback |
| `src/data/cadExamples.ts` | Typed interactive CAD preview fixtures |
| `src/hooks/useMeasuredText.ts` | Pretext preparation, measurement, and resize handling |
| `src/components/SectionLabel.tsx` | Reusable museum-label heading pattern |
| `src/components/SiteHeader.tsx` | Desktop/mobile navigation and workspace CTA |
| `src/components/Hero.tsx` | Editorial hero, sphere, rings, headline, and scroll cue |
| `src/components/EditorialIntro.tsx` | Product promise and measured editorial copy |
| `src/components/Workflow.tsx` | Connected three-stage workflow |
| `src/components/CadModel.tsx` | Accessible SVG CAD model variants and dimensions |
| `src/components/ProductDemo.tsx` | Interactive request selector, viewport, parameters, validation, export |
| `src/components/EvidenceGrid.tsx` | Engineering evidence panels |
| `src/components/UseCases.tsx` | Ruled use-case list |
| `src/components/ClosingCta.tsx` | Closing conversion section |
| `src/components/SiteFooter.tsx` | Footer links and preview disclosure |
| `src/App.tsx` | Page composition |
| `src/main.tsx` | React root and stylesheet imports |
| `src/test/setup.ts` | Testing Library setup |
| `src/components/ProductDemo.test.tsx` | Product-preview interaction test |
| `src/components/SiteHeader.test.tsx` | Mobile navigation accessibility test |

### Task 1: Scaffold and theme contract

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `index.html`
- Create: `design-tokens.json`
- Create: `src/styles/tokens.css`
- Create: `src/styles/theme.css`
- Create: `src/styles/global.css`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Define package scripts and dependencies**

Add `dev`, `build`, `typecheck`, `test`, and `preview` scripts. Install React, Tailwind v4, the Vite Tailwind plugin, Lucide, Pretext, Vitest, jsdom, and Testing Library.

- [ ] **Step 2: Create the DTCG token source**

Encode Refero values as primitive tokens, semantic aliases, and component tokens. Include Parchment `#e5e4e0`, Ink `#1d1d1d`, Paper `#ffffff`, Ash `#bfbebe`, Stone `#cdcdc9`, the hero spectrum stops, the 4px spacing base, the 11–103px type scale, 0px card radius, 10px interactive radius, and 32px CTA height.

- [ ] **Step 3: Wire tokens into CSS and Tailwind v4**

`tokens.css` defines the three token layers. `theme.css` imports Tailwind and maps semantic CSS variables with `@theme inline`, producing utilities such as `bg-canvas`, `text-ink`, `gap-element`, `rounded-interactive`, and `h-cta`.

- [ ] **Step 4: Add global layout and accessibility foundations**

Set the Parchment canvas, single-family typography, focus treatment, grid-paper utility, reduced-motion behavior, and responsive page gutters. Do not add shadows, rounded cards, or extra gradients.

- [ ] **Step 5: Configure workspace destination and test environment**

Export `workspaceUrl` from `VITE_WORKSPACE_URL` with `#product` as the default. Configure Vitest with jsdom and load `src/test/setup.ts` so component tests can run before later page-composition tasks.

Create a minimal semantic `App.tsx` shell so `src/main.tsx` has a valid import and the Task 1 type check exercises the real entry path. Task 5 replaces the shell content with the complete page composition.

- [ ] **Step 6: Install dependencies and verify the empty shell**

Run: `npm install`

Expected: dependencies install and a lockfile is generated.

Run: `npm run typecheck`

Expected: TypeScript exits with code 0.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json index.html design-tokens.json src/styles src/main.tsx src/App.tsx src/config.ts src/test/setup.ts DESIGN.md
git commit -m "chore: scaffold token-driven CAD web app"
```

### Task 2: Content model and measured typography

**Files:**
- Create: `src/data/cadExamples.ts`
- Create: `src/hooks/useMeasuredText.ts`
- Create: `src/components/SectionLabel.tsx`

- [ ] **Step 1: Define typed CAD examples**

Create three fixtures for a mounting bracket, electronics enclosure, and alignment jig. Each fixture contains the prompt, dimensions, parameters, constraints, validation copy, operations, and export formats used by the preview.

- [ ] **Step 2: Implement the Pretext measurement hook**

After `document.fonts.ready`, call `prepare(text, computedFont)`, then call `layout` on resize and expose the measured height. Re-prepare when the text changes and disconnect the `ResizeObserver` on unmount.

- [ ] **Step 3: Add the shared section label**

Render an optional index, uppercase label, and 1px ruled continuation using semantic token utilities.

- [ ] **Step 4: Type-check**

Run: `npm run typecheck`

Expected: exit code 0 with no implicit `any` or unsafe fixture access.

- [ ] **Step 5: Commit**

```bash
git add src/data src/hooks src/components/SectionLabel.tsx
git commit -m "feat: add CAD content model and measured type"
```

### Task 3: Header, hero, promise, and workflow

**Files:**
- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/EditorialIntro.tsx`
- Create: `src/components/Workflow.tsx`
- Create: `src/components/SiteHeader.test.tsx`

- [ ] **Step 1: Write the mobile-navigation test**

Render the header at its default state, open the menu, assert `aria-expanded="true"`, verify navigation links are visible, press Escape, and assert the menu closes. Dispatch a scroll event after setting a nonzero scroll position and assert the ruled-header state is exposed through a testable data attribute.

- [ ] **Step 2: Run the focused test and observe failure**

Run: `npm test -- --run src/components/SiteHeader.test.tsx`

Expected: FAIL because `SiteHeader` does not exist.

- [ ] **Step 3: Implement the responsive header**

Use a sticky Parchment surface, a compact wordmark, anchor links, the 32px tokenized CTA, and an accessible mobile menu. The CTA consumes `workspaceUrl`. Escape closes the menu and anchor selection returns focus to a predictable state. Add the Ink bottom rule after the page scrolls beyond the hero threshold.

- [ ] **Step 4: Implement the hero**

Place `DESCRIBE IT`, `SHAPE IT`, and `PROVE IT` around one CSS gradient sphere and concentric rings. Add the concrete product description, workflow CTA, and desktop scroll indicator.

- [ ] **Step 5: Implement promise and workflow sections**

Use an asymmetric editorial block for the promise. Render the three workflow steps as a connected ruled sequence, with inputs and outputs rather than generic feature-card copy.

- [ ] **Step 6: Verify test and type check**

Run: `npm test -- --run src/components/SiteHeader.test.tsx && npm run typecheck`

Expected: test passes and TypeScript exits 0.

- [ ] **Step 7: Commit**

```bash
git add src/components/SiteHeader.tsx src/components/Hero.tsx src/components/EditorialIntro.tsx src/components/Workflow.tsx src/components/SiteHeader.test.tsx
git commit -m "feat: build editorial landing sections"
```

### Task 4: Interactive CAD product preview

**Files:**
- Create: `src/components/CadModel.tsx`
- Create: `src/components/ProductDemo.tsx`
- Create: `src/components/ProductDemo.test.tsx`

- [ ] **Step 1: Write the example-switching test**

Render the product preview, select the enclosure request, then assert that its title, dimensions, operation count, validation message, and export formats replace the bracket values. Verify selection state uses `aria-pressed` and that the active row includes a visible directional-arrow label, protecting the non-color state cue.

- [ ] **Step 2: Run the focused test and observe failure**

Run: `npm test -- --run src/components/ProductDemo.test.tsx`

Expected: FAIL because `ProductDemo` does not exist.

- [ ] **Step 3: Build the CAD SVG variants**

Draw each model with semantic Ink/Ash/Paper colors. Include dimension lines and textual values. Use `aria-hidden` on decorative geometry and provide the model name outside the SVG.

- [ ] **Step 4: Build the interactive preview shell**

Create the selectable prompt rail, central viewport, parameter list, verification panel, operation history, and export manifest. Keep all containers square and shadowless. Active examples must combine Ink text, a directional arrow, `aria-pressed`, and a stronger border so selection never relies on color alone. Announce changes through an `aria-live="polite"` region.

- [ ] **Step 5: Verify interaction and typing**

Run: `npm test -- --run src/components/ProductDemo.test.tsx && npm run typecheck`

Expected: test passes and TypeScript exits 0.

- [ ] **Step 6: Commit**

```bash
git add src/components/CadModel.tsx src/components/ProductDemo.tsx src/components/ProductDemo.test.tsx
git commit -m "feat: add interactive CAD product preview"
```

### Task 5: Evidence, use cases, closing CTA, and composition

**Files:**
- Create: `src/components/EvidenceGrid.tsx`
- Create: `src/components/UseCases.tsx`
- Create: `src/components/ClosingCta.tsx`
- Create: `src/components/SiteFooter.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Implement evidence panels**

Create flat, ruled Paper panels for parameters, validation, DFM checks, history, and export. State capabilities without invented customer metrics.

- [ ] **Step 2: Implement the use-case list**

Render four ruled rows with an index, task family, and concrete output.

- [ ] **Step 3: Implement closing CTA and footer**

Use a large measured statement, tokenized ghost CTAs, product links, and a disclosure that the page demo is illustrative.

- [ ] **Step 4: Compose the semantic page**

Assemble one `main` with unique section IDs and a valid heading hierarchy. Add skip navigation and document metadata.

- [ ] **Step 5: Run the complete test suite**

Run: `npm test -- --run`

Expected: all component tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/components src/App.tsx index.html
git commit -m "feat: complete CAD Agent product homepage"
```

### Task 6: Build and visual verification

**Files:**
- Modify only files implicated by verification failures.

- [ ] **Step 1: Run static verification**

Run: `npm run typecheck && npm test -- --run && npm run build`

Expected: all commands exit 0 and Vite writes `dist/`.

- [ ] **Step 2: Audit token compliance**

Search component files for raw hex colors, arbitrary shadows, and rounded card utilities.

Run: `rg -n '#[0-9a-fA-F]{3,8}|shadow-|rounded-(xl|2xl|3xl)' src --glob '*.tsx'`

Expected: no output.

Run: `rg -n 'text-ash|color-ash' src --glob '*.tsx'`

Expected: no output; Ash is structural and must not style readable text.

- [ ] **Step 3: Start a local preview**

Run: `npm run dev -- --host 127.0.0.1 --port 4173`

Expected: Vite serves the page at `http://127.0.0.1:4173`.

- [ ] **Step 4: Verify desktop and mobile behavior**

Use the browser tool at 1440×900, 1024×768, 768×1024, and 375×812. Check horizontal overflow, heading overlap, navigation, prompt switching, keyboard focus, CTA height, card corners, and the single-gradient rule.

- [ ] **Step 5: Inspect runtime quality**

Check the browser console for errors, ensure all internal anchors resolve, and verify reduced-motion behavior through source inspection.

- [ ] **Step 6: Record final self-audit**

Report color, typography, spacing, radii, cards, CTA, and image usage against `DESIGN.md`.

- [ ] **Step 7: Commit verification fixes**

```bash
git add src package.json package-lock.json vite.config.ts tsconfig.json index.html design-tokens.json DESIGN.md docs
git commit -m "fix: polish responsive CAD web experience"
```
