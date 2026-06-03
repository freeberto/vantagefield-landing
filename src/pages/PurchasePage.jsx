/**
 * PurchasePage — /purchase
 *
 * Step 1: Tier selection
 * Step 2: Request Access form  →  inserts to Supabase access_requests table
 *                                  Database Webhook fires notify-access-request Edge Function
 *                                  which emails robert@vantagefield.app via Resend
 * Step 3a: Form success — CairnIcon confirmation, "we'll be in touch within 24 hours"
 * Step 3b: GOLDEN success — particle burst + redirect to app.vantagefield.app/signup?plan=X
 */

import { useState, useEffect, useCallback } from 'react'
import { useNavigate }                       from 'react-router-dom'
import { motion, AnimatePresence }           from 'framer-motion'
import { supabase }                          from '../lib/supabase'
import CairnIcon                             from '../components/shared/CairnIcon'
import VantageFieldLogo                      from '../components/shared/VantageFieldLogo'

const SIGNUP_BASE = 'https://app.vantagefield.app/signup'

/* ─── Tiers ─────────────────────────────────────────────────────────── */
const TIERS = [
  {
    id:        'starter',
    name:      'Starter',
    price:     89,
    highlight: false,
    features:  [
      'Up to 10 workers',
      'GPS clock-in & verification',
      'Core shift scheduling',
      'Worker mobile app',
      'Basic incident reports',
      'Admin dashboard',
    ],
  },
  {
    id:        'professional',
    name:      'Professional',
    price:     159,
    highlight: true,
    features:  [
      'Up to 30 workers',
      'Everything in Starter',
      'Automated push notifications',
      'Open shift auto-fill',
      'Payroll tracking & export',
      'Overtime alerts',
      'Cairn AI assistant',
    ],
  },
  {
    id:        'enterprise',
    name:      'Enterprise',
    price:     249,
    highlight: false,
    features:  [
      'Unlimited workers',
      'Everything in Professional',
      'Multi-location management',
      'Custom industry templates',
      'Advanced analytics',
      'Priority support',
      'API access',
    ],
  },
]

/* ─── Particle burst (GOLDEN flow) ─────────────────────────────────── */
const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id:    i,
  angle: (i / 40) * 360,
  dist:  100 + Math.random() * 150,
  size:  4   + Math.random() * 10,
  color: i % 3 === 0 ? '#c9a84c' : i % 3 === 1 ? '#3a6b9e' : '#e8d08a',
}))

function ParticleBurst({ active }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {active &&
          PARTICLES.map((p) => {
            const rad = (p.angle * Math.PI) / 180
            const x   = Math.cos(rad) * p.dist
            const y   = Math.sin(rad) * p.dist
            return (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{ width: p.size, height: p.size, background: p.color, top: '50%', left: '50%' }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{ x, y, opacity: 0, scale: 1 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            )
          })}
      </AnimatePresence>
    </div>
  )
}

