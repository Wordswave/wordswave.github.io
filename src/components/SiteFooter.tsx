import { ArrowUp } from 'lucide-react'

const footerLinks = [
  { label: 'Workflow', href: '#workflow' },
  { label: 'Product', href: '#product' },
  { label: 'Evidence', href: '#evidence' },
  { label: 'Use cases', href: '#use-cases' },
] as const

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div>
          <a className="wordmark" href="#top" aria-label="CAD Agent home">
            <span className="wordmark-mark" aria-hidden="true">
              C
            </span>
            <span>CAD / AGENT</span>
          </a>
          <p className="footer-note">
            The interactive model on this page is an illustrative product preview. The CAD Agent
            workspace contains the real generation, editing, validation, history, and export pipeline.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="footer-links">
          {footerLinks.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="back-to-top" href="#top">
          Back to top
          <ArrowUp aria-hidden="true" size={14} strokeWidth={1.5} />
        </a>
      </div>
    </footer>
  )
}
