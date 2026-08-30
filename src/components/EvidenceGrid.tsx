import { ArrowUpRight, Check, FileOutput, History, Ruler, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

const evidenceIcons = [Ruler, ShieldCheck, Check, History, FileOutput] as const

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
            const Icon = evidenceIcons[index]

            return (
              <article className={index === 0 ? 'evidence-card evidence-card-lead paper-grid' : 'evidence-card'} key={item.title}>
                <div className="evidence-card-head">
                  <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                  <Icon aria-hidden="true" size={20} strokeWidth={1.35} />
                </div>
                <div className="evidence-card-copy">
                  <span className="eyebrow">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <ul>
                  {item.rows.map((row) => (
                    <li key={row}>
                      <span>{row}</span>
                      <span aria-hidden="true">↗</span>
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
