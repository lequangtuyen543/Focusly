import React from 'react'

type Props = {
  onStart?: () => void
  onPause?: () => void
  onReset?: () => void
}

const TimerControls: React.FC<Props> = ({ onStart, onPause, onReset }) => {
  return (
    <div>
      <button onClick={onStart}>Start</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onReset}>Reset</button>
    </div>
  )
}

export default TimerControls
