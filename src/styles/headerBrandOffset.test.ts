import { describe, expect, it } from 'vitest'
import globalCss from './global.css?raw'

describe('header brand offset', () => {
  it('moves only the header wordmark 4px left', () => {
    const headerWordmarkRule = globalCss.match(/\.site-header \.wordmark\s*\{([^}]+)\}/)?.[1]

    expect(headerWordmarkRule).toBeDefined()
    expect(headerWordmarkRule).toContain('transform: translateX(-4px)')
    expect(globalCss).not.toMatch(/\.site-footer \.wordmark\s*\{[^}]*translateX/)
  })
})
