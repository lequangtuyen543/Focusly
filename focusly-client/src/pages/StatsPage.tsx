function StatsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground">
          Statistics
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">
          Track your productivity trends over time.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4">
        {[
          { label: 'Total Focus Time', value: '12h 30m' },
          { label: 'Sessions Completed', value: '24' },
          { label: 'Current Streak', value: '5 days' },
          { label: 'Best Day', value: '3h 15m' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border/50 rounded-xl p-4 sm:p-5 shadow-sm"
          >
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="bg-card border border-border/50 rounded-xl p-5 sm:p-6 shadow-sm">
        <h2 className="text-sm font-medium text-foreground mb-4">
          Focus Time This Week
        </h2>
        <div className="flex items-end justify-between gap-2 h-32">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className="w-full rounded-md bg-accent/20"
                style={{ height: `${30 + Math.random() * 50}%` }}
              />
              <span className="text-[11px] text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default StatsPage
