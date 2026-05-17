import { useState } from 'react'

function SettingsPage() {
  const [focusDuration, setFocusDuration] = useState(25)
  const [shortBreak, setShortBreak] = useState(5)
  const [longBreak, setLongBreak] = useState(15)
  const [dailyGoal, setDailyGoal] = useState(8)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [audioCues, setAudioCues] = useState(false)
  const [strictMode, setStrictMode] = useState(false)

  return (
    <div className="flex flex-col gap-section-gap">
      {/* Header */}
      <header className="mb-8">
        <h1 className="font-display text-display text-dark-charcoal mb-2">Configuration</h1>
        <p className="font-body text-body text-medium-gray max-w-2xl">
          Refine your environment for peak intellectual focus.
        </p>
      </header>

      {/* Settings Canvas */}
      <div className="bg-off-white rounded-cards-lg p-8 md:p-12 shadow-[0_4px_24px_rgba(222,226,222,0.4),0_1px_2px_rgba(222,226,222,0.2)] border border-outline-variant/10 flex flex-col gap-12">
        {/* Timer Durations */}
        <section className="flex flex-col gap-6" id="timers">
          <div>
            <h2 className="font-heading text-heading-lg text-dark-charcoal mb-1">Timer Durations</h2>
            <p className="font-body text-body text-medium-gray">Define the temporal blocks for your sessions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-button-label text-button-label text-slate-gray">Focus Block</label>
              <div className="relative">
                <input
                  className="w-full bg-ash-gray border border-slate-gray text-dark-charcoal font-subheading text-subheading px-4 py-3 rounded-none focus:outline-none focus:border-dark-charcoal focus:ring-1 focus:ring-dark-charcoal transition-all"
                  type="number"
                  value={focusDuration}
                  onChange={(e) => setFocusDuration(Number(e.target.value))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-medium-gray font-caption text-caption">min</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-button-label text-button-label text-slate-gray">Short Break</label>
              <div className="relative">
                <input
                  className="w-full bg-ash-gray border border-slate-gray text-dark-charcoal font-subheading text-subheading px-4 py-3 rounded-none focus:outline-none focus:border-dark-charcoal focus:ring-1 focus:ring-dark-charcoal transition-all"
                  type="number"
                  value={shortBreak}
                  onChange={(e) => setShortBreak(Number(e.target.value))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-medium-gray font-caption text-caption">min</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-button-label text-button-label text-slate-gray">Long Break</label>
              <div className="relative">
                <input
                  className="w-full bg-ash-gray border border-slate-gray text-dark-charcoal font-subheading text-subheading px-4 py-3 rounded-none focus:outline-none focus:border-dark-charcoal focus:ring-1 focus:ring-dark-charcoal transition-all"
                  type="number"
                  value={longBreak}
                  onChange={(e) => setLongBreak(Number(e.target.value))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-medium-gray font-caption text-caption">min</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t border-outline-variant/20" />

        {/* Daily Goal */}
        <section className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center" id="goals">
          <div className="flex-1">
            <h2 className="font-heading text-heading-lg text-dark-charcoal mb-1">Daily Goal</h2>
            <p className="font-body text-body text-medium-gray">Target number of focus blocks per day.</p>
          </div>
          <div className="w-full md:w-48 relative">
            <input
              className="w-full bg-ash-gray border border-slate-gray text-dark-charcoal font-subheading text-subheading px-4 py-3 rounded-none focus:outline-none focus:border-dark-charcoal focus:ring-1 focus:ring-dark-charcoal transition-all text-center"
              type="number"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(Number(e.target.value))}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-medium-gray font-caption text-caption">blocks</span>
          </div>
        </section>

        <hr className="border-t border-outline-variant/20" />

        {/* Preferences */}
        <section className="flex flex-col gap-6" id="preferences">
          <div>
            <h2 className="font-heading text-heading-lg text-dark-charcoal mb-1">Preferences</h2>
            <p className="font-body text-body text-medium-gray">Manage your ambient notifications and audio cues.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center p-4 rounded-lg hover:bg-surface-container-low transition-colors">
              <div>
                <h3 className="font-subheading text-subheading text-dark-charcoal">Push Notifications</h3>
                <p className="font-caption text-caption text-medium-gray">Alerts when a block completes.</p>
              </div>
              <button
                aria-checked={pushNotifications}
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-action-azure transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-action-azure focus:ring-offset-2"
                role="switch"
                type="button"
                onClick={() => setPushNotifications(!pushNotifications)}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-canvas-white shadow ring-0 transition duration-200 ease-in-out ${
                    pushNotifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg hover:bg-surface-container-low transition-colors">
              <div>
                <h3 className="font-subheading text-subheading text-dark-charcoal">Audio Cues</h3>
                <p className="font-caption text-caption text-medium-gray">Subtle chimes for state transitions.</p>
              </div>
              <button
                aria-checked={audioCues}
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-outline-variant transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-action-azure focus:ring-offset-2"
                role="switch"
                type="button"
                onClick={() => setAudioCues(!audioCues)}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-canvas-white shadow ring-0 transition duration-200 ease-in-out ${
                    audioCues ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg hover:bg-surface-container-low transition-colors">
              <div>
                <h3 className="font-subheading text-subheading text-dark-charcoal">Strict Mode</h3>
                <p className="font-caption text-caption text-medium-gray">Prevent ending a focus block early.</p>
              </div>
              <button
                aria-checked={strictMode}
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-outline-variant transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-action-azure focus:ring-offset-2"
                role="switch"
                type="button"
                onClick={() => setStrictMode(!strictMode)}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-canvas-white shadow ring-0 transition duration-200 ease-in-out ${
                    strictMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        <hr className="border-t border-outline-variant/20" />

        {/* Data Management */}
        <section className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center bg-surface-container/30 p-6 rounded-xl border border-outline-variant/10" id="data">
          <div className="flex-1">
            <h2 className="font-subheading text-subheading text-error mb-1">Reset All Data</h2>
            <p className="font-caption text-caption text-medium-gray">
              Permanently delete all session history and configuration. This action cannot be undone.
            </p>
          </div>
          <div>
            <button className="bg-transparent text-error border border-error/50 hover:bg-error/10 font-button-label text-button-label rounded-sm px-6 py-2 transition-all">
              Clear Data
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SettingsPage
