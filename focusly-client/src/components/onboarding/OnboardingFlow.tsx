import { useState } from 'react'

export const OnboardingFlow = () => {
  const [step, setStep] = useState(1)

  return (
    <div className="fixed inset-0 z-[100] bg-canvas-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 w-12 rounded-full transition-colors duration-300 ${
                s <= step ? 'bg-dark-charcoal' : 'bg-steel-gray'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <h1 className="font-heading text-heading text-dark-charcoal">Welcome to Focusly</h1>
              <p className="font-body text-body text-medium-gray">
                Your personal focus companion. Track deep work sessions, build productive habits, and architect your best work.
              </p>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-4 text-button-label bg-dark-charcoal text-canvas-white rounded-nav-items hover:bg-rich-black transition-colors"
            >
              Get Started
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-4 text-left">
              <h2 className="font-heading text-heading-lg text-dark-charcoal">Set Your Daily Goal</h2>
              <p className="font-body text-body text-medium-gray">
                How many focus blocks do you want to complete each day?
              </p>
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full py-4 text-button-label bg-dark-charcoal text-canvas-white rounded-nav-items hover:bg-rich-black transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-4 text-left">
              <h2 className="font-heading text-heading-lg text-dark-charcoal">Ready to Focus</h2>
              <p className="font-body text-body text-medium-gray">
                You're all set. Start your first focus session and build your deep work habit.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
