import { BadgeCheck, Box, MessageSquareText } from 'lucide-react'
import { SectionLabel } from './SectionLabel'

const steps = [
  {
    index: '01',
    title: 'Describe',
    input: 'Engineering intent',
    output: 'A structured build request with dimensions, materials, and constraints.',
    icon: MessageSquareText,
  },
  {
    index: '02',
    title: 'Build',
    input: 'Parametric operations',
    output: 'Editable geometry with a readable sequence of sketches and features.',
    icon: Box,
  },
  {
    index: '03',
    title: 'Verify',
    input: 'Geometry + DFM checks',
    output: 'Evidence, revision history, and production-ready export options.',
    icon: BadgeCheck,
  },
] as const

export function Workflow() {
  return (
    <section className="section-pad pt-0" id="workflow" aria-labelledby="workflow-title">
      <div className="page-shell">
        <SectionLabel index="02">Workflow</SectionLabel>
        <div className="workflow-heading-row">
          <h2 id="workflow-title">Intent becomes a model you can interrogate.</h2>
          <p>
            Every stage leaves something concrete behind. No hidden leap from prompt to an uneditable
            mesh.
          </p>
        </div>

        <ol className="workflow-sequence">
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <li key={step.index}>
                <div className="workflow-step-head">
                  <span className="eyebrow">{step.index}</span>
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
