import { Session } from '@/types'

export const mockSessions: Session[] = [
  { id: '1', duration: 1500, startAt: new Date().toISOString(), notes: 'Focus sprint' },
]

export default mockSessions
