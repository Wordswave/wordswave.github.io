import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export function EvidenceGrid() {
  const { copy } = useLanguage()
  const evidence = copy.product.evidence

  return (
    <section className="section-pad evidence-section" id="evidence" aria-labelledby="evidence-title">
      <div className="page-shell">
        <div className="evidence-heading-row">
          <h2 id="evidence-title">{evidence.title}</h2>
          <Link className="text-link" to="/use-cases">
            {evidence.action}
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.5} />
          </Link>
        </div>

        <div className="evidence-grid">
          {evidence.items.map((item, index) => {
            return (
              <article className={index === 0 ? 'evidence-card evidence-card-lead paper-grid' : 'evidence-card'} key={item.title}>
                <div className="evidence-card-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <ul>
                  {item.rows.map((row) => (
                    <li key={row}>
                      <span>{row}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
