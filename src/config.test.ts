import { describe, expect, it } from 'vitest'
import { publicUrl } from './config'

describe('publicUrl', () => {
  it('builds root-hosted public URLs', () => {
    expect(publicUrl('/media/wordswave-logo.jpg', '/')).toBe('/media/wordswave-logo.jpg')
  })

  it('builds GitHub Pages project URLs', () => {
    expect(publicUrl('/media/wordswave-logo.jpg', '/wordswave-web/')).toBe(
      '/wordswave-web/media/wordswave-logo.jpg',
    )
    expect(publicUrl('product', '/wordswave-web/')).toBe('/wordswave-web/product')
  })
})
