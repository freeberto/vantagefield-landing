import { useNavigate } from 'react-router-dom'
import VantageFieldLogo from '../components/shared/VantageFieldLogo'

export default function TermsPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ background: '#080d1a', color: '#e2e8f0' }}>

      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-slate-800 max-w-4xl mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center">
          <VantageFieldLogo size={28} wordmark />
        </button>
        <button
          onClick={() => navigate(-1)}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-600"
        >
          ← Back
        </button>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-black text-white mb-2">Terms of Service</h1>
        <p className="text-slate-500 text-sm mb-10">Last updated: June 2025</p>

        <Section title="1. Acceptance of Terms">
          By accessing or using Vantage Field ("the Service"), you agree to be bound by these Terms of
          Service. If you do not agree to these terms, you may not use the Service.
        </Section>

        <Section title="2. Description of Service">
          Vantage Field is a field operations management platform for businesses that manage hourly
          or shift-based workforces. Features include shift scheduling, GPS-based clock-in, incident
          reporting, push notifications, and administrative controls.
        </Section>

        <Section title="3. Account Responsibilities">
          You are responsible for maintaining the confidentiality of your account credentials. You
          agree to notify us immediately of any unauthorized use of your account. Vantage Field
          is not liable for any loss resulting from unauthorized account access.
        </Section>

        <Section title="4. Acceptable Use">
          You agree not to use the Service to:
          <ul>
            <li>Violate any applicable law or regulation</li>
            <li>Transmit harmful, offensive, or fraudulent content</li>
            <li>Interfere with or disrupt the integrity of the Service</li>
            <li>Attempt to gain unauthorized access to any system or network</li>
            <li>Use the Service to track or surveil individuals without their knowledge or consent</li>
          </ul>
        </Section>

        <Section title="5. Subscription and Billing">
          Vantage Field operates on a monthly subscription basis. You authorize us to charge your
          payment method on a recurring basis. Subscriptions may be cancelled at any time; access
          continues through the end of the current billing period. Refunds are issued at our
          discretion.
        </Section>

        <Section title="6. Data and Privacy">
          Your use of the Service is also governed by our Privacy Policy, which is incorporated into
          these Terms by reference. Worker location data collected via GPS is used solely for shift
          verification and is not sold to third parties.
        </Section>

        <Section title="7. Intellectual Property">
          All content, branding, software, and technology associated with Vantage Field are the
          exclusive property of Vantage Business Solutions. You may not copy, modify, or distribute
          any part of the Service without prior written consent.
        </Section>

        <Section title="8. Disclaimer of Warranties">
          The Service is provided "as is" without warranties of any kind, express or implied.
          We do not warrant that the Service will be uninterrupted, error-free, or completely secure.
        </Section>

        <Section title="9. Limitation of Liability">
          To the fullest extent permitted by law, Vantage Business Solutions shall not be liable for
          any indirect, incidental, special, or consequential damages arising from your use of the
          Service, even if advised of the possibility of such damages.
        </Section>

        <Section title="10. Termination">
          We reserve the right to suspend or terminate your account at any time for violation of
          these Terms. You may cancel your account at any time through the account settings or by
          contacting support.
        </Section>

        <Section title="11. Changes to Terms">
          We may update these Terms at any time. Continued use of the Service after changes are
          posted constitutes your acceptance of the revised Terms. We will notify active subscribers
          of material changes via email.
        </Section>

        <Section title="12. Governing Law">
          These Terms are governed by the laws of the State of Texas, without regard to its conflict
          of law provisions. Any disputes shall be resolved in the courts of Texas.
        </Section>

        <Section title="13. Contact">
          For questions about these Terms, contact us at{' '}
          <a href="mailto:hello@vantagebusinesssolutions.com" className="underline" style={{ color: '#c9a84c' }}>
            hello@vantagebusinesssolutions.com
          </a>.
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-600 px-6">
        © {new Date().getFullYear()} Vantage Business Solutions. All rights reserved.
      </footer>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-white font-bold text-base mb-3" style={{ color: '#c9a84c' }}>{title}</h2>
      <div className="text-slate-400 text-sm leading-relaxed space-y-2">
        {typeof children === 'string' ? (
          <p>{children}</p>
        ) : (
          children
        )}
      </div>
    </section>
  )
}
