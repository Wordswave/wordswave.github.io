# CAD Agent Multi-page Bilingual Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the existing single-page CAD Agent marketing site into a concise English/Simplified Chinese multi-page product website while preserving its visual system and interactive CAD preview.

**Architecture:** React Router provides five public routes plus a localized not-found route under one shared layout. A typed language context selects a complete `en` or `zh` content tree, persists the choice, and updates document metadata; existing visual components consume that tree rather than embedding copy. The existing token CSS and CAD SVG remain unchanged except for responsive internal-page styles.

**Tech Stack:** React 19, TypeScript, React Router, Vite, Tailwind CSS v4, Vitest, Testing Library

---

## File map

| Path | Responsibility |
|---|---|
| `src/i18n/content.ts` | Typed English and Simplified Chinese copy, navigation, page metadata, and translated CAD examples |
| `src/i18n/LanguageContext.tsx` | Language detection, persistence, document language, and copy access |
| `src/components/LanguageSwitch.tsx` | Accessible EN / 中文 selector |
| `src/components/SiteLayout.tsx` | Shared header, route outlet, footer, and route-scroll behavior |
| `src/components/PageHero.tsx` | Internal-page label, title, support copy, and actions |
| `src/routes/AppRoutes.tsx` | Route definitions and localized title updates |
| `src/pages/HomePage.tsx` | Positioning, three values, workflow, CTA |
| `src/pages/ProductPage.tsx` | Product hero, interactive demo, evidence |
| `src/pages/UseCasesPage.tsx` | Confirmed use-case content |
| `src/pages/DocsPage.tsx` | Conceptual first-use workflow and preview disclosure |
| `src/pages/AboutPage.tsx` | Product definition, principles, and boundary disclosure |
| `src/pages/NotFoundPage.tsx` | Localized invalid-route recovery |
| `src/components/SiteHeader.tsx` | Route navigation, mobile menu, language control, workspace CTA |
| `src/components/SiteFooter.tsx` | Shared route navigation and concise disclosure |
| `src/components/Hero.tsx` | Localized home hero |
| `src/components/Workflow.tsx` | Localized concise workflow |
| `src/components/ProductDemo.tsx` | Localized existing CAD preview |
| `src/components/EvidenceGrid.tsx` | Localized evidence panels |
| `src/components/UseCases.tsx` | Localized ruled use-case list |
| `src/components/ClosingCta.tsx` | Localized concise closing action |
| `src/App.tsx` | Browser router and language provider |
| `src/config.ts` | Workspace URL with `/product` fallback |
| `src/styles/global.css` | Shared page-hero, language switch, active navigation, page-list, and responsive styles |
| `src/App.test.tsx` | Route and localization integration tests |
| `README.md` | Local setup, workspace configuration, and SPA hosting fallback |

### Task 1: Router and localization foundation

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/i18n/content.ts`
- Create: `src/i18n/LanguageContext.tsx`
- Create: `src/components/LanguageSwitch.tsx`
- Create: `src/App.test.tsx`
- Modify: `src/config.ts`

- [ ] **Step 1: Install React Router**

Run: `npm install react-router-dom`

Expected: the dependency and lockfile update without audit errors.

- [ ] **Step 2: Write localization behavior tests**

Add integration coverage that verifies the default English content, switches to Chinese, checks `<html lang="zh-CN">`, reloads the provider, and observes the persisted Chinese selection.

- [ ] **Step 3: Run the focused test and verify failure**

Run: `npm test -- --run src/App.test.tsx`

Expected: FAIL because the language provider and route tree do not exist.

- [ ] **Step 4: Define the complete content schema**

Create one statically typed content tree for site navigation, actions, accessibility labels, five pages, not-found content, workflow, evidence, use cases, and three CAD examples. English and Chinese objects must satisfy the same type.

- [ ] **Step 5: Implement the language provider and switch**

Read `localStorage` first, then select Chinese for any `zh-*` browser locale and English otherwise. Persist changes, update `<html lang>`, and expose `language`, `copy`, and `setLanguage`. The switch uses native buttons with `aria-pressed`.

- [ ] **Step 6: Fix the workspace fallback**

Change the fallback from the removed `#product` single-page anchor to `/product`.

- [ ] **Step 7: Type-check**

Run: `npm run typecheck`

Expected: exit code 0 and no missing locale keys.

### Task 2: Shared route layout and navigation

**Files:**
- Create: `src/components/SiteLayout.tsx`
- Create: `src/components/PageHero.tsx`
- Create: `src/routes/AppRoutes.tsx`
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/ProductPage.tsx`
- Create: `src/pages/UseCasesPage.tsx`
- Create: `src/pages/DocsPage.tsx`
- Create: `src/pages/AboutPage.tsx`
- Create: `src/pages/NotFoundPage.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/components/SiteHeader.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update header tests for router and language providers**

Retain mobile-menu and scroll-rule assertions. Add route-link assertions, active-page state, and language-switch visibility.

- [ ] **Step 2: Implement the shared layout**

Render the skip link, localized header, `Outlet`, and localized footer. Scroll to the top on pathname changes and let hash navigation target sections inside the current route.

- [ ] **Step 3: Convert navigation to routes**

Use `NavLink` for Home, Product, Use cases, Docs, and About. Preserve the workspace anchor, mobile Escape behavior, and active Ink rule. Close the mobile menu when a route link is selected.

- [ ] **Step 4: Create the internal-page hero**

Support a short label, one H1, one support paragraph, one primary action, and one optional secondary action while reusing the existing token and orbit language.

