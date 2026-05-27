/**
 * VantageFieldLogo — geometric mountain peaks SVG + "Vantage Field" wordmark.
 *
 * Three peaks: two shorter flanking peaks + tall center peak with gold tip.
 * Works at any size from 16px to 200px.
 *
 * Props:
 *   size     — icon height in px (default 32)
 *   wordmark — show the text wordmark (default true)
 */
export default function VantageFieldLogo({ size = 32, wordmark = true }) {
  const iconH = size
  const iconW = iconH * (40 / 28)
  const fontSize = Math.round(size * 0.5)

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: Math.round(size * 0.3),
        flexShrink: 0,
      }}
    >
      <svg
        viewBox="0 0 40 28"
        width={iconW}
        height={iconH}
        fill="none"
        aria-hidden="true"
        style={{ display: 'block', flexShrink: 0 }}
      >
        {/* Left shorter peak */}
        <polygon points="2,28 17,28 9,11" fill="#1e3a5f" />
        {/* Right shorter peak */}
        <polygon points="23,28 38,28 31,11" fill="#1e3a5f" />
        {/* Center tall peak — main body */}
        <polygon points="8,28 32,28 20,5" fill="#2a4f7a" />
        {/* Gold accent tip on center peak */}
        <polygon points="17.5,9 20,3 22.5,9" fill="#c9a84c" />
      </svg>

      {wordmark && (
        <span
          style={{
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontSize,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: '#ffffff' }}>Vantage</span>
          <span style={{ color: '#c9a84c' }}> Field</span>
        </span>
      )}
    </div>
  )
}
