import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import CairnIcon from '../components/shared/CairnIcon'
import CairnBubble from '../components/shared/CairnBubble'

const INDUSTRIES = [
  'Security', 'Cleaning', 'Landscaping', 'Maintenance', 'Logistics',
  'Construction', 'Healthcare', 'Events', 'Other',
]

const STEPS = [
  {
    id: 'name',
    cairn: "What should I call you?",
    label: "Your Name",
    placeholder: "Jane Smith",
    type: 'text',
  },
  {
    id: 'business',
    cairn: (name) => `Great to meet you, ${name}! What's your business called?`,
    label: "Business Name",
    placeholder: "Acme Security Co.",
    type: 'text',
  },
  {
    id: 'industry',
    cairn: (name, biz) => `Perfect. What does ${biz} do?`,
    label: "Industry",
    type: 'select',
  },
  {
    id: 'teamSize',
    cairn: "How many team members will you manage?",
    label: "Team Size",
    type: 'number',
    placeholder: "e.g. 12",
  },
]

const TUTORIAL_STEPS = [
  {
    cairn: (ctx) => `Awesome — let's get ${ctx.business} up and running. First, add your first work site.`,
    action: 'Add Your First Location',
    field: 'locationName',
    fieldLabel: 'Site Name',
    placeholder: 'e.g. Riverside Tower, 123 Main St',
  },
  {
    cairn: () => "Great! Now add your first team member. They'll get an invite to the worker app.",
    action: 'Add Your First Worker',
    field: 'workerName',
    fieldLabel: "Worker's Name",
    placeholder: 'e.g. John Smith',
  },
  {
    cairn: () => "Almost done. Schedule their first shift.",
    action: 'Schedule First Shift',
    field: 'shiftDate',
    fieldLabel: 'Shift Date & Time',
    type: 'datetime-local',
    placeholder: '',
  },
]

/* ─── Progress bar ──────────────────────────────────────────────────── */
function ProgressBar({ current, total }) {
  return (
    <div className="flex gap-1.5 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="h-1 rounded-full flex-1"
          animate={{
            background: i < current ? '#c9a84c' : i === current ? '#2a4f7a' : 'rgba(30,58,95,0.3)',
          }}
          transition={{ duration: 0.4 }}
        />
      ))}
    </div>
  )
}

/* ─── Input field ───────────────────────────────────────────────────── */
function Field({ label, value, onChange, type = 'text', placeholder, children }) {
  const style = {
    background: 'rgba(6,11,20,0.8)',
    border: '1px solid rgba(30,58,95,0.5)',
    borderRadius: 12,
    padding: '14px 16px',
    color: '#e8edf5',
    width: '100%',
    fontSize: 15,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }
  return (
    <div>
      <label className="text-xs text-slate-500 mb-2 block">{label}</label>
      {children ? children : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          style={style}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(201,168,76,0.5)'
            e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.08)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(30,58,95,0.5)'
            e.target.style.boxShadow = 'none'
          }}
        />
      )}
    </div>
  )
}

