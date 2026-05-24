import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import RetroTunnel        from '../components/landing/RetroTunnel'
import DashboardMockup    from '../components/landing/DashboardMockup'
import PhoneMockup        from '../components/landing/PhoneMockup'
import CairnIcon          from '../components/shared/CairnIcon'
import SnowParticles      from '../components/shared/SnowParticles'
import Aurora             from '../components/shared/Aurora'
import MountainLayers     from '../components/shared/MountainLayers'

/* ── Destination ─────────────────────────────────────────────────── */
const APP   = 'https://app.vantagefield.app'
const LOGIN = 'https://app.vantagefield.app/login'

function goApp()   { window.location.href = APP }
function goLogin() { window.location.href = LOGIN }

/* ── Scroll-reveal wrapper ───────────────────────────────────────── */
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const y = direction === 'up' ? 36 : direction === 'down' ? -36 : 0
  const x = direction === 'left' ? 40 : direction === 'right' ? -40 : 0
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

/* ── Glass section wrapper ───────────────────────────────────────── */
function Section({ id, children, className = '', tinted = false }) {
  return (
    <section
      id={id}
      className={`relative py-28 px-6 ${className}`}
      style={{
        position: 'relative',
        zIndex: 10,
        ...(tinted ? {
          background: 'linear-gradient(180deg, rgba(13,21,41,0) 0%, rgba(13,21,41,0.55) 50%, rgba(13,21,41,0) 100%)',
        } : {}),
      }}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  )
}

/* ── Section eyebrow ─────────────────────────────────────────────── */
function Eyebrow({ children }) {
  return (
    <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#c9a84c' }}>
      {children}
    </div>
  )
}

/* ── Automation card ─────────────────────────────────────────────── */
function AutoCard({ icon, title, desc, delay }) {
  return (
    <Reveal delay={delay}>
      <motion.div
        className="glass rounded-2xl p-6 h-full"
        whileHover={{ scale: 1.03, borderColor: 'rgba(201,168,76,0.3)' }}
        transition={{ duration: 0.2 }}
        style={{ border: '1px solid rgba(30,58,95,0.4)' }}
      >
        <div className="text-3xl mb-4">{icon}</div>
        <div className="font-display font-semibold text-white mb-2 text-sm">{title}</div>
        <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
      </motion.div>
    </Reveal>
  )
}

/* ── Industry card ───────────────────────────────────────────────── */
function IndustryCard({ icon, name, delay }) {
  return (
    <Reveal delay={delay}>
      <motion.div
        className="glass rounded-2xl p-6 text-center"
        whileHover={{ scale: 1.05, borderColor: 'rgba(201,168,76,0.35)' }}
        transition={{ duration: 0.2 }}
        style={{ border: '1px solid rgba(30,58,95,0.4)', cursor: 'default' }}
      >
        <div className="text-3xl mb-3">{icon}</div>
        <div className="text-sm font-medium text-slate-300">{name}</div>
      </motion.div>
    </Reveal>
  )
}

/* ── Pricing card ────────────────────────────────────────────────── */
function PricingCard({ tier, price, features, highlight = false, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <motion.div
        className="rounded-2xl p-8 flex flex-col h-full relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        style={{
          background: highlight
            ? 'rgba(201,168,76,0.07)'
            : 'rgba(10,20,38,0.55)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: highlight
            ? '1px solid rgba(201,168,76,0.4)'
            : '1px solid rgba(30,58,95,0.4)',
          boxShadow: highlight ? '0 0 40px rgba(201,168,76,0.12)' : undefined,
        }}
      >
        {highlight && (
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full"
            style={{ background: 'linear-gradient(135deg,#c9a84c,#d4b96a)', color: '#0a0f1e' }}
          >
            Most Popular
          </div>
        )}

        <div className="mb-6">
          <div className="text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: '#c9a84c' }}>{tier}</div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white">${price}</span>
            <span className="text-slate-400 text-sm">/month</span>
          </div>
        </div>

        <ul className="space-y-3 flex-1 mb-8">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
              <span style={{ color: '#c9a84c', flexShrink: 0, marginTop: 1 }}>✓</span>
              {f}
            </li>
          ))}
        </ul>

        <button
          onClick={goApp}
          className={highlight ? 'btn-gold w-full text-sm py-3' : 'btn-ghost w-full text-sm py-3'}
        >
          Get Started
        </button>
      </motion.div>
    </Reveal>
  )
}

