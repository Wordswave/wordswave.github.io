import { describe, expect, it } from 'vitest'
import globalCss from './global.css?raw'

describe('WordsWave brand crop', () => {
  it('keeps the source wordmark outside the frame and centers the symbol artwork', () => {
    const symbolImageRule = globalCss.match(/\.brand-mark-symbol img\s*\{([^}]+)\}/)?.[1]

    expect(symbolImageRule).toBeDefined()
    expect(symbolImageRule).toContain('top: -13%')
    expect(symbolImageRule).toContain('left: calc(50% + 1px)')
    expect(symbolImageRule).toContain('width: 160%')
  })
})