/* ─── Shared form inputs ────────────────────────────────────────────── */
function Field({ label, required, hint, children }) {
  return (
    <div>
      <label className="text-xs text-slate-400 mb-1.5 block">
        {label}
        {required && <span style={{ color: '#c9a84c' }}> *</span>}
        {hint && <span className="text-slate-600 ml-1">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

const BASE_STYLE = {
  background:   'rgba(6,11,20,0.8)',
  border:       '1px solid rgba(30,58,95,0.6)',
  borderRadius: 12,
  color:        '#e8edf5',
  outline:      'none',
  width:        '100%',
  fontSize:     14,
  padding:      '12px 16px',
  transition:   'border-color 0.2s, box-shadow 0.2s',
}

const FOCUS_BORDER = 'rgba(201,168,76,0.5)'
const IDLE_BORDER  = 'rgba(30,58,95,0.6)'

function TextInput({ value, onChange, placeholder, required, type = 'text' }) {
  return (
    <input
      type={type} value={value} onChange={onChange}
      placeholder={placeholder} required={required}
      style={BASE_STYLE}
      onFocus={(e) => (e.target.style.borderColor = FOCUS_BORDER)}
      onBlur={(e)  => (e.target.style.borderColor = IDLE_BORDER)}
    />
  )
}

function SelectInput({ value, onChange, children }) {
  return (
    <select
      value={value} onChange={onChange}
      style={{ ...BASE_STYLE, cursor: 'pointer' }}
      onFocus={(e) => (e.target.style.borderColor = FOCUS_BORDER)}
      onBlur={(e)  => (e.target.style.borderColor = IDLE_BORDER)}
    >
      {children}
    </select>
  )
}

function TextAreaInput({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value} onChange={onChange}
      placeholder={placeholder} rows={rows}
      style={{ ...BASE_STYLE, resize: 'vertical' }}
      onFocus={(e) => (e.target.style.borderColor = FOCUS_BORDER)}
      onBlur={(e)  => (e.target.style.borderColor = IDLE_BORDER)}
    />
  )
}

/* ─── Step 1: Tier select ───────────────────────────────────────────── */
function TierSelect({ onSelect }) {
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="font-display font-bold text-3xl text-white mb-2">Choose Your Plan</h1>
        <p className="text-slate-400">Select the plan that fits your team. Change anytime.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {TIERS.map((tier, i) => (
          <motion.div
            key={tier.id}
            className="rounded-2xl p-7 flex flex-col relative cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.03, y: -4 }}
            onClick={() => onSelect(tier)}
            style={{
              background:           tier.highlight ? 'rgba(201,168,76,0.07)' : 'rgba(10,20,38,0.6)',
              backdropFilter:       'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border:               tier.highlight ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(30,58,95,0.4)',
              boxShadow:            tier.highlight ? '0 0 40px rgba(201,168,76,0.10)' : undefined,
            }}
          >
            {tier.highlight && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full"
                style={{ background: 'linear-gradient(135deg,#c9a84c,#d4b96a)', color: '#0a0f1e' }}
              >
                Most Popular
              </div>
            )}

            <div className="mb-5">
              <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#c9a84c' }}>
                {tier.name}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">${tier.price}</span>
                <span className="text-slate-400 text-sm">/month</span>
              </div>
            </div>

            <ul className="space-y-2.5 flex-1 mb-6">
              {tier.features.map((f, fi) => (
                <li key={fi} className="flex items-start gap-2 text-sm text-slate-300">
                  <span style={{ color: '#c9a84c', flexShrink: 0, marginTop: 2 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <div
              className="w-full text-center py-3 rounded-xl font-semibold text-sm"
              style={
                tier.highlight
                  ? { background: 'linear-gradient(135deg,#c9a84c,#d4b96a)', color: '#0a0f1e' }
                  : { border: '1px solid rgba(30,58,95,0.6)', color: '#94a3b8' }
              }
            >
              Select {tier.name}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-xs text-slate-600 mt-8">
        No payment required · We'll confirm details on a quick call · Cancel anytime
      </p>
    </div>
  )
}

/* ─── Step 2: Request Access form ───────────────────────────────────── */
function RequestAccessForm({ tier, onSuccess, onGolden, onBack }) {
  const [form, setForm] = useState({
    business: '',
    name:     '',
    email:    '',
    phone:    '',
    plan:     tier.name,
    referral: '',
    notes:    '',
  })
  const [promo,      setPromo]      = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error,      setError]      = useState('')

  const isGolden = promo.trim().toUpperCase() === 'GOLDEN'
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // GOLDEN bypass — skip DB insert, straight to explosion
    if (isGolden) {
      onGolden(TIERS.find((t) => t.name === form.plan) ?? tier)
      return
    }

    setSubmitting(true)

    // Insert into Supabase — Database Webhook fires Edge Function → email
    const { error: dbErr } = await supabase
      .from('access_requests')
      .insert({
        business_name: form.business,
        contact_name:  form.name,
        email:         form.email,
        phone:         form.phone,
        plan:          form.plan,
        referral:      form.referral || null,
        notes:         form.notes    || null,
      })

    setSubmitting(false)

    if (dbErr) {
      console.error('[PurchasePage] Supabase insert error:', dbErr)
      // Surface user-friendly error but don't block — still show success
      // so a transient DB hiccup doesn't hurt conversion
      if (dbErr.code !== 'PGRST301') {
        setError('Something went wrong saving your request. Please email us directly at robert@vantagefield.app.')
        return
      }
    }

    onSuccess()
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Back */}
      <button
        onClick={onBack}
        className="text-sm text-slate-500 hover:text-slate-300 transition-colors mb-8 block"
      >
        ← Change plan
      </button>

      {/* Plan badge */}
      <motion.div
        className="rounded-2xl p-4 mb-6 flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.22)' }}
      >
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">Selected Plan</div>
          <div className="font-display font-semibold text-white">{tier.name}</div>
        </div>
        <div className="text-right">
          <div className="font-display font-bold text-xl text-white">${tier.price}</div>
          <div className="text-xs text-slate-500">/month</div>
        </div>
      </motion.div>

      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <h2 className="font-display font-bold text-xl text-white mb-1">Request Access</h2>
        <p className="text-sm text-slate-400 mb-6">
          We'll review your info and reach out within 24 hours to get you set up.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* GOLDEN promo — above the form */}
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">
              Promo Code <span className="text-slate-600">(optional)</span>
            </label>
            <input
              type="text"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Enter promo code"
              style={{
                ...BASE_STYLE,
                borderColor: isGolden ? 'rgba(201,168,76,0.7)' : IDLE_BORDER,
                boxShadow:   isGolden ? '0 0 0 3px rgba(201,168,76,0.08)' : undefined,
              }}
              onFocus={(e) => !isGolden && (e.target.style.borderColor = FOCUS_BORDER)}
              onBlur={(e)  => !isGolden && (e.target.style.borderColor = IDLE_BORDER)}
            />
            <AnimatePresence>
              {isGolden && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-xs mt-1.5 font-medium"
                  style={{ color: '#c9a84c' }}
                >
                  ✓ GOLDEN access unlocked — submit to activate
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px" style={{ background: 'rgba(30,58,95,0.4)' }} />
            <span className="text-xs text-slate-600">your details</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(30,58,95,0.4)' }} />
          </div>

          {/* Business name */}
          <Field label="Business Name" required>
            <TextInput value={form.business} onChange={set('business')} placeholder="Acme Security Co." required />
          </Field>

          {/* Your name */}
          <Field label="Your Name" required>
            <TextInput value={form.name} onChange={set('name')} placeholder="Jane Smith" required />
          </Field>

          {/* Email */}
          <Field label="Email Address" required>
            <TextInput type="email" value={form.email} onChange={set('email')} placeholder="jane@acmesecurity.com" required />
          </Field>

          {/* Phone */}
          <Field label="Phone Number" required>
            <TextInput type="tel" value={form.phone} onChange={set('phone')} placeholder="(555) 000-0000" required />
          </Field>

          {/* Plan — pre-filled, editable */}
          <Field label="Plan">
            <SelectInput value={form.plan} onChange={set('plan')}>
              {TIERS.map((t) => (
                <option key={t.id} value={t.name} style={{ background: '#0a0f1e' }}>
                  {t.name} — ${t.price}/month
                </option>
              ))}
            </SelectInput>
          </Field>

          {/* Referral */}
          <Field label="How did you hear about us?" hint="(optional)">
            <SelectInput value={form.referral} onChange={set('referral')}>
              <option value=""             style={{ background: '#0a0f1e' }}>Select one...</option>
              <option value="Google"       style={{ background: '#0a0f1e' }}>Google</option>
              <option value="Referral"     style={{ background: '#0a0f1e' }}>Referral</option>
              <option value="Social Media" style={{ background: '#0a0f1e' }}>Social Media</option>
              <option value="Other"        style={{ background: '#0a0f1e' }}>Other</option>
            </SelectInput>
          </Field>

          {/* Notes */}
          <Field label="Anything else you want us to know?" hint="(optional)">
            <TextAreaInput
              value={form.notes}
              onChange={set('notes')}
              placeholder="Team size, specific requirements, questions..."
              rows={3}
            />
          </Field>

          {/* DB error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-red-400 px-4 py-3 rounded-xl"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-xl font-display font-bold text-sm mt-2"
            style={{
              background: submitting
                ? 'rgba(30,58,95,0.6)'
                : 'linear-gradient(135deg,#c9a84c,#d4b96a)',
              color:     submitting ? '#c9a84c' : '#0a0f1e',
              boxShadow: '0 4px 24px rgba(201,168,76,0.28)',
              transition: 'background 0.3s, color 0.3s',
            }}
            whileHover={!submitting ? { scale: 1.02, y: -1 } : {}}
            whileTap={!submitting   ? { scale: 0.98 }         : {}}
          >
            {submitting
              ? '⏳ Sending...'
              : isGolden
              ? '⚡ Activate GOLDEN Access'
              : 'Request Access'}
          </motion.button>

          <p className="text-center text-xs text-slate-600">
            No payment required now · We'll confirm details on a quick call
          </p>
        </form>
      </motion.div>
    </div>
  )
}

/* ─── Step 3a: Normal form success ──────────────────────────────────── */
function FormSuccess() {
  return (
    <motion.div
      className="text-center max-w-md mx-auto py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex justify-center mb-6"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      >
        <CairnIcon size={90} state="resting" />
      </motion.div>

      <motion.h1
        className="font-display font-bold text-3xl text-white mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        Request received.
      </motion.h1>

      <motion.p
        className="text-slate-400 mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        We'll be in touch within 24 hours to get your operation set up.
      </motion.p>

      <motion.div
        className="glass-gold rounded-2xl p-6 text-left"
        style={{ border: '1px solid rgba(201,168,76,0.22)', boxShadow: '0 0 32px rgba(201,168,76,0.07)' }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
          <span className="text-xs text-slate-500">Cairn</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Welcome to the waitlist. We'll have you up and running shortly.
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ─── Step 3b: GOLDEN success (particle burst + redirect) ───────────── */
function GoldenSuccess({ tier }) {
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const tick = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(tick)
          window.location.href = `${SIGNUP_BASE}?plan=${tier.id}`
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(tick)
  }, [tier])

  return (
    <motion.div
      className="text-center max-w-md mx-auto relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
    >
      <div className="relative flex items-center justify-center mb-8">
        <ParticleBurst active />
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{ borderColor: 'rgba(201,168,76,0.3)' }}
            initial={{ width: 80,  height: 80,  opacity: 1 }}
            animate={{ width: 80 + i * 70, height: 80 + i * 70, opacity: 0 }}
            transition={{ duration: 1.6, delay: i * 0.28, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center relative z-10 text-4xl"
          style={{ background: 'linear-gradient(135deg,#c9a84c,#d4b96a)' }}
          animate={{ boxShadow: ['0 0 20px rgba(201,168,76,0.5)', '0 0 60px rgba(201,168,76,0.9)', '0 0 20px rgba(201,168,76,0.5)'] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          ⚡
        </motion.div>
      </div>

      <h1 className="font-display font-bold text-3xl text-white mb-3">
        GOLDEN access activated.
      </h1>
      <p className="text-slate-400 mb-2">
        Account ready — <span className="text-white font-semibold">{tier.name}</span> plan.
      </p>
      <p className="text-slate-500 text-sm">Redirecting to setup in {countdown}...</p>

      <motion.button
        className="mt-8 py-4 px-12 rounded-xl font-display font-bold text-sm"
        style={{ background: 'linear-gradient(135deg,#c9a84c,#d4b96a)', color: '#0a0f1e' }}
        onClick={() => { window.location.href = `${SIGNUP_BASE}?plan=${tier.id}` }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Set Up My Account →
      </motion.button>
    </motion.div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function PurchasePage() {
  const navigate = useNavigate()
  const [step, setStep] = useState('select')   // 'select' | 'form' | 'success' | 'golden-success'
  const [tier, setTier] = useState(null)

  const handleTierSelect = useCallback((t) => { setTier(t); setStep('form')           }, [])
  const handleSuccess    = useCallback(()    => { setStep('success')                   }, [])
  const handleGolden     = useCallback((t)   => { setTier(t); setStep('golden-success')}, [])

  return (
    <div
      className="min-h-screen"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(30,58,95,0.25) 0%, #0a0f1e 60%)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-8 py-4"
        style={{ borderBottom: '1px solid rgba(30,58,95,0.3)' }}
      >
        <button onClick={() => navigate('/')}>
          <VantageFieldLogo size={28} />
        </button>
        <button
          onClick={() => step === 'select' ? navigate('/demo') : setStep('select')}
          className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          ← Back
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-14">
        <AnimatePresence mode="wait">

          {step === 'select' && (
            <motion.div key="select" className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <TierSelect onSelect={handleTierSelect} />
            </motion.div>
          )}

          {step === 'form' && tier && (
            <motion.div key="form"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <RequestAccessForm
                tier={tier}
                onSuccess={handleSuccess}
                onGolden={handleGolden}
                onBack={() => setStep('select')}
              />
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div key="success"
              className="flex items-center justify-center min-h-[60vh]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <FormSuccess />
            </motion.div>
          )}

          {step === 'golden-success' && tier && (
            <motion.div key="golden-success"
              className="flex items-center justify-center min-h-[60vh]"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <GoldenSuccess tier={tier} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
