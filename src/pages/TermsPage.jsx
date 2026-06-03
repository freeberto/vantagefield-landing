import { useNavigate, Link } from 'react-router-dom'
import VantageFieldLogo from '../components/shared/VantageFieldLogo'

export default function TermsPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', color: '#e2e8f0' }}>

      {/* Nav */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <VantageFieldLogo size={28} wordmark />
          </button>
          <button onClick={() => navigate(-1)} style={{ fontSize: 12, color: '#64748b', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 14px', cursor: 'pointer' }}>
            ← Back
          </button>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 80px' }}>
        <p style={{ color: '#c9a84c', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Vantage Field</p>
        <h1 style={{ color: '#ffffff', fontSize: 32, fontWeight: 900, marginBottom: 8, letterSpacing: '-0.02em' }}>Terms of Service</h1>
        <p style={{ color: '#475569', fontSize: 13, marginBottom: 48 }}>Effective Date: June 3, 2026 &nbsp;·&nbsp; Last Updated: June 3, 2026</p>

        <S n="1. Agreement to Terms">
          By accessing or using Vantage Field ("the App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the App. These Terms apply to all users, including business owners (Employers) and their field employees (Workers). Vantage Field is operated by Vantage Business Solutions ("we," "us," or "our"), located in Naperville, Illinois.
        </S>

        <S n="2. Description of Service">
          Vantage Field is a workforce management application that allows businesses to manage employee scheduling, track field clock-in and clock-out events via GPS, and communicate with workers via push notifications and SMS. The service is provided on a subscription basis.
        </S>

        <S n="3. Eligibility">
          You must be at least 18 years old to create an account as an Employer. Workers using the App at their employer's direction must be at least 13 years old. By using the App, you represent that you meet these requirements.
        </S>

        <S n="4. Accounts">
          You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. Notify us immediately at <A href="mailto:robert@vantagefield.app">robert@vantagefield.app</A> if you believe your account has been compromised. We reserve the right to terminate accounts that violate these Terms.
        </S>

        <S n="5. Employer Responsibilities">
          <p style={p}>Employers using Vantage Field are responsible for:</p>
          <ul style={ul}>
            <li style={li}>obtaining any legally required consent from Workers before collecting GPS location data;</li>
            <li style={li}>complying with applicable federal, state, and local employment, privacy, and labor laws;</li>
            <li style={li}>ensuring Workers are informed that their location is tracked only during clock-in and clock-out events;</li>
            <li style={li}>maintaining accurate employee records within the App.</li>
          </ul>
          <p style={p}>We provide the tools. Compliance with employment law is your responsibility.</p>
        </S>

        <S n="6. Acceptable Use">
          <p style={p}>You agree not to:</p>
          <ul style={ul}>
            <li style={li}>use the App for any unlawful purpose;</li>
            <li style={li}>attempt to gain unauthorized access to any part of the App or its infrastructure;</li>
            <li style={li}>misrepresent your identity or your workers' information;</li>
            <li style={li}>interfere with the operation of the App or other users' access to it.</li>
          </ul>
        </S>

        <S n="7. Subscription and Billing">
          <p style={p}>Vantage Field is offered on a monthly subscription basis at the following tiers:</p>
          <ul style={ul}>
            <li style={li}>Starter — $89/month</li>
            <li style={li}>Professional — $159/month</li>
            <li style={li}>Enterprise — $249/month</li>
          </ul>
          <p style={p}>Billing is handled manually. Upon signing up, you will be invoiced by Vantage Business Solutions and payment is collected via Zelle. Subscriptions renew monthly. You will receive an invoice prior to each renewal.</p>
        </S>

        <S n="8. Refund Policy">
          We offer a 30-day money back guarantee. If you are not satisfied within the first 30 days of your subscription, contact us at <A href="mailto:robert@vantagefield.app">robert@vantagefield.app</A> for a full refund. No questions asked.
        </S>

        <S n="9. Intellectual Property">
          All content, features, and functionality of Vantage Field — including but not limited to the software, design, text, graphics, and the Cairn AI assistant — are owned by Vantage Business Solutions and are protected by applicable intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of the App.
        </S>

        <S n="10. Third-Party Services">
          <p style={p}>Vantage Field integrates with the following third-party services:</p>
          <ul style={ul}>
            <li style={li}>Supabase (database and authentication infrastructure)</li>
            <li style={li}>Twilio (SMS delivery for critical and emergency alerts)</li>
            <li style={li}>Mapbox (mapping and location display)</li>
            <li style={li}>Anthropic (AI capabilities powering the Cairn assistant)</li>
          </ul>
          <p style={p}>Each of these services operates under their own terms and privacy policies. We are not responsible for their practices.</p>
        </S>

        <S n="11. Disclaimers">
          Vantage Field is provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free service. We are not responsible for GPS inaccuracies caused by device hardware or environmental conditions.
        </S>

        <S n="12. Limitation of Liability">
          To the maximum extent permitted by law, Vantage Business Solutions shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the App, even if we have been advised of the possibility of such damages. Our total liability to you shall not exceed the amount you paid us in the three months preceding the claim.
        </S>

        <S n="13. Indemnification">
          You agree to indemnify and hold harmless Vantage Business Solutions and its owner from any claims, damages, or expenses (including attorney's fees) arising from your use of the App, your violation of these Terms, or your violation of any applicable law.
        </S>

        <S n="14. Termination">
          We reserve the right to suspend or terminate your account at our discretion if you violate these Terms. You may terminate your account at any time by contacting us. Upon termination, your access to the App will cease and your data will be handled per our Privacy Policy.
        </S>

        <S n="15. Governing Law">
          These Terms are governed by the laws of the State of Illinois, without regard to conflict of law provisions. Any disputes shall be resolved in the courts located in DuPage County, Illinois.
        </S>

        <S n="16. Changes to These Terms">
          We may update these Terms at any time. If we make material changes, we will notify you via the App or by email. Continued use of the App after changes are posted constitutes your acceptance of the updated Terms.
        </S>

        <S n="17. Contact">
          <p style={p}>Vantage Business Solutions &nbsp;·&nbsp; Naperville, Illinois</p>
          <p style={p}>Email: <A href="mailto:robert@vantagefield.app">robert@vantagefield.app</A></p>
          <p style={p}>Website: <A href="https://vantagefield.app">vantagefield.app</A></p>
        </S>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 12 }}>
          <Link to="/privacy" style={{ color: '#475569', fontSize: 12, textDecoration: 'none' }}>Privacy Policy</Link>
          <Link to="/terms"   style={{ color: '#c9a84c', fontSize: 12, textDecoration: 'none' }}>Terms of Service</Link>
        </div>
        <p style={{ color: '#334155', fontSize: 12 }}>© {new Date().getFullYear()} Vantage Business Solutions. All rights reserved.</p>
      </footer>
    </div>
  )
}

/* ── Shared styles ─────────────────────────────────────────────────── */
const p  = { margin: '0 0 10px', lineHeight: 1.7 }
const ul = { paddingLeft: 20, margin: '8px 0 12px' }
const li = { marginBottom: 6, lineHeight: 1.7 }

function S({ n, children }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ color: '#c9a84c', fontSize: 14, fontWeight: 700, marginBottom: 12, letterSpacing: '0.01em' }}>{n}</h2>
      <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
        {typeof children === 'string' ? <p style={p}>{children}</p> : children}
      </div>
    </section>
  )
}

function A({ href, children }) {
  return (
    <a href={href} style={{ color: '#c9a84c', textDecoration: 'underline' }}>{children}</a>
  )
}
