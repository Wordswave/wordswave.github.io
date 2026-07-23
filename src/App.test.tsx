import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { LanguageProvider, STORAGE_KEY } from './i18n/LanguageContext'
import { AppRoutes } from './routes/AppRoutes'

function renderRoute(path = '/') {
  return render(
    <LanguageProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </LanguageProvider>,
  )
}

describe('bilingual route tree', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem(STORAGE_KEY, 'en')
  })

  it.each([
    ['/', /describe it/i],
    ['/product', /model, parameters, evidence/i],
    ['/use-cases', /cad for real parts/i],
    ['/docs', /a clear path to export/i],
    ['/about', /engineering intent, made editable/i],
    ['/missing', /page not found/i],
  ])('renders %s directly', (path, heading) => {
    renderRoute(path)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeVisible()
  })

  it('switches language, updates the document language, and persists the choice', () => {
    const firstRender = renderRoute('/')

    fireEvent.click(screen.getAllByRole('button', { name: '中文' })[0])

    expect(screen.getByRole('heading', { level: 1, name: /描述需求生成模型验证结果/ })).toBeVisible()
    expect(document.documentElement).toHaveAttribute('lang', 'zh-CN')
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('zh')
    expect(screen.getByRole('link', { name: '返回顶部' })).toBeVisible()

    firstRender.unmount()
    renderRoute('/docs')

    expect(screen.getByRole('heading', { level: 1, name: /从需求到导出的清晰路径/ })).toBeVisible()
    expect(screen.getAllByRole('button', { name: '中文' })[0]).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })
})
