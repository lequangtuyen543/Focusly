function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">
          Customize your focus experience.
        </p>
      </section>

      <section className="bg-card border border-border/50 rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Focus Duration
          </label>
          <div className="h-9 rounded-lg border border-border bg-background px-3 flex items-center text-sm text-muted-foreground">
            25 minutes
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Break Duration
          </label>
          <div className="h-9 rounded-lg border border-border bg-background px-3 flex items-center text-sm text-muted-foreground">
            5 minutes
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Daily Goal
          </label>
          <div className="h-9 rounded-lg border border-border bg-background px-3 flex items-center text-sm text-muted-foreground">
            8 sessions
          </div>
        </div>
      </section>

      <section className="bg-card border border-border/50 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-medium text-foreground">Preferences</h2>

        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Notifications</span>
          <div className="h-5 w-9 rounded-full bg-muted relative cursor-not-allowed opacity-60">
            <div className="h-4 w-4 rounded-full bg-muted-foreground/30 absolute top-0.5 left-0.5" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Sound</span>
          <div className="h-5 w-9 rounded-full bg-accent/30 relative cursor-not-allowed opacity-60">
            <div className="h-4 w-4 rounded-full bg-accent absolute top-0.5 right-0.5" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default SettingsPage
