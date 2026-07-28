import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { workspaceUrl } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { BrandMark } from './BrandMark'
import { LanguageSwitch } from './LanguageSwitch'

export function SiteHeader() {
  const { copy } = useLanguage()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigation = [
    { label: copy.nav.home, href: '/' },
    { label: copy.nav.product, href: '/product' },
    { label: copy.nav.useCases, href: '/use-cases' },
    { label: copy.nav.docs, href: '/docs' },
    { label: copy.nav.about, href: '/about' },
  ] as const

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className="site-header" data-scrolled={scrolled ? 'true' : 'false'}>
      <div className="page-shell flex h-full items-center justify-between gap-element">
        <Link className="wordmark" to="/" aria-label={copy.a11y.home}>
          <BrandMark />
        </Link>

        <nav aria-label={copy.a11y.primaryNav} className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
              end={item.href === '/'}
              key={item.href}
              to={item.href}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitch />
          </div>
          <a className="ghost-cta hidden md:inline-flex" href={workspaceUrl}>
            {copy.actions.workspace}
            <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.5} />
          </a>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? copy.a11y.closeNav : copy.a11y.openNav}
            className="mobile-menu-button lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          aria-label={copy.a11y.mobileNav}
          className="mobile-navigation lg:hidden"
          id="mobile-navigation"
        >
          <div className="page-shell flex flex-col">
            {navigation.map((item) => (
              <NavLink className="mobile-nav-link" end={item.href === '/'} key={item.href} to={item.href}>
                <span>{item.label}</span>
                <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.5} />
              </NavLink>
            ))}
            <a className="mobile-nav-link" href={workspaceUrl}>
              <span>{copy.actions.workspace}</span>
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.5} />
            </a>
            <div className="mobile-language-switch sm:hidden">
              <LanguageSwitch />
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
