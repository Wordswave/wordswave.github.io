import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SiteLayout } from '../components/SiteLayout'
import { useLanguage } from '../i18n/LanguageContext'
import type { PageKey } from '../i18n/content'
import { AboutPage } from '../pages/AboutPage'
import { DocsPage } from '../pages/DocsPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProductPage } from '../pages/ProductPage'
import { UseCasesPage } from '../pages/UseCasesPage'

const pageByPath: Record<string, PageKey> = {
  '/': 'home',
  '/product': 'product',
  '/use-cases': 'useCases',
  '/docs': 'docs',
  '/about': 'about',
}

function RouteTitle() {
  const { copy } = useLanguage()
  const { pathname } = useLocation()

  useEffect(() => {
    const normalizedPath = pathname === '/' ? pathname : pathname.replace(/\/+$/, '')
    document.title = copy.meta[pageByPath[normalizedPath] ?? 'notFound']
  }, [copy, pathname])

  return null
}

export function AppRoutes() {
  return (
    <>
      <RouteTitle />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route element={<HomePage />} index />
          <Route element={<ProductPage />} path="product" />
          <Route element={<UseCasesPage />} path="use-cases" />
          <Route element={<DocsPage />} path="docs" />
          <Route element={<AboutPage />} path="about" />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </>
  )
}
