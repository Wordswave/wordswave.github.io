import { ArrowUpRight, Check, FileOutput, History, Ruler, ShieldCheck } from 'lucide-react'
import { SectionLabel } from './SectionLabel'

const evidence = [
  {
    title: 'Parameter record',
    label: 'Editable by design',
    description: 'Dimensions, materials, clearances, and feature values remain named and inspectable.',
    rows: ['Named dimensions', 'Units preserved', 'Revision-safe values'],
    icon: Ruler,
  },
  {
    title: 'Geometry checks',
    label: 'Before export',
    description: 'Solid integrity and constraint state are returned beside the model that produced them.',
    rows: ['Watertight body', 'Constraint state', 'Interference review'],
    icon: ShieldCheck,
  },
  {
    title: 'Manufacturing review',
    label: 'Practical evidence',
    description: 'Wall thickness, draft, access, and process-sensitive conditions stay visible.',
    rows: ['Minimum wall', 'Draft direction', 'Tool access'],
    icon: Check,
  },
  {
    title: 'Operation history',
    label: 'A readable build',
    description: 'Trace the sequence from sketch to feature instead of accepting a silent final mesh.',
    rows: ['Sketch intent', 'Feature sequence', 'Change history'],
    icon: History,
  },
  {
    title: 'Export manifest',
    label: 'Downstream ready',
    description: 'Package the geometry and documentation needed for review, prototyping, or production.',
    rows: ['STEP / STL', 'SVG / DXF', 'Evidence summary'],
    icon: FileOutput,
  },
] as const

export function EvidenceGrid() {
  return (
    <section className="section-pad evidence-section" id="evidence" aria-labelledby="evidence-title">
      <div className="page-shell">
        <SectionLabel index="04">Engineering evidence</SectionLabel>
        <div className="evidence-heading-row">
          <h2 id="evidence-title">The evidence travels with the geometry.</h2>
          <a className="text-link" href="#use-cases">
            Where it fits
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.5} />
          </a>
        </div>

        <div className="evidence-grid">
          {evidence.map((item, index) => {
            const Icon = item.icon

            return (
              <article className={index === 0 ? 'evidence-card evidence-card-lead paper-grid' : 'evidence-card'} key={item.title}>
                <div className="evidence-card-head">
                  <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                  <Icon aria-hidden="true" size={20} strokeWidth={1.35} />
                </div>
                <div className="evidence-card-copy">
                  <span className="eyebrow">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <ul>
                  {item.rows.map((row) => (
                    <li key={row}>
                      <span>{row}</span>
                      <span aria-hidden="true">↗</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
