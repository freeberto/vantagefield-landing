/**
 * MountainLayers — three depth-layered SVG mountain silhouettes,
 * fixed at the bottom of the viewport behind all page content.
 *
 * Layer 1 (back)  — 20% opacity, subtle distance
 * Layer 2 (mid)   — 40% opacity, midground
 * Layer 3 (fore)  — full opacity, foreground silhouette
 */
export default function MountainLayers() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* ── Back layer — tallest, full-width, faintest ────────── */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 w-full"
        style={{ opacity: 0.20 }}
      >
        <path
          d="M0,320 L0,200 L60,178 L130,195 L200,140 L280,162 L360,100 L440,130 L520,80 L600,108 L680,58 L760,90 L840,42 L920,72 L1000,30 L1080,60 L1160,22 L1240,52 L1320,80 L1380,100 L1440,130 L1440,320 Z"
          fill="#0d1829"
        />
      </svg>

      {/* ── Mid layer ─────────────────────────────────────────── */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 w-full"
        style={{ opacity: 0.40 }}
      >
        <path
          d="M0,320 L0,240 L80,210 L160,228 L240,175 L320,198 L400,148 L480,170 L560,124 L640,150 L720,105 L800,135 L880,88 L960,118 L1040,78 L1120,105 L1200,145 L1280,170 L1360,200 L1440,220 L1440,320 Z"
          fill="#0a1422"
        />
      </svg>

      {/* ── Fore layer — closest, full opacity ───────────────── */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 w-full"
        style={{ opacity: 1 }}
      >
        <path
          d="M0,320 L0,275 L100,245 L180,260 L260,225 L340,248 L420,210 L500,235 L580,195 L660,222 L740,185 L820,212 L900,175 L980,202 L1060,172 L1140,198 L1220,230 L1300,252 L1380,265 L1440,272 L1440,320 Z"
          fill="#070e1a"
        />
        {/* Subtle ridge glow on the nearest peaks */}
        <path
          d="M580,195 L660,222 L740,185 L820,212 L900,175 L980,202 L1060,172 L1140,198"
          fill="none"
          stroke="rgba(30,58,95,0.35)"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}
