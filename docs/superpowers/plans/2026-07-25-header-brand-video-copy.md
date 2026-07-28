# Header Brand and Product Demo Copy Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase the header-only WordsWave lockup to 40px/18px and remove the Product demo support sentence in both languages.

**Architecture:** Keep the shared `BrandMark` dimensions as the footer default and add header-scoped CSS overrides. Remove the support field from the bilingual content contract and conditionally eliminate its rendered paragraph rather than leaving empty content.

**Tech Stack:** React 19, TypeScript, CSS custom properties, Vitest, Testing Library, Vite

---

## File map

| Path | Responsibility |
|---|---|
| `src/i18n/content.ts` | Typed English and Chinese Product demo copy |
| `src/i18n/content.test.ts` | Bilingual structure and retired-copy regression checks |
| `src/i18n/__snapshots__/content.test.ts.snap` | Exact runtime copy contract |
| `src/components/ProductVideo.tsx` | Product demo section rendering and media behavior |
| `src/components/ProductVideo.test.tsx` | Product demo copy and media behavior |
| `src/styles/global.css` | Shared brand defaults and header-only sizing overrides |
| `src/components/SiteHeader.test.tsx` | Header brand and navigation behavior |

### Task 1: Remove the Product demo support sentence

**Files:**
- Modify: `src/i18n/content.test.ts`
- Modify: `src/components/ProductVideo.test.tsx`
- Modify: `src/i18n/content.ts`
- Modify: `src/components/ProductVideo.tsx`
- Modify: `src/i18n/__snapshots__/content.test.ts.snap`

- [ ] **Step 1: Add failing copy assertions**

Assert that neither locale exposes `product.video.support`, neither retired sentence appears in serialized runtime copy, and `ProductVideo` has no support paragraph:

```ts
expect(content.en.product.video).not.toHaveProperty('support')
expect(content.zh.product.video).not.toHaveProperty('support')
expect(JSON.stringify(content)).not.toMatch(
  /Watch the current CAD creation and review workflow|了解当前 CAD 创建与检查流程/,
)
expect(container.querySelector('.product-heading-row > p')).not.toBeInTheDocument()
```

- [ ] **Step 2: Verify the focused tests fail**

Run:

```bash
npm test -- --run src/i18n/content.test.ts src/components/ProductVideo.test.tsx
```

Expected: FAIL because both locale trees and `ProductVideo` still contain the support copy.

- [ ] **Step 3: Remove the field and rendered element**

Delete `support` from the `SiteCopy.product.video` interface, English content, Chinese content, and the `<p>{video.support}</p>` element in `ProductVideo`.

- [ ] **Step 4: Update and verify the content snapshot**

Run:

```bash
npm test -- --run src/i18n/content.test.ts -u
npm test -- --run src/i18n/content.test.ts src/components/ProductVideo.test.tsx
```

Expected: the snapshot updates once and both focused files pass.

### Task 2: Increase the header-only brand lockup

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/SiteHeader.test.tsx`

- [ ] **Step 1: Add the header sizing contract**

Extend the header test to retain the accessible WordsWave link, logo asset, visible wordmark, navigation, workspace CTA, language switch, and mobile-menu behavior. The rendered-size contract will be verified in the browser because jsdom does not calculate the production CSS layout.

- [ ] **Step 2: Add header-scoped styles**

Add:

```css
.site-header .brand-mark-symbol {
  width: 40px;
  height: 40px;
}

.site-header .brand-mark-name {
  font-size: 18px;
  font-weight: var(--primitive-type-weight-medium);
}
```

Do not change `.brand-mark-symbol`, `.brand-mark-name`, or `.site-footer`, so the footer remains at 32px/14px.

- [ ] **Step 3: Run focused header tests**

Run:

```bash
npm test -- --run src/components/SiteHeader.test.tsx
```

Expected: PASS.

### Task 3: Verify the complete result

**Files:**
- Verify only

- [ ] **Step 1: Run full automated verification**

Run:

```bash
npm test -- --run
npm run typecheck
npm run build
git diff --check
```

Expected: all commands exit 0.

- [ ] **Step 2: Verify computed styles and responsive behavior**

On the local site, check English and Chinese at 375px, 768px, 1024px, and desktop:

- header symbol is `40px × 40px`;
- header wordmark is `18px` and weight `500`;
- header remains `64px`;
- footer symbol remains `32px` and footer wordmark remains `14px`;
- no header overflow or collisions;
- navigation, workspace CTA, language switch, and mobile menu remain usable;
- Product demo renders no empty support paragraph.

- [ ] **Step 3: Preserve the existing dirty worktree**

Do not create an implementation commit in this pass. The affected files already contain approved prior work that is not isolated in the index, so staging them would mix unrelated changes into this focused adjustment.
