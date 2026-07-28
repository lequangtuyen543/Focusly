import { useState } from 'react';
import { useSettingsStore } from '@/store/settingsStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

function SettingsPage() {
  const { settings, updateSettings, resetSettings } = useSettingsStore();
  const [strictMode, setStrictMode] = useState(false);

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-button-label text-button-label text-slate-gray">Focus Block</label>
              <Select 
                value={String(settings.focusDuration / 60)} 
                onValueChange={(val) => updateSettings({ focusDuration: Number(val) * 60 })}
              >
                <SelectTrigger className="w-full bg-ash-gray border border-slate-gray rounded-none py-3 px-4 h-auto font-subheading text-subheading focus-visible:border-dark-charcoal focus-visible:ring-1 focus-visible:ring-dark-charcoal">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="20">20 min</SelectItem>
                  <SelectItem value="25">25 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="45">45 min</SelectItem>
                  <SelectItem value="50">50 min</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-button-label text-button-label text-slate-gray">Break</label>
              <Select 
                value={String(settings.breakDuration / 60)} 
                onValueChange={(val) => updateSettings({ breakDuration: Number(val) * 60 })}
              >
                <SelectTrigger className="w-full bg-ash-gray border border-slate-gray rounded-none py-3 px-4 h-auto font-subheading text-subheading focus-visible:border-dark-charcoal focus-visible:ring-1 focus-visible:ring-dark-charcoal">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 min</SelectItem>
                  <SelectItem value="5">5 min</SelectItem>
                  <SelectItem value="10">10 min</SelectItem>
                  <SelectItem value="15">15 min</SelectItem>
                </SelectContent>
              </Select>
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
          <div className="w-full md:w-48 relative flex items-center bg-ash-gray border border-slate-gray transition-all focus-within:border-dark-charcoal focus-within:ring-1 focus-within:ring-dark-charcoal">
            <button 
               className="px-4 py-3 text-slate-gray hover:text-dark-charcoal focus:outline-none" 
               onClick={() => updateSettings({ dailyGoal: Math.max(1, settings.dailyGoal - 1) })}
               type="button"
            >
              −
            </button>
            <input
              className="w-full bg-transparent text-dark-charcoal font-subheading text-subheading py-3 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              min={1}
              max={20}
              value={settings.dailyGoal || ''}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val)) {
                  updateSettings({ dailyGoal: val });
                } else if (e.target.value === '') {
                  // Allow temporary empty state when clearing input
                  updateSettings({ dailyGoal: 0 as any }); 
                }
              }}
              onBlur={() => {
                let val = settings.dailyGoal;
                if (isNaN(val) || val < 1) val = 1;
                if (val > 20) val = 20;
                updateSettings({ dailyGoal: val });
              }}
            />
            <button 
               className="px-4 py-3 text-slate-gray hover:text-dark-charcoal focus:outline-none" 
               onClick={() => updateSettings({ dailyGoal: Math.min(20, (settings.dailyGoal || 0) + 1) })}
               type="button"
            >
              +
            </button>
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
                aria-checked={settings.notificationEnabled}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-action-azure focus:ring-offset-2 ${
                  settings.notificationEnabled ? 'bg-action-azure' : 'bg-outline-variant'
                }`}
                role="switch"
                type="button"
                onClick={() => updateSettings({ notificationEnabled: !settings.notificationEnabled })}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-canvas-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.notificationEnabled ? 'translate-x-5' : 'translate-x-0'
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
                aria-checked={settings.soundEnabled}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-action-azure focus:ring-offset-2 ${
                  settings.soundEnabled ? 'bg-action-azure' : 'bg-outline-variant'
                }`}
                role="switch"
                type="button"
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-canvas-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
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
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-action-azure focus:ring-offset-2 ${
                  strictMode ? 'bg-action-azure' : 'bg-outline-variant'
                }`}
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
            <Dialog>
              <DialogTrigger render={<Button variant="danger" />}>
                Reset về mặc định
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reset to Default</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to reset all settings to default? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="ghost" />}>
                    Cancel
                  </DialogClose>
                  <DialogClose render={<Button variant="danger" onClick={resetSettings} />}>
                    Confirm
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <div className="flex justify-center pt-4 pb-2">
          <p className="font-caption text-caption text-medium-gray">
            Version 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
