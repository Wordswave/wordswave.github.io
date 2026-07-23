import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { workspaceUrl } from '../config'
import { useMeasuredText } from '../hooks/useMeasuredText'
import { useLanguage } from '../i18n/LanguageContext'

export function ClosingCta() {
  const { copy } = useLanguage()
  const closingStatement = copy.home.closing.title
  const measured = useMeasuredText<HTMLHeadingElement>(closingStatement)

  return (
    <section className="closing-section" aria-labelledby="closing-title">
      <div aria-hidden="true" className="closing-orbit closing-orbit-one" />
      <div aria-hidden="true" className="closing-orbit closing-orbit-two" />
      <div className="page-shell closing-inner">
        <p className="eyebrow">{copy.home.closing.label}</p>
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
            {copy.actions.workspace}
            <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.5} />
          </a>
          <Link className="text-link" to="/product">
            {copy.home.closing.secondary}
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}
