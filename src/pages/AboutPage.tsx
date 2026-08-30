import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { useLanguage } from '../i18n/LanguageContext'

export function AboutPage() {
  const { copy } = useLanguage()
  const hero = copy.about.hero

  return (
    <>
      <PageHero
        primary={{ href: '/product', label: hero.primary }}
        support={hero.support}
        title={hero.title}
      />
      <section aria-labelledby="about-title" className="section-pad page-list-section">
        <div className="page-shell">
          <div className="section-heading-row">
            <h2 id="about-title">{copy.about.title}</h2>
            <p>{copy.about.disclosure}</p>
          </div>
          <div className="principle-grid">
            {copy.about.principles.map((principle, index) => (
              <article key={principle.title}>
                <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
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
    </>
  )
}
