import type { Session } from '@/types'

export const mockSessions: Session[] = [
  {
    id: '1',
    type: 'focus',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 1500 * 1000).toISOString(),
    duration: 1500,
    completed: true,
  },
]

export default mockSessions
