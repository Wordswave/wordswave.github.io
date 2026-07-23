import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { LanguageProvider, STORAGE_KEY } from '../i18n/LanguageContext'
import { SiteHeader } from './SiteHeader'

function RouteDriver() {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate('/docs')} type="button">
      Programmatic route
    </button>
  )
}

function renderHeader(path = '/') {
  return render(
    <LanguageProvider>
      <MemoryRouter initialEntries={[path]}>
        <SiteHeader />
        <RouteDriver />
      </MemoryRouter>
    </LanguageProvider>,
  )
}

describe('SiteHeader', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem(STORAGE_KEY, 'en')
  })

  it('supports route state, mobile navigation, Escape, and scroll state', () => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
    renderHeader()

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getAllByRole('button', { name: '中文' }).length).toBeGreaterThan(0)

    const menuButton = screen.getByRole('button', { name: /open navigation/i })
    fireEvent.click(menuButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeVisible()
    expect(screen.getAllByRole('link', { name: 'Product' })).toHaveLength(2)

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    Object.defineProperty(window, 'scrollY', { value: 120, writable: true })
    fireEvent.scroll(window)
    expect(screen.getByRole('banner')).toHaveAttribute('data-scrolled', 'true')
  })

  it('closes the mobile menu after any pathname change', () => {
    renderHeader()
    fireEvent.click(screen.getByRole('button', { name: /open navigation/i }))
    fireEvent.click(screen.getByRole('button', { name: /programmatic route/i }))

    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('aria-current', 'page')
  })
})
