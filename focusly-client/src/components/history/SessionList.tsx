import type { Session } from '@/types'

interface SessionListProps {
  sessions?: Session[]
}

function SessionList({ sessions = [] }: SessionListProps) {
  return (
    <ul>
      {sessions.map((s) => (
        <li key={s.id}>{s.duration}s — {s.startTime}</li>
      ))}
    </ul>
  )
}

export default SessionList
