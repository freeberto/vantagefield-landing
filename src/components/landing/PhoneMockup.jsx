import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function PhoneMockup({ scrollRef }) {
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 0.5], [60, 0])
  const rotate = useTransform(scrollYProgress, [0, 0.6], [8, 0])

  return (
    <motion.div style={{ y, rotateY: rotate, width: 220 }} className="mx-auto relative">
      {/* Phone shell */}
      <div className="relative rounded-[2.5rem] overflow-hidden"
        style={{
          background: '#060b14',
          border: '6px solid #1e3a5f',
          boxShadow: '0 0 40px rgba(30,58,95,0.5), 0 0 80px rgba(201,168,76,0.1), inset 0 0 10px rgba(30,58,95,0.3)',
          width: 220,
          height: 440,
        }}>

        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 rounded-b-2xl z-10"
          style={{ background: '#060b14', border: '2px solid #1e3a5f', borderTop: 'none' }} />

        {/* Screen content */}
        <div className="absolute inset-0 flex flex-col p-5 pt-10">
          {/* Status bar */}
          <div className="flex justify-between text-xs text-slate-500 mb-6">
            <span>9:41</span>
            <span>●●● WiFi</span>
          </div>

          {/* Location confirm */}
          <div className="glass rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-green-400">GPS Verified</span>
            </div>
            <div className="text-xs text-slate-300 font-medium">Riverside Tower</div>
            <div className="text-xs text-slate-500">123 River Walk, Chicago</div>
          </div>

          {/* Shift info */}
          <div className="text-center mb-6">
            <div className="text-xs text-slate-500 mb-1">Current Shift</div>
            <div className="text-lg font-bold text-white font-display">06:00 – 14:00</div>
            <div className="text-xs text-slate-400 mt-1">Jane Doe</div>
          </div>

          {/* Clock in button */}
          <motion.button
            className="w-full py-4 rounded-2xl font-bold text-navy text-sm mb-3"
            style={{ background: 'linear-gradient(135deg,#c9a84c,#d4b96a)' }}
            animate={{ boxShadow: ['0 0 10px rgba(201,168,76,0.3)', '0 0 25px rgba(201,168,76,0.6)', '0 0 10px rgba(201,168,76,0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Clock In
          </motion.button>

          <button className="w-full py-3 rounded-2xl text-xs text-slate-500"
            style={{ border: '1px solid rgba(30,58,95,0.4)' }}>
            Call Off Shift
          </button>
        </div>
      </div>

      {/* Phone glow */}
      <div className="absolute -inset-4 rounded-[3rem] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
    </motion.div>
  )
}
