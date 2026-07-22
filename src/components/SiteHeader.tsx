import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { workspaceUrl } from '../config'

const navigation = [
  { label: 'Workflow', href: '#workflow' },
  { label: 'Product', href: '#product' },
  { label: 'Evidence', href: '#evidence' },
  { label: 'Use cases', href: '#use-cases' },
] as const

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header" data-scrolled={scrolled ? 'true' : 'false'}>
      <div className="page-shell flex h-full items-center justify-between gap-element">
        <a className="wordmark" href="#top" aria-label="CAD Agent home">
          <span className="wordmark-mark" aria-hidden="true">
            C
          </span>
          <span>CAD / AGENT</span>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <a className="nav-link" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a className="ghost-cta hidden sm:inline-flex" href={workspaceUrl}>
            Explore workspace
            <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.5} />
          </a>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            className="mobile-menu-button md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          aria-label="Mobile navigation"
          className="mobile-navigation md:hidden"
          id="mobile-navigation"
        >
          <div className="page-shell flex flex-col">
            {navigation.map((item) => (
              <a className="mobile-nav-link" href={item.href} key={item.href} onClick={closeMenu}>
                <span>{item.label}</span>
                <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.5} />
              </a>
            ))}
            <a className="mobile-nav-link" href={workspaceUrl} onClick={closeMenu}>
              <span>Explore workspace</span>
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.5} />
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
