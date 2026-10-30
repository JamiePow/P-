/*
  Three treatments, one language.

  Atelier is tactile: a photograph and the jewellery data model set as a
  typographic specimen. Nexus is movement: a planned day going out and what
  actually happened coming back, which is the argument for the product rather
  than a picture of a dashboard. Blueprint is structure: a drawing sheet with
  a title block, because construction records are drawings and the product
  does not exist yet to be shown any other way.

  All three use the same hairline, the same red and the same label face.
*/

import { atelierSpec } from '@/lib/c04'

const EDGE = 'currentColor'
const L = {
  fontFamily: 'var(--m)',
  fontSize: 9.5,
  letterSpacing: 1.5,
} as const

/* ---------- Atelier ---------- */

export function AtelierSpec() {
  return (
    <div className="c4-spec" aria-label="The jewellery data model">
      <p className="c4-label">The data model</p>
      <ul>
        {atelierSpec.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Nexus ---------- */

const STAGES = ['PLAN', 'DISPATCH', 'DELIVER', 'PROVE', 'BILL']

export function NexusArt() {
  const w = 88
  const x = (i: number) => 12 + i * 104
  return (
    <svg
      className="c4-art c4-art--wide"
      viewBox="0 0 520 250"
      role="img"
      aria-label="A planned day going out through dispatch, delivery, proof and billing, and what actually happened returning into next week's plan"
    >
      <defs>
        <marker
          id="nx-a"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10z" fill={EDGE} fillOpacity="0.5" />
        </marker>
        <marker
          id="nx-r"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10z" fill="#ff0000" />
        </marker>
      </defs>

      {/* the planned day */}
      {STAGES.map((s, i) => (
        <g key={s}>
          <rect
            x={x(i)}
            y="48"
            width={w}
            height="38"
            fill="none"
            stroke={EDGE}
            strokeOpacity={i === 2 ? 0.9 : 0.28}
            strokeWidth={i === 2 ? 1.5 : 1.25}
          />
          <text
            {...L}
            x={x(i) + w / 2}
            y="72"
            textAnchor="middle"
            fill={EDGE}
            fillOpacity={i === 2 ? 0.95 : 0.65}
          >
            {s}
          </text>
          {i < 4 ? (
            <path
              d={`M${x(i) + w} 67H${x(i + 1)}`}
              fill="none"
              stroke={EDGE}
              strokeOpacity="0.28"
              strokeWidth="1.25"
              markerEnd="url(#nx-a)"
            />
          ) : null}
        </g>
      ))}
      <circle cx={x(2) + w / 2} cy="86" r="3.5" fill="#ff0000" />

      {/* the routing product sits across the first three stages */}
      <path
        d={`M12 104V112H${x(2) + w}V104`}
        fill="none"
        stroke={EDGE}
        strokeOpacity="0.28"
        strokeWidth="1.25"
      />
      <text {...L} x={(12 + x(2) + w) / 2} y="130" textAnchor="middle" fill={EDGE} fillOpacity="0.55">
        NEXUS ROUTES · THE PLANNED DAY
      </text>

      {/* what actually happened, returning */}
      <path
        d="M472 86V172H56V96"
        fill="none"
        stroke="#ff0000"
        strokeWidth="1.25"
        strokeDasharray="5 5"
        markerEnd="url(#nx-r)"
      />
      <text {...L} x="264" y="192" textAnchor="middle" fill="#ff0000">
        WHAT ACTUALLY HAPPENED, BACK INTO NEXT WEEK&rsquo;S PLAN
      </text>
      <text {...L} x="12" y="26" fill={EDGE} fillOpacity="0.45">
        FIG. N1 · OPERATIONS AS A LOOP, NOT A LINE
      </text>
      <text {...L} x="12" y="224" fill={EDGE} fillOpacity="0.45">
        PROOF IS CAPTURED WHERE THE WORK HAPPENS
      </text>
    </svg>
  )
}

/* ---------- Blueprint ---------- */

export function BlueprintArt() {
  const bands = [
    { y: 56, label: 'LABOUR AND SITE TIME' },
    { y: 106, label: 'MATERIALS AND PLANT' },
    { y: 156, label: 'VARIATIONS' },
  ]
  return (
    <svg
      className="c4-art c4-art--wide"
      viewBox="0 0 520 300"
      role="img"
      aria-label="A drawing sheet: three source records feeding one evidenced valuation, marked proposed"
    >
      <defs>
        <pattern id="bp-h" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#ff0000" strokeOpacity="0.22" strokeWidth="1" />
        </pattern>
        <marker id="bp-t" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M5 0V10" stroke={EDGE} strokeOpacity="0.4" strokeWidth="1.2" />
        </marker>
      </defs>

      {/* the sheet */}
      <rect x="6" y="6" width="508" height="288" fill="none" stroke={EDGE} strokeOpacity="0.4" strokeWidth="1.25" />
      <rect x="14" y="14" width="492" height="272" fill="none" stroke={EDGE} strokeOpacity="0.18" strokeWidth="1" />

      {/* source records */}
      {bands.map((b) => (
        <g key={b.y}>
          <rect x="34" y={b.y} width="186" height="38" fill="none" stroke={EDGE} strokeOpacity="0.3" strokeWidth="1.25" />
          <text {...L} x="48" y={b.y + 23} fill={EDGE} fillOpacity="0.72">
            {b.label}
          </text>
          <path d={`M220 ${b.y + 19}H268`} fill="none" stroke={EDGE} strokeOpacity="0.3" strokeWidth="1.25" />
        </g>
      ))}
      <path d="M268 75V175" fill="none" stroke={EDGE} strokeOpacity="0.3" strokeWidth="1.25" />
      <path d="M268 125H300" fill="none" stroke="#ff0000" strokeWidth="1.5" />

      {/* the valuation */}
      <rect x="300" y="68" width="160" height="114" fill="url(#bp-h)" stroke="#ff0000" strokeWidth="1.5" />
      <text {...L} x="380" y="120" textAnchor="middle" fill="#ff0000">
        VALUATION
      </text>
      <text {...L} x="380" y="138" textAnchor="middle" fill="#ff0000">
        WITH EVIDENCE
      </text>

      {/* a dimension line, because this is a drawing */}
      <path
        d="M34 212H220"
        fill="none"
        stroke={EDGE}
        strokeOpacity="0.4"
        strokeWidth="1"
        markerStart="url(#bp-t)"
        markerEnd="url(#bp-t)"
      />
      <text {...L} x="127" y="206" textAnchor="middle" fill={EDGE} fillOpacity="0.5">
        SOURCE RECORDS &times;3
      </text>

      {/* title block */}
      <g>
        <rect x="300" y="222" width="160" height="52" fill="none" stroke={EDGE} strokeOpacity="0.4" strokeWidth="1.25" />
        <path d="M300 248H460M380 222V274" fill="none" stroke={EDGE} strokeOpacity="0.25" strokeWidth="1" />
        <text {...L} x="310" y="240" fill={EDGE} fillOpacity="0.65">
          DWG 01
        </text>
        <text {...L} x="390" y="240" fill={EDGE} fillOpacity="0.65">
          REV A
        </text>
        <text {...L} x="310" y="266" fill={EDGE} fillOpacity="0.65">
          BLUEPRINT
        </text>
        <text {...L} x="390" y="266" fill="#ff0000">
          PROPOSED
        </text>
      </g>
      <text {...L} x="34" y="36" fill={EDGE} fillOpacity="0.45">
        FIG. B1 · THE CONTRACT, AS A DRAWING
      </text>
      <text {...L} x="34" y="266" fill={EDGE} fillOpacity="0.45">
        IN DEVELOPMENT · NOT YET BUILT
      </text>
    </svg>
  )
}

/* ---------- the same two arguments, drawn for a phone ----------
   A wide diagram shrunk to 346 pixels is a diagram nobody can read, so each
   of these is composed again rather than scaled. CSS shows one or the other;
   both carry the same labels and the same aria description. */

export function NexusArtTall() {
  const x = 40
  const w = 220
  const y = (i: number) => 36 + i * 60
  return (
    <svg
      className="c4-art c4-art--tall"
      viewBox="0 0 340 400"
      role="img"
      aria-label="A planned day going out through dispatch, delivery, proof and billing, and what actually happened returning into next week's plan"
    >
      <defs>
        <marker id="nxt-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={EDGE} fillOpacity="0.5" />
        </marker>
        <marker id="nxt-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#ff0000" />
        </marker>
      </defs>
      <text {...L} x="0" y="14" fill={EDGE} fillOpacity="0.45">
        FIG. N1 · OPERATIONS AS A LOOP
      </text>
      {STAGES.map((s, i) => (
        <g key={s}>
          <rect
            x={x}
            y={y(i)}
            width={w}
            height="34"
            fill="none"
            stroke={EDGE}
            strokeOpacity={i === 2 ? 0.9 : 0.28}
            strokeWidth={i === 2 ? 1.5 : 1.25}
          />
          <text {...L} x={x + 16} y={y(i) + 22} fill={EDGE} fillOpacity={i === 2 ? 0.95 : 0.65}>
            {s}
          </text>
          {i < 4 ? (
            <path
              d={`M${x + w / 2} ${y(i) + 34}V${y(i + 1)}`}
              fill="none"
              stroke={EDGE}
              strokeOpacity="0.28"
              strokeWidth="1.25"
              markerEnd="url(#nxt-a)"
            />
          ) : null}
        </g>
      ))}
      <circle cx={x + w} cy={y(2) + 17} r="3.5" fill="#ff0000" />
      <path
        d={`M${x + w} ${y(4) + 17}H300V${y(0) + 17}H${x + w}`}
        fill="none"
        stroke="#ff0000"
        strokeWidth="1.25"
        strokeDasharray="5 5"
        markerEnd="url(#nxt-r)"
      />
      <text {...L} x="0" y="336" fill={EDGE} fillOpacity="0.55">
        NEXUS ROUTES · THE PLANNED DAY
      </text>
      <text {...L} x="0" y="358" fill="#ff0000">
        BACK INTO NEXT WEEK&rsquo;S PLAN
      </text>
      <text {...L} x="0" y="382" fill={EDGE} fillOpacity="0.45">
        PROOF IS CAPTURED WHERE THE WORK HAPPENS
      </text>
    </svg>
  )
}

export function BlueprintArtTall() {
  const bands = [
    { y: 56, label: 'LABOUR AND SITE TIME' },
    { y: 104, label: 'MATERIALS AND PLANT' },
    { y: 152, label: 'VARIATIONS' },
  ]
  return (
    <svg
      className="c4-art c4-art--tall"
      viewBox="0 0 340 420"
      role="img"
      aria-label="A drawing sheet: three source records feeding one evidenced valuation, marked proposed"
    >
      <defs>
        <pattern id="bpt-h" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#ff0000" strokeOpacity="0.22" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="4" y="4" width="332" height="412" fill="none" stroke={EDGE} strokeOpacity="0.4" strokeWidth="1.25" />
      <rect x="12" y="12" width="316" height="396" fill="none" stroke={EDGE} strokeOpacity="0.18" strokeWidth="1" />
      <text {...L} x="26" y="36" fill={EDGE} fillOpacity="0.45">
        FIG. B1 · THE CONTRACT, AS A DRAWING
      </text>
      {bands.map((b) => (
        <g key={b.y}>
          <rect x="26" y={b.y} width="236" height="36" fill="none" stroke={EDGE} strokeOpacity="0.3" strokeWidth="1.25" />
          <text {...L} x="40" y={b.y + 22} fill={EDGE} fillOpacity="0.72">
            {b.label}
          </text>
          <path d={`M262 ${b.y + 18}H288V214`} fill="none" stroke={EDGE} strokeOpacity="0.3" strokeWidth="1.25" />
        </g>
      ))}
      <path d="M288 214H262" fill="none" stroke="#ff0000" strokeWidth="1.5" />
      <rect x="26" y="214" width="236" height="88" fill="url(#bpt-h)" stroke="#ff0000" strokeWidth="1.5" />
      <text {...L} x="144" y="252" textAnchor="middle" fill="#ff0000">
        VALUATION
      </text>
      <text {...L} x="144" y="270" textAnchor="middle" fill="#ff0000">
        WITH EVIDENCE
      </text>
      <g>
        <rect x="26" y="330" width="236" height="52" fill="none" stroke={EDGE} strokeOpacity="0.4" strokeWidth="1.25" />
        <path d="M26 356H262M144 330V382" fill="none" stroke={EDGE} strokeOpacity="0.25" strokeWidth="1" />
        <text {...L} x="38" y="348" fill={EDGE} fillOpacity="0.65">DWG 01</text>
        <text {...L} x="156" y="348" fill={EDGE} fillOpacity="0.65">REV A</text>
        <text {...L} x="38" y="374" fill={EDGE} fillOpacity="0.65">BLUEPRINT</text>
        <text {...L} x="156" y="374" fill="#ff0000">PROPOSED</text>
      </g>
      <text {...L} x="26" y="400" fill={EDGE} fillOpacity="0.45">
        IN DEVELOPMENT · NOT YET BUILT
      </text>
    </svg>
  )
}
