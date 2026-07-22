import { ArrowDown, ArrowDownRight } from 'lucide-react'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero" id="top">
      <div className="page-shell hero-stage">
        <div aria-hidden="true" className="hero-orbit hero-orbit-outer" />
        <div aria-hidden="true" className="hero-orbit hero-orbit-inner" />
        <div aria-hidden="true" className="hero-sphere" />

        <h1 className="hero-title" id="hero-title">
          <span className="hero-line hero-line-one">Describe it</span>
          <span className="hero-line hero-line-two">Shape it</span>
          <span className="hero-line hero-line-three">Prove it</span>
        </h1>

        <div className="hero-support">
          <p>
            Turn engineering intent into editable geometry, explicit constraints, and evidence you can
            inspect before export.
          </p>
          <a className="ghost-cta" href="#workflow">
            See the workflow
            <ArrowDownRight aria-hidden="true" size={14} strokeWidth={1.5} />
          </a>
        </div>

        <a aria-label="Scroll to product promise" className="scroll-cue" href="#promise">
          Scroll
          <ArrowDown aria-hidden="true" size={13} strokeWidth={1.5} />
        </a>
      </div>
    </section>
  )
}
