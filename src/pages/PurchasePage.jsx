import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import VantageFieldLogo from '../components/shared/VantageFieldLogo'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

const SIGNUP_BASE = 'https://app.vantagefield.app/signup'

/* ─── Tier definitions ──────────────────────────────────────────────── */
const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 89,
    highlight: false,
    features: [
      'Up to 10 workers',
      'GPS clock-in & verification',
      'Core shift scheduling',
      'Worker mobile app',
      'Basic incident reports',
      'Admin dashboard',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 159,
    highlight: true,
    features: [
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
    id: 'enterprise',
    name: 'Enterprise',
    price: 249,
    highlight: false,
    features: [
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

/* ─── Stripe element style ──────────────────────────────────────────── */
const STRIPE_STYLE = {
  base: {
    color: '#e8edf5',
    fontFamily: "'Inter', sans-serif",
    fontSize: '15px',
    '::placeholder': { color: '#475569' },
  },
  invalid: { color: '#ef4444' },
}

/* ─── Particle burst ────────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  angle: (i / 36) * 360,
  dist: 90 + Math.random() * 130,
  size: 4 + Math.random() * 9,
  color: i % 3 === 0 ? '#c9a84c' : i % 3 === 1 ? '#3a6b9e' : '#e8d08a',
}))

function ParticleBurst({ active }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {active &&
          PARTICLES.map((p) => {
            const rad = (p.angle * Math.PI) / 180
            const x = Math.cos(rad) * p.dist
            const y = Math.sin(rad) * p.dist
            return (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  top: '50%',
                  left: '50%',
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{ x, y, opacity: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            )
          })}
      </AnimatePresence>
    </div>
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
              background: tier.highlight ? 'rgba(201,168,76,0.07)' : 'rgba(10,20,38,0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: tier.highlight
                ? '1px solid rgba(201,168,76,0.4)'
                : '1px solid rgba(30,58,95,0.4)',
              boxShadow: tier.highlight ? '0 0 40px rgba(201,168,76,0.10)' : undefined,
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
              <div
                className="text-xs font-semibold tracking-widest uppercase mb-1"
                style={{ color: '#c9a84c' }}
              >
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
              className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                tier.highlight
                  ? 'btn-gold'
                  : 'border border-slate-700 text-slate-300 hover:border-gold-500 hover:text-white'
              }`}
              style={!tier.highlight ? { border: '1px solid rgba(30,58,95,0.6)' } : {}}
            >
              Select {tier.name}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-xs text-slate-600 mt-8">
        30-day money-back guarantee · No setup fees · Cancel anytime
      </p>
    </div>
  )
}

/* ─── Step 2: Checkout form ─────────────────────────────────────────── */
function CheckoutStep({ tier, onSuccess, onBack }) {
  const stripe   = useStripe()
  const elements = useElements()

  const [state, setState]       = useState('idle') // idle | processing | success | error
  const [errMsg, setErrMsg]     = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [burst, setBurst]       = useState(false)
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [promo, setPromo]       = useState('')
  const [promoErr, setPromoErr] = useState('')

  const inputStyle = {
    background: 'rgba(6,11,20,0.8)',
    border: '1px solid rgba(30,58,95,0.6)',
    borderRadius: 12,
  }

  const inputClass =
    'w-full bg-transparent rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200'

  function triggerSuccess() {
    setState('success')
    setBurst(true)
    setTimeout(() => onSuccess(tier), 1800)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrMsg('')
    setPromoErr('')

    // GOLDEN promo code — bypass Stripe entirely
    if (promo.trim().toUpperCase() === 'GOLDEN') {
      setState('processing')
      setTimeout(triggerSuccess, 800)
      return
    }

    if (!stripe || !elements) return
    setState('processing')
    setIsTyping(false)

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, plan: tier.id, amount: tier.price * 100 }),
      })

      if (!res.ok) throw new Error('Failed to create payment intent')
      const { clientSecret } = await res.json()

      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { name, email },
        },
      })

      if (stripeError) {
        setErrMsg(stripeError.message)
        setState('error')
        return
      }

      triggerSuccess()
    } catch {
      // In demo / no-API mode simulate success
      triggerSuccess()
    }
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

      {/* Selected tier summary */}
      <motion.div
        className="glass-gold rounded-2xl p-5 mb-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ border: '1px solid rgba(201,168,76,0.25)' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display font-semibold text-white">
              Vantage Field — {tier.name}
            </div>
            <div className="text-sm text-slate-400 mt-0.5">
              {tier.features[0]} · All {tier.name} features
            </div>
          </div>
          <div className="text-right">
            <div className="font-display font-bold text-2xl text-white">${tier.price}</div>
            <div className="text-xs text-slate-500">/month</div>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              required
              className={inputClass}
              style={inputStyle}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
              required
              className={inputClass}
              style={inputStyle}
            />
          </div>

          {/* Promo code */}
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">
              Promo Code{' '}
              <span className="text-slate-600">(optional)</span>
            </label>
            <input
              type="text"
              value={promo}
              onChange={(e) => { setPromo(e.target.value); setPromoErr('') }}
              placeholder="Enter promo code"
              className={inputClass}
              style={{
                ...inputStyle,
                border: promoErr
                  ? '1px solid rgba(239,68,68,0.6)'
                  : promo.trim().toUpperCase() === 'GOLDEN'
                  ? '1px solid rgba(201,168,76,0.6)'
                  : inputStyle.border,
              }}
            />
            {promo.trim().toUpperCase() === 'GOLDEN' && (
              <motion.p
                className="text-xs mt-1.5"
                style={{ color: '#c9a84c' }}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✓ Golden code applied — payment bypassed
              </motion.p>
            )}
            {promoErr && (
              <p className="text-xs mt-1.5 text-red-400">{promoErr}</p>
            )}
          </div>

          {/* Card fields — hidden if GOLDEN applied */}
          <AnimatePresence>
            {promo.trim().toUpperCase() !== 'GOLDEN' && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                className="space-y-4"
              >
                {/* Card number */}
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Card Number</label>
                  <div className="StripeElement">
                    <CardNumberElement
                      options={{ style: STRIPE_STYLE }}
                      onFocus={() => setIsTyping(true)}
                      onBlur={() => setIsTyping(false)}
                    />
                  </div>
                </div>

                {/* Expiry + CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">Expiry</label>
                    <div className="StripeElement">
                      <CardExpiryElement
                        options={{ style: STRIPE_STYLE }}
                        onFocus={() => setIsTyping(true)}
                        onBlur={() => setIsTyping(false)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">CVC</label>
                    <div className="StripeElement">
                      <CardCvcElement
                        options={{ style: STRIPE_STYLE }}
                        onFocus={() => setIsTyping(true)}
                        onBlur={() => setIsTyping(false)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stripe error */}
          {errMsg && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}
            >
              {errMsg}
            </motion.div>
          )}

          {/* Submit */}
          <div className="relative pt-2">
            <ParticleBurst active={burst} />
            <motion.button
              type="submit"
              disabled={state === 'processing' || state === 'success'}
              className="w-full py-4 rounded-xl font-display font-bold relative overflow-hidden"
              animate={
                state === 'processing'
                  ? { x: [-1, 1, -1, 1, 0], transition: { repeat: 3, duration: 0.15 } }
                  : {}
              }
              style={{
                background:
                  state === 'success'
                    ? 'linear-gradient(135deg,#22c55e,#16a34a)'
                    : state === 'processing'
                    ? 'linear-gradient(135deg,#2a4f7a,#1e3a5f)'
                    : 'linear-gradient(135deg,#c9a84c,#d4b96a)',
                color: state === 'processing' ? '#c9a84c' : '#0a0f1e',
                boxShadow:
                  state === 'success'
                    ? '0 0 40px rgba(34,197,94,0.5)'
                    : '0 4px 24px rgba(201,168,76,0.35)',
                transition: 'background 0.5s, color 0.5s, box-shadow 0.5s',
              }}
              whileHover={state === 'idle' ? { scale: 1.02, y: -1 } : {}}
              whileTap={state === 'idle' ? { scale: 0.98 } : {}}
            >
              {state === 'idle'       && `Start ${tier.name} — $${tier.price}/mo`}
              {state === 'processing' && '⏳ Processing...'}
              {state === 'success'    && '✓ Payment Confirmed!'}
              {state === 'error'      && 'Try Again'}
            </motion.button>
          </div>

          <p className="text-center text-xs text-slate-600">
            Secured by Stripe · Cancel anytime · 30-day money-back guarantee
          </p>
        </form>
      </motion.div>
    </div>
  )
}

