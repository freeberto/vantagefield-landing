/**
 * Aurora — subtle teal/blue/purple shimmer over the mountain peaks.
 * Fixed, pointer-events: none, sits between mountain layers and content.
 */
export default function Aurora() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    >
      {/* Primary teal band */}
      <div
        style={{
          position: 'absolute',
          top: '28%',
          left: '-10%',
          width: '120%',
          height: '22%',
          background:
            'radial-gradient(ellipse 70% 100% at 50% 50%, rgba(32, 180, 170, 0.09) 0%, transparent 80%)',
          filter: 'blur(18px)',
          animation: 'aurora-float 11s ease-in-out infinite',
        }}
      />
      {/* Blue-purple band */}
      <div
        style={{
          position: 'absolute',
          top: '22%',
          left: '5%',
          width: '90%',
          height: '16%',
          background:
            'radial-gradient(ellipse 80% 100% at 40% 50%, rgba(80, 60, 200, 0.07) 0%, transparent 80%)',
          filter: 'blur(24px)',
          animation: 'aurora-float 15s ease-in-out 3s infinite reverse',
        }}
      />
      {/* Soft gold hint */}
      <div
        style={{
          position: 'absolute',
          top: '32%',
          right: '5%',
          width: '50%',
          height: '10%',
          background:
            'radial-gradient(ellipse, rgba(201, 168, 76, 0.05) 0%, transparent 80%)',
          filter: 'blur(30px)',
          animation: 'aurora-float 18s ease-in-out 6s infinite',
        }}
      />
    </div>
  )
}
