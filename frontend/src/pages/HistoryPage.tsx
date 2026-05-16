import React from 'react'
import { SessionList } from '@/components/history'
import mockSessions from '@/data/mockSessions'

const HistoryPage: React.FC = () => {
  return <SessionList sessions={mockSessions} />
}

export default HistoryPage
