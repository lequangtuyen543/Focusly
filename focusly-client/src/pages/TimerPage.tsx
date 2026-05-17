function TimerPage() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground">
          Timer
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">
          Focus on what matters, one session at a time.
        </p>
      </section>

      <section className="bg-card border border-border/50 rounded-xl p-8 sm:p-10 flex flex-col items-center gap-8 shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <span className="text-7xl sm:text-8xl font-mono font-light tracking-wider text-foreground">
            25:00
          </span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Focus
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled
            className="h-10 px-6 rounded-lg bg-accent text-accent-foreground text-sm font-medium opacity-60 cursor-not-allowed"
          >
            Start
          </button>
          <button
            disabled
            className="h-10 px-6 rounded-lg border border-border text-muted-foreground text-sm font-medium opacity-50 cursor-not-allowed"
          >
            Reset
          </button>
        </div>

        <p className="text-xs text-muted-foreground/60">
          Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-foreground text-[11px] font-mono">Space</kbd> to start
        </p>
      </section>

      <section className="bg-card border border-border/50 rounded-xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Today's focus time</span>
          <span className="font-medium text-foreground">0m / 2h goal</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full w-0 rounded-full bg-accent transition-all" />
        </div>
      </section>
    </div>
  )
}

export default TimerPage
