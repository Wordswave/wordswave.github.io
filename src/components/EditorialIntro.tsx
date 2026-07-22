import { ArrowDownRight } from 'lucide-react'
import { useMeasuredText } from '../hooks/useMeasuredText'
import { SectionLabel } from './SectionLabel'

const statement =
  'CAD Agent does not stop at a convincing image. It builds editable geometry, records the decisions behind it, and returns the checks that make a model useful.'

export function EditorialIntro() {
  const measured = useMeasuredText<HTMLHeadingElement>(statement)

  return (
    <section className="section-pad border-t border-rule" id="promise">
      <div className="page-shell editorial-grid">
        <div className="editorial-aside">
          <SectionLabel index="01">The promise</SectionLabel>
          <a className="text-link" href="#product">
            Inspect the product
            <ArrowDownRight aria-hidden="true" size={15} strokeWidth={1.5} />
          </a>
        </div>

        <div>
          <h2
            className="editorial-statement"
            data-pretext="true"
            ref={measured.ref}
            style={measured.style}
          >
            {statement}
          </h2>
          <p className="editorial-copy">
            Start with a plain-language request. Keep control through parameters and operation history.
            Finish with validation, manufacturing checks, and the formats your downstream tools expect.
          </p>
        </div>
      </div>
    </section>
  )
}
