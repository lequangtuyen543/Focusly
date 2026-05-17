import { useState } from 'react'

function TimerPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60)

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100
  const circumference = 2 * Math.PI * 46
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-section-gap">
      {/* Greeting & Quote Header */}
      <header className="text-center w-full max-w-2xl mx-auto space-y-4">
        <h1 className="font-heading text-heading text-dark-charcoal">
          Good morning.
        </h1>
        <p className="font-body text-subheading text-medium-gray">
          &ldquo;Architecture starts when you carefully put two bricks together.&rdquo; &mdash; Mies van der Rohe
        </p>
      </header>

      {/* Timer Hero Section */}
      <section className="w-full max-w-md mx-auto relative flex flex-col items-center justify-center mt-8">
        {/* Progress Ring & Timer Container */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center bg-off-white rounded-[40px] shadow-card border border-outline-variant/10">
          {/* SVG Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="none" r="46" stroke="#f1edee" strokeWidth="2" />
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="46"
              stroke="#006496"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeWidth="2"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          {/* Timer Display */}
          <div className="text-center z-10 flex flex-col items-center gap-2">
            <span className="font-caption text-caption text-cofounder-blue uppercase tracking-widest font-semibold bg-cofounder-blue/10 px-3 py-1 rounded-nav-pill">
              Deep Work
            </span>
            <h2
              className="font-display text-display text-dark-charcoal tracking-tighter"
              style={{ fontFeatureSettings: "'tnum'" }}
            >
              {timeDisplay}
            </h2>
            <span className="font-body text-body text-slate-gray">Pomodoro 3 of 8</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-12">
          <button
            onClick={() => setTimeLeft(25 * 60)}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/50 text-slate-gray hover:bg-surface-container hover:text-dark-charcoal transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>restart_alt</span>
          </button>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-dark-charcoal text-canvas-white shadow-card hover:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isRunning ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/50 text-slate-gray hover:bg-surface-container hover:text-dark-charcoal transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>skip_next</span>
          </button>
        </div>
      </section>

      {/* Secondary Stats Bento Grid */}
      <section className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {/* Daily Goal Card */}
        <div className="bg-off-white rounded-xl p-card-padding border border-outline-variant/10 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-cofounder-blue">
            <span className="material-symbols-outlined text-cofounder-blue" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          </div>
          <div>
            <h3 className="font-subheading text-subheading text-dark-charcoal">Current Streak</h3>
            <p className="font-body text-body text-medium-gray">14 Days of Focus</p>
          </div>
        </div>

        {/* Total Time Card */}
        <div className="bg-off-white rounded-xl p-card-padding border border-outline-variant/10 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-dark-charcoal" style={{ fontVariationSettings: "'FILL' 0" }}>schedule</span>
          </div>
          <div>
            <h3 className="font-subheading text-subheading text-dark-charcoal">Total Time Today</h3>
            <p className="font-body text-body text-medium-gray">2h 15m Focused</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TimerPage
