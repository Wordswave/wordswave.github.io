# Header Brand Offset Design

## Goal

Move the complete WordsWave brand group in the site header 4px to the left so it aligns more naturally with the page edge. The logo, brand name, and the spacing between them move as one unit.

## Scope

- Apply the offset only to the header wordmark link.
- Use the same 4px left offset on desktop, tablet, and mobile layouts.
- Keep the logo crop, 40px header logo size, 18px brand-name size, and internal gap unchanged.
- Keep the navigation, language switch, workspace button, mobile menu, page content, and footer unchanged.

## Implementation Design

Add a header-scoped positioning rule to `src/styles/global.css`:

```css
.site-header .wordmark {
  transform: translateX(-4px);
}
```

The transform changes only the rendered position of the brand group. It does not alter the shared `.page-shell` padding or the flex layout calculations for the other header controls.

## Responsive Behavior

The same rule applies at every breakpoint. No responsive override is required:

- Desktop: the brand group moves from the page-shell start edge to 4px left of that edge.
- Tablet and mobile: the brand group also moves 4px left while remaining inside the viewport.
- The mobile navigation panel retains its existing page-shell alignment.

## Accessibility and Interaction

- The existing link target, accessible name, keyboard behavior, and focus state remain unchanged.
- The wordmark remains fully visible and clickable.
- No content, routing, or language behavior changes.

## Verification

- Add a CSS regression test that asserts the header wordmark uses `translateX(-4px)`.
- Check the header visually at desktop and mobile viewport widths.
- Confirm the logo and brand name move together, with their internal spacing unchanged.
- Confirm the footer wordmark does not move.
- Run the full test suite, TypeScript type checking, and production build.
