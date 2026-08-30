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
          {copy.useCases.items.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