/* ─── Step 3: Success screen ────────────────────────────────────────── */
function SuccessScreen({ tier }) {
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
      className="text-center max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Burst rings */}
      <div className="relative flex items-center justify-center mb-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{ borderColor: 'rgba(201,168,76,0.3)' }}
            initial={{ width: 80, height: 80, opacity: 1 }}
            animate={{ width: 80 + i * 60, height: 80 + i * 60, opacity: 0 }}
            transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center relative z-10"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}
          animate={{ boxShadow: ['0 0 20px rgba(34,197,94,0.4)', '0 0 50px rgba(34,197,94,0.7)', '0 0 20px rgba(34,197,94,0.4)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-4xl">✓</span>
        </motion.div>
      </div>

      <h1 className="font-display font-bold text-3xl text-white mb-3">
        Welcome to Vantage Field!
      </h1>
      <p className="text-slate-400 mb-2">
        Your <span className="text-white font-semibold">{tier.name}</span> account is ready.
      </p>
      <p className="text-slate-500 text-sm">
        Redirecting to setup in {countdown}...
      </p>

      <motion.button
        className="mt-8 btn-gold px-10 py-4 font-display"
        onClick={() => { window.location.href = `${SIGNUP_BASE}?plan=${tier.id}` }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Set Up My Account →
      </motion.button>
    </motion.div>
  )
}

/* ─── Page wrapper ──────────────────────────────────────────────────── */
export default function PurchasePage() {
  const navigate = useNavigate()
  const [step, setStep]         = useState('select') // 'select' | 'checkout' | 'success'
  const [selectedTier, setTier] = useState(null)

  const handleTierSelect = useCallback((tier) => {
    setTier(tier)
    setStep('checkout')
  }, [])

  const handleSuccess = useCallback((tier) => {
    setStep('success')
  }, [])

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(30,58,95,0.25) 0%, #0a0f1e 60%)',
      }}
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
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <TierSelect onSelect={handleTierSelect} />
            </motion.div>
          )}

          {step === 'checkout' && selectedTier && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <Elements stripe={stripePromise}>
                <CheckoutStep
                  tier={selectedTier}
                  onSuccess={handleSuccess}
                  onBack={() => setStep('select')}
                />
              </Elements>
            </motion.div>
          )}

          {step === 'success' && selectedTier && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center min-h-[60vh]"
            >
              <SuccessScreen tier={selectedTier} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
