import { ArrowUpRight } from 'lucide-react'
import { SectionLabel } from './SectionLabel'

const useCases = [
  {
    index: '01',
    title: 'Brackets + mounts',
    output: 'Constrained plates, hole patterns, ribs, fillets, and fabrication-ready solids.',
  },
  {
    index: '02',
    title: 'Jigs + fixtures',
    output: 'Datums, locating features, tool access, and clear operator-facing geometry.',
  },
  {
    index: '03',
    title: 'Product enclosures',
    output: 'Shells, lids, bosses, vents, clearances, and assembly-aware details.',
  },
  {
    index: '04',
    title: 'Prototype mechanisms',
    output: 'Fast concept geometry that remains editable when the requirements move.',
  },
] as const

export function UseCases() {
  return (
    <section className="section-pad use-case-section" id="use-cases" aria-labelledby="use-cases-title">
      <div className="page-shell">
        <SectionLabel index="05">Use cases</SectionLabel>
        <div className="use-case-heading-row">
          <h2 id="use-cases-title">Built for parts that have to exist off-screen.</h2>
          <p>
            For work where dimensions, operations, and manufacturability matter as much as the final
            silhouette.
          </p>
        </div>

        <div className="use-case-list">
          {useCases.map((item) => (
            <article key={item.index}>
              <span className="eyebrow">{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.output}</p>
              <ArrowUpRight aria-hidden="true" size={21} strokeWidth={1.35} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
