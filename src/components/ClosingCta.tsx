import { ArrowUpRight } from 'lucide-react'
import { workspaceUrl } from '../config'
import { useMeasuredText } from '../hooks/useMeasuredText'

const closingStatement = 'Move from intent to engineering evidence.'

export function ClosingCta() {
  const measured = useMeasuredText<HTMLHeadingElement>(closingStatement)

  return (
    <section className="closing-section" aria-labelledby="closing-title">
      <div aria-hidden="true" className="closing-orbit closing-orbit-one" />
      <div aria-hidden="true" className="closing-orbit closing-orbit-two" />
      <div className="page-shell closing-inner">
        <p className="eyebrow">Ready when the model matters</p>
        <h2
          className="closing-title"
          data-pretext="true"
          id="closing-title"
          ref={measured.ref}
          style={measured.style}
        >
          {closingStatement}
        </h2>
        <div className="closing-actions">
          <a className="ghost-cta" href={workspaceUrl}>
            Explore workspace
            <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.5} />
          </a>
          <a className="text-link" href="#product">
            Replay the product flow
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  )
}
