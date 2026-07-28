import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LanguageProvider, STORAGE_KEY } from '../i18n/LanguageContext'
import { ProductVideo } from './ProductVideo'

function renderVideo() {
  return render(
    <LanguageProvider>
      <ProductVideo />
    </LanguageProvider>,
  )
}

describe('ProductVideo', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem(STORAGE_KEY, 'en')
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }),
    })
    vi.mocked(HTMLMediaElement.prototype.play).mockClear()
    vi.mocked(HTMLMediaElement.prototype.pause).mockClear()
  })

  it('uses browser-safe autoplay attributes and retains controls', () => {
    const { container } = renderVideo()

    expect(screen.getByRole('heading', { name: 'See the workspace in use.' })).toBeVisible()
    const video = container.querySelector('video')

    expect(video).toHaveAttribute('src', '/media/wordswave-product-demo.mp4')
    expect(video).toHaveAttribute('autoplay')
    expect(video).toHaveProperty('muted', true)
    expect(video).toHaveAttribute('loop')
    expect(video).toHaveAttribute('playsinline')
    expect(video).toHaveAttribute('controls')
    expect(video).toHaveAttribute('preload', 'metadata')
    expect(video).toHaveAccessibleName('WordsWave product demo')
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledOnce()
    expect(container.querySelector('.product-heading-row > p')).not.toBeInTheDocument()
  })

  it('disables autoplay when reduced motion is requested', () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: (query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }),
    })

    const { container } = renderVideo()

    expect(container.querySelector('video')).not.toHaveAttribute('autoplay')
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled()
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledOnce()
  })
})
