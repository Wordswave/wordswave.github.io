import { describe, expect, it } from 'vitest'
import tokenJson from '../../design-tokens.json'
import designDoc from '../../DESIGN.md?raw'
import tokenCss from './tokens.css?raw'


describe('typography token contract', () => {
  it('defines the approved primitive hierarchy', () => {
    const sizes = tokenJson.primitive.font.size

    expect(sizes.display.$value).toBe('82px')
    expect(sizes['page-title'].$value).toBe('68px')
    expect(sizes['section-title'].$value).toBe('52px')
    expect(sizes['module-title'].$value).toBe('30px')
    expect(sizes.lead.$value).toBe('17px')
    expect(sizes.body.$value).toBe('16px')
    expect(sizes.supporting.$value).toBe('14px')
    expect(sizes.metadata.$value).toBe('12px')

    expect(tokenJson.primitive.font.weight).toMatchObject({
      regular: { $value: 400 },
      medium: { $value: 500 },
      semibold: { $value: 600 },
    })
    expect(tokenJson.primitive.font.lineHeight).toMatchObject({
      display: { $value: 0.92 },
      page: { $value: 0.94 },
      section: { $value: 1 },
      module: { $value: 1.08 },
      lead: { $value: 1.45 },
      body: { $value: 1.5 },
      supporting: { $value: 1.45 },
    })
    expect(tokenJson.primitive.font.tracking).toMatchObject({
      display: { $value: '-0.045em' },
      heading: { $value: '-0.03em' },
      body: { $value: '0em' },
      metadata: { $value: '0.05em' },
    })
  })

  it('provides semantic roles and component aliases', () => {
    expect(Object.keys(tokenJson.semantic.typography)).toEqual(
      expect.arrayContaining([
        'display',
        'page-title',
        'section-title',
        'module-title',
        'lead',
        'body',
        'supporting',
        'navigation',
        'metadata',
      ]),
    )
    expect(Object.keys(tokenJson.component.typography)).toEqual(
      expect.arrayContaining(['button', 'navigation', 'card-title', 'product-label', 'footer']),
    )
  })

  it('maps exact tablet and mobile title sizes at the approved breakpoints', () => {
    expect(tokenCss).toMatch(/@media \(max-width: 900px\)[\s\S]*--semantic-type-display-size: 68px/)
    expect(tokenCss).toMatch(/@media \(max-width: 900px\)[\s\S]*--semantic-type-page-title-size: 56px/)
    expect(tokenCss).toMatch(/@media \(max-width: 900px\)[\s\S]*--semantic-type-section-title-size: 44px/)
    expect(tokenCss).toMatch(/@media \(max-width: 900px\)[\s\S]*--semantic-type-module-title-size: 28px/)

    expect(tokenCss).toMatch(/@media \(max-width: 767px\)[\s\S]*--semantic-type-display-size: 48px/)
    expect(tokenCss).toMatch(/@media \(max-width: 767px\)[\s\S]*--semantic-type-page-title-size: 44px/)
    expect(tokenCss).toMatch(/@media \(max-width: 767px\)[\s\S]*--semantic-type-section-title-size: 36px/)
    expect(tokenCss).toMatch(/@media \(max-width: 767px\)[\s\S]*--semantic-type-module-title-size: 26px/)
  })

  it('keeps Chinese display tracking neutral', () => {
    expect(tokenCss).toMatch(
      /html\[lang='zh-CN'\][\s\S]*--semantic-type-display-tracking: 0em[\s\S]*--semantic-type-page-title-tracking: 0em/,
    )
  })

  it('documents the same desktop hierarchy in the design source of truth', () => {
    for (const signature of ['82px', '68px', '52px', '30px', '17px', '16px', '14px', '12px']) {
      expect(designDoc).toContain(signature)
      expect(tokenCss).toContain(signature)
    }
  })
})
