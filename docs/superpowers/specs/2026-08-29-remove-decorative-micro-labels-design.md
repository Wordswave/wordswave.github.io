# Remove Decorative Micro Labels

## Goal

Reduce visual noise caused by small decorative labels, counters, rules, and icon rows while preserving the website's content hierarchy, routes, actions, and product functionality.

## Scope

Remove the following presentation-only elements across the marketing site:

- The home hero scroll cue.
- Section labels composed of an index, horizontal rule, and short label.
- Number-and-icon header rows in marketing value and workflow cards.
- Small eyebrow labels above page heroes and the closing call to action.
- Comparable decorative indices in use-case rows, documentation steps, and about-page principle cards when they do not carry unique information.
- Evidence-card number/icon headers, small category eyebrows, and row-end arrows that do not trigger an action.
- Arrow icons in non-clickable use-case cards.

Preserve the following:

- Page titles, section titles, body copy, calls to action, navigation, and footer content.
- Functional labels, statuses, parameters, and field names inside the interactive product preview.
- Icons that communicate an action or product state rather than decorate a marketing card.
- Arrow icons attached to real buttons and links.
- Existing layout, color, typography tokens, responsive behavior, and bilingual content data.

## Component Changes

- `Hero`: remove the visible scroll cue and its icon.
- `SectionLabel`: remove all usages, then delete the unused component.
- `PageHero`: stop accepting and rendering the decorative `label` prop; update callers.
- `ClosingCta`: remove the eyebrow label while keeping its title and actions.
- Marketing card and list components, including `EvidenceGrid`, `DocsPage`, and `AboutPage`: remove decorative counters, category eyebrows, number/icon containers, and non-action arrows; simplify now-unused imports.
- CSS: remove selectors used only by deleted elements and rebalance spacing where their removal would leave an unintended gap.

## Visual Behavior

Section titles become the first visible content at the start of each section. Cards begin directly with their titles and descriptions. Existing borders continue to define groups, but no isolated microcopy competes with the primary hierarchy.

The interactive product workspace retains its compact labels because they identify controls, parameters, model state, and output information.

## Accessibility

Removing decorative content does not remove meaningful headings or actions. The home hero no longer includes a scroll shortcut, but its existing workflow action remains available. Heading order and landmark structure stay unchanged.

## Verification

- Run component tests, type checking, and the production Pages build.
- Confirm deleted strings are absent from rendered marketing surfaces in both languages.
- Check home, product, use-cases, docs, and about pages at desktop and mobile widths.
- Confirm spacing remains balanced, navigation works, there is no horizontal overflow, and the browser console is clean.
