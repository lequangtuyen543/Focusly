import React from 'react'

type Props = { time?: string }

const TimerDisplay: React.FC<Props> = ({ time = '00:00' }) => {
  return <div>{time}</div>
}

export default TimerDisplay
