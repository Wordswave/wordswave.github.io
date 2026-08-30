import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ClosingCta } from '../components/ClosingCta'
import { Hero } from '../components/Hero'
import { Workflow } from '../components/Workflow'
import { useLanguage } from '../i18n/LanguageContext'

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
            {copy.home.values.items.map((item) => (
              <article key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
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
