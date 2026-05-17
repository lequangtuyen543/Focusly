import React from 'react'
import { TimerDisplay, TimerControls } from '@/components/timer'
import { useTimerStore } from '@/store'

const TimerPage: React.FC = () => {
  const { seconds } = useTimerStore()
  return (
    <div>
      <TimerDisplay time={String(seconds)} />
      <TimerControls />
    </div>
  )
}

export default TimerPage
