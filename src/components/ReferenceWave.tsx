import { WAVE_NODES, type Phase } from "../data/modes";
import { VB_H, VB_W, buildPath } from "../lib/waveMath";
import { TOXIC_HEX, type ReferenceLayer } from "../data/reference";

const PATH = buildPath(0, 1);

// The same sine wave as the home page, reused here as a slim header band: the
// curve and its six phase dots sit above a six-column grid whose columns line up
// directly under each dot (repeat(6, 1fr) centers fall on the node x-positions).
// Each column shows that phase's Medicinal (layer color) and Toxic (red) dose.
export function ReferenceWave({ layer }: { layer: ReferenceLayer }) {
  return (
    <div className="refwave">
      <div className="refwave-band">
        <svg
          className="refwave-line"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={PATH}
            fill="none"
            stroke={layer.colorHex}
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {WAVE_NODES.map((n) => (
          <span
            key={n.phase}
            className="refwave-dot"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              background: layer.colorHex,
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="refdoses">
        {WAVE_NODES.map((n) => {
          const dose = layer.phases[n.phase as Phase];
          return (
            <div key={n.phase} className="refdose">
              <span className="refdose-phase">{n.phase}</span>
              <span className="refdose-med" style={{ color: layer.textHex }}>
                {dose.medicinal}
              </span>
              <span className="refdose-tox" style={{ color: TOXIC_HEX }}>
                {dose.toxic}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
