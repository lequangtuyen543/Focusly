export const save = (key: string, value: unknown) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* noop */ }
}

export const load = (key: string) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null } catch { return null }
}

export default { save, load }
const PREFIX = 'focusly_'

export function getFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch (e) {
    console.warn('Storage read error', e)
    return fallback
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch (e) {
    console.warn('Storage write error', e)
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch (e) {
    console.warn('Storage remove error', e)
  }
}
