import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from '@/store/appStore'
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow'
import { Layout } from '@/components/layout/Layout'
import { TimerPage, StatsPage, HistoryPage } from '@/pages'
import SettingsPage from '@/pages/Settings'

function App() {
  const { isOnboardingCompleted } = useAppStore()

  if (!isOnboardingCompleted) {
    return <OnboardingFlow />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><TimerPage /></Layout>} />
        <Route path="/stats" element={<Layout><StatsPage /></Layout>} />
        <Route path="/history" element={<Layout><HistoryPage /></Layout>} />
        <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
