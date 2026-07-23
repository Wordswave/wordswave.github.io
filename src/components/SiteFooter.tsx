import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { LanguageSwitch } from './LanguageSwitch'

export function SiteFooter() {
  const { copy } = useLanguage()
  const footerLinks = [
    { label: copy.nav.home, href: '/' },
    { label: copy.nav.product, href: '/product' },
    { label: copy.nav.useCases, href: '/use-cases' },
    { label: copy.nav.docs, href: '/docs' },
    { label: copy.nav.about, href: '/about' },
  ] as const

  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div>
          <Link className="wordmark" to="/" aria-label={copy.a11y.home}>
            <span className="wordmark-mark" aria-hidden="true">
              C
            </span>
            <span>CAD / AGENT</span>
          </Link>
          <p className="footer-note">{copy.footer.note}</p>
        </div>

        <nav aria-label={copy.a11y.footerNav} className="footer-links">
          {footerLinks.map((item) => (
            <Link to={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="footer-actions">
          <LanguageSwitch />
          <a className="back-to-top" href="#top">
            {copy.actions.backToTop}
            <ArrowUp aria-hidden="true" size={14} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  )
}
