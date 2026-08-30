# Remove Decorative Micro Labels Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove decorative micro-labels, counters, rules, and non-action icons from the WordsWave marketing pages without removing functional product information.

**Architecture:** Simplify the existing React presentation components at their source rather than hiding content with CSS. Shared decorative props and components are removed from the component tree, marketing cards render only their meaningful copy, and CSS spacing is rebalanced around the new hierarchy. Bilingual content objects remain structurally unchanged because this is a presentation cleanup, not a copy migration.

**Tech Stack:** React 19, TypeScript, React Router, CSS custom properties, Vitest, Testing Library, Vite

---

## File Map

- Modify `src/App.test.tsx`: add route-level regression coverage for removed decorative UI.
- Modify `src/components/Hero.tsx`: remove the home scroll cue.
- Delete `src/components/SectionLabel.tsx`: remove the now-unneeded shared decorative label.
- Modify `src/components/PageHero.tsx`: remove the decorative `label` API and rendering.
- Modify `src/components/ClosingCta.tsx`: remove its eyebrow label.
- Modify `src/components/ProductVideo.tsx`, `src/components/ProductDemo.tsx`, `src/components/EvidenceGrid.tsx`, `src/components/Workflow.tsx`, and `src/components/UseCases.tsx`: remove section labels and marketing-only decoration.
- Modify `src/pages/HomePage.tsx`, `src/pages/ProductPage.tsx`, `src/pages/UseCasesPage.tsx`, `src/pages/DocsPage.tsx`, and `src/pages/AboutPage.tsx`: remove decorative props, counters, and card headers.
- Modify `src/styles/global.css`: delete dead selectors and rebalance title/card/list spacing.

### Task 1: Add regression coverage for decorative UI removal

**Files:**
- Modify: `src/App.test.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write the failing tests**

Add tests that render the affected routes and assert that decorative elements are absent while meaningful headings remain:

```tsx
it('omits decorative micro-labels from the home page', () => {
  const { container } = renderRoute('/')

  expect(screen.queryByLabelText('Scroll to the core workflow')).not.toBeInTheDocument()
  expect(container.querySelector('.closing-inner > .eyebrow')).not.toBeInTheDocument()
  expect(screen.queryByText('Start with a specific engineering request')).not.toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 2, name: /complete the core cad workflow/i })).toBeVisible()

  fireEvent.click(screen.getAllByRole('button', { name: '中文' })[0])
  expect(screen.queryByLabelText('滚动到核心流程')).not.toBeInTheDocument()
  expect(screen.queryByText('从具体工程需求开始')).not.toBeInTheDocument()
})

it.each(['/product', '/use-cases', '/docs', '/about'])(
  'omits decorative page and section labels from %s',
  (path) => {
    const { container } = renderRoute(path)

    expect(container.querySelector('.page-hero .eyebrow')).not.toBeInTheDocument()
    expect(container.querySelector('.page-shell > .flex.items-center.gap-3')).not.toBeInTheDocument()
  },
)
```

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `npm test -- --run src/App.test.tsx`

Expected: FAIL because the scroll cue, eyebrow labels, and section labels still render.

- [ ] **Step 3: Commit the red test**

```bash
git add src/App.test.tsx
git commit -m "test: cover decorative micro-label removal"
```

### Task 2: Remove shared hero and section decoration

**Files:**
- Modify: `src/components/Hero.tsx`
- Delete: `src/components/SectionLabel.tsx`
- Modify: `src/components/PageHero.tsx`
- Modify: `src/components/ClosingCta.tsx`
- Modify: `src/components/ProductVideo.tsx`
- Modify: `src/components/ProductDemo.tsx`
- Modify: `src/components/EvidenceGrid.tsx`
- Modify: `src/components/Workflow.tsx`
- Modify: `src/components/UseCases.tsx`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/ProductPage.tsx`
- Modify: `src/pages/UseCasesPage.tsx`
- Modify: `src/pages/DocsPage.tsx`
- Modify: `src/pages/AboutPage.tsx`

- [ ] **Step 1: Remove the home scroll cue**

