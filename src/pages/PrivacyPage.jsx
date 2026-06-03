import { useNavigate, Link } from 'react-router-dom'
import VantageFieldLogo from '../components/shared/VantageFieldLogo'

export default function PrivacyPage() {
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
        <h1 style={{ color: '#ffffff', fontSize: 32, fontWeight: 900, marginBottom: 8, letterSpacing: '-0.02em' }}>Privacy Policy</h1>
        <p style={{ color: '#475569', fontSize: 13, marginBottom: 48 }}>Effective Date: June 3, 2026 &nbsp;·&nbsp; Last Updated: June 3, 2026</p>

        <S n="1. Introduction">
          This Privacy Policy explains how Vantage Business Solutions ("we," "us," or "our") collects, uses, stores, and protects your information when you use Vantage Field ("the App"), accessible at vantagefield.app. By using the App, you agree to the collection and use of information as described in this policy.
        </S>

        <S n="2. Who We Are">
          Vantage Field is operated by Vantage Business Solutions, owned by Rob Petersen, based in Naperville, Illinois. For privacy-related questions, contact us at <A href="mailto:robert@vantagefield.app">robert@vantagefield.app</A>.
        </S>

        <S n="3. Information We Collect">
          <p style={p}><strong style={{ color: '#e2e8f0' }}>Information you provide directly:</strong> full name, email address, phone number.</p>
          <p style={p}><strong style={{ color: '#e2e8f0' }}>Information collected automatically:</strong> GPS location data — collected only at the moment of clocking in or clocking out. We do not track continuous or background location at any time. Ever.</p>
          <p style={p}>We do not collect payment credentials. Billing is handled manually via Zelle. We do not store card numbers or any financial data.</p>
        </S>

        <S n="4. How We Use Your Information">
          <p style={p}>We use the information we collect to:</p>
          <ul style={ul}>
            <li style={li}>provide and operate the Vantage Field service;</li>
            <li style={li}>verify worker location at clock-in and clock-out events;</li>
            <li style={li}>send shift reminders and operational notifications via push notification;</li>
            <li style={li}>send critical and emergency alerts via SMS through Twilio;</li>
            <li style={li}>communicate with you about your account or subscription.</li>
          </ul>
          <p style={p}>We do not sell your data. We do not use your data for advertising purposes.</p>
        </S>

        <S n="5. GPS Location Data">
          Location is captured exclusively at two moments — when a worker clocks in and when a worker clocks out. The App does not track location continuously, does not run location services in the background, and does not monitor workers outside of these events. Workers are informed of this practice before granting location permissions.
        </S>

        <S n="6. How We Store Your Data">
          All data is stored securely in Supabase, a cloud database provider operating on industry-standard security infrastructure. Data is isolated per organization — no business can access another business's data. We use Row Level Security to enforce this at the database level.
        </S>

        <S n="7. Notifications">
          We send push notifications for shift reminders, schedule updates, and operational alerts. We send SMS messages via Twilio exclusively for critical and emergency situations such as SOS alerts. You can manage notification preferences within the App.
        </S>

        <S n="8. Data Sharing">
          <p style={p}>We do not sell, rent, or trade your personal information. We share data only with the third-party service providers necessary to operate the App:</p>
          <ul style={ul}>
            <li style={li}>Supabase (data storage and authentication)</li>
            <li style={li}>Twilio (SMS delivery for critical alerts)</li>
            <li style={li}>Mapbox (location display on maps)</li>
            <li style={li}>Anthropic (AI processing for the Cairn assistant)</li>
          </ul>
          <p style={p}>Each provider has their own privacy policy governing their use of data.</p>
        </S>

        <S n="9. Data Retention">
          We retain your data for as long as your account is active. If you cancel your subscription and request deletion, we will remove your data within 30 days. Some data may be retained longer if required by law.
        </S>

        <S n="10. Your Rights">
          <p style={p}>You have the right to:</p>
          <ul style={ul}>
            <li style={li}>access the personal information we hold about you;</li>
            <li style={li}>request correction of inaccurate information;</li>
            <li style={li}>request deletion of your account and associated data;</li>
            <li style={li}>opt out of non-essential communications.</li>
          </ul>
          <p style={p}>To exercise any of these rights, contact us at <A href="mailto:robert@vantagefield.app">robert@vantagefield.app</A>.</p>
        </S>

        <S n="11. Children's Privacy">
          Vantage Field is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with information, contact us immediately and we will delete it.
        </S>

        <S n="12. Security">
          We take reasonable technical and organizational measures to protect your data from unauthorized access, loss, or disclosure. However, no system is completely secure and we cannot guarantee absolute security.
        </S>

        <S n="13. California Residents (CCPA)">
          If you are a California resident, you have additional rights under the California Consumer Privacy Act including the right to know what personal information we collect, the right to delete it, and the right to opt out of its sale. We do not sell personal information. To submit a CCPA request, contact <A href="mailto:robert@vantagefield.app">robert@vantagefield.app</A>.
        </S>

        <S n="14. Changes to This Policy">
          We may update this Privacy Policy from time to time. If we make material changes, we will notify you via the App or by email. Continued use of the App after changes are posted constitutes your acceptance of the updated policy.
        </S>

        <S n="15. Contact">
          <p style={p}>Vantage Business Solutions &nbsp;·&nbsp; Naperville, Illinois</p>
          <p style={p}>Email: <A href="mailto:robert@vantagefield.app">robert@vantagefield.app</A></p>
          <p style={p}>Website: <A href="https://vantagefield.app">vantagefield.app</A></p>
        </S>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 12 }}>
          <Link to="/privacy" style={{ color: '#c9a84c', fontSize: 12, textDecoration: 'none' }}>Privacy Policy</Link>
          <Link to="/terms"   style={{ color: '#475569', fontSize: 12, textDecoration: 'none' }}>Terms of Service</Link>
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
