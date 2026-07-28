# Header Brand Offset Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the complete WordsWave brand group in the site header 4px left at every viewport width without moving the footer wordmark or other header controls.

**Architecture:** Add one header-scoped transform to the existing global stylesheet so the visual offset does not change page-shell padding or flex layout. Protect the behavior with a focused raw-CSS regression test, then verify the shared header at desktop, tablet, and mobile widths and compare the footer.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, global CSS, Vitest, Vite, gstack browse

---

## File Structure

- Create `src/styles/headerBrandOffset.test.ts`: focused regression coverage for the header-only brand transform.
- Modify `src/styles/global.css`: add the approved 4px header wordmark transform near the existing header brand-size rules.
- Do not modify `SiteHeader.tsx`, shared page-shell tokens, responsive breakpoints, or footer styles.

### Task 1: Add regression coverage for the header-only offset

**Files:**
- Create: `src/styles/headerBrandOffset.test.ts`
- Reference: `src/styles/global.css:259-283`

- [x] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest'
import globalCss from './global.css?raw'

describe('header brand offset', () => {
  it('moves only the header wordmark 4px left', () => {
    const headerWordmarkRule = globalCss.match(/\.site-header \.wordmark\s*\{([^}]+)\}/)?.[1]

    expect(headerWordmarkRule).toBeDefined()
    expect(headerWordmarkRule).toContain('transform: translateX(-4px)')
    expect(globalCss).not.toMatch(/\.site-footer \.wordmark\s*\{[^}]*translateX/)
  })
})
```

- [x] **Step 2: Run the targeted test and verify it fails**

Run:

```bash
npm test -- --run src/styles/headerBrandOffset.test.ts
```

Expected: FAIL because `.site-header .wordmark` does not yet define `transform: translateX(-4px)`.

### Task 2: Apply the minimal header-scoped style

**Files:**
- Modify: `src/styles/global.css:274-283`
- Test: `src/styles/headerBrandOffset.test.ts`

- [x] **Step 1: Add the approved transform**

Insert immediately before the existing `.site-header .brand-mark-symbol` rule:

```css
.site-header .wordmark {
  transform: translateX(-4px);
}
```

- [x] **Step 2: Run the targeted test and verify it passes**

Run:

```bash
npm test -- --run src/styles/headerBrandOffset.test.ts
```

Expected: 1 test file passed, 1 test passed.

- [x] **Step 3: Inspect the scoped diff**

Run:

```bash
git diff -- src/styles/global.css src/styles/headerBrandOffset.test.ts
```

Expected: the new test plus only the new three-line header wordmark rule within the current `global.css` worktree changes. Do not discard or stage unrelated pre-existing changes.

### Task 3: Verify responsive placement and project health

**Files:**
- Verify: `src/styles/global.css`
- Verify: `src/styles/headerBrandOffset.test.ts`

- [x] **Step 1: Check the rendered header at three widths**

Open the local site and verify:

- Desktop, 1280px wide: Logo and WordsWave move together 4px left.
- Tablet, 768px wide: the same 4px offset applies and the wordmark remains fully visible.
- Mobile, 390px wide: the same 4px offset applies and the wordmark remains fully visible.
- At every width, the internal logo-to-name gap and the positions of navigation, language controls, workspace button, and mobile menu remain unchanged.

- [x] **Step 2: Check the footer comparison**

Scroll to the footer at desktop and mobile widths. Confirm its wordmark retains the original alignment and receives no transform.

- [x] **Step 3: Run the complete automated verification**

Run:

```bash
npm test -- --run
npm run typecheck
npm run build
```

Expected:

- All Vitest files and tests pass.
- TypeScript exits with code 0.
- Vite production build exits with code 0.

- [x] **Step 4: Leave the implementation uncommitted**

`src/styles/global.css` already contains earlier uncommitted website work. Do not create an implementation commit that could capture unrelated changes. Report the two implementation files changed and the verification results to the user.
