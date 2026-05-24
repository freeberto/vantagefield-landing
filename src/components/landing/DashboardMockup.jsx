import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const STATUS = {
  active:    { label: 'Active',     dot: '#22c55e' },
  scheduled: { label: 'Scheduled',  dot: '#c9a84c' },
  completed: { label: 'Completed',  dot: '#3a6b9e' },
}

const shifts = [
  { guard: 'Jane Doe',        location: 'Riverside Tower',     time: '06:00 – 14:00', status: 'active' },
  { guard: 'Maria Garcia',    location: 'Westgate Mall',        time: '07:00 – 15:00', status: 'active' },
  { guard: 'John Doe',        location: 'Harbor Point Office',  time: '10:00 – 18:00', status: 'scheduled' },
  { guard: 'Marcus Thompson', location: 'Riverside Tower',      time: '16:00 – 00:00', status: 'scheduled' },
  { guard: 'Sarah Chen',      location: 'Westgate Mall',        time: '22:00 – 06:00', status: 'completed' },
]

export default function DashboardMockup({ scrollRef }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.7], [0.82, 1, 1.04])
  const y = useTransform(scrollYProgress, [0, 0.5], [40, 0])
  const highlight = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])

  return (
    <motion.div
      ref={ref}
      style={{ scale, y }}
      className="rounded-2xl overflow-hidden glow-steel"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3"
        style={{ background: 'rgba(6,11,20,0.95)', borderBottom: '1px solid rgba(30,58,95,0.4)' }}>
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <div className="ml-3 flex-1 rounded px-3 py-1 text-xs text-slate-500"
          style={{ background: 'rgba(30,58,95,0.2)' }}>
          app.vantagefield.com / shifts
        </div>
      </div>

      {/* Dashboard layout */}
      <div className="flex" style={{ background: 'rgba(6,11,20,0.9)', minHeight: 320 }}>
        {/* Sidebar */}
        <div className="w-48 flex-shrink-0 p-4 space-y-1"
          style={{ borderRight: '1px solid rgba(30,58,95,0.3)' }}>
          {['Control Room', 'Shifts', 'Workers', 'Locations', 'SMS Log'].map((item, i) => (
            <div key={item}
              className={`text-xs rounded-lg px-3 py-2 transition-colors ${i === 1 ? 'text-gold font-semibold' : 'text-slate-500'}`}
              style={{ background: i === 1 ? 'rgba(201,168,76,0.12)' : 'transparent' }}>
              {item}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-white font-display">Shift Board</div>
              <div className="text-xs text-slate-500 mt-0.5">5 shifts today</div>
            </div>
            <div className="text-xs px-3 py-1.5 rounded-lg font-medium"
              style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.25)' }}>
              + New Shift
            </div>
          </div>

          {/* Shift rows */}
          <motion.div className="space-y-2" style={{ opacity: highlight }}>
            {shifts.map((s, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  background: s.status === 'active'
                    ? 'rgba(34,197,94,0.07)'
                    : 'rgba(30,58,95,0.18)',
                  border: `1px solid ${s.status === 'active' ? 'rgba(34,197,94,0.2)' : 'rgba(30,58,95,0.3)'}`,
                }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: 'rgba(30,58,95,0.5)', color: '#c9a84c' }}>
                  {s.guard.split(' ').map(w => w[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white truncate">{s.guard}</div>
                  <div className="text-xs text-slate-500 truncate">{s.location}</div>
                </div>
                <div className="text-xs text-slate-400 tabular-nums">{s.time}</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS[s.status].dot }} />
                  <span className="text-xs" style={{ color: STATUS[s.status].dot }}>{STATUS[s.status].label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
