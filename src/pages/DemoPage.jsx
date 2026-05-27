import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  demoGuards,
  demoLocations,
  demoShifts,
  demoIncidents,
  demoNotificationLog,
} from '../data/demoData'
import CairnIcon from '../components/shared/CairnIcon'
import CairnBubble from '../components/shared/CairnBubble'
import TypewriterText from '../components/shared/TypewriterText'
import VantageFieldLogo from '../components/shared/VantageFieldLogo'

const STATUS_COLOR = {
  active:    '#22c55e',
  scheduled: '#c9a84c',
  completed: '#3a6b9e',
  on_shift:  '#22c55e',
  available: '#c9a84c',
  off_duty:  '#475569',
}

const QUAL_COLOR = {
  Armed:   { bg: 'rgba(239,68,68,0.12)',  color: '#f87171', border: 'rgba(239,68,68,0.25)'  },
  Unarmed: { bg: 'rgba(59,130,246,0.12)', color: '#93c5fd', border: 'rgba(59,130,246,0.25)' },
}

const fmt = (iso) => {
  const d = new Date(iso)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const CAIRN_MESSAGES = [
  "Welcome to Vantage Field. This is a preview of your control room. Everything you see here is yours when you sign up. Ready when you are.",
  "The Shift Board shows every shift in real time — who's on, who's next, and who's done.",
  "Click on a worker to see their qualification badge, schedule, and clock history.",
  "The Notification Log shows every automated push notification your team received. Zero manual work.",
  "You've seen what Vantage Field can do. Ready to transform how you run your business?",
]

const NAV_ITEMS = [
  'Control Room',
  'Schedule',
  'Shifts',
  'Roster',
  'Job Sites',
  'Incident Reports',
  'Notification Log',
]

export default function DemoPage() {
  const navigate = useNavigate()
  const [active, setActive]             = useState('Shifts')
  const [msgIndex, setMsgIndex]         = useState(0)
  const [showGoLive, setShowGoLive]     = useState(false)
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
      {/* Demo banner */}
      <div
        className="flex-shrink-0 px-4 py-2 text-center text-xs font-medium"
        style={{
          background: 'rgba(201,168,76,0.1)',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
          color: '#c9a84c',
        }}
      >
        You are viewing a demo. Data shown is for preview purposes only.
      </div>

      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(30,58,95,0.3)', background: 'rgba(6,11,20,0.95)' }}
      >
        <div className="flex items-center gap-3">
          <VantageFieldLogo size={24} />
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium ml-1"
            style={{
              background: 'rgba(201,168,76,0.15)',
              color: '#c9a84c',
              border: '1px solid rgba(201,168,76,0.25)',
            }}
          >
            DEMO
          </span>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          ← Back to landing
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className="w-52 flex-shrink-0 p-4 space-y-1 overflow-y-auto"
          style={{ borderRight: '1px solid rgba(30,58,95,0.25)', background: 'rgba(6,11,20,0.6)' }}
        >
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-full text-left text-sm rounded-xl px-4 py-3 transition-all duration-200 ${
                active === item
                  ? 'text-white font-semibold'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              style={
                active === item
                  ? { background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.2)' }
                  : {}
              }
            >
              {item}
            </button>
          ))}

          <div className="pt-6 border-t mt-4" style={{ borderColor: 'rgba(30,58,95,0.3)' }}>
            <div className="text-xs text-slate-600 px-4 mb-2">Demo Org</div>
            <div className="glass rounded-xl px-4 py-3">
              <div className="text-xs font-medium text-white">Acme Security Co.</div>
              <div className="text-xs text-slate-500 mt-0.5">3 workers · 2 sites</div>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 overflow-y-auto p-6 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {active === 'Control Room'     && <ControlRoom />}
              {active === 'Schedule'         && <Schedule />}
              {active === 'Shifts'           && <ShiftBoard shifts={demoShifts} onSelect={setSelectedShift} />}
              {active === 'Roster'           && <Roster guards={demoGuards} />}
              {active === 'Job Sites'        && <JobSites locations={demoLocations} />}
              {active === 'Incident Reports' && <IncidentReports incidents={demoIncidents} />}
              {active === 'Notification Log' && <NotificationLog notifications={demoNotificationLog} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Cairn chat bar */}
      <div
        className="flex-shrink-0 px-6 py-4"
        style={{ borderTop: '1px solid rgba(30,58,95,0.3)', background: 'rgba(6,11,20,0.95)' }}
      >
        <AnimatePresence mode="wait">
          {!showGoLive ? (
            <motion.div
              key="msg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
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
                  onClick={() => navigate('/purchase')}
                  className="btn-gold text-sm px-6 py-3 whitespace-nowrap flex-shrink-0"
                >
                  Let's Go Live →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pulsing fixed CTA */}
      <motion.button
        onClick={() => navigate('/purchase')}
        className="fixed bottom-24 right-6 z-50 text-sm font-semibold px-5 py-3 rounded-xl"
        style={{
          background: 'linear-gradient(135deg,#c9a84c,#d4b96a)',
          color: '#0a0f1e',
        }}
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(201,168,76,0.45)',
            '0 0 0 14px rgba(201,168,76,0)',
            '0 0 0 0 rgba(201,168,76,0.45)',
          ],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        Ready to go live? Get Started →
      </motion.button>

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
    { label: 'Active Shifts',     value: 1, color: '#22c55e' },
    { label: 'Workers On Site',   value: 1, color: '#c9a84c' },
    { label: 'Shifts Today',      value: 3, color: '#3a6b9e' },
    { label: 'Locations Active',  value: 2, color: '#a78bfa' },
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
          { text: 'Jane Doe clocked in at Riverside Tower',                   time: '2h ago',  icon: '✅' },
          { text: 'Shift reminder sent to Marcus Thompson for Westgate Mall', time: '3h ago',  icon: '🔔' },
          { text: 'Sarah Chen confirmed upcoming shift at Riverside Tower',   time: '30m ago', icon: '📋' },
        ].map((a, i) => (
          <div
            key={i}
            className="flex items-start gap-3 py-3 border-b last:border-0"
            style={{ borderColor: 'rgba(30,58,95,0.25)' }}
          >
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

function Schedule() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const blocks = [
    { guard: 'JD', day: 0, color: '#22c55e' },
    { guard: 'JD', day: 1, color: '#22c55e' },
    { guard: 'MT', day: 2, color: '#c9a84c' },
    { guard: 'MT', day: 3, color: '#c9a84c' },
    { guard: 'SC', day: 4, color: '#3a6b9e' },
    { guard: 'SC', day: 5, color: '#3a6b9e' },
  ]

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-white mb-6">Schedule</h1>
      <div className="glass rounded-2xl p-6">
        <div className="grid grid-cols-7 gap-2 mb-3">
          {days.map((d) => (
            <div key={d} className="text-center text-xs text-slate-500 font-medium">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((_, di) => {
            const b = blocks.filter((b) => b.day === di)
            return (
              <div
                key={di}
                className="rounded-xl min-h-[80px] p-2 flex flex-col gap-1"
                style={{ background: 'rgba(30,58,95,0.15)', border: '1px solid rgba(30,58,95,0.3)' }}
              >
                {b.map((block, bi) => (
                  <motion.div
                    key={bi}
                    className="rounded-lg px-1.5 py-1 text-xs font-semibold"
                    style={{ background: `${block.color}22`, color: block.color, border: `1px solid ${block.color}44` }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: di * 0.04 }}
                  >
                    {block.guard}
                  </motion.div>
                ))}
              </div>
            )
          })}
        </div>
        <div className="mt-4 pt-4 flex items-center gap-4" style={{ borderTop: '1px solid rgba(30,58,95,0.3)' }}>
          {demoGuards.map((g) => (
            <div key={g.id} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: STATUS_COLOR[g.status] }} />
              <span className="text-xs text-slate-400">{g.avatar} — {g.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ShiftBoard({ shifts, onSelect }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-white">Shift Board</h1>
        <div
          className="text-xs px-3 py-1.5 rounded-lg cursor-pointer"
          style={{
            background: 'rgba(201,168,76,0.15)',
            color: '#c9a84c',
            border: '1px solid rgba(201,168,76,0.25)',
          }}
        >
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
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: 'rgba(30,58,95,0.5)', color: '#c9a84c' }}
            >
              {s.guard.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white truncate">{s.guard.name}</span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0"
                  style={{
                    background: QUAL_COLOR[s.guard.qualification]?.bg,
                    color:      QUAL_COLOR[s.guard.qualification]?.color,
                    border:     `1px solid ${QUAL_COLOR[s.guard.qualification]?.border}`,
                  }}
                >
                  {s.guard.qualification}
                </span>
              </div>
              <div className="text-xs text-slate-500 truncate">{s.location.name}</div>
            </div>
            <div className="text-xs text-slate-400 tabular-nums hidden sm:block">
              {fmt(s.start)} – {fmt(s.end)}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: STATUS_COLOR[s.status] }} />
              <span className="text-xs capitalize" style={{ color: STATUS_COLOR[s.status] }}>
                {s.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Roster({ guards }) {
  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-white mb-6">Roster</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guards.map((g, i) => (
          <motion.div
            key={g.id}
            className="glass rounded-2xl p-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}
              >
                {g.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white truncate">{g.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS_COLOR[g.status] }} />
                  <span className="text-xs capitalize" style={{ color: STATUS_COLOR[g.status] }}>
                    {g.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
            {/* Qualification badge */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold mb-3"
              style={{
                background: QUAL_COLOR[g.qualification]?.bg,
                color:      QUAL_COLOR[g.qualification]?.color,
                border:     `1px solid ${QUAL_COLOR[g.qualification]?.border}`,
              }}
            >
              {g.qualification === 'Armed' ? '🔫' : '🛡️'} {g.qualification}
            </div>
            <div className="text-xs text-slate-500">{g.phone}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function JobSites({ locations }) {
  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-white mb-6">Job Sites</h1>
      <div className="space-y-4">
        {locations.map((l, i) => (
          <motion.div
            key={l.id}
            className="glass rounded-2xl p-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                style={{ background: 'rgba(30,58,95,0.4)' }}
              >
                📍
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white mb-1">{l.name}</div>
                <div className="text-xs text-slate-500">{l.address}</div>
              </div>
              <div
                className="text-xs px-2 py-1 rounded-lg"
                style={{
                  background: 'rgba(34,197,94,0.1)',
                  color: '#22c55e',
                  border: '1px solid rgba(34,197,94,0.2)',
                }}
              >
                Active
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function IncidentReports({ incidents }) {
  const SEV = {
    Low:    { bg: 'rgba(234,179,8,0.12)',  color: '#fbbf24', border: 'rgba(234,179,8,0.25)'  },
    Medium: { bg: 'rgba(249,115,22,0.12)', color: '#fb923c', border: 'rgba(249,115,22,0.25)' },
    High:   { bg: 'rgba(239,68,68,0.12)',  color: '#f87171', border: 'rgba(239,68,68,0.25)'  },
  }
  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-white mb-6">Incident Reports</h1>
      <div className="space-y-4">
        {incidents.map((inc, i) => (
          <motion.div
            key={inc.id}
            className="glass rounded-2xl p-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="text-sm font-semibold text-white">{inc.type}</div>
                <div className="text-xs text-slate-500 mt-0.5">{inc.location} · {fmt(inc.time)}</div>
              </div>
              <span
                className="text-xs px-2.5 py-1 rounded-lg font-medium flex-shrink-0"
                style={{ background: SEV[inc.severity]?.bg, color: SEV[inc.severity]?.color, border: `1px solid ${SEV[inc.severity]?.border}` }}
              >
                {inc.severity}
              </span>
            </div>
            <div className="text-xs text-slate-400 leading-relaxed">{inc.notes}</div>
            <div className="mt-3 text-xs text-slate-600">Filed by {inc.guard}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function NotificationLog({ notifications }) {
  const TYPE_ICON = { reminder: '🔔', alert: '⚠️', update: '📋' }
  const TYPE_COLOR = {
    reminder: { bg: 'rgba(201,168,76,0.1)',  color: '#c9a84c' },
    alert:    { bg: 'rgba(239,68,68,0.1)',   color: '#f87171' },
    update:   { bg: 'rgba(59,130,246,0.1)',  color: '#93c5fd' },
  }
  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-white mb-6">Notification Log</h1>
      <div className="space-y-3">
        {notifications.map((n, i) => (
          <motion.div
            key={n.id}
            className="glass rounded-2xl p-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{TYPE_ICON[n.type]}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-white">To: {n.to}</span>
                  <span className="text-xs text-slate-600">{fmt(n.time)}</span>
                </div>
                <div className="text-sm text-slate-400">{n.message}</div>
              </div>
              <div
                className="text-xs px-2 py-1 rounded capitalize"
                style={{ background: TYPE_COLOR[n.type]?.bg, color: TYPE_COLOR[n.type]?.color }}
              >
                {n.type}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Shift modal ───────────────────────────────────────────────────── */
function ShiftModal({ shift, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(6,11,20,0.8)', backdropFilter: 'blur(6px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-gold rounded-2xl p-6 w-full max-w-sm"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="font-display font-semibold text-white">Shift Detail</div>
          <button onClick={onClose} className="text-slate-500 hover:text-white">✕</button>
        </div>
        <div className="space-y-3 text-sm">
          <Row label="Worker"        value={shift.guard.name} />
          <Row label="Qualification" value={shift.guard.qualification} color={QUAL_COLOR[shift.guard.qualification]?.color} />
          <Row label="Location"      value={shift.location.name} />
          <Row label="Address"       value={shift.location.address} />
          <Row label="Start"         value={fmt(shift.start)} />
          <Row label="End"           value={fmt(shift.end)} />
          <Row label="Status"        value={shift.status} color={STATUS_COLOR[shift.status]} />
        </div>
      </motion.div>
    </motion.div>
  )
}

function Row({ label, value, color }) {
  return (
    <div
      className="flex justify-between gap-4 py-2 border-b"
      style={{ borderColor: 'rgba(30,58,95,0.25)' }}
    >
      <span className="text-slate-500">{label}</span>
      <span className="font-medium capitalize" style={{ color: color || '#e8edf5' }}>{value}</span>
    </div>
  )
}
