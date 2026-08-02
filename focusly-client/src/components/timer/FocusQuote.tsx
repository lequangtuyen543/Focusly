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
    <section className="mx-auto mt-8 w-full max-w-md px-2 sm:px-0">
      <div className="rounded-xl border border-outline-variant/15 bg-rich-black/70 p-4 shadow-card sm:p-6">
        <div className="mb-2 font-caption text-caption text-cool-gray">Focus Quote</div>

        <div
          className={`flex min-h-[3rem] items-center justify-center text-center font-caption text-caption italic text-cool-gray transition-opacity duration-300 motion-reduce:transition-none ${
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
            className="flex h-10 w-10 items-center justify-center rounded-full text-caption text-cool-gray transition-colors hover:bg-rich-black/30 hover:text-cofounder-blue focus:outline-none focus:ring-2 focus:ring-cofounder-blue/30"
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
