// A crisp, vector recreation of the canonical Archetypal Wavelength diagram.
// Drawing it as SVG keeps it razor-sharp at any size or pixel density — far
// better than upscaling the source screenshot, whose text would only blur.

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

// viewBox geometry
const W = 1200
const H = 820
const TOP = 80 // white "PEAKING" strip
const BOT = 742 // start of gray "BOTTOMING OUT" strip
const MIDY = (TOP + BOT) / 2 // row divider
const C1 = 400
const C2 = 800

// A forward arrowhead (triangle) pointing along +x, then rotated into place.
function Arrowhead({ x, y, rot, scale = 1 }: { x: number; y: number; rot: number; scale?: number }) {
  return (
    <path
      d="M-34 -40 L46 0 L-34 40 Z"
      fill={ARROW}
      transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}
    />
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

      {/* Dotted separators, like the original */}
      <g stroke="rgba(60,50,65,0.45)" strokeWidth="1.5" strokeDasharray="2 7">
        <line x1="0" y1={TOP} x2={W} y2={TOP} />
        <line x1="0" y1={BOT} x2={W} y2={BOT} />
        <line x1="0" y1={MIDY} x2={W} y2={MIDY} />
        <line x1={C1} y1={TOP} x2={C1} y2={BOT} />
        <line x1={C2} y1={TOP} x2={C2} y2={BOT} />
      </g>

      {/* The two sweeping arrows */}
      <g fill="none" stroke={ARROW} strokeWidth="40" strokeLinecap="round">
        {/* Rise + crest + fall (the down arrow) */}
        <path d="M150 392 C 150 150, 360 96, 470 120 C 612 150, 690 360, 668 560" />
        {/* Bottom + restoration (the up arrow) */}
        <path d="M690 690 C 770 752, 980 720, 1052 560 C 1070 520, 1078 492, 1082 470" />
      </g>
      <Arrowhead x={668} y={566} rot={108} />
      <Arrowhead x={1064} y={520} rot={-62} />

      {/* Phase headings (serif) */}
      <g fill={INK} fontFamily="'Fraunces', Georgia, serif" fontWeight={600}>
        <text x={W / 2} y={54} fontSize="46" textAnchor="middle" letterSpacing="2">
          PEAKING
        </text>
        <text x={W / 2} y={798} fontSize="46" textAnchor="middle" letterSpacing="2">
          BOTTOMING OUT
        </text>
        <text x={150} y={250} fontSize="40" textAnchor="middle" transform="rotate(-58 150 250)" letterSpacing="2">
          RISING
        </text>
        <text x={735} y={235} fontSize="40" textAnchor="middle" transform="rotate(58 735 235)" letterSpacing="2">
          WITHDRAWAL
        </text>
        <text x={690} y={632} fontSize="38" textAnchor="middle" transform="rotate(58 690 632)" letterSpacing="2">
          DIMINISHING
        </text>
        <text x={1086} y={585} fontSize="40" textAnchor="middle" transform="rotate(-58 1086 585)" letterSpacing="2">
          RESTORATION
        </text>
      </g>

      {/* Field descriptors */}
      <g fontFamily="'Fraunces', Georgia, serif">
        <text x={430} y={252} fill={INK} fontSize="40" fontWeight={600}>
          High
          <tspan x={430} dy="44">
            Energy
          </tspan>
        </text>
        <text x={430} y={500} fill={INK} fontSize="40" fontWeight={600}>
          Low
          <tspan x={430} dy="44">
            Energy
          </tspan>
        </text>
      </g>
      <g fontFamily="'Inter', system-ui, sans-serif" fill={SUB} fontSize="25">
        <text x={430} y={352}>
          Expanded
          <tspan x={430} dy="30">
            Lightness
          </tspan>
          <tspan x={430} dy="30">
            Active
          </tspan>
        </text>
        <text x={430} y={600}>
          Contracted
          <tspan x={430} dy="30">
            Density
          </tspan>
          <tspan x={430} dy="30">
            Receptive
          </tspan>
        </text>
      </g>

      {/* Valence descriptors (vertical) */}
      <g transform={`rotate(-90 712 392)`}>
        <text x={712} y={392} fill={INK} fontSize="36" fontWeight={600} fontFamily="'Fraunces', Georgia, serif" textAnchor="middle">
          Aversion
        </text>
        <text x={712} y={424} fill={SUB} fontSize="24" fontFamily="'Inter', system-ui, sans-serif" textAnchor="middle">
          Alienation · Doubt · Fear
        </text>
      </g>
      <g transform={`rotate(-90 846 392)`}>
        <text x={846} y={392} fill={INK} fontSize="36" fontWeight={600} fontFamily="'Fraunces', Georgia, serif" textAnchor="middle">
          Attraction
        </text>
        <text x={846} y={424} fill={SUB} fontSize="24" fontFamily="'Inter', system-ui, sans-serif" textAnchor="middle">
          Belonging · Esteem · Bliss
        </text>
      </g>
    </svg>
  )
}