/* ── Navbar ──────────────────────────────────────────────────────── */
function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY.current && y > 120)
      setScrolled(y > 40)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        background: scrolled ? 'rgba(6,11,20,0.75)' : 'rgba(6,11,20,0.45)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(30,58,95,0.3)' : '1px solid transparent',
        transition: 'background 0.4s, border-color 0.4s',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <CairnIcon size={32} state="resting" />
        <span className="font-display font-bold text-white text-base tracking-tight">Vantage Field</span>
      </div>

      {/* Nav actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={goLogin}
          className="btn-ghost text-sm px-5 py-2.5"
          style={{ borderRadius: 12 }}
        >
          Login
        </button>
        <button
          onClick={goApp}
          className="btn-gold text-sm px-5 py-2.5"
          style={{ borderRadius: 12 }}
        >
          Get Started
        </button>
      </div>
    </motion.nav>
  )
}

/* ── Main ────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const heroRef  = useRef(null)
  const shiftRef = useRef(null)
  const gpsRef   = useRef(null)
  const ctaRef   = useRef(null)

  /* Hero parallax */
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef, offset: ['start start', 'end start'],
  })
  const heroY       = useTransform(heroScroll, [0, 1], [0, 140])
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0])

  /* CTA parallax */
  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef, offset: ['start end', 'end start'],
  })
  const ctaMtnY = useTransform(ctaScroll, [0, 1], [40, -40])

  return (
    <div className="min-h-screen relative" style={{ background: '#0a0f1e' }}>
      {/* ── Global overlays ──────────────────────────────────── */}
      <MountainLayers />
      <Aurora />
      <SnowParticles />

      <Navbar />

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ zIndex: 10 }}
      >
        {/* Retro wave tunnel fills entire hero */}
        <RetroTunnel />

        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 25%, rgba(6,11,20,0.6) 100%)',
          }}
        />

        {/* Centred hero content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8"
            style={{
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.35)',
              color: '#c9a84c',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#c9a84c', animation: 'pulse 2s infinite' }}
            />
            Field Operations Platform
          </motion.div>

          {/* Headline — serif per spec */}
          <motion.h1
            className="text-white leading-none mb-6"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(3.2rem, 9vw, 7rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            Vantage{' '}
            <span className="text-gold-gradient">Field</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="text-xl md:text-2xl font-medium mb-4"
            style={{ color: '#c9a84c' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Every hour spent scheduling is an hour not spent growing.
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            Vantage Field automates field operations so your team focuses on what matters —
            running your business.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button onClick={goApp} className="btn-gold text-base px-11 py-4 font-display">
              Try Free Demo
            </button>
            <button onClick={goLogin} className="btn-ghost text-base px-10 py-4">
              Login to Organization →
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 flex flex-col items-center gap-2"
          style={{ animation: 'scroll-cue 2.2s ease-in-out infinite' }}
        >
          <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
            <path d="M8 4 L8 20 M3 15 L8 20 L13 15" stroke="rgba(201,168,76,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 1 — MEET CAIRN
      ════════════════════════════════════════════════════════ */}
      <Section id="cairn" tinted>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <Reveal><Eyebrow>Your AI Operations Assistant</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
                Meet <span className="text-gold-gradient">Cairn</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Your AI operations assistant. Real-time briefings on your team, instant answers
                about your operation, always watching so you don't have to.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="space-y-3">
                {[
                  '"Who called off today?"',
                  '"How many hours did the team work this week?"',
                  '"Warn me if anyone approaches overtime."',
                ].map((q) => (
                  <div
                    key={q}
                    className="flex items-start gap-3 glass rounded-xl px-4 py-3"
                  >
                    <span style={{ color: '#c9a84c' }} className="text-sm mt-0.5">→</span>
                    <span className="text-sm text-slate-300 italic">{q}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Cairn demo + bubble */}
          <Reveal delay={0.15} direction="left">
            <div className="flex flex-col items-center gap-8">
              {/* Looping thinking animation */}
              <CairnIcon size={150} autoLoop />

              {/* Chat bubble */}
              <div
                className="glass-gold rounded-2xl p-6 w-full max-w-sm"
                style={{ boxShadow: '0 0 32px rgba(201,168,76,0.10)' }}
              >
                <div className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#22c55e', animation: 'pulse 2s infinite' }}
                  />
                  Cairn is online
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Good morning. You have{' '}
                  <span className="text-white font-semibold">5 shifts</span> scheduled today,{' '}
                  <span style={{ color: '#22c55e' }} className="font-medium">2 active</span> right
                  now. Sarah Chen completed her shift at Westgate Mall on time. No alerts.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — LIVE SHIFT MANAGEMENT
      ════════════════════════════════════════════════════════ */}
      <section
        id="shifts"
        className="relative py-24 px-6"
        style={{ position: 'relative', zIndex: 10, background: 'linear-gradient(180deg, rgba(13,21,41,0) 0%, rgba(13,21,41,0.6) 50%, rgba(13,21,41,0) 100%)' }}
      >
        <div ref={shiftRef} className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Reveal><Eyebrow>Live Shift Management</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                Total visibility.{' '}
                <span className="text-gold-gradient">Zero guesswork.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                See every shift, every location, every team member in real time. Assign guards,
                track status, and manage your entire operation from one screen.
              </p>
            </Reveal>
          </div>
          <DashboardMockup scrollRef={shiftRef} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 3 — GPS CLOCK IN
      ════════════════════════════════════════════════════════ */}
      <Section id="gps">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={gpsRef}>
            <PhoneMockup scrollRef={gpsRef} />
          </div>
          <div>
            <Reveal><Eyebrow>GPS Clock In</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
                Guards where{' '}
                <span className="text-gold-gradient">they need to be.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Workers clock in with GPS verification. You get instant confirmation they're
                on site. Wrong address problems eliminated permanently.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '📍', title: '300 ft radius check',     desc: 'Verifies exact proximity to the site' },
                  { icon: '⚡', title: 'Instant alerts',           desc: 'Out-of-range clock-in triggers admin SMS' },
                  { icon: '🔔', title: 'Smart reminders',          desc: 'Workers notified before shift start' },
                  { icon: '📊', title: 'Full audit trail',          desc: 'Every clock event logged with GPS' },
                ].map((item, i) => (
                  <div key={i} className="glass rounded-xl p-4">
                    <div className="text-xl mb-2">{item.icon}</div>
                    <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                    <div className="text-xs text-slate-500">{item.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          SECTION 4 — SMART AUTOMATIONS
      ════════════════════════════════════════════════════════ */}
      <section
        id="automations"
        className="relative py-24 px-6"
        style={{ position: 'relative', zIndex: 10, background: 'linear-gradient(180deg, rgba(13,21,41,0) 0%, rgba(13,21,41,0.6) 50%, rgba(13,21,41,0) 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Reveal><Eyebrow>Smart Automations</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                Your operation{' '}
                <span className="text-gold-gradient">runs itself.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Shift confirmations, call-off alerts, open shift notifications, overtime warnings —
                all automatic. You get notified when something needs your attention. Nothing else.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AutoCard icon="📲" title="Auto Shift Filling"     delay={0}    desc="When a worker calls off via SMS, available workers are texted automatically. First to respond gets the shift." />
            <AutoCard icon="⏰" title="Shift Reminders"        delay={0.1}  desc="Workers receive automatic reminders 24 hours and 2 hours before shift start. No more no-shows." />
            <AutoCard icon="⚠️" title="Conflict Detection"     delay={0.2}  desc="Catches double-bookings, overlapping shifts, and scheduling errors before they happen." />
            <AutoCard icon="🕐" title="Overtime Alerts"        delay={0.3}  desc="Get notified the moment someone approaches overtime. Stay compliant and in control of labor costs." />
          </div>

          <Reveal delay={0.4}>
            <div
              className="mt-12 glass-gold rounded-2xl p-8 text-center"
              style={{ boxShadow: '0 0 40px rgba(201,168,76,0.08)' }}
            >
              <div className="font-display font-bold text-3xl text-white mb-2">
                Save{' '}
                <span className="text-gold-gradient">8+ hours</span>
                {' '}of admin work per week
              </div>
              <div className="text-slate-400">
                per 10 team members. That's time you'll never get back — until now.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 5 — INDUSTRIES
      ════════════════════════════════════════════════════════ */}
      <Section id="industries">
        <div className="text-center mb-14">
          <Reveal><Eyebrow>Industry Ready</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Built for field operations.{' '}
              <span className="text-gold-gradient">Any industry.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Vantage Field works for any business where teams go to locations. Same powerful
              platform, customized for your industry.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: '🛡️', name: 'Security'     },
            { icon: '🧹', name: 'Cleaning'     },
            { icon: '🌿', name: 'Landscaping'  },
            { icon: '🍽️', name: 'Catering'     },
            { icon: '🚗', name: 'Valet'        },
            { icon: '🏠', name: 'Home Health'  },
          ].map((ind, i) => (
            <IndustryCard key={ind.name} {...ind} delay={i * 0.07} />
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          SECTION 6 — PRICING
      ════════════════════════════════════════════════════════ */}
      <section
        id="pricing"
        className="relative py-24 px-6"
        style={{ position: 'relative', zIndex: 10, background: 'linear-gradient(180deg, rgba(13,21,41,0) 0%, rgba(13,21,41,0.65) 50%, rgba(13,21,41,0) 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Reveal><Eyebrow>Simple Pricing</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                Plans that grow{' '}
                <span className="text-gold-gradient">with your operation.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            <PricingCard
              tier="Base"
              price={200}
              delay={0}
              features={[
                'Core scheduling',
                'GPS clock in',
                'Shift confirmations via SMS',
                'Incident reports',
                'Worker call-off',
                'Admin dashboard',
              ]}
            />
            <PricingCard
              tier="Growth"
              price={300}
              highlight
              delay={0.1}
              features={[
                'Everything in Base',
                'Automated shift scheduling',
                'Payroll tracking & export',
                'Advanced SMS notifications',
                'Open shift auto-fill',
                'Overtime alerts',
              ]}
            />
            <PricingCard
              tier="Suite"
              price={400}
              delay={0.2}
              features={[
                'Everything in Growth',
                'Cairn AI assistant',
                'Calendar automation',
                'Custom industry templates',
                'Priority support',
                'Multi-org management',
              ]}
            />
          </div>

          {/* Money back guarantee */}
          <Reveal delay={0.35}>
            <div className="text-center mt-12">
              <p
                className="font-display font-bold text-xl md:text-2xl"
                style={{ color: '#c9a84c' }}
              >
                30 Days or Your Money Back.
              </p>
              <p className="text-slate-400 mt-1">No questions asked.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 7 — FINAL CTA
      ════════════════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        id="cta"
        className="relative py-36 px-6 overflow-hidden"
        style={{ zIndex: 10 }}
      >
        {/* Parallax mountain silhouette for this section */}
        <motion.div
          style={{ y: ctaMtnY }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg
            viewBox="0 0 1440 400"
            preserveAspectRatio="xMidYMax slice"
            className="absolute bottom-0 w-full h-full"
          >
            <defs>
              <linearGradient id="ctaMtnGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d1829" stopOpacity="0" />
                <stop offset="100%" stopColor="#0a1422" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M0,400 L0,220 L100,185 L220,205 L340,155 L460,178 L580,120 L700,145 L820,90 L940,118 L1060,72 L1180,100 L1300,140 L1440,165 L1440,400 Z"
              fill="url(#ctaMtnGrad)"
            />
            <path
              d="M0,400 L0,290 L140,255 L260,275 L380,232 L500,255 L620,210 L740,238 L860,198 L980,225 L1100,195 L1220,218 L1340,248 L1440,260 L1440,400 Z"
              fill="rgba(7,14,26,0.7)"
            />
          </svg>
        </motion.div>

        {/* Glow backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(201,168,76,0.06) 0%, transparent 80%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <h2
              className="text-white font-display font-bold leading-tight mb-8"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
            >
              Your team. Your operation.{' '}
              <span className="text-gold-gradient">Under control.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
              Join the field operations businesses that have already stopped drowning in scheduling
              and started running a real operation.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <button
              onClick={goApp}
              className="btn-gold text-lg px-14 py-5 font-display"
            >
              Get Started Today →
            </button>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════ */}
      <footer
        className="relative py-10 px-8"
        style={{
          zIndex: 10,
          background: 'rgba(4,8,16,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(30,58,95,0.3)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <CairnIcon size={28} state="resting" />
            <span className="font-display font-semibold text-slate-300">Vantage Field</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="mailto:hello@vantagebusinesssolutions.com" className="hover:text-slate-300 transition-colors">Contact</a>
          </div>

          {/* Attribution */}
          <div className="text-xs text-slate-600">
            Built by Vantage Business Solutions
          </div>
        </div>
      </footer>
    </div>
  )
}
