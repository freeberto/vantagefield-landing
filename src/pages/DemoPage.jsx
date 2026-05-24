import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { demoGuards, demoLocations, demoShifts, demaSmsLog } from '../data/demoData'
import CairnIcon from '../components/shared/CairnIcon'
import CairnBubble from '../components/shared/CairnBubble'
import TypewriterText from '../components/shared/TypewriterText'
import TutorialTooltip from '../components/demo/TutorialTooltip'

const STATUS_COLOR = {
  active:    '#22c55e',
  scheduled: '#c9a84c',
  completed: '#3a6b9e',
  on_shift:  '#22c55e',
  available: '#c9a84c',
  off_duty:  '#475569',
}

const fmt = (iso) => {
  const d = new Date(iso)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const CAIRN_MESSAGES = [
  "Welcome! This is your Control Room. Everything about your operation lives here.",
  "The Shift Board shows every shift in real time — who's on, who's next, and who's done.",
  "Click on a worker to see their details, schedule, and clock history.",
  "The SMS Log shows every automated message your team received. Zero manual work.",
  "You've seen what Vantage Field can do. Ready to transform how you run your business?",
]

const NAV_ITEMS = ['Control Room', 'Shifts', 'Workers', 'Locations', 'SMS Log']

export default function DemoPage() {
  const navigate = useNavigate()
  const [active, setActive] = useState('Shifts')
  const [msgIndex, setMsgIndex] = useState(0)
  const [tip, setTip] = useState(0)
  const [showGoLive, setShowGoLive] = useState(false)
  const [selectedShift, setSelectedShift] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((i) => {
        const next = i + 1
        if (next >= CAIRN_MESSAGES.length - 1) {
          clearInterval(timer)
          setTimeout(() => setShowGoLive(true), 1200)
        }
        return Math.min(next, CAIRN_MESSAGES.length - 1)
      })
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#060b14' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(30,58,95,0.3)', background: 'rgba(6,11,20,0.95)' }}>
        <div className="flex items-center gap-3">
          <CairnIcon size={28} />
          <span className="font-display font-bold text-white">Vantage Field</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium ml-1"
            style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.25)' }}>
            DEMO
          </span>
        </div>
        <button onClick={() => navigate('/')}
          className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
          ← Back to landing
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-52 flex-shrink-0 p-4 space-y-1 overflow-y-auto"
          style={{ borderRight: '1px solid rgba(30,58,95,0.25)', background: 'rgba(6,11,20,0.6)' }}>
          {NAV_ITEMS.map((item, i) => (
            <button key={item} onClick={() => { setActive(item); setTip(i) }}
              className={`w-full text-left text-sm rounded-xl px-4 py-3 transition-all duration-200 ${
                active === item
                  ? 'text-white font-semibold'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              style={active === item ? {
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.2)',
              } : {}}>
              {item}
            </button>
          ))}

          <div className="pt-6 border-t mt-4" style={{ borderColor: 'rgba(30,58,95,0.3)' }}>
            <div className="text-xs text-slate-600 px-4 mb-2">Demo Org</div>
            <div className="glass rounded-xl px-4 py-3">
              <div className="text-xs font-medium text-white">Acme Security Co.</div>
              <div className="text-xs text-slate-500 mt-0.5">5 workers · 3 sites</div>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {active === 'Control Room' && <ControlRoom />}
              {active === 'Shifts' && <ShiftBoard shifts={demoShifts} onSelect={setSelectedShift} />}
              {active === 'Workers' && <WorkerList guards={demoGuards} />}
              {active === 'Locations' && <LocationList locations={demoLocations} />}
              {active === 'SMS Log' && <SmsLog messages={demaSmsLog} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Cairn chat bar */}
      <div className="flex-shrink-0 px-6 py-4"
        style={{ borderTop: '1px solid rgba(30,58,95,0.3)', background: 'rgba(6,11,20,0.95)' }}>
        <AnimatePresence mode="wait">
          {!showGoLive ? (
            <motion.div key="msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CairnBubble message={CAIRN_MESSAGES[msgIndex]} thinking={false} size="sm" />
            </motion.div>
          ) : (
            <motion.div
              key="golive"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-5"
            >
              <CairnIcon size={48} />
              <div className="flex items-center gap-6 flex-1">
                <TypewriterText
                  text="You've seen what Vantage Field can do. Ready to transform how you run your business?"
                  speed={22}
                  className="text-sm text-slate-200 leading-relaxed flex-1"
                />
                <button
                  onClick={() => navigate('/checkout')}
                  className="btn-gold text-sm px-6 py-3 whitespace-nowrap flex-shrink-0"
                >
                  Let's Go Live →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Shift detail modal */}
      <AnimatePresence>
        {selectedShift && (
          <ShiftModal shift={selectedShift} onClose={() => setSelectedShift(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Sub-views ─────────────────────────────────────────────────────── */

function ControlRoom() {
  const stats = [
    { label: 'Active Shifts', value: 2, color: '#22c55e' },
    { label: 'Workers On Site', value: 2, color: '#c9a84c' },
    { label: 'Shifts Today', value: 6, color: '#3a6b9e' },
    { label: 'Locations Active', value: 3, color: '#a78bfa' },
  ]
  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-white mb-6">Control Room</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-5">
            <div className="text-3xl font-bold font-display mb-1" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl p-5">
        <div className="text-sm font-semibold text-white mb-4">Recent Activity</div>
        {[
          { text: 'Jane Doe clocked in at Riverside Tower', time: '2h ago', icon: '✅' },
          { text: 'Shift reminder sent to John Doe for Harbor Point', time: '3h ago', icon: '📲' },
          { text: 'Sarah Chen completed her shift at Westgate Mall', time: '5m ago', icon: '🏁' },
        ].map((a, i) => (
          <div key={i} className="flex items-start gap-3 py-3 border-b last:border-0"
            style={{ borderColor: 'rgba(30,58,95,0.25)' }}>
            <span className="text-lg">{a.icon}</span>
            <div className="flex-1">
              <div className="text-sm text-slate-300">{a.text}</div>
              <div className="text-xs text-slate-600 mt-0.5">{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ShiftBoard({ shifts, onSelect }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-white">Shift Board</h1>
        <div className="text-xs px-3 py-1.5 rounded-lg cursor-pointer"
          style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.25)' }}>
          + New Shift
        </div>
      </div>
      <div className="space-y-3">
        {shifts.map((s, i) => (
          <motion.div
            key={s.id}
            onClick={() => onSelect(s)}
            className="flex items-center gap-4 rounded-2xl px-5 py-4 cursor-pointer transition-all"
            style={{
              background: s.status === 'active' ? 'rgba(34,197,94,0.07)' : 'rgba(30,58,95,0.15)',
              border: `1px solid ${s.status === 'active' ? 'rgba(34,197,94,0.2)' : 'rgba(30,58,95,0.3)'}`,
            }}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: 'rgba(30,58,95,0.5)', color: '#c9a84c' }}>
              {s.guard.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">{s.guard.name}</div>
              <div className="text-xs text-slate-500 truncate">{s.location.name}</div>
            </div>
            <div className="text-xs text-slate-400 tabular-nums hidden sm:block">
              {fmt(s.start)} – {fmt(s.end)}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: STATUS_COLOR[s.status] }} />
              <span className="text-xs capitalize" style={{ color: STATUS_COLOR[s.status] }}>{s.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function WorkerList({ guards }) {
  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-white mb-6">Workers</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guards.map((g, i) => (
          <motion.div key={g.id} className="glass rounded-2xl p-5"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            whileHover={{ scale: 1.02 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}>
                {g.avatar}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{g.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS_COLOR[g.status] }} />
                  <span className="text-xs capitalize" style={{ color: STATUS_COLOR[g.status] }}>
                    {g.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-500">{g.phone}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function LocationList({ locations }) {
  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-white mb-6">Locations</h1>
      <div className="space-y-4">
        {locations.map((l, i) => (
          <motion.div key={l.id} className="glass rounded-2xl p-5"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                style={{ background: 'rgba(30,58,95,0.4)' }}>📍</div>
              <div>
                <div className="text-sm font-semibold text-white mb-1">{l.name}</div>
                <div className="text-xs text-slate-500">{l.address}</div>
              </div>
              <div className="ml-auto text-xs px-2 py-1 rounded-lg"
                style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}>
                Active
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SmsLog({ messages }) {
  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-white mb-6">SMS Log</h1>
      <div className="space-y-3">
        {messages.map((m, i) => (
          <motion.div key={m.id} className="glass rounded-2xl p-5"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="flex items-start gap-3">
              <div className="text-xl flex-shrink-0">📲</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-white">To: {m.to}</span>
                  <span className="text-xs text-slate-600">{fmt(m.time)}</span>
                </div>
                <div className="text-sm text-slate-400">{m.message}</div>
              </div>
              <div className="text-xs px-2 py-1 rounded"
                style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
                {m.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ShiftModal({ shift, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(6,11,20,0.8)', backdropFilter: 'blur(6px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-gold rounded-2xl p-6 w-full max-w-sm"
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="font-display font-semibold text-white">Shift Detail</div>
          <button onClick={onClose} className="text-slate-500 hover:text-white">✕</button>
        </div>
        <div className="space-y-3 text-sm">
          <Row label="Worker" value={shift.guard.name} />
          <Row label="Location" value={shift.location.name} />
          <Row label="Address" value={shift.location.address} />
          <Row label="Start" value={fmt(shift.start)} />
          <Row label="End" value={fmt(shift.end)} />
          <Row label="Status" value={shift.status} color={STATUS_COLOR[shift.status]} />
        </div>
      </motion.div>
    </motion.div>
  )
}

function Row({ label, value, color }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b" style={{ borderColor: 'rgba(30,58,95,0.25)' }}>
      <span className="text-slate-500">{label}</span>
      <span className="font-medium capitalize" style={{ color: color || '#e8edf5' }}>{value}</span>
    </div>
  )
}
