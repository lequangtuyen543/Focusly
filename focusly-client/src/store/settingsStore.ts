import { create } from 'zustand';
import type { UserSettings } from '@/types';
import { getFromStorage, saveToStorage } from '@/utils/storage';

const STORAGE_KEY = 'settings';

const DEFAULT_SETTINGS: UserSettings = {
  dailyGoal: 8,
  focusDuration: 1500,
  breakDuration: 300,
  notificationEnabled: true,
  soundEnabled: true,
};

interface SettingsState {
  settings: UserSettings;
}

interface SettingsActions {
  updateSettings: (partial: Partial<UserSettings>) => void;
  resetSettings: () => void;
}

const initialState: SettingsState = {
  settings: getFromStorage<UserSettings>(STORAGE_KEY, DEFAULT_SETTINGS),
};

export const useSettingsStore = create<SettingsState & SettingsActions>((set) => ({
  ...initialState,

  updateSettings: (partial: Partial<UserSettings>) => {
    set((state) => {
      const updated = { ...state.settings, ...partial };
      saveToStorage(STORAGE_KEY, updated);
      return { settings: updated };
    });
  },

  resetSettings: () => {
    saveToStorage(STORAGE_KEY, DEFAULT_SETTINGS);
    set({ settings: DEFAULT_SETTINGS });
  },
}));

export default useSettingsStore;
