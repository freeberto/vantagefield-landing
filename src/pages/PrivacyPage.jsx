import { useNavigate } from 'react-router-dom'
import VantageFieldLogo from '../components/shared/VantageFieldLogo'

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-10">Last updated: June 2025</p>

        <Section title="1. Overview">
          Vantage Business Solutions ("we," "us," or "our") operates Vantage Field. This Privacy
          Policy explains how we collect, use, and protect information about you when you use our
          platform. We are committed to transparency and handling your data responsibly.
        </Section>

        <Section title="2. Information We Collect">
          <p>We collect the following categories of information:</p>
          <ul>
            <li><strong className="text-white">Account information:</strong> Name, email address, phone number, and business name provided during registration or access requests.</li>
            <li><strong className="text-white">Location data:</strong> GPS coordinates captured at clock-in and clock-out events for shift verification purposes.</li>
            <li><strong className="text-white">Usage data:</strong> Shift activity, incident reports, break logs, and other operational records created through the platform.</li>
            <li><strong className="text-white">Device data:</strong> Browser type, device identifiers, and push notification tokens used to deliver notifications.</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use collected information to:</p>
          <ul>
            <li>Provide and operate the Vantage Field platform</li>
            <li>Verify shift attendance through GPS-based clock-in</li>
            <li>Send shift reminders and operational push notifications</li>
            <li>Generate payroll and attendance reports for your organization</li>
            <li>Improve platform performance and reliability</li>
            <li>Respond to support requests</li>
          </ul>
        </Section>

        <Section title="4. Location Data">
          GPS location data is collected at the time of clock-in and clock-out only — not continuously
          throughout a shift. Location data is associated with the worker's shift record and is
          accessible to authorized administrators within your organization. We do not sell, license,
          or share location data with third parties for advertising or marketing purposes.
        </Section>

        <Section title="5. Data Sharing">
          <p>We do not sell your personal data. We may share data with:</p>
          <ul>
            <li><strong className="text-white">Service providers:</strong> Supabase (database infrastructure), Twilio (SMS delivery), Resend (transactional email), and Vercel (hosting). These providers process data only on our behalf.</li>
            <li><strong className="text-white">Your organization's administrators:</strong> Shift records, clock events, and incident reports are visible to authorized admin users within your organization.</li>
            <li><strong className="text-white">Legal authorities:</strong> When required by law, court order, or to protect the safety of our users or the public.</li>
          </ul>
        </Section>

        <Section title="6. Data Retention">
          We retain account and shift data for as long as your organization maintains an active
          subscription, plus up to 12 months after termination to allow for reporting and dispute
          resolution. You may request earlier deletion by contacting support. Location data is
          retained for 12 months by default.
        </Section>

        <Section title="7. Security">
          We implement industry-standard security measures including encrypted data transmission
          (TLS), row-level security policies on our database, and access controls. However, no
          system is completely secure. We encourage you to use strong, unique passwords and to
          notify us immediately of any suspected breach.
        </Section>

        <Section title="8. Workers' Rights">
          Workers using Vantage Field have the right to:
          <ul>
            <li>Know what data their employer collects about them through the platform</li>
            <li>Request a copy of their personal data by contacting their organization administrator</li>
            <li>Request correction of inaccurate records</li>
          </ul>
          Worker data is owned by the employing organization; requests for deletion must be
          initiated by the organization administrator.
        </Section>

        <Section title="9. Cookies and Tracking">
          Vantage Field uses browser localStorage to store user preferences such as language
          settings, notification timing, and attire checklist state. We do not use third-party
          advertising cookies or behavioral tracking tools.
        </Section>

        <Section title="10. Children's Privacy">
          Vantage Field is intended for use by adults 18 years of age or older. We do not
          knowingly collect personal information from minors. If you believe a minor has provided
          information through our platform, please contact us immediately.
        </Section>

        <Section title="11. Changes to This Policy">
          We may update this Privacy Policy from time to time. When we do, we will update the
          "Last updated" date above and notify active subscribers of material changes via email.
          Continued use of the Service after changes are posted constitutes acceptance.
        </Section>

        <Section title="12. Contact Us">
          If you have questions, concerns, or requests regarding this Privacy Policy, contact us at:{' '}
          <a href="mailto:hello@vantagebusinesssolutions.com" className="underline" style={{ color: '#c9a84c' }}>
            hello@vantagebusinesssolutions.com
          </a>
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
      <h2 className="text-base font-bold mb-3" style={{ color: '#c9a84c' }}>{title}</h2>
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
