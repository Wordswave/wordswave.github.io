# CAD Agent Web Design System

Source: [OFF+BRAND. on Refero Styles](https://styles.refero.design/style/6b667ffc-5158-4000-9252-3a107d5161ee)

This file is the visual source of truth for the CAD Agent product website. It adapts the reference system to a technical CAD product without changing its defining rules.

## North Star

**Verified engineering, presented like an editorial instrument.**

The page uses a warm parchment canvas and large architectural typography. A single iridescent sphere is the only chromatic event. Product proof appears as precise, flat, rectilinear CAD surfaces rather than decorative marketing imagery.

## Non-negotiable principles

1. Use Parchment as the page canvas, Ink for text, Paper for elevated content, and Ash for 1px structure. Do not introduce another UI color.
2. Use the iridescent gradient exactly once, on the hero sphere. It never becomes a button, text, border, badge, or section background.
3. Cards and image frames are flat, square, and shadowless. Interactive controls use a 10px radius.
4. Display typography is large and tightly stacked. Body text stays between 15px and 18px. Section labels are 11px, uppercase, and widely tracked.
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

The reference uses the proprietary Ataero Retina OB Edition family. The website uses Inter as the approved prototype substitute with tight tracking and a single-family hierarchy.

| Role | Size | Line height | Letter spacing | Use |
|---|---:|---:|---:|---|
| Caption | 11px | 1.4 | 0.05em | Section labels, metadata |
| Body small | 15px | 1.4 | 0.01em | Navigation, controls |
| Body | 18px | 1.4 | 0.01em | Product explanation |
| Subheading | 34px | 1 | 0.006em | Capability headings |
| Heading small | 46px | 1 | 0.006em | Section statements |
| Heading | 70px | 0.8 | 0.013em | Responsive display |
| Heading large | 76px | 0.8 | 0.013em | Desktop display |
| Display | 103px | 0.8 | 0.013em | Hero typography |

Use weight 400 for body and display. Use 600–700 only for small interface labels where the original uses a heavier weight.

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
- Label: 11px uppercase with 0.05em tracking for compact CTA, or 15px sentence case for text-link CTA.
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
- Monochrome product visuals are preferred.
- The hero sphere is a CSS visual, not a downloaded image.
- Grid-paper patterns can appear only inside product and evidence surfaces.
- Client logos, testimonials, and business metrics must not be invented.

## Motion

- Use restrained 150–300ms transitions.
- Hero text and product proof may reveal on first load with small opacity/translate changes.
- CAD geometry may rotate slowly only while the pointer is over the demo.
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
2. Full-viewport editorial hero with three-part headline, sphere, rings, description, and scroll cue.
3. Product promise in an asymmetric two-column editorial block.
4. Prompt → model → verification workflow.
5. Interactive CAD workspace demonstration with selectable prompt examples.
6. Evidence section for parameters, validation, DFM, history, and export.
7. Use-case strip for mechanical parts, fixtures, enclosures, and prototypes.
8. Large closing CTA and restrained footer.

## Content voice

- Precise and engineering-led.
- Short statements followed by concrete proof.
- Avoid generic AI claims such as “revolutionary” or “magic.”
- Prefer “Generate a verified bracket from intent” over “Unlock limitless creativity.”
- Explain that the on-page demo is illustrative until a production website is connected to the CAD Agent backend.

## Source synchronization

`design-tokens.json` is the canonical machine-readable token source. `src/styles/tokens.css` is its explicit runtime mapping and `DESIGN.md` documents the same contract for humans and agents. Any token change must update all three files in the same change.
