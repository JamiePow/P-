import type { Workflow } from '@/lib/c04'

/*
  Fig. 02 to Fig. 04 — three worked operational sequences.

  Drawn in the same language as Fig. 01: hairline cells, real selectable text
  for every name, one red element carrying the argument. Only the connecting
  layer is drawn, and the drawing is decorative in the accessibility sense —
  everything it says is said in the text around it.

  Deliberately static. Fig. 01 earns its interactivity because switching
  between two states is its whole argument; these three have one state, so
  adding behaviour would be decoration with a keyboard trap attached.

  On a phone the run rotates to a vertical column and the connector redraws
  down the left edge, rather than the row scaling down into illegibility.
*/

export default function WorkflowFigure({ w }: { w: Workflow }) {
  const n = w.nodes.length
  /* Node centres as percentages, so the connector lines up with the grid
     whatever the width. Four nodes gives 12.5, 37.5, 62.5, 87.5. */
  const centre = (i: number) => ((i + 0.5) / n) * 100

  return (
    <figure className="c4-wf" aria-labelledby={`wf-${w.n}-name`} data-reveal>
      <div className="c4-wf__head">
        <p className="c4-label">
          {w.fig} · {w.name}
        </p>
      </div>

      <ol className="c4-wf__nodes">
        {w.nodes.map((node, i) => (
          <li key={node} className={i === w.pivot ? 'is-pivot' : undefined}>
            <span className="c4-wf__step">{String(i + 1).padStart(2, '0')}</span>
            <span className="c4-wf__name">{node}</span>
          </li>
        ))}
      </ol>

      {/* The connected layer. Decorative: the text below says the same thing. */}
      <svg
        className="c4-wf__link"
        viewBox="0 0 100 34"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <line
          x1={centre(0)}
          y1="22"
          x2={centre(n - 1)}
          y2="22"
          stroke="var(--red)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        {w.nodes.map((node, i) => (
          <line
            key={node}
            x1={centre(i)}
            y1="0"
            x2={centre(i)}
            y2="22"
            stroke="var(--red)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <p className="c4-wf__layer">
        <span className="c4-wf__pip" aria-hidden="true" />
        One record, written once
      </p>

      <div className="c4-wf__beats">
        <div>
          <p className="c4-label">The problem</p>
          <p>{w.problem}</p>
        </div>
        <div>
          <p className="c4-label">What we connect</p>
          <p>{w.connects}</p>
        </div>
        <div>
          <p className="c4-label">The benefit</p>
          <p>{w.benefit}</p>
        </div>
      </div>

      <figcaption className="c4-wf__measure">
        <span className="c4-label">Measured by</span>
        <ul>
          {w.measures.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </figcaption>

      <h3 id={`wf-${w.n}-name`} className="c4-sr">
        {w.fig}. {w.name}
      </h3>
    </figure>
  )
}
