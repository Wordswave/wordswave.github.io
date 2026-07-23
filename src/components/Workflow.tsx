import { BadgeCheck, Box, MessageSquareText } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { SectionLabel } from './SectionLabel'

const stepIcons = [MessageSquareText, Box, BadgeCheck] as const

export function Workflow() {
  const { copy } = useLanguage()

  return (
    <section className="section-pad workflow-section" id="workflow" aria-labelledby="workflow-title">
      <div className="page-shell">
        <SectionLabel index="02">{copy.home.workflow.label}</SectionLabel>
        <div className="workflow-heading-row">
          <h2 id="workflow-title">{copy.home.workflow.title}</h2>
          <p>{copy.home.workflow.support}</p>
        </div>

        <ol className="workflow-sequence">
          {copy.home.workflow.steps.map((step, index) => {
            const Icon = stepIcons[index]

            return (
              <li key={step.title}>
                <div className="workflow-step-head">
                  <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                  <Icon aria-hidden="true" size={21} strokeWidth={1.35} />
                </div>
                <h3>{step.title}</h3>
                <p className="workflow-input">{step.input}</p>
                <p>{step.output}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
