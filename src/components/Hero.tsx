import { ArrowDownRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function Hero() {
  const { copy } = useLanguage()

  return (
    <section aria-labelledby="hero-title" className="hero">
      <div className="page-shell hero-stage">
        <div aria-hidden="true" className="hero-orbit hero-orbit-outer" />
        <div aria-hidden="true" className="hero-orbit hero-orbit-inner" />
        <div aria-hidden="true" className="hero-sphere" />

        <h1 className="hero-title" id="hero-title">
          <span className="hero-line hero-line-one">{copy.home.hero.lines[0]}</span>
          <span className="hero-line hero-line-two">{copy.home.hero.lines[1]}</span>
          <span className="hero-line hero-line-three">{copy.home.hero.lines[2]}</span>
        </h1>

        <div className="hero-support">
          <p>{copy.home.hero.support}</p>
          <a className="ghost-cta" href="#workflow">
            {copy.home.hero.action}
            <ArrowDownRight aria-hidden="true" size={14} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  )
}
