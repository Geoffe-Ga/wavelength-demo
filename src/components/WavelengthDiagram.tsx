// A crisp, vector recreation of the canonical Archetypal Wavelength diagram.
// Drawing it as SVG keeps it razor-sharp at any size or pixel density — far
// better than upscaling the source screenshot, whose text would only blur.
//
// Layout note: every label owns a reserved region so nothing overlaps —
// descriptors hug the left of the centre column, the diagonal phase names sit
// in the gaps, and the two arrows are kept clear of both.

const COL = {
  cream: '#f4eac1',
  lilac: '#e0cbdf',
  gold: '#cbb366',
  mauve: '#9b6a8d',
  white: '#ffffff',
  gray: '#bcbcbf',
}
const ARROW = '#585560'
const INK = '#2f2a33'
const SUB = '#6f6675'
const SERIF = "'Fraunces', Georgia, serif"
const SANS = "'Inter', system-ui, sans-serif"

// viewBox geometry
const W = 1200
const H = 820
const TOP = 80 // white "PEAKING" strip
const BOT = 742 // start of gray "BOTTOMING OUT" strip
const MIDY = (TOP + BOT) / 2 // row divider
const C1 = 400
const C2 = 800

// A forward arrowhead (triangle) pointing along +x, then rotated into place.
function Arrowhead({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <path d="M-30 -34 L40 0 L-30 34 Z" fill={ARROW} transform={`translate(${x} ${y}) rotate(${rot})`} />
  )
}

export function WavelengthDiagram() {
  return (
    <svg
      className="diagram"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="The Archetypal Wavelength: Rising, Peaking, Withdrawal, Diminishing, Bottoming Out, and Restoration, arranged over a field of energy (high above, low below) and valence (attraction in yellow, aversion in purple)."
    >
      {/* Cells */}
      <rect x="0" y={TOP} width={C1} height={MIDY - TOP} fill={COL.cream} />
      <rect x={C1} y={TOP} width={C2 - C1} height={MIDY - TOP} fill={COL.lilac} />
      <rect x={C2} y={TOP} width={W - C2} height={MIDY - TOP} fill={COL.cream} />
      <rect x="0" y={MIDY} width={C1} height={BOT - MIDY} fill={COL.gold} />
      <rect x={C1} y={MIDY} width={C2 - C1} height={BOT - MIDY} fill={COL.mauve} />
      <rect x={C2} y={MIDY} width={W - C2} height={BOT - MIDY} fill={COL.gold} />

      {/* Poles */}
      <rect x="0" y="0" width={W} height={TOP} fill={COL.white} />
      <rect x="0" y={BOT} width={W} height={H - BOT} fill={COL.gray} />

      {/* Dotted separators */}
      <g stroke="rgba(60,50,65,0.4)" strokeWidth="1.5" strokeDasharray="2 7">
        <line x1="0" y1={TOP} x2={W} y2={TOP} />
        <line x1="0" y1={BOT} x2={W} y2={BOT} />
        <line x1="0" y1={MIDY} x2={W} y2={MIDY} />
        <line x1={C1} y1={TOP} x2={C1} y2={BOT} />
        <line x1={C2} y1={TOP} x2={C2} y2={BOT} />
      </g>

      {/* The two sweeping arrows (kept clear of the labels) */}
      <g fill="none" stroke={ARROW} strokeWidth="34" strokeLinecap="round">
        <path d="M150 432 C 146 180, 356 100, 476 126 C 606 154, 690 380, 666 650" />
        <path d="M752 692 C 824 742, 980 712, 1046 566" />
      </g>
      <Arrowhead x={666} y={662} rot={93} />
      <Arrowhead x={1046} y={566} rot={-62} />

      {/* Phase headings */}
      <g fill={INK} fontFamily={SERIF} fontWeight={600} letterSpacing="2">
        <text x={W / 2} y={54} fontSize="46" textAnchor="middle">
          PEAKING
        </text>
        <text x={W / 2} y={794} fontSize="46" textAnchor="middle">
          BOTTOMING OUT
        </text>
        <text x={150} y={278} fontSize="38" textAnchor="middle" transform="rotate(-58 150 278)">
          RISING
        </text>
        <text x={690} y={232} fontSize="33" textAnchor="middle" transform="rotate(58 690 232)">
          WITHDRAWAL
        </text>
        <text x={590} y={590} fontSize="30" textAnchor="middle" transform="rotate(58 590 590)">
          DIMINISHING
        </text>
        <text x={1078} y={592} fontSize="33" textAnchor="middle" transform="rotate(-58 1078 592)">
          RESTORATION
        </text>
      </g>

      {/* Energy descriptors (left of the centre column) */}
      <g fontFamily={SERIF} fill={INK} fontWeight={600} fontSize="34">
        <text x={418} y={240}>
          High
          <tspan x={418} dy="40">
            Energy
          </tspan>
        </text>
        <text x={418} y={472}>
          Low
          <tspan x={418} dy="40">
            Energy
          </tspan>
        </text>
      </g>
      <g fontFamily={SANS} fill={SUB} fontSize="22">
        <text x={418} y={332}>
          Expanded
          <tspan x={418} dy="28">
            Lightness
          </tspan>
          <tspan x={418} dy="28">
            Active
          </tspan>
        </text>
        <text x={418} y={564}>
          Contracted
          <tspan x={418} dy="28">
            Density
          </tspan>
          <tspan x={418} dy="28">
            Receptive
          </tspan>
        </text>
      </g>

      {/* Valence descriptors (vertical, spanning the row divider) */}
      <g transform="rotate(-90 742 462)">
        <text x={742} y={460} fill={INK} fontSize="32" fontWeight={600} fontFamily={SERIF} textAnchor="middle">
          Aversion
        </text>
        <text x={742} y={490} fill={SUB} fontSize="21" fontFamily={SANS} textAnchor="middle">
          Alienation · Doubt · Fear
        </text>
      </g>
      <g transform="rotate(-90 856 462)">
        <text x={856} y={460} fill={INK} fontSize="32" fontWeight={600} fontFamily={SERIF} textAnchor="middle">
          Attraction
        </text>
        <text x={856} y={490} fill={SUB} fontSize="21" fontFamily={SANS} textAnchor="middle">
          Belonging · Esteem · Bliss
        </text>
      </g>
    </svg>
  )
}
