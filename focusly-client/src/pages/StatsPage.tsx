function StatsPage() {
  const weekData = [
    { day: 'Mon', minutes: 120 },
    { day: 'Tue', minutes: 180 },
    { day: 'Wed', minutes: 210 },
    { day: 'Thu', minutes: 90 },
    { day: 'Fri', minutes: 240 },
    { day: 'Sat', minutes: 60 },
    { day: 'Sun', minutes: 0 },
  ]

  const maxMinutes = Math.max(...weekData.map((d) => d.minutes))

  return (
    <div className="flex flex-col gap-section-gap">
      {/* Dashboard Header */}
      <section className="mb-section-gap">
        <h1 className="font-heading-lg text-heading-lg text-dark-charcoal mb-4">Your Progress</h1>
        <p className="font-body text-body text-slate-gray max-w-2xl">
          A high-level overview of your focus sessions and productivity trends. Consistent effort compounds over time.
        </p>
      </section>

      {/* Bento Grid Layout for Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-section-gap">
        {/* Summary Card 1: Total Focus Time */}
        <div className="bg-off-white rounded-cards-sm p-6 shadow-card border border-outline-variant/10 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-6 text-slate-gray">
            <span className="material-symbols-outlined">schedule</span>
            <span className="font-subheading text-subheading">Total Focus Time</span>
          </div>
          <div>
            <div className="font-heading text-heading text-dark-charcoal">
              124<span className="font-body text-subheading text-slate-gray ml-2">hrs</span>
            </div>
            <div className="font-caption text-caption text-cofounder-blue mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              +12% this month
            </div>
          </div>
        </div>

        {/* Summary Card 2: Completed Pomodoros */}
        <div className="bg-off-white rounded-cards-sm p-6 shadow-card border border-outline-variant/10 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-6 text-slate-gray">
            <span className="material-symbols-outlined">task_alt</span>
            <span className="font-subheading text-subheading">Pomodoros</span>
          </div>
          <div>
            <div className="font-heading text-heading text-dark-charcoal">248</div>
            <div className="font-caption text-caption text-medium-gray mt-2 flex items-center gap-1">
              Completed sessions
            </div>
          </div>
        </div>

        {/* Summary Card 3: Current Streak */}
        <div className="bg-cofounder-blue/5 rounded-cards-sm p-6 shadow-card border border-cofounder-blue/20 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cofounder-blue/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <div className="flex items-center gap-3 mb-6 text-cofounder-blue relative z-10">
            <span className="material-symbols-outlined">local_fire_department</span>
            <span className="font-subheading text-subheading">Current Streak</span>
          </div>
          <div className="relative z-10">
            <div className="font-heading text-heading text-dark-charcoal">
              14<span className="font-body text-subheading text-slate-gray ml-2">days</span>
            </div>
            <div className="font-caption text-caption text-slate-gray mt-2 flex items-center gap-1">
              Personal best: 21 days
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <section className="bg-canvas-white rounded-cards-lg p-8 shadow-card border border-outline-variant/10 mb-section-gap">
        <div className="flex justify-between items-end mb-12 border-b border-outline-variant/10 pb-6">
          <div>
            <h2 className="font-heading text-subheading text-dark-charcoal mb-2">Weekly Focus Trend</h2>
            <p className="font-body text-caption text-slate-gray">Minutes spent in deep work per day.</p>
          </div>
          <div className="font-subheading text-subheading text-cofounder-blue">
            Total: 28.5 hrs
          </div>
        </div>

        {/* CSS Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-4 px-4 relative">
          {/* Y-axis guidelines */}
          <div className="absolute w-full h-full flex flex-col justify-between left-0 pointer-events-none">
            <div className="w-full border-t border-outline-variant/10 border-dashed relative">
              <span className="absolute -left-8 -top-3 font-caption text-caption text-medium-gray">4h</span>
            </div>
            <div className="w-full border-t border-outline-variant/10 border-dashed relative">
              <span className="absolute -left-8 -top-3 font-caption text-caption text-medium-gray">3h</span>
            </div>
            <div className="w-full border-t border-outline-variant/10 border-dashed relative">
              <span className="absolute -left-8 -top-3 font-caption text-caption text-medium-gray">2h</span>
            </div>
            <div className="w-full border-t border-outline-variant/10 border-dashed relative">
              <span className="absolute -left-8 -top-3 font-caption text-caption text-medium-gray">1h</span>
            </div>
            <div className="w-full border-t border-outline-variant/20 relative">
              <span className="absolute -left-8 -top-3 font-caption text-caption text-medium-gray">0</span>
            </div>
          </div>

          {/* Bars */}
          {weekData.map((item) => {
            const heightPercent = maxMinutes > 0 ? (item.minutes / maxMinutes) * 100 : 5
            const isToday = item.day === 'Fri'
            return (
              <div
                key={item.day}
                className="w-full max-w-[40px] flex flex-col items-center gap-4 z-10 group cursor-pointer relative"
              >
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-dark-charcoal text-canvas-white font-caption text-caption px-2 py-1 rounded-sm">
                  {item.minutes}m
                </div>
                <div
                  className={`w-full rounded-t-sm transition-colors ${
                    item.minutes === 0
                      ? 'bg-surface-dim'
                      : isToday
                        ? 'bg-cofounder-blue hover:bg-cofounder-blue/80'
                        : 'bg-cofounder-blue/80 hover:bg-cofounder-blue'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className={`font-caption text-caption ${isToday ? 'font-semibold text-dark-charcoal' : 'text-medium-gray'}`}>
                  {item.day}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Insights Text Block */}
      <section className="max-w-3xl mx-auto text-center">
        <h3 className="font-heading text-subheading text-dark-charcoal mb-4">Architectural Consistency</h3>
        <p className="font-body text-body text-slate-gray leading-relaxed">
          Your focus architecture is stabilizing. Tuesday through Friday demonstrate a solid block of deep work, suggesting an optimal routine. Consider scheduling less demanding tasks for the weekend to allow cognitive recovery.
        </p>
      </section>
    </div>
  )
}

export default StatsPage
