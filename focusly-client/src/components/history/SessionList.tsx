import React from 'react'
import { Session } from '@/types'

type Props = { sessions?: Session[] }

const SessionList: React.FC<Props> = ({ sessions = [] }) => {
  return (
    <ul>
      {sessions.map((s) => (
        <li key={s.id}>{s.duration}s — {s.startAt}</li>
      ))}
    </ul>
  )
}

export default SessionList
