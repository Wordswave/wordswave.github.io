import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface PageHeroAction {
  href: string
  label: string
  external?: boolean
}

interface PageHeroProps {
  label: string
  title: string
  support: string
  primary: PageHeroAction
  secondary?: PageHeroAction
}

function HeroAction({
  action,
  className,
}: {
  action: PageHeroAction
  className: 'ghost-cta' | 'text-link'
}) {
  const content = (
    <>
      {action.label}
      <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.5} />
    </>
  )

  return action.external ? (
    <a className={className} href={action.href}>
      {content}
    </a>
  ) : (
    <Link className={className} to={action.href}>
      {content}
    </Link>
  )
}

export function PageHero({ label, primary, secondary, support, title }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="page-hero">
      <div aria-hidden="true" className="page-hero-orbit page-hero-orbit-one" />
      <div aria-hidden="true" className="page-hero-orbit page-hero-orbit-two" />
      <div className="page-shell page-hero-inner">
        <p className="eyebrow">{label}</p>
        <h1 id="page-title">{title}</h1>
        <div className="page-hero-support">
          <p>{support}</p>
          <div className="page-hero-actions">
            <HeroAction action={primary} className="ghost-cta" />
            {secondary ? <HeroAction action={secondary} className="text-link" /> : null}
          </div>
        </div>
      </div>
    </section>
  )
}
