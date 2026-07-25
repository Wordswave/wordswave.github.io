# Header Brand and Product Demo Copy Adjustment

## Scope

Make two focused changes without altering navigation, routes, footer branding, video behavior, or page structure:

1. Increase the header-only WordsWave lockup to a 40px logo symbol and an 18px wordmark.
2. Remove the Product demo support sentence in both English and Chinese.

## Design

- The shared `BrandMark` component remains unchanged.
- Header-specific CSS overrides the shared 32px symbol and 14px navigation-sized wordmark:
  - `.site-header .brand-mark-symbol`: `40px × 40px`
  - `.site-header .brand-mark-name`: `18px`, medium weight
- The header remains 64px high. The 40px lockup leaves 12px of vertical space above and below.
- Footer logo sizing remains unchanged.
- Remove the Product video `support` field from both locale trees and from its TypeScript contract.
- `ProductVideo` renders the section label, title, and video without an empty support element.
- The existing two-column heading grid remains unchanged to preserve the page structure.

## Verification

- Header tests retain the accessible brand link and existing navigation, workspace CTA, language switch, and mobile-menu behavior coverage.
- Browser computed-style checks confirm a 40px square header symbol, 18px/500 header wordmark, retained 64px header, and unchanged 32px/14px footer lockup.
- Browser checks cover English and Chinese at 375px, 768px, 1024px, and desktop widths, with no header overflow or control collisions.
- Content tests assert `product.video.support` is absent in both locale trees, neither retired support sentence exists, and `ProductVideo` renders no empty support paragraph.
- Content structure and snapshots remain equivalent across English and Chinese.
- Product video tests continue to cover autoplay, muted playback, controls, looping, and reduced-motion behavior.
- Run the full test suite, typecheck, production build, and inspect the header and Product page in the local browser.
