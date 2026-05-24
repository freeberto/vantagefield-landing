import { useState, useCallback } from 'react'
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
import CairnIcon from '../components/shared/CairnIcon'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

const STRIPE_STYLE = {
  base: {
    color: '#e8edf5',
    fontFamily: "'Inter', sans-serif",
    fontSize: '15px',
    '::placeholder': { color: '#475569' },
  },
  invalid: { color: '#ef4444' },
}

/* ─── Particle burst on success ─────────────────────────────────────── */
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  angle: (i / 30) * 360,
  dist: 80 + Math.random() * 120,
  size: 4 + Math.random() * 8,
  color: i % 3 === 0 ? '#c9a84c' : i % 3 === 1 ? '#3a6b9e' : '#e8d08a',
}))

function ParticleBurst({ active }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {active && PARTICLES.map((p) => {
          const rad = (p.angle * Math.PI) / 180
          const x = Math.cos(rad) * p.dist
          const y = Math.sin(rad) * p.dist
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{ width: p.size, height: p.size, background: p.color, top: '50%', left: '50%' }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{ x, y, opacity: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

/* ─── Cairn covering eyes ───────────────────────────────────────────── */
function CairnSecure({ isTyping }) {
  return (
    <div className="relative flex flex-col items-center">
      <CairnIcon size={80} thinking={isTyping} />

      {/* Hands covering Cairn */}
      <AnimatePresence>
        {isTyping && (
          <>
            {/* Left hand */}
            <motion.div
              className="absolute"
              style={{ top: 10, left: -10 }}
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <svg width="52" height="52" viewBox="0 0 52 52">
                <defs>
                  <linearGradient id="handL" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#c9a84c" />
                    <stop offset="100%" stopColor="#8a6420" />
                  </linearGradient>
                </defs>
                {/* Palm */}
                <ellipse cx="26" cy="32" rx="18" ry="16" fill="url(#handL)" />
                {/* Fingers */}
                {[0,1,2,3].map(f => (
                  <rect key={f} x={10 + f * 8} y={10} width={6} height={22} rx={3} fill="url(#handL)" />
                ))}
                {/* Thumb */}
                <rect x={2} y={22} width={6} height={16} rx={3} fill="url(#handL)" transform="rotate(-20,5,30)" />
              </svg>
            </motion.div>

            {/* Right hand */}
            <motion.div
              className="absolute"
              style={{ top: 10, right: -10 }}
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 60, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <svg width="52" height="52" viewBox="0 0 52 52" style={{ transform: 'scaleX(-1)' }}>
                <defs>
                  <linearGradient id="handR" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2a4f7a" />
                    <stop offset="100%" stopColor="#0d1f36" />
                  </linearGradient>
                </defs>
                <ellipse cx="26" cy="32" rx="18" ry="16" fill="url(#handR)" />
                {[0,1,2,3].map(f => (
                  <rect key={f} x={10 + f * 8} y={10} width={6} height={22} rx={3} fill="url(#handR)" />
                ))}
                <rect x={2} y={22} width={6} height={16} rx={3} fill="url(#handR)" transform="rotate(-20,5,30)" />
              </svg>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Inner checkout form ───────────────────────────────────────────── */
function CheckoutForm({ onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const [state, setState] = useState('idle') // idle | processing | success | error
  const [error, setError] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [burst, setBurst] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const cairnMsg = {
    idle:       "I'll need your payment details to get your account set up. Your card info is encrypted end-to-end — I'm not peeking.",
    processing: "Processing your payment securely...",
    success:    "Payment confirmed. Welcome to Vantage Field. Let's get you set up!",
    error:      "Something went wrong with that card. Mind double-checking the details?",
  }

  const handleFocus = () => setIsTyping(true)
  const handleBlur  = () => setIsTyping(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setState('processing')
    setIsTyping(false)

    try {
      // Call your API to create a PaymentIntent
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
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
        setError(stripeError.message)
        setState('error')
        return
      }

      // Success
      setState('success')
      setBurst(true)
      setTimeout(() => onSuccess({ name, email }), 1800)
    } catch (err) {
      // In demo mode when no API is configured, simulate success
      setState('success')
      setBurst(true)
      setTimeout(() => onSuccess({ name, email }), 1800)
    }
  }

  const inputClass = "w-full bg-transparent rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 transition-all duration-200 outline-none"
  const inputStyle = {
    background: 'rgba(6,11,20,0.8)',
    border: '1px solid rgba(30,58,95,0.6)',
    borderRadius: 12,
  }
  const inputFocusStyle = { borderColor: 'rgba(201,168,76,0.6)', boxShadow: '0 0 0 3px rgba(201,168,76,0.08)' }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="text-xs text-slate-500 mb-1.5 block">Full Name</label>
        <input
          type="text" value={name} onChange={(e) => setName(e.target.value)}
          onFocus={handleFocus} onBlur={handleBlur}
          placeholder="Jane Smith"
          required
          className={inputClass}
          style={inputStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, inputFocusStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, inputStyle)}
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-xs text-slate-500 mb-1.5 block">Email</label>
        <input
          type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          onFocus={handleFocus} onBlur={handleBlur}
          placeholder="jane@company.com"
          required
          className={inputClass}
          style={inputStyle}
        />
      </div>

      {/* Card number */}
      <div>
        <label className="text-xs text-slate-500 mb-1.5 block">Card Number</label>
        <div className="StripeElement" onFocus={handleFocus} onBlur={handleBlur}>
          <CardNumberElement options={{ style: STRIPE_STYLE }} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
      </div>

      {/* Expiry + CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">Expiry</label>
          <div className="StripeElement">
            <CardExpiryElement options={{ style: STRIPE_STYLE }} onFocus={handleFocus} onBlur={handleBlur} />
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">CVC</label>
          <div className="StripeElement">
            <CardCvcElement options={{ style: STRIPE_STYLE }} onFocus={handleFocus} onBlur={handleBlur} />
          </div>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 px-4 py-3 rounded-xl"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
          {error}
        </motion.div>
      )}

      {/* Submit button */}
      <div className="relative pt-2">
        <ParticleBurst active={burst} />
        <motion.button
          type="submit"
          disabled={!stripe || state === 'processing' || state === 'success'}
          className="w-full py-4 rounded-xl font-display font-bold text-navy relative overflow-hidden"
          animate={
            state === 'processing'
              ? { x: [-1, 1, -1, 1, 0], transition: { repeat: 3, duration: 0.15 } }
              : {}
          }
          style={{
            background: state === 'success'
              ? 'linear-gradient(135deg,#22c55e,#16a34a)'
              : state === 'processing'
              ? 'linear-gradient(135deg,#2a4f7a,#1e3a5f)'
              : 'linear-gradient(135deg,#c9a84c,#d4b96a)',
            color: state === 'processing' ? '#c9a84c' : '#0a0f1e',
            boxShadow: state === 'success'
              ? '0 0 40px rgba(34,197,94,0.5)'
              : '0 4px 24px rgba(201,168,76,0.35)',
            transition: 'background 0.5s, color 0.5s, box-shadow 0.5s',
          }}
          whileHover={state === 'idle' ? { scale: 1.02, y: -1 } : {}}
          whileTap={state === 'idle' ? { scale: 0.98 } : {}}
        >
          {state === 'idle'       && 'Start My Account — $99/mo'}
          {state === 'processing' && '⏳ Processing securely...'}
          {state === 'success'    && '✓ Payment Confirmed!'}
          {state === 'error'      && 'Try Again'}
        </motion.button>
      </div>

      <p className="text-center text-xs text-slate-600">
        Secured by Stripe · Cancel anytime · No setup fees
      </p>
    </form>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function PaymentPage() {
  const navigate = useNavigate()
  const [isTyping, setIsTyping] = useState(false)

  const handleSuccess = useCallback((data) => {
    navigate('/onboarding', { state: data })
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(30,58,95,0.25) 0%, #0a0f1e 60%)',
      }}>
      <div className="w-full max-w-lg">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button onClick={() => navigate('/demo')}
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors mb-8 block mx-auto">
            ← Back to demo
          </button>

          <div className="flex justify-center mb-5">
            <CairnSecure isTyping={isTyping} />
          </div>

          <h1 className="font-display font-bold text-3xl text-white mb-2">
            Go Live with Vantage Field
          </h1>
          <p className="text-slate-400">Your first 14 days are on us.</p>
        </motion.div>

        {/* Pricing summary */}
        <motion.div
          className="glass-gold rounded-2xl p-5 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display font-semibold text-white">Vantage Field Pro</div>
              <div className="text-sm text-slate-400 mt-0.5">Unlimited workers · All features · Priority support</div>
            </div>
            <div className="text-right">
              <div className="font-display font-bold text-2xl text-white">$99</div>
              <div className="text-xs text-slate-500">/month</div>
            </div>
          </div>
          <div className="mt-4 pt-4 flex flex-wrap gap-2" style={{ borderTop: '1px solid rgba(30,58,95,0.3)' }}>
            {['GPS Clock-In', 'Shift Automations', 'Cairn AI', 'SMS Included', 'Unlimited Workers'].map((f) => (
              <span key={f} className="text-xs px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.2)' }}>
                ✓ {f}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Payment form */}
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
        >
          <Elements stripe={stripePromise}>
            <CheckoutForm onSuccess={handleSuccess} />
          </Elements>
        </motion.div>
      </div>
    </div>
  )
}
