import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function UseCases() {
  const { copy } = useLanguage()

  return (
    <section className="section-pad use-case-section" id="use-cases" aria-labelledby="use-cases-title">
      <div className="page-shell">
        <div className="use-case-heading-row">
          <h2 id="use-cases-title">{copy.useCases.title}</h2>
          <p>{copy.useCases.support}</p>
        </div>

        <div className="use-case-list">
          {copy.useCases.items.map((item, index) => (
            <article key={item.title}>
              <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ArrowUpRight aria-hidden="true" size={21} strokeWidth={1.35} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
