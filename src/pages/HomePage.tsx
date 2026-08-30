import { ArrowUpRight, Box, Eye, FileOutput } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ClosingCta } from '../components/ClosingCta'
import { Hero } from '../components/Hero'
import { Workflow } from '../components/Workflow'
import { useLanguage } from '../i18n/LanguageContext'

const valueIcons = [Box, Eye, FileOutput] as const

export function HomePage() {
  const { copy } = useLanguage()

  return (
    <>
      <Hero />
      <section aria-labelledby="value-title" className="section-pad value-section" id="value">
        <div className="page-shell">
          <div className="section-heading-row">
            <h2 id="value-title">{copy.home.values.title}</h2>
            <p>{copy.home.values.support}</p>
          </div>
          <div className="value-grid">
            {copy.home.values.items.map((item, index) => {
              const Icon = valueIcons[index]

              return (
                <article key={item.title}>
                  <div className="value-card-head">
                    <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                    <Icon aria-hidden="true" size={20} strokeWidth={1.35} />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
          <Link className="text-link section-link" to="/product">
            {copy.actions.viewProduct}
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
      <Workflow />
      <ClosingCta />
    </>
  )
}
