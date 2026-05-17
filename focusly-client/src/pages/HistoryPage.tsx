function HistoryPage() {
  const sessionsByDay = [
    {
      day: 'Today',
      sessions: [
        { id: '1', title: 'Deep Work: Design System', time: '09:00 AM - 09:45 AM', duration: '45m', type: 'focus' as const },
        { id: '2', title: 'Short Break', time: '09:45 AM - 09:50 AM', duration: '5m', type: 'break' as const },
        { id: '3', title: 'Deep Work: Component Dev', time: '09:50 AM - 10:40 AM', duration: '50m', type: 'focus' as const },
      ],
    },
    {
      day: 'Yesterday',
      sessions: [
        { id: '4', title: 'Writing: Blog Post', time: '02:00 PM - 03:00 PM', duration: '60m', type: 'focus' as const },
      ],
    },
    {
      day: 'October 24, 2023',
      sessions: [],
    },
  ]

  return (
    <div className="flex flex-col gap-12">
      {/* Header */}
      <header className="flex flex-col gap-4 max-w-2xl">
        <h1 className="font-display text-display text-dark-charcoal">Session History</h1>
        <p className="font-body text-body text-medium-gray">
          A record of your deep focus and intentional breaks. Review your patterns to optimize your workflow.
        </p>
      </header>

      {/* History Content */}
      <div className="flex flex-col gap-12">
        {sessionsByDay.map(({ day, sessions }) => (
          <section key={day} className="flex flex-col gap-6">
            <h2 className="font-subheading text-subheading text-slate-gray border-b border-steel-gray pb-2">
              {day}
            </h2>

            {sessions.length === 0 ? (
              <div className="bg-ash-gray rounded-xl p-8 border border-steel-gray border-dashed flex flex-col items-center justify-center text-center gap-3">
                <span className="material-symbols-outlined text-outline-variant text-4xl">calendar_today</span>
                <p className="font-body text-body text-slate-gray">No sessions recorded on this day.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`rounded-xl p-4 flex items-center justify-between transition-colors ${
                      session.type === 'focus'
                        ? 'bg-off-white border border-steel-gray/50 shadow-card hover:border-action-azure/30'
                        : 'bg-ash-gray/50 border border-steel-gray/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          session.type === 'focus'
                            ? 'bg-ash-gray text-dark-charcoal'
                            : 'bg-transparent border border-outline-variant/30 text-slate-gray'
                        }`}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontVariationSettings: session.type === 'focus' ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          {session.type === 'focus' ? 'timer' : 'coffee'}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-button-label text-button-label text-dark-charcoal">
                          {session.title}
                        </span>
                        <span className="font-caption text-caption text-medium-gray">{session.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-end">
                        <span className="font-subheading text-subheading text-dark-charcoal">{session.duration}</span>
                        <span className={`font-caption text-caption ${session.type === 'focus' ? 'text-cofounder-blue' : 'text-medium-gray'}`}>
                          {session.type === 'focus' ? 'Focus' : 'Break'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

export default HistoryPage
