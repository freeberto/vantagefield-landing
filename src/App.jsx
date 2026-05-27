import { Routes, Route } from 'react-router-dom'
import LandingPage   from './pages/LandingPage'
import DemoPage      from './pages/DemoPage'
import PurchasePage  from './pages/PurchasePage'
import PaymentPage   from './pages/PaymentPage'
import OnboardingPage from './pages/OnboardingPage'

export default function App() {
  return (
    <Routes>
      <Route path="/"           element={<LandingPage />}    />
      <Route path="/demo"       element={<DemoPage />}       />
      <Route path="/purchase"   element={<PurchasePage />}   />
      <Route path="/checkout"   element={<PaymentPage />}    />
      <Route path="/onboarding" element={<OnboardingPage />} />
    </Routes>
  )
}
