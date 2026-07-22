import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SiteHeader } from './SiteHeader'

describe('SiteHeader', () => {
  it('opens and closes the mobile navigation and exposes its ruled scroll state', () => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
    render(<SiteHeader />)

    const menuButton = screen.getByRole('button', { name: /open navigation/i })
    fireEvent.click(menuButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeVisible()
    expect(screen.getAllByRole('link', { name: /workflow/i })).toHaveLength(2)

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    Object.defineProperty(window, 'scrollY', { value: 120, writable: true })
    fireEvent.scroll(window)
    expect(screen.getByRole('banner')).toHaveAttribute('data-scrolled', 'true')
  })
})
