import React, { useCallback, useEffect, useState } from 'react';
import { getRandomQuote, quotes } from '@/data/quotes';

const TRANSITION_MS = 300;

const FocusQuote: React.FC = () => {
  const [quote, setQuote] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const q = getRandomQuote();
    setQuote(q);
    // reveal with fade-in
    // run on next tick to allow transition to apply
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const pickDifferent = useCallback(() => {
    if (!quotes || quotes.length === 0) return 'Stay focused.';
    if (quotes.length === 1) return quotes[0];
    let attempt = 0;
    let next = getRandomQuote();
    while (next === quote && attempt < 8) {
      next = getRandomQuote();
      attempt += 1;
    }
    return next;
  }, [quote]);

  const handleRefresh = useCallback(() => {
    // fade out, swap text, fade in
    setVisible(false);
    window.setTimeout(() => {
      const next = pickDifferent();
      setQuote(next);
      // allow layout/DOM update then fade in
      requestAnimationFrame(() => setVisible(true));
    }, TRANSITION_MS);
  }, [pickDifferent]);

  return (
    <section className="w-full max-w-md mx-auto mt-8">
      <div className="bg-off-white rounded-xl p-6 border border-outline-variant/10 shadow-card">
        <div className="font-caption text-caption text-medium-gray mb-2">Focus Quote</div>

        <div
          className={`font-caption text-caption text-medium-gray italic text-center transition-opacity duration-300 motion-reduce:transition-none min-h-[3rem] flex items-center justify-center ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-live="polite"
        >
          {quote}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            aria-label="Refresh quote"
            className="text-caption text-medium-gray hover:text-cofounder-blue focus:outline-none focus:ring-2 focus:ring-cofounder-blue/30 rounded"
            onClick={handleRefresh}
          >
            ↻
          </button>
        </div>
      </div>
    </section>
  );
};

export default FocusQuote;
