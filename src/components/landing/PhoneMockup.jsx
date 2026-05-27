import { motion, useScroll, useTransform } from 'framer-motion'
import CairnIcon from '../shared/CairnIcon'

export default function PhoneMockup({ scrollRef }) {
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start end', 'end start'] })
  const y      = useTransform(scrollYProgress, [0, 0.5], [60, 0])
  const rotate = useTransform(scrollYProgress, [0, 0.6], [8, 0])

  return (
    <motion.div style={{ y, rotateY: rotate, width: 220 }} className="mx-auto relative">
      {/* Phone shell */}
      <div
        className="relative rounded-[2.5rem] overflow-hidden"
        style={{
          background: '#060b14',
          border: '6px solid #1e3a5f',
          boxShadow:
            '0 0 40px rgba(30,58,95,0.5), 0 0 80px rgba(201,168,76,0.1), inset 0 0 10px rgba(30,58,95,0.3)',
          width: 220,
          height: 470,
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 rounded-b-2xl z-10"
          style={{ background: '#060b14', border: '2px solid #1e3a5f', borderTop: 'none' }}
        />

        {/* Screen */}
        <div className="absolute inset-0 flex flex-col px-3 pt-10 pb-3" style={{ overflow: 'hidden' }}>
          {/* System status bar */}
          <div className="flex justify-between text-xs text-slate-500 mb-3">
            <span>9:41</span>
            <span>●●● WiFi</span>
          </div>

          {/* Status pills — Available / Unavailable / On Shift */}
          <div className="flex gap-1 mb-3">
            {[
              { label: 'Available',   active: true  },
              { label: 'Unavailable', active: false },
              { label: 'On Shift',    active: false },
            ].map(({ label, active }) => (
              <div
                key={label}
                className="flex-1 text-center rounded-lg font-medium"
                style={{
                  padding: '4px 0',
                  fontSize: 8,
                  background: active ? 'rgba(201,168,76,0.2)'  : 'rgba(30,58,95,0.3)',
                  color:      active ? '#c9a84c'               : '#475569',
                  border:     `1px solid ${active ? 'rgba(201,168,76,0.4)' : 'rgba(30,58,95,0.3)'}`,
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Cairn greeting */}
          <div className="flex items-start gap-2 mb-3">
            <div style={{ flexShrink: 0, marginTop: 1 }}>
              <CairnIcon size={20} state="resting" />
            </div>
            <div
              className="flex-1 rounded-xl px-2.5 py-2"
              style={{
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              <p className="text-slate-300 leading-snug" style={{ fontSize: 9 }}>
                Hey Jane. Your shift at Riverside Tower starts in 2 hours.
              </p>
            </div>
          </div>

          {/* Shift card */}
          <div
            className="rounded-xl p-3 mb-2.5"
            style={{
              background: 'rgba(10,20,38,0.7)',
              border: '1px solid rgba(30,58,95,0.5)',
            }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-white" style={{ fontSize: 10 }}>
                Riverside Tower
              </span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
                <span style={{ fontSize: 8, color: '#22c55e' }}>GPS Verified</span>
              </div>
            </div>

            {/* Address */}
            <div className="text-slate-500 mb-2" style={{ fontSize: 8 }}>
              123 River Walk, Chicago IL
            </div>

            {/* Times */}
            <div
              className="flex justify-between"
              style={{ fontSize: 8, color: '#94a3b8' }}
            >
              <span>08:00 – 16:00</span>
              <span style={{ color: '#c9a84c' }}>Starts in 2h</span>
            </div>
          </div>

          {/* Clock In button */}
          <motion.button
            className="w-full rounded-xl font-bold"
            style={{
              background: 'linear-gradient(135deg,#c9a84c,#d4b96a)',
              padding: '10px 0',
              fontSize: 12,
              color: '#0a0f1e',
              marginBottom: 6,
              border: 'none',
              cursor: 'default',
            }}
            animate={{
              boxShadow: [
                '0 0 10px rgba(201,168,76,0.3)',
                '0 0 25px rgba(201,168,76,0.6)',
                '0 0 10px rgba(201,168,76,0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Clock In
          </motion.button>

          {/* Call Off Shift */}
          <button
            className="w-full rounded-xl"
            style={{
              border: '1px solid rgba(30,58,95,0.4)',
              padding: '7px 0',
              fontSize: 10,
              color: '#475569',
              background: 'transparent',
              cursor: 'default',
            }}
          >
            Call Off Shift
          </button>
        </div>
      </div>

      {/* Phone glow */}
      <div
        className="absolute -inset-4 rounded-[3rem] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}
