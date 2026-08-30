import { useLanguage } from '../i18n/LanguageContext'

export function Workflow() {
  const { copy } = useLanguage()

  return (
    <section className="section-pad workflow-section" id="workflow" aria-labelledby="workflow-title">
      <div className="page-shell">
        <div className="workflow-heading-row">
          <h2 id="workflow-title">{copy.home.workflow.title}</h2>
          <p>{copy.home.workflow.support}</p>
        </div>

        <ol className="workflow-sequence">
          {copy.home.workflow.steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p className="workflow-input">{step.input}</p>
              <p>{step.output}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
