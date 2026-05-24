import { useEffect, useRef } from 'react'

/* Pre-generate stable star positions */
const STARS = Array.from({ length: 160 }, (_, i) => ({
  x: Math.sin(i * 7.3) * 0.5 + 0.5,
  y: Math.sin(i * 3.7) * 0.5 + 0.5,
  r: 0.4 + (Math.sin(i * 11.1) * 0.5 + 0.5) * 1.2,
  blink: 0.4 + (Math.sin(i * 5.2) * 0.5 + 0.5) * 1.2,
  phase: i * 0.6,
}))

function drawFrame(ctx, w, h, t) {
  const cx = w / 2
  const hy = h * 0.42 // horizon y

  /* Background */
  const bg = ctx.createLinearGradient(0, 0, 0, h)
  bg.addColorStop(0, '#030610')
  bg.addColorStop(hy / h, '#0a0f1e')
  bg.addColorStop(1, '#0d1529')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  /* Stars */
  STARS.forEach((star) => {
    const alpha = 0.25 + 0.55 * (Math.sin(t * star.blink + star.phase) * 0.5 + 0.5)
    ctx.fillStyle = `rgba(200,220,255,${alpha})`
    ctx.beginPath()
    ctx.arc(star.x * w, star.y * hy * 1.1, star.r, 0, Math.PI * 2)
    ctx.fill()
  })

  /* Tunnel: expanding concentric squares from vanishing point */
  const N_RECTS = 12
  const RECT_SPEED = 0.12
  for (let i = 0; i < N_RECTS; i++) {
    const p = ((i / N_RECTS + t * RECT_SPEED) % 1)
    const maxW = w * 1.8
    const maxH = h * 1.6
    const rw = p * maxW
    const rh = p * maxH
    const rx = cx - rw / 2
    const ry = hy - rh / 2
    const alpha = Math.sin(p * Math.PI) * 0.45
    const isGold = i % 4 === 0
    ctx.strokeStyle = isGold
      ? `rgba(201,168,76,${alpha * 0.9})`
      : `rgba(30,58,95,${alpha})`
    ctx.lineWidth = isGold ? 1.2 : 0.8
    ctx.strokeRect(rx, ry, rw, rh)
  }

  /* Floor grid: vertical lines converging to vanishing point */
  ctx.save()
  const N_VERT = 14
  for (let i = 0; i <= N_VERT; i++) {
    const frac = i / N_VERT
    const bx = cx + (frac - 0.5) * w * 2.2
    const depth = Math.abs(frac - 0.5) * 2
    const alpha = 0.15 + depth * 0.2
    ctx.strokeStyle = `rgba(30,58,95,${alpha})`
    ctx.lineWidth = 0.7
    ctx.beginPath()
    ctx.moveTo(cx, hy)
    ctx.lineTo(bx, h)
    ctx.stroke()
  }

  /* Floor grid: horizontal lines (animated toward viewer) */
  const N_HORIZ = 18
  const H_SPEED = 0.25
  const animOff = (t * H_SPEED) % 1
  for (let i = 0; i < N_HORIZ; i++) {
    const p = ((i + animOff) / N_HORIZ)
    const p2 = p * p
    const y = hy + p2 * (h - hy)
    const halfW = p2 * w * 1.1
    const alpha = p * 0.55
    const isAccent = Math.floor((i + Math.floor(t * H_SPEED)) % 5) === 0
    ctx.strokeStyle = isAccent
      ? `rgba(201,168,76,${alpha * 0.8})`
      : `rgba(30,58,95,${alpha})`
    ctx.lineWidth = 0.5 + p * 1.5
    ctx.beginPath()
    ctx.moveTo(cx - halfW, y)
    ctx.lineTo(cx + halfW, y)
    ctx.stroke()
  }
  ctx.restore()

  /* Horizon glow */
  const hGlow = ctx.createLinearGradient(0, hy - 40, 0, hy + 40)
  hGlow.addColorStop(0, 'rgba(201,168,76,0)')
  hGlow.addColorStop(0.4, 'rgba(201,168,76,0.12)')
  hGlow.addColorStop(0.55, 'rgba(30,58,95,0.18)')
  hGlow.addColorStop(1, 'rgba(30,58,95,0)')
  ctx.fillStyle = hGlow
  ctx.fillRect(0, hy - 40, w, 80)

  /* Mountain silhouette */
  ctx.fillStyle = '#040810'
  ctx.beginPath()
  ctx.moveTo(0, h)
  const pts = [
    [0,    hy + 55], [0.04, hy + 20], [0.09, hy + 48], [0.13, hy -  5],
    [0.19, hy + 32], [0.25, hy - 28], [0.31, hy + 14], [0.38, hy - 52],
    [0.43, hy -  8], [0.50, hy - 72], [0.57, hy - 18], [0.63, hy - 44],
    [0.69, hy + 10], [0.75, hy - 32], [0.81, hy + 22], [0.87, hy - 12],
    [0.92, hy + 40], [0.96, hy + 16], [1.0,  hy + 50],
  ]
  pts.forEach(([px, py]) => ctx.lineTo(px * w, py))
  ctx.lineTo(w, h)
  ctx.closePath()
  ctx.fill()

  /* Mountain ridge glow */
  ctx.strokeStyle = 'rgba(30,58,95,0.5)'
  ctx.lineWidth = 1
  ctx.beginPath()
  pts.forEach(([px, py], idx) => idx === 0 ? ctx.moveTo(px * w, py) : ctx.lineTo(px * w, py))
  ctx.stroke()

  /* Scanlines */
  for (let y = 0; y < h; y += 4) {
    ctx.fillStyle = 'rgba(0,0,0,0.025)'
    ctx.fillRect(0, y, w, 1.5)
  }
}

export default function RetroTunnel({ className = '' }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1)
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1)
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)
    }
    resize()
    window.addEventListener('resize', resize)

    const loop = (ts) => {
      if (!startRef.current) startRef.current = ts
      const t = (ts - startRef.current) / 1000
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      drawFrame(ctx, w, h, t)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  )
}
