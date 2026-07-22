import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProductDemo } from './ProductDemo'

describe('ProductDemo', () => {
  it('updates the model evidence when a different engineering request is selected', () => {
    render(<ProductDemo />)

    const enclosure = screen.getByRole('button', { name: /electronics enclosure/i })
    fireEvent.click(enclosure)

    expect(enclosure).toHaveAttribute('aria-pressed', 'true')
    expect(within(enclosure).getByText('→')).toBeVisible()
    expect(within(enclosure).getByText(/selected example/i)).toBeInTheDocument()
    expect(screen.getAllByText('160 × 96 × 42 mm').length).toBeGreaterThan(0)
    expect(screen.getByText('Assembly verified')).toBeVisible()
    expect(screen.getByText('Vent array')).toBeVisible()
    expect(screen.getByText('DXF')).toBeVisible()
  })
})
