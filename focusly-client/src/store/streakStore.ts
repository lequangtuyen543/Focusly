import { create } from 'zustand';
import type { Session, StreakData } from '@/types';
import { getFromStorage, saveToStorage } from '@/utils/storage';
import { calculateStreak } from '@/utils/streakUtils';

const STORAGE_KEY = 'streak';

const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: '',
};

interface StreakState {
  streak: StreakData;
}

interface StreakActions {
  updateStreak: (sessions: Session[]) => void;
}

const initialState: StreakState = {
  streak: getFromStorage<StreakData>(STORAGE_KEY, DEFAULT_STREAK),
};

export const useStreakStore = create<StreakState & StreakActions>((set) => ({
  ...initialState,

  updateStreak: (sessions: Session[]) => {
    const updated = calculateStreak(sessions);
    saveToStorage(STORAGE_KEY, updated);
    set({ streak: updated });
  },
}));

export default useStreakStore;
