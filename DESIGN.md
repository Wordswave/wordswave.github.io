# WordsWave Web Design System

Source: [OFF+BRAND. on Refero Styles](https://styles.refero.design/style/6b667ffc-5158-4000-9252-3a107d5161ee)

This file is the visual source of truth for the WordsWave product website. It adapts the reference system to a natural-language CAD workspace without changing its defining rules.

## North Star

**A focused engineering workspace presented with editorial clarity.**

The page uses a warm parchment canvas and large architectural typography. A single iridescent sphere is the only chromatic event. Product proof appears as precise, flat, rectilinear CAD surfaces rather than decorative marketing imagery.

## Non-negotiable principles

1. Use Parchment as the page canvas, Ink for text, Paper for elevated content, and Ash for 1px structure. Do not introduce another UI color.
2. Use the iridescent gradient exactly once, on the hero sphere. It never becomes a button, text, border, badge, or section background.
3. Cards and image frames are flat, square, and shadowless. Interactive controls use a 10px radius.
4. Display typography is large but controlled. Body text is 16px, supporting text is 14px, and metadata is never smaller than 12px.
5. The primary CTA has no special accent color. It is a 32px ghost control with an Ink border and inverts on hover.

## Token architecture

The codebase uses three layers:

```text
Primitive values → semantic roles → component tokens
```

Components must consume semantic or component tokens. Raw hex values and arbitrary radii must not appear in component files.

## Color tokens

| Primitive | Value | Semantic use |
|---|---:|---|
| Parchment | `#e5e4e0` | Page canvas and quiet section background |
| Ink | `#1d1d1d` | Primary text, controls, strong rules |
| Paper | `#ffffff` | CAD viewport and elevated rectangular surfaces |
| Ash | `#bfbebe` | Hairlines and non-text structural dividers only |
| Stone | `#cdcdc9` | Secondary panel surface |
| Spectrum yellow | `#facb00` | Hero sphere only |
| Spectrum pink | `#f06ba8` | Hero sphere only |
| Spectrum blue | `#78bae6` | Hero sphere only |

Hero sphere:

```css
linear-gradient(255deg, #facb00, #f06ba8 30%, #78bae6 65%, #ffffff)
```

## Typography

The reference uses the proprietary Ataero Retina OB Edition family. The website uses Inter as the approved substitute with a single responsive hierarchy. Roles, rather than individual components, control size, weight, line height, and tracking.

| Role | Desktop | Tablet | Mobile | Weight | Line height | Tracking | Measure |
|---|---:|---:|---:|---:|---:|---:|---:|
| Display | 82px | 68px | 48px | 400 | 0.92 | -0.045em | Hero only |
| Page title | 68px | 56px | 44px | 400 | 0.94 | -0.03em | 18ch |
| Section title | 52px | 44px | 36px | 400 | 1 | -0.03em | 22ch |
| Module title | 30px | 28px | 26px | 400 | 1.08 | -0.03em | 28ch |
| Lead | 17px | 17px | 17px | 400 | 1.45 | 0 | 42ch |
| Body | 16px | 16px | 16px | 400 | 1.5 | 0 | 62ch |
| Supporting | 14px | 14px | 14px | 400 | 1.45 | 0 | 62ch |
| Navigation | 14px | 14px | 14px | 500 | 1.45 | 0 | — |
| Metadata | 12px | 12px | 12px | 600 | 1.2 | 0.05em | — |

Use 400 for headings and reading text, 500 for navigation, and 600 only for compact interface labels. English headings use controlled negative tracking; Chinese display, page, section, and module headings use `0em` tracking. Breakpoints are 900px for tablet and 767px for mobile.

## Spacing and layout

- Base unit: 4px.
- Page gutters: 20px mobile, 30px tablet, 46px desktop.
- Element gap: 19px.
- Card padding: 30px.
- Section rhythm: 76px minimum, 119px desktop.
- Maximum content width: 1400px.
- Structural dividers: 1px Ash.
- Main grid: 12 columns on desktop, 6 on tablet, 1 on mobile.

## Shapes and elevation

| Element | Radius | Shadow |
|---|---:|---|
| Cards | 0px | none |
| CAD viewport | 0px | none |
| Images and media | 0px | none |
| Links and buttons | 10px | none |
| Inputs | 10px | none |
| Hero sphere | 50% | none |

## CTA specification

- Height: 32px.
- Horizontal padding: 19px.
- Label: 12px semibold uppercase with 0.05em tracking for compact CTA, or 14px medium sentence case for text-link CTA.
- Default: transparent background, 1px Ink border, Ink text.
- Hover: Ink background, Parchment text.
- Focus: visible 2px Ink outline with 2px offset.
- Active: no transform or fake depth.
- Disabled: 50% opacity with `aria-disabled` or native `disabled`.

## Card treatment

Cards behave like sheets on a drafting table:

- Paper surface on Parchment.
- Square corners.
- No box shadow.
- Optional 1px Ash grid or border.
- 30px padding on large cards.
- Content aligns to the global grid.
- Hover may change a border or reveal an arrow, but must not lift or scale the card.

## Image and illustration rules

- No stock photography or lifestyle imagery.
- Use real product UI, CAD silhouettes, line drawings, measurements, and manufacturing evidence.
- Use the supplied WordsWave logo unchanged; crop its vertical canvas non-destructively in shared header and footer lockups.
- Place the supplied product demo only on the Product page in a flat, square, ruled media frame.
- Monochrome product visuals are preferred.
- The hero sphere is a CSS visual, not a downloaded image.
- Grid-paper patterns can appear only inside product and evidence surfaces.
- Client logos, testimonials, and business metrics must not be invented.

## Motion

- Use restrained 150–300ms transitions.
- Hero text and product proof may reveal on first load with small opacity/translate changes.
- CAD geometry may rotate slowly only while the pointer is over the demo.
- Product video autoplays muted, loops, plays inline, and retains controls. Disable autoplay when `prefers-reduced-motion` is active.
- Respect `prefers-reduced-motion` and remove nonessential animation.

## Accessibility

- Maintain at least 4.5:1 contrast for normal text.
- Use Ink for all readable text. Ash must never carry required text or status information.
- All controls must be keyboard reachable and have visible focus.
- Do not encode validation status with color alone; pair it with text and icons.
- Preserve meaningful heading order and semantic landmark elements.
- Decorative sphere, rings, and grid patterns are hidden from assistive technology.

## Page structure

1. Minimal top navigation with product anchors and a compact CTA.
2. Full-viewport editorial hero with three-part headline, sphere, rings, description, and workflow CTA.
3. Product promise in an asymmetric two-column editorial block.
4. Prompt → model → verification workflow.
5. Interactive CAD workspace demonstration with selectable prompt examples.
6. Model-review section for parameters, geometry checks, manufacturing checks, history, and export.
7. Use-case strip for mechanical parts, fixtures, enclosures, and prototypes.
8. Large closing CTA and restrained footer.

## Content voice

- Precise and engineering-led.
- Short statements followed by concrete proof.
- Avoid generic AI claims such as “revolutionary” or “magic.”
- State what the product does, what the user can review, and what files are available.
- Avoid abstract slogans, personification, invented outcomes, and claims not supported by the product.
- Explain that the on-page interactive model is an illustrative WordsWave workspace preview.

## Source synchronization

`design-tokens.json` is the canonical machine-readable token source. `src/styles/tokens.css` is its explicit runtime mapping and `DESIGN.md` documents the same contract for humans and agents. Any token change must update all three files in the same change.
