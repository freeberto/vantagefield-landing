/**
 * SnowParticles — 24 white drifting dots, CSS-only.
 * Fixed overlay, pointer-events: none, z-index: 5.
 */

const FLAKES = Array.from({ length: 24 }, (_, i) => {
  const seed = i * 17.31
  const left = ((Math.sin(seed) * 0.5 + 0.5) * 100).toFixed(2)
  const size = (1 + (Math.sin(seed * 3.7) * 0.5 + 0.5) * 2.5).toFixed(2)
  const delay = ((Math.sin(seed * 2.1) * 0.5 + 0.5) * 14).toFixed(2)
  const duration = (10 + (Math.sin(seed * 1.3) * 0.5 + 0.5) * 18).toFixed(2)
  const drift = ((Math.sin(seed * 5.5) - 0.5) * 50).toFixed(2)
  const opacity = (0.3 + (Math.sin(seed * 4.1) * 0.5 + 0.5) * 0.5).toFixed(2)
  return { left, size, delay, duration, drift, opacity }
})

export default function SnowParticles() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
      aria-hidden="true"
    >
      {FLAKES.map((f, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '-10px',
            left: `${f.left}%`,
            width:  `${f.size}px`,
            height: `${f.size}px`,
            borderRadius: '50%',
            background: 'rgba(220, 235, 255, 0.9)',
            opacity: f.opacity,
            '--drift': `${f.drift}px`,
            animation: `vf-snow ${f.duration}s linear ${f.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
