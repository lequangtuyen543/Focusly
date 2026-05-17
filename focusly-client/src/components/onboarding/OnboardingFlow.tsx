import React, { useState } from 'react'
import { useAppStore } from '@/store/appStore'
import { useBudgetStore } from '@/store/budgetStore'
import { useTransactionStore } from '@/store/transactionStore'
import { useCategoryStore } from '@/store/categoryStore'
import { format } from 'date-fns'

export const OnboardingFlow: React.FC = () => {
  const [step, setStep] = useState(1)
  const { completeOnboarding } = useAppStore()
  const { setBudget } = useBudgetStore()
  const { addTransaction } = useTransactionStore()
  const { categories, loadCategories } = useCategoryStore()

  const [budgetAmount, setBudgetAmount] = useState('5000000')
  const [txAmount, setTxAmount] = useState('50000')
  const [txNote, setTxNote] = useState('Ăn sáng')
  const [selectedCategory, setSelectedCategory] = useState('')

  React.useEffect(() => {
    loadCategories()
  }, [loadCategories])

  React.useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id)
    }
  }, [categories, selectedCategory])

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handleFinish = async () => {
    const currentMonth = format(new Date(), 'yyyy-MM')
    await setBudget({
      month: currentMonth,
      total: Number(budgetAmount),
      categories: {},
    })

    await addTransaction({
      type: 'expense',
      amount: Number(txAmount),
      category: selectedCategory,
      note: txNote,
      date: new Date().toISOString(),
    })

    completeOnboarding()
  }

  return (
    <div className="fixed inset-0 z-[100] bg-canvas-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Step Indicator */}
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
            <div className="mx-auto w-24 h-24 bg-ash-gray rounded-cards-sm flex items-center justify-center border border-outline-variant/10">
              <span className="material-symbols-outlined text-dark-charcoal text-5xl">wallet</span>
            </div>
            <div className="space-y-4">
              <h1 className="font-heading text-heading text-dark-charcoal">Welcome to Focusly</h1>
              <p className="font-body text-body text-medium-gray">
                Your personal focus companion. Track deep work sessions, build productive habits, and architect your best work.
              </p>
            </div>
            <button
              onClick={handleNextStep}
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
            <div className="space-y-6">
              <div className="relative">
                <input
                  className="w-full bg-ash-gray border border-slate-gray text-dark-charcoal font-subheading text-subheading px-4 py-4 rounded-none focus:outline-none focus:border-dark-charcoal focus:ring-1 focus:ring-dark-charcoal transition-all text-center"
                  type="number"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  placeholder="0"
                />
              </div>
              <p className="text-xs text-medium-gray text-left">
                * You can change this anytime in settings.
              </p>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full py-4 text-button-label bg-dark-charcoal text-canvas-white rounded-nav-items hover:bg-rich-black transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-4 text-left">
              <h2 className="font-heading text-heading-lg text-dark-charcoal">First Session</h2>
              <p className="font-body text-body text-medium-gray">
                Try setting up your first focus session.
              </p>
            </div>
            <div className="space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-medium-gray">Session Name</label>
                <input
                  className="w-full bg-ash-gray border border-slate-gray text-dark-charcoal font-body text-body px-4 py-3 rounded-none focus:outline-none focus:border-dark-charcoal focus:ring-1 focus:ring-dark-charcoal transition-all"
                  value={txNote}
                  onChange={(e) => setTxNote(e.target.value)}
                  placeholder="e.g., Deep Work, Writing..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-medium-gray">Duration</label>
                <div className="relative">
                  <input
                    className="w-full bg-ash-gray border border-slate-gray text-dark-charcoal font-subheading text-subheading px-4 py-3 rounded-none focus:outline-none focus:border-dark-charcoal focus:ring-1 focus:ring-dark-charcoal transition-all"
                    type="number"
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-medium-gray font-caption text-caption">min</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleFinish}
              className="w-full py-4 text-button-label bg-dark-charcoal text-canvas-white rounded-nav-items hover:bg-rich-black transition-colors"
            >
              Complete &amp; Explore
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