/* ─── Main page ─────────────────────────────────────────────────────── */
export default function OnboardingPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const initialData = location.state || {}

  const [phase, setPhase] = useState('questions') // questions | tutorial | done
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({
    name:     initialData.name?.split(' ')[0] || '',
    business: '',
    industry: '',
    teamSize: '',
  })
  const [tutStep, setTutStep] = useState(0)
  const [tutAnswers, setTutAnswers] = useState({ locationName: '', workerName: '', shiftDate: '' })
  const [thinking, setThinking] = useState(false)

  const totalSteps = STEPS.length

  const getCairnMsg = () => {
    if (phase === 'done') return `You're all set, ${answers.name}! Your Vantage Field account is ready. Let's go.`
    if (phase === 'tutorial') {
      const ts = TUTORIAL_STEPS[tutStep]
      return typeof ts.cairn === 'function' ? ts.cairn({ ...answers }) : ts.cairn
    }
    const s = STEPS[step]
    if (!s) return "You're all set!"
    return typeof s.cairn === 'function' ? s.cairn(answers.name, answers.business) : s.cairn
  }

  const next = () => {
    setThinking(true)
    setTimeout(() => {
      setThinking(false)
      if (step < totalSteps - 1) {
        setStep((s) => s + 1)
      } else {
        setPhase('tutorial')
      }
    }, 600)
  }

  const nextTut = () => {
    setThinking(true)
    setTimeout(() => {
      setThinking(false)
      if (tutStep < TUTORIAL_STEPS.length - 1) {
        setTutStep((t) => t + 1)
      } else {
        setPhase('done')
      }
    }, 600)
  }

  const skipTutorial = () => setPhase('done')

  const currentStep = STEPS[step]

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(30,58,95,0.2) 0%, #0a0f1e 60%)' }}>
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {/* ── QUESTIONS ─────────────────────────────────────────── */}
          {phase === 'questions' && (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              <ProgressBar current={step} total={totalSteps} />

              <div className="mb-8">
                <CairnBubble message={getCairnMsg()} thinking={thinking} size="md" />
              </div>

              <div className="glass rounded-2xl p-6">
                {currentStep?.type === 'select' ? (
                  <Field label={currentStep.label} value={answers[currentStep.id]} onChange={() => {}}>
                    <div className="grid grid-cols-3 gap-2">
                      {INDUSTRIES.map((ind) => (
                        <motion.button
                          key={ind}
                          type="button"
                          onClick={() => setAnswers((a) => ({ ...a, industry: ind }))}
                          className="py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                          style={{
                            background: answers.industry === ind
                              ? 'rgba(201,168,76,0.2)'
                              : 'rgba(30,58,95,0.2)',
                            border: `1px solid ${answers.industry === ind ? 'rgba(201,168,76,0.4)' : 'rgba(30,58,95,0.3)'}`,
                            color: answers.industry === ind ? '#c9a84c' : '#64748b',
                          }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {ind}
                        </motion.button>
                      ))}
                    </div>
                  </Field>
                ) : (
                  <Field
                    label={currentStep?.label}
                    value={answers[currentStep?.id] || ''}
                    onChange={(val) => setAnswers((a) => ({ ...a, [currentStep.id]: val }))}
                    type={currentStep?.type}
                    placeholder={currentStep?.placeholder}
                  />
                )}

                <motion.button
                  onClick={next}
                  disabled={!answers[currentStep?.id]}
                  className="w-full mt-5 py-4 rounded-xl font-display font-bold text-navy"
                  style={{
                    background: answers[currentStep?.id]
                      ? 'linear-gradient(135deg,#c9a84c,#d4b96a)'
                      : 'rgba(30,58,95,0.3)',
                    color: answers[currentStep?.id] ? '#0a0f1e' : '#475569',
                    boxShadow: answers[currentStep?.id] ? '0 4px 24px rgba(201,168,76,0.3)' : 'none',
                  }}
                  whileHover={answers[currentStep?.id] ? { scale: 1.02 } : {}}
                  whileTap={answers[currentStep?.id] ? { scale: 0.98 } : {}}
                >
                  {step < totalSteps - 1 ? 'Continue →' : "Let's Set Things Up →"}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── TUTORIAL ─────────────────────────────────────────── */}
          {phase === 'tutorial' && (
            <motion.div
              key={`t-${tutStep}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center justify-between mb-6">
                <ProgressBar current={tutStep} total={TUTORIAL_STEPS.length} />
              </div>

              {/* Welcome header — first tutorial step only */}
              {tutStep === 0 && (
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className="font-display font-bold text-3xl text-white mb-2">
                    Welcome to Vantage Field,{' '}
                    <span className="text-gold-gradient">{answers.business}</span>
                  </h1>
                  <p className="text-slate-400 text-sm">Let's get you set up in 3 quick steps.</p>
                </motion.div>
              )}

              <div className="mb-8">
                <CairnBubble message={getCairnMsg()} thinking={thinking} size="md" />
              </div>

              <div className="glass rounded-2xl p-6">
                {(() => {
                  const ts = TUTORIAL_STEPS[tutStep]
                  return (
                    <>
                      <Field
                        label={ts.fieldLabel}
                        value={tutAnswers[ts.field]}
                        onChange={(val) => setTutAnswers((a) => ({ ...a, [ts.field]: val }))}
                        type={ts.type || 'text'}
                        placeholder={ts.placeholder}
                      />
                      <motion.button
                        onClick={nextTut}
                        disabled={!tutAnswers[ts.field]}
                        className="w-full mt-5 py-4 rounded-xl font-display font-bold"
                        style={{
                          background: tutAnswers[ts.field]
                            ? 'linear-gradient(135deg,#c9a84c,#d4b96a)'
                            : 'rgba(30,58,95,0.3)',
                          color: tutAnswers[ts.field] ? '#0a0f1e' : '#475569',
                          boxShadow: tutAnswers[ts.field] ? '0 4px 24px rgba(201,168,76,0.3)' : 'none',
                        }}
                        whileHover={tutAnswers[ts.field] ? { scale: 1.02 } : {}}
                        whileTap={tutAnswers[ts.field] ? { scale: 0.98 } : {}}
                      >
                        {ts.action} →
                      </motion.button>
                    </>
                  )
                })()}

                {tutStep === 0 && (
                  <button
                    onClick={skipTutorial}
                    className="w-full mt-3 py-3 text-sm text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    Skip setup — I'll explore on my own
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* ── DONE ─────────────────────────────────────────────── */}
          {phase === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                className="flex justify-center mb-8"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <CairnIcon size={100} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="font-display font-bold text-4xl text-white mb-4">
                  You're live, <span className="text-gold-gradient">{answers.name}</span>.
                </h1>
                <p className="text-lg text-slate-400 mb-10">
                  {answers.business} is now powered by Vantage Field.<br />
                  Cairn is standing by.
                </p>

                <div className="glass-gold rounded-2xl p-6 mb-8 text-left"
                  style={{ boxShadow: '0 0 30px rgba(201,168,76,0.12)' }}>
                  <CairnBubble message={getCairnMsg()} size="sm" />
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate('/demo')}
                    className="btn-gold text-base py-4 px-8 font-display"
                  >
                    Open Your Dashboard →
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="btn-ghost text-sm py-3 px-8"
                  >
                    Back to Home
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
