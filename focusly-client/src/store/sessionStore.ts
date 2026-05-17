import { create } from 'zustand';
import type { Session } from '@/types';
import { getFromStorage, saveToStorage } from '@/utils/storage';
import { isToday, getWeekDays, isSameDay } from '@/utils/dateUtils';

const STORAGE_KEY = 'sessions';

interface SessionState {
  sessions: Session[];
}

interface SessionActions {
  addSession: (session: Session) => void;
  getTodaySessions: () => Session[];
  getWeekSessions: () => Session[];
}

const initialState: SessionState = {
  sessions: getFromStorage<Session[]>(STORAGE_KEY, []),
};

export const useSessionStore = create<SessionState & SessionActions>((set, get) => ({
  ...initialState,

  addSession: (session: Session) => {
    set((state) => {
      const updated = [...state.sessions, session];
      saveToStorage(STORAGE_KEY, updated);
      return { sessions: updated };
    });
  },

  getTodaySessions: () => {
    return get().sessions.filter((s) => isToday(s.startTime));
  },

  getWeekSessions: () => {
    const weekDays = getWeekDays();
    return get().sessions.filter((s) => weekDays.some((day) => isSameDay(s.startTime, day)));
  },
}));

export default useSessionStore;
