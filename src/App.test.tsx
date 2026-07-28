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
    ['/', /describe the partcreate the modelreview the result/i],
    ['/product', /create, edit, and review cad in one workspace/i],
    ['/use-cases', /cad workflows for common mechanical design tasks/i],
    ['/docs', /understand the core cad workflow/i],
    ['/about', /an ai engineering workspace for cad creation and review/i],
    ['/missing', /page not found/i],
  ])('renders %s directly', (path, heading) => {
    renderRoute(path)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeVisible()
  })

  it('uses the professional WordsWave brand and footer disclosure', () => {
    renderRoute('/')

    expect(screen.getAllByRole('link', { name: 'WordsWave home' })).toHaveLength(2)
    expect(document.title).toBe('WordsWave — Natural-language CAD workspace')
    expect(
      screen.getByText(
        'The interactive model on this website is an illustrative preview of the WordsWave workspace.',
      ),
    ).toBeVisible()
  })

  it('switches language, updates the document language, and persists the choice', () => {
    const firstRender = renderRoute('/')

    fireEvent.click(screen.getAllByRole('button', { name: '中文' })[0])

    expect(
      screen.getByRole('heading', { level: 1, name: /描述零件需求生成 CAD 模型检查输出结果/ }),
    ).toBeVisible()
    expect(document.documentElement).toHaveAttribute('lang', 'zh-CN')
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('zh')
    expect(screen.getByRole('link', { name: '返回顶部' })).toBeVisible()

    firstRender.unmount()
    renderRoute('/docs')

    expect(screen.getByRole('heading', { level: 1, name: /了解 CAD 核心工作流程/ })).toBeVisible()
    expect(screen.getAllByRole('button', { name: '中文' })[0]).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })
})
