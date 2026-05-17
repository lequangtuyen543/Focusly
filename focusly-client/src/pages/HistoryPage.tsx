function HistoryPage() {
  const placeholderSessions = [
    { id: '1', date: 'Today', duration: '25:00', type: 'Focus', completed: true },
    { id: '2', date: 'Today', duration: '25:00', type: 'Focus', completed: true },
    { id: '3', date: 'Yesterday', duration: '25:00', type: 'Focus', completed: true },
    { id: '4', date: 'Yesterday', duration: '5:00', type: 'Break', completed: true },
    { id: '5', date: '2 days ago', duration: '25:00', type: 'Focus', completed: false },
  ]

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground">
          History
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">
          Review your completed and missed sessions.
        </p>
      </section>

      <section className="bg-card border border-border/50 rounded-xl shadow-sm divide-y divide-border/50">
        {placeholderSessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between px-4 sm:px-5 py-3.5"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${
                  session.completed ? 'bg-accent' : 'bg-muted-foreground/30'
                }`}
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {session.type} Session
                </p>
                <p className="text-xs text-muted-foreground">{session.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono text-foreground">{session.duration}</p>
              <p className="text-[11px] text-muted-foreground">
                {session.completed ? 'Completed' : 'Skipped'}
              </p>
            </div>
          </div>
        ))}
      </section>

      <p className="text-center text-xs text-muted-foreground/60">
        Showing last 5 sessions
      </p>
    </div>
  )
}

export default HistoryPage