In `Hero.tsx`, remove `ArrowDown` from the Lucide import and delete the `.scroll-cue` anchor. Keep the workflow CTA in `.hero-support` unchanged.

- [ ] **Step 2: Remove the shared section-label component and every usage**

Delete each `SectionLabel` import and JSX node from the five section components and three page components, then delete `src/components/SectionLabel.tsx`.

- [ ] **Step 3: Simplify the page-hero API**

Change the prop interface and component signature to omit `label`:

```tsx
interface PageHeroProps {
  title: string
  support: string
  primary: PageHeroAction
  secondary?: PageHeroAction
}

export function PageHero({ primary, secondary, support, title }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="page-hero">
      {/* existing orbits */}
      <div className="page-shell page-hero-inner">
        <h1 id="page-title">{title}</h1>
        {/* existing support and actions */}
      </div>
    </section>
  )
}
```

Remove `label={hero.label}` from Product, Use Cases, Docs, and About page callers.

- [ ] **Step 4: Remove the closing eyebrow**

Delete `<p className="eyebrow">{copy.home.closing.label}</p>` from `ClosingCta.tsx`. Preserve the heading, measured-text behavior, orbits, and both actions.

- [ ] **Step 5: Run type checking and the focused test**

Run: `npm run typecheck && npm test -- --run src/App.test.tsx`

Expected: type checking and the focused test PASS.

- [ ] **Step 6: Commit the shared structural cleanup**

```bash
git add src/components/Hero.tsx src/components/PageHero.tsx src/components/ClosingCta.tsx src/components/ProductVideo.tsx src/components/ProductDemo.tsx src/components/EvidenceGrid.tsx src/components/Workflow.tsx src/components/UseCases.tsx src/pages/HomePage.tsx src/pages/ProductPage.tsx src/pages/UseCasesPage.tsx src/pages/DocsPage.tsx src/pages/AboutPage.tsx
git add -u src/components/SectionLabel.tsx
git commit -m "style: remove decorative section labels"
```

### Task 3: Remove marketing-card counters and non-action icons

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/components/Workflow.tsx`
- Modify: `src/components/EvidenceGrid.tsx`
- Modify: `src/components/UseCases.tsx`
- Modify: `src/pages/DocsPage.tsx`
- Modify: `src/pages/AboutPage.tsx`

- [ ] **Step 1: Write failing marketing-card decoration tests**

Add route-specific assertions to `src/App.test.tsx`:

```tsx
it('omits decorative headers from home marketing cards', () => {
  const { container } = renderRoute('/')

  expect(container.querySelector('.value-card-head')).not.toBeInTheDocument()
  expect(container.querySelector('.workflow-step-head')).not.toBeInTheDocument()
})

it('omits decorative metadata from product evidence cards', () => {
  const { container } = renderRoute('/product')

  expect(container.querySelector('.evidence-card-head')).not.toBeInTheDocument()
  expect(container.querySelector('.evidence-card-copy > .eyebrow')).not.toBeInTheDocument()
  expect(screen.queryByText('↗')).not.toBeInTheDocument()
})

it.each([
  ['/use-cases', '.use-case-list > article > .eyebrow'],
  ['/docs', '.page-list-grid > li > .eyebrow'],
  ['/about', '.principle-grid > article > .eyebrow'],
])('omits decorative counters from %s', (path, selector) => {
  const { container } = renderRoute(path)
  expect(container.querySelector(selector)).not.toBeInTheDocument()
})

