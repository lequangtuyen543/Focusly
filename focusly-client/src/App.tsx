import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { TimerPage, StatsPage, HistoryPage, SettingsPage } from '@/pages'

function App() {
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
