import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionLabel } from '../components/SectionLabel'
import { useLanguage } from '../i18n/LanguageContext'

export function DocsPage() {
  const { copy } = useLanguage()
  const hero = copy.docs.hero

  return (
    <>
      <PageHero
        label={hero.label}
        primary={{ href: '/product', label: hero.primary }}
        support={hero.support}
        title={hero.title}
      />
      <section aria-labelledby="docs-title" className="section-pad page-list-section">
        <div className="page-shell">
          <SectionLabel index="01">{copy.docs.label}</SectionLabel>
          <div className="section-heading-row">
            <h2 id="docs-title">{copy.docs.title}</h2>
            <p>{copy.docs.disclosure}</p>
          </div>
          <ol className="page-list-grid">
            {copy.docs.steps.map((step, index) => (
              <li key={step.title}>
                <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link className="text-link section-link" to="/product">
            {copy.actions.viewProduct}
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </>
  )
}