it('omits non-action arrows from use-case cards', () => {
  const { container } = renderRoute('/use-cases')
  expect(container.querySelector('.use-case-list article > svg')).not.toBeInTheDocument()
})
```

Run: `npm test -- --run src/App.test.tsx`

Expected: FAIL because the existing marketing-card decoration still renders.

- [ ] **Step 2: Simplify home value cards**

Remove the three decorative Lucide icon imports, `valueIcons`, the map index argument, and `.value-card-head`. Render each article with only its title and description wrapper.

- [ ] **Step 3: Simplify workflow cards**

Remove the workflow icon imports, `stepIcons`, the map index argument, and `.workflow-step-head`. Keep each step title, input, and output.

- [ ] **Step 4: Simplify evidence cards**

Keep `ArrowUpRight` only for the real Use Cases link. Remove `evidenceIcons`, `.evidence-card-head`, `item.label`, and the non-interactive `↗` at the end of evidence rows. Keep `index` only for the lead-card layout condition.

- [ ] **Step 5: Simplify use-case, docs, and about lists**

Remove non-clickable arrows and decorative index eyebrows from use-case articles. Remove index eyebrows and unused map indices from documentation steps and about principles. Preserve all titles and descriptions.

- [ ] **Step 6: Run the focused regression test**

Run: `npm test -- --run src/App.test.tsx`

Expected: PASS.

- [ ] **Step 7: Commit the green test and marketing-card cleanup**

```bash
git add src/App.test.tsx src/pages/HomePage.tsx src/components/Workflow.tsx src/components/EvidenceGrid.tsx src/components/UseCases.tsx src/pages/DocsPage.tsx src/pages/AboutPage.tsx
git commit -m "style: simplify marketing cards and lists"
```

### Task 4: Rebalance layout after removal

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Remove dead selectors**

Delete `.scroll-cue`, `.value-card-head`, `.workflow-step-head`, `.evidence-card-head`, `.eyebrow`, and the related mobile override. Functional product-preview metadata uses `.rail-label` and remains unchanged.

- [ ] **Step 2: Move primary headings into the vacated space**

Set the top margin to `0` for `.page-hero h1`, `.section-heading-row`, `.workflow-heading-row`, `.product-heading-row`, `.evidence-heading-row`, `.use-case-heading-row`, and `.closing-title` where the deleted label was their only preceding sibling.

Remove or zero the mobile-only `.page-hero h1` and `.workflow-heading-row` top-margin overrides so the deleted label does not leave empty space at 390px widths.

- [ ] **Step 3: Rebalance card and list layouts**

- Set `.workflow-sequence h3` top margin to `0` while retaining its bottom spacing.
- Set `.evidence-card-copy` and the top margin of `.evidence-card h3` to `0`, while keeping list spacing below the description.
- Change `.page-list-grid li` from a counter-plus-copy grid to a single content column.
- Change `.use-case-list article` to a two-column title/description layout on desktop and a one-column content layout on mobile.
- Reduce marketing-card minimum heights only if the rendered cards retain visibly empty upper space after the structural cleanup.

- [ ] **Step 4: Run type checking and all tests**

Run: `npm run typecheck && npm test -- --run`

Expected: all checks PASS.

- [ ] **Step 5: Commit the CSS cleanup**

```bash
git add src/styles/global.css
git commit -m "style: rebalance layouts after label cleanup"
```

### Task 5: Verify production behavior and visual consistency

**Files:**
- Verify: all files changed above

- [ ] **Step 1: Build the GitHub Pages artifact**

Run: `npm run test:pages && npm run build:pages`

Expected: the Pages artifact test and production build PASS.

- [ ] **Step 2: Start the local site**

Run: `npm run dev -- --host 127.0.0.1 --port 5173`

Expected: Vite serves the site at `http://127.0.0.1:5173/`.

- [ ] **Step 3: Check every route at desktop and mobile widths**

Inspect `/`, `/product`, `/use-cases`, `/docs`, and `/about` at approximately 1280px and 390px widths. Confirm:

- No home scroll cue, section labels, marketing card counters, decorative card icon rows, page-hero eyebrows, closing eyebrow, or non-action arrows remain.
- Functional product-preview labels and status fields remain.
- Section headings start cleanly without excessive top gaps.
- Cards and lists have balanced spacing.
- Navigation, language switching, real action arrows, and all route transitions work.
- There is no horizontal overflow and the browser console has no errors.

- [ ] **Step 4: Run the final repository checks**

Run:

```bash
git diff --check
git status --short --branch
git log --oneline main..HEAD
```

Expected: no whitespace errors, no unexpected working-tree changes, and only the intentional plan/implementation commits on `style/remove-decorative-micro-labels`.

- [ ] **Step 5: Record final evidence**

Capture representative desktop and mobile screenshots for the home and product pages and summarize the removed elements, preserved functional labels, test totals, build result, and any remaining visual concerns.
