/**
 * CairnIcon — landing page version.
 *
 * Uses the same pure-CSS approach as the app:
 *   - Outer <g> carries position via style.transform (CSS transition)
 *   - Inner <g> carries bounce via @keyframes cairn-bounce
 *
 * Props:
 *   size       — px height (default 80)
 *   state      — 'resting' | 'thinking' (default 'resting')
 *   autoLoop   — if true, automatically cycles resting→thinking→resting
 */

import { useEffect, useState } from 'react'

// ── Rock polygons ────────────────────────────────────────────────────
// All drawn centered at (0,0); positioned via CSS translate in SVG space.
// ViewBox is "0 0 80 110"; rocks sit inside a 60×80 working area.

const ROCKS = [
  {
    // Bottom — wide, flat, gold-brown
    body:   'M -28,10 L -26,3 L -20,-3 L -12,-8 L 0,-10 L 12,-8 L 21,-4 L 27,3 L 28,10 L 24,15 L 12,18 L 0,16 L -14,18 L -24,15 Z',
    shadow: 'M -27,12 L -24,17 L -11,20 L 2,18 L 13,20 L 25,17 L 29,12',
    fill:   '#7a6840',
    fill2:  '#5a4c2e',
    highlight: 'rgba(255,220,120,0.10)',
  },
  {
    // Middle — narrower, cooler gray
    body:   'M -20,8 L -19,1 L -13,-5 L -6,-9 L 2,-10 L 11,-7 L 17,-2 L 19,7 L 16,13 L 7,15 L -4,14 L -15,13 Z',
    shadow: 'M -19,10 L -14,15 L -3,16 L 8,17 L 17,15 L 20,10',
    fill:   '#6b7280',
    fill2:  '#4b5563',
    highlight: 'rgba(200,220,255,0.10)',
  },
  {
    // Top — jagged, lighter
    body:   'M -14,7 L -13,1 L -8,-5 L -2,-9 L 5,-8 L 11,-3 L 13,6 L 10,11 L 3,13 L -5,12 L -12,10 Z',
    shadow: 'M -13,9 L -9,13 L -4,14 L 5,14 L 11,12 L 14,9',
    fill:   '#8b8880',
    fill2:  '#6b6860',
    highlight: 'rgba(220,220,200,0.12)',
  },
]

// ── Stacked positions (x=40 centers in 80-wide viewBox) ──────────────
const STACKED = [
  { x: 40, y: 88 }, // bottom
  { x: 40, y: 62 }, // middle
  { x: 40, y: 40 }, // top
]

// ── Spread positions (horizontal line) ───────────────────────────────
const SPREAD = [
  { x: 14, y: 65 }, // left
  { x: 40, y: 65 }, // center
  { x: 66, y: 65 }, // right
]

const SLIDE = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

export default function CairnIcon({ size = 80, state = 'resting', autoLoop = false }) {
  const [loopState, setLoopState] = useState('resting')

  useEffect(() => {
    if (!autoLoop) return
    let timerId

    function schedule(nextThinking, delay) {
      timerId = setTimeout(() => {
        setLoopState(nextThinking ? 'thinking' : 'resting')
        schedule(!nextThinking, nextThinking ? 2600 : 1800)
      }, delay)
    }

    schedule(true, 1200) // first transition: go thinking after 1.2s
    return () => clearTimeout(timerId)
  }, [autoLoop])

  const effectiveState = autoLoop ? loopState : state
  const thinking = effectiveState === 'thinking'

  const W = 80
  const H = 110

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={size}
      height={size * (H / W)}
      style={{ display: 'block', overflow: 'visible', flexShrink: 0 }}
      aria-hidden="true"
    >
      {/* Ground glow */}
      <ellipse
        cx={40} cy={107} rx={30} ry={5}
        fill="rgba(201,168,76,0.18)"
        style={{
          transition: 'opacity 0.4s',
          opacity: thinking ? 0 : 1,
        }}
      />

      {ROCKS.map((rock, i) => {
        const { x, y } = thinking ? SPREAD[i] : STACKED[i]
        return (
          /* Outer <g>: handles position via CSS transition */
          <g
            key={i}
            style={{
              transform: `translate(${x}px, ${y}px)`,
              transition: `transform 0.44s ${SLIDE}`,
            }}
          >
            {/* Inner <g>: handles bounce animation */}
            <g
              style={
                thinking
                  ? { animation: `cairn-bounce 0.48s ease-in-out ${i * 0.16}s infinite` }
                  : { animation: 'none' }
              }
            >
              {/* Drop shadow */}
              <path d={rock.shadow} fill="rgba(0,0,0,0.25)" transform="translate(0,3)" />
              {/* Rock body */}
              <path d={rock.body} fill={rock.fill} />
              {/* Underside darker tone */}
              <path d={rock.body} fill={rock.fill2} opacity="0.45" />
              {/* Top highlight */}
              <path d={rock.body} fill={rock.highlight} />
            </g>
          </g>
        )
      })}
    </svg>
  )
}
