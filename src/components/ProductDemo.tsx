import { Check, ChevronRight, Download, SlidersHorizontal, Terminal } from 'lucide-react'
import { useState } from 'react'
import { cadExamples } from '../data/cadExamples'
import { CadModel } from './CadModel'
import { SectionLabel } from './SectionLabel'

export function ProductDemo() {
  const [activeId, setActiveId] = useState(cadExamples[0].id)
  const active = cadExamples.find((example) => example.id === activeId) ?? cadExamples[0]

  return (
    <section className="section-pad product-section" id="product" aria-labelledby="product-title">
      <div className="page-shell">
        <SectionLabel index="03">Product preview</SectionLabel>
        <div className="product-heading-row">
          <h2 id="product-title">A workspace that shows its work.</h2>
          <p>
            Select a request. The model, parameters, build history, checks, and export package stay tied
            to the same engineering intent.
          </p>
        </div>

        <div className="product-shell">
          <div className="product-toolbar">
            <div className="product-toolbar-title">
              <Terminal aria-hidden="true" size={16} strokeWidth={1.5} />
              <span>CAD Agent / Interactive preview</span>
            </div>
            <div className="product-status">
              <span aria-hidden="true" className="status-dot" />
              Model synchronized
            </div>
          </div>

          <div className="product-workspace">
            <aside className="request-rail">
              <p className="rail-label">Example requests</p>
              <div aria-label="Example engineering requests" className="request-list" role="group">
                {cadExamples.map((example) => {
                  const selected = example.id === active.id

                  return (
                    <button
                      aria-pressed={selected}
                      className="request-button"
                      data-selected={selected ? 'true' : 'false'}
                      key={example.id}
                      onClick={() => setActiveId(example.id)}
                      type="button"
                    >
                      <span className="request-index">{example.index}</span>
                      <span className="request-name">{example.title}</span>
                      {selected ? (
                        <span className="request-arrow">
                          <span aria-hidden="true">→</span>
                          <span className="sr-only">Selected example</span>
                        </span>
                      ) : (
                        <ChevronRight aria-hidden="true" size={15} strokeWidth={1.5} />
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="prompt-transcript">
                <span className="rail-label">Prompt</span>
                <p>“{active.prompt}”</p>
              </div>
            </aside>

            <figure className="product-viewport paper-grid">
              <figcaption className="viewport-caption">
                <div>
                  <span className="rail-label">Active model</span>
                  <strong>{active.title}</strong>
                </div>
                <div className="viewport-envelope">
                  <span className="rail-label">Envelope</span>
                  <strong>{active.envelope}</strong>
                </div>
              </figcaption>
              <CadModel kind={active.model} />
              <div className="viewport-axis" aria-hidden="true">
                <span>X</span>
                <span>Y</span>
                <span>Z</span>
              </div>
              <div className="viewport-mode">Isometric / constraints visible</div>
            </figure>

            <aside className="parameter-rail">
              <div className="rail-heading">
                <SlidersHorizontal aria-hidden="true" size={16} strokeWidth={1.5} />
                <span>Parameters</span>
              </div>
              <dl className="parameter-list">
                {active.parameters.map((parameter) => (
                  <div key={parameter.label}>
                    <dt>{parameter.label}</dt>
                    <dd>{parameter.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="constraint-summary">
                <span className="rail-label">Constraint state</span>
                <strong>{active.constraints} / {active.constraints}</strong>
                <span>Fully constrained</span>
              </div>
            </aside>
          </div>

          <div className="product-evidence">
            <div className="validation-summary">
              <div className="evidence-title">
                <span className="evidence-icon">
                  <Check aria-hidden="true" size={14} strokeWidth={1.8} />
                </span>
                <div>
                  <span className="rail-label">Validation</span>
                  <strong>{active.validation.title}</strong>
                </div>
              </div>
              <ul>
                {active.validation.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>

            <div className="operation-summary">
              <span className="rail-label">Operation history / {String(active.operations.length).padStart(2, '0')}</span>
              <ol>
                {active.operations.map((operation, index) => (
                  <li key={operation}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {operation}
                  </li>
                ))}
              </ol>
            </div>

            <div className="export-summary">
              <div className="rail-heading">
                <Download aria-hidden="true" size={16} strokeWidth={1.5} />
                <span>Export manifest</span>
              </div>
              <div className="export-list">
                {active.exports.map((format) => (
                  <span key={format}>{format}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p aria-live="polite" className="sr-only">
          {active.title} loaded. {active.envelope}. {active.validation.title}.
        </p>
      </div>
    </section>
  )
}
