import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { LanguageProvider, STORAGE_KEY } from '../i18n/LanguageContext'
import { LanguageSwitch } from './LanguageSwitch'
import { ProductDemo } from './ProductDemo'

function renderDemo() {
  return render(
    <LanguageProvider>
      <LanguageSwitch />
      <ProductDemo />
    </LanguageProvider>,
  )
}

describe('ProductDemo', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem(STORAGE_KEY, 'en')
  })

  it('updates and localizes model evidence without changing engineering values', () => {
    renderDemo()

    const enclosure = screen.getByRole('button', { name: /electronics enclosure/i })
    fireEvent.click(enclosure)

    expect(enclosure).toHaveAttribute('aria-pressed', 'true')
    expect(within(enclosure).getByText('→')).toBeVisible()
    expect(within(enclosure).getByText(/selected example/i)).toBeInTheDocument()
    expect(screen.getAllByText('160 × 96 × 42 mm').length).toBeGreaterThan(0)
    expect(screen.getByText('Assembly verified')).toBeVisible()
    expect(screen.getByText('Vent array')).toBeVisible()
    expect(screen.getByText('DXF')).toBeVisible()

    fireEvent.click(screen.getByRole('button', { name: '中文' }))

    expect(screen.getByRole('button', { name: /电子设备外壳/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByText('装配已验证')).toBeVisible()
    expect(screen.getByText('通风阵列')).toBeVisible()
    expect(screen.getAllByText('160 × 96 × 42 mm').length).toBeGreaterThan(0)
  })
})
