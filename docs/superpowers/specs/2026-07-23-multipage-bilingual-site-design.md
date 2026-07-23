# CAD Agent Multi-page Bilingual Website Design

## Goal

Refactor the current single-page product site into a concise bilingual product website without changing its visual system, confirmed product meaning, or interactive CAD preview.

## Constraints

- Preserve the OFF+BRAND-inspired visual language, token architecture, responsive behavior, and product-demo interaction.
- Do not add unconfirmed capabilities, customer claims, usage metrics, team information, pricing, authentication, or enterprise promises.
- Keep English and Simplified Chinese complete and equivalent in meaning.
- Keep body copy to one or two short sentences wherever possible.
- Maintain the configured workspace destination through `VITE_WORKSPACE_URL`; use `/product` as the safe site fallback.
- Do not create a fake login or console screen.

## Information architecture

| Route | Purpose | Content | Primary action |
|---|---|---|---|
| `/` | Establish the product position quickly | Hero, three core values, three-step workflow, closing CTA | View product / open workspace |
| `/product` | Show how the product works | Interactive CAD preview, parameter/validation/history/export evidence, concise capability grid | Switch examples / open workspace |
| `/use-cases` | Help visitors judge fit | Brackets and mounts, jigs and fixtures, enclosures, prototype mechanisms | View product |
| `/docs` | Provide a clear first-use path | Describe, review, verify, export; concise help topics based on confirmed workflow | View product demo |
| `/about` | Explain product intent and boundaries | Product definition, principles, website-preview disclosure | View product |
| `*` | Recover from invalid links | Short not-found message | Return home |

No separate Solutions page is created because the project does not contain confirmed industry-specific solutions, packages, or buyer-specific claims. No Login page is created because authentication and a deployed console are not part of this website project.

## Primary user paths

1. New visitor: Home → Product → configured workspace.
2. Evaluating fit: Home → Use cases → Product.
3. Learning the workflow: Home or Product → Docs → Product.
4. Looking for context: Any page → About → Product.
5. Chinese reader: switch language once → retain language across navigation and reload.

## Copy system

### Voice

- Precise, calm, and direct.
- Lead with the user outcome, then name the supporting capability.
- Use short nouns and verbs rather than explanatory clauses.
- Avoid “revolutionary,” “magic,” “unlock,” “seamless,” and other unverified or generic claims.
- Do not repeat the same claim in hero, intro, workflow, and closing CTA.

### Page-level structure

Each page uses:

1. Short page label.
2. One decisive H1.
3. One or two sentences of support copy.
4. One primary action and at most one secondary action.
5. Only the content required to complete that page's purpose.

### Approved core message

English:

- Position: `CAD from intent to evidence.`
- Support: `Create editable geometry, review constraints, and export with confidence.`
- CTA: `View product` / `Open workspace`.

Chinese:

- Position: `从设计意图到工程证据。`
- Support: `生成可编辑几何，检查约束，并可靠导出。`
- CTA: `查看产品` / `打开工作台`.

## Localization architecture

- `LanguageProvider` owns `en | zh` state.
- Initial language comes from `localStorage`; when absent, `navigator.language` selects Chinese only for `zh-*` locales and English otherwise.
- The selected language is persisted under a namespaced key and updates `<html lang>`.
- `content.ts` is the only source for navigation, page copy, component labels, and translated CAD example strings.
- Components receive translated content from the language hook; no parallel English-only and Chinese-only component trees.
- The language switch is a two-option control labeled `EN / 中文`, keyboard accessible, and available in desktop and mobile navigation.

## Routing architecture

- Use `react-router-dom` with `BrowserRouter`, shared `SiteLayout`, and one route component per page.
- Navigation uses `NavLink` for active state and closes the mobile menu after route changes.
- Route changes scroll to the top; hash links continue to work for sections within a page.
- Internal links use router navigation. The workspace CTA remains a normal anchor because it may point to an external deployment.
- Vite development fallback and production SPA fallback are assumed; the deliverable documents that static hosting must rewrite unknown paths to `index.html`.

## Page design

### Home

- Keep the hero sphere, rings, and three-line typographic composition.
- Replace the current hero phrase with the shorter localized product position.
- Keep one support sentence and two actions.
- Replace the long editorial promise and five-panel evidence grid with three concise value statements.
- Keep the connected three-step workflow with shorter labels and one-line outputs.
- Keep the closing CTA, but remove repeated explanatory copy.

### Product

- Use a compact internal-page hero.
- Reuse the existing interactive `ProductDemo` and `CadModel` without changing their behavior.
- Move engineering evidence from the home page to this page.
- Localize example titles, prompts, parameter labels, validation results, operations, and interface labels.

### Use cases

- Use the existing ruled list and square editorial cards.
- Each use case contains one short title, one sentence describing the task, and one line naming the expected CAD output.
- No industries, customer personas, or success metrics are invented.

### Docs

- This is an onboarding/help page, not a claim of a complete documentation platform.
- Organize the confirmed workflow into four sections: describe, review, verify, export.
- Include a short “What the preview includes” disclosure and a product-demo CTA.

### About

- Describe CAD Agent as an engineering workspace for natural-language CAD generation and editing.
- State three product principles: editable over visual-only, evidence beside geometry, explicit workflow history.
- Clearly state that this marketing-site preview is illustrative and does not call the production backend.

## Shared components

- `SiteLayout`: shared header, route outlet, footer, and route-scroll behavior.
- `SiteHeader`: route navigation, language switch, mobile menu, workspace CTA.
- `SiteFooter`: route navigation, concise disclosure, language-aware back-to-top label.
- `PageHero`: reusable internal-page label, H1, support copy, and actions.
- `LanguageSwitch`: isolated accessible locale selector.
- Existing `SectionLabel`, `Workflow`, `ProductDemo`, `EvidenceGrid`, `UseCases`, and `ClosingCta` become content-driven and localized.

## Error and fallback behavior

- Unknown route renders a bilingual not-found page with a home action.
- Missing `VITE_WORKSPACE_URL` falls back to `/product`, never a dead or fake login route.
- Missing saved language falls back deterministically to the browser language rule.
- Localization content is statically typed so missing English or Chinese fields fail TypeScript.

## Accessibility

- Language switch exposes pressed/selected state and a clear accessible label in the current language.
- Active navigation state uses `aria-current="page"`, text, and the existing Ink rule rather than color alone.
- Page routes have one H1 and maintain the existing focus indicators.
- Mobile menu retains Escape handling.
- Route changes update `document.title` and move content to the top without stealing keyboard focus.

## Testing and acceptance criteria

- Home contains only positioning, core value, workflow, and CTA content.
- `/product`, `/use-cases`, `/docs`, `/about`, and an unknown path render their intended page.
- Header and footer navigation resolve to real routes.
- Language switch changes visible navigation and page copy, persists the value, and updates `<html lang>`.
- Product example switching continues to update model evidence in both languages.
- Mobile navigation opens, closes with Escape, and navigates between routes.
- No horizontal overflow at 375, 768, 1024, or 1440px.
- `npm run typecheck`, `npm test -- --run`, and `npm run build` pass.