- [ ] **Step 5: Create route-ready page shells**

Create the six page modules with their final component compositions and minimal localized headings so every route import resolves. Task 4 fills their complete approved content hierarchy after reusable content components are localized.

- [ ] **Step 6: Define routes and metadata**

Create `/`, `/product`, `/use-cases`, `/docs`, `/about`, and `*` routes. Set localized `document.title` on each page.

- [ ] **Step 7: Wire the application root**

Wrap the route tree with `LanguageProvider` and `BrowserRouter` in `App.tsx`.

- [ ] **Step 8: Close mobile navigation on every route change**

Observe `pathname` inside the header and close the mobile menu after route links, browser back/forward, or programmatic navigation. Cover both a clicked route link and a history-driven route change in the header or route integration tests.

- [ ] **Step 9: Localize the footer recovery action**

Render footer route links and the language-aware Back to top / 返回顶部 label from the content tree. Add an integration assertion for both languages.

- [ ] **Step 10: Verify shared-layout tests**

Run: `npm test -- --run src/components/SiteHeader.test.tsx src/App.test.tsx`

Expected: route, mobile menu, and language tests pass.

### Task 3: Localize and shorten reusable content components

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Workflow.tsx`
- Modify: `src/components/ProductDemo.tsx`
- Modify: `src/components/EvidenceGrid.tsx`
- Modify: `src/components/UseCases.tsx`
- Modify: `src/components/ClosingCta.tsx`
- Modify: `src/components/ProductDemo.test.tsx`
- Remove: `src/components/EditorialIntro.tsx`
- Remove: `src/data/cadExamples.ts`

- [ ] **Step 1: Convert components to localized content**

Read all visible labels and copy from the active content tree. Keep the CAD example IDs, geometry kinds, dimensions, and interaction behavior unchanged.

- [ ] **Step 2: Shorten home and product copy**

Hero support, workflow outputs, evidence descriptions, and closing CTA must follow the approved title + one-sentence support + action pattern. Delete repeated editorial explanations.

- [ ] **Step 3: Move CAD example strings into localization content**

Translate example titles, prompts, parameter labels, validation results, operation labels, and status text. Preserve numeric values and export formats.

- [ ] **Step 4: Update product interaction tests**

Verify English switching still works, then switch the site to Chinese and assert the selected example and validation copy are localized.

- [ ] **Step 5: Remove obsolete single-page modules**

Delete `EditorialIntro.tsx` and the old English-only `cadExamples.ts` after all imports move to the localized content tree.

- [ ] **Step 6: Run component tests and type-check**

Run: `npm test -- --run src/components/ProductDemo.test.tsx && npm run typecheck`

Expected: localized interaction passes and TypeScript reports no stale imports.

### Task 4: Build five focused pages

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/ProductPage.tsx`
- Modify: `src/pages/UseCasesPage.tsx`
- Modify: `src/pages/DocsPage.tsx`
- Modify: `src/pages/AboutPage.tsx`
- Modify: `src/pages/NotFoundPage.tsx`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Build the reduced home page**

Compose Hero, three concise values, the short workflow, and Closing CTA. Do not render ProductDemo, EvidenceGrid, or the full use-case list on home.

- [ ] **Step 2: Build the product page**

Compose PageHero, ProductDemo, and EvidenceGrid. Keep the example selector and all evidence states intact.

- [ ] **Step 3: Build the use-cases page**

Compose PageHero and the approved four-item UseCases list with a product action.

- [ ] **Step 4: Build the docs page**

Render the four approved conceptual summaries only. Add the preview disclosure and product CTA without inventing production controls.

- [ ] **Step 5: Build the about page**

Render the confirmed product definition, three principles, preview boundary, and product action. Do not add team, company, funding, or customer information.

- [ ] **Step 6: Build the not-found page**

Use only the selected language and provide a home action.

- [ ] **Step 7: Verify route integration**

Run: `npm test -- --run src/App.test.tsx && npm run typecheck`

Expected: all five routes and the fallback render the intended localized hierarchy.

### Task 5: Full verification and browser QA

**Files:**
- Create: `README.md`
- Modify only files implicated by verification failures.

- [ ] **Step 1: Run static verification**

Run: `npm run typecheck && npm test -- --run && npm run build && git diff --check`

Expected: all commands exit 0.

- [ ] **Step 2: Audit copy and visual-token compliance**

Search for old single-page anchor navigation, raw component colors, large rounded cards, shadows, and obsolete long-copy phrases.

Run: `rg -n 'href="#(workflow|evidence|use-cases)"|shadow-|rounded-(xl|2xl|3xl)|CAD Agent does not stop' src --glob '*.tsx'`

Expected: no obsolete home anchors, visual violations, or removed copy.

- [ ] **Step 3: Browser-test desktop routes**

At 1440×900, visit all routes directly, switch language, navigate through header/footer, switch a CAD example, and verify no console errors.

- [ ] **Step 4: Browser-test mobile routes**

At 375×812, open the menu, change language, navigate to each route, verify the menu closes, and check horizontal overflow.

- [ ] **Step 5: Verify intermediate viewports**

Check 768×1024 and 1024×768 for header fit, page-hero wrapping, product-demo layout, and footer navigation.

- [ ] **Step 6: Document hosting fallback**

Add a README note that production static hosting must rewrite application routes to `index.html` and show the `VITE_WORKSPACE_URL` configuration.

- [ ] **Step 7: Commit the verified refactor**

```bash
git add package.json package-lock.json src README.md docs
git commit -m "feat: add bilingual multipage product site"
```
