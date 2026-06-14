/*
 * useNotification.ts
 * Minimal safe wrapper around the Web Notification API.
 * Exports: requestPermission, sendNotification
 */

export async function requestPermission(): Promise<NotificationPermission> {
  try {
    if (typeof window === 'undefined' || typeof Notification === 'undefined') {
      return 'denied';
    }

    // If the permission is already one of the values, just return it
    if (Notification.permission === 'granted' || Notification.permission === 'denied' || Notification.permission === 'default') {
      // still attempt to request only if default
      if (Notification.permission === 'default') {
        try {
          const result = await Notification.requestPermission();
          return result;
        } catch (e) {
          return Notification.permission ?? 'denied';
        }
      }
      return Notification.permission;
    }

    // fallback
    return Notification.permission ?? 'denied';
  } catch (err) {
    // Defensive: fail silently and return 'denied'
    return 'denied';
  }
}

export function sendNotification(title: string, body?: string): void {
  try {
    if (typeof window === 'undefined' || typeof Notification === 'undefined') return;

    if (Notification.permission !== 'granted') return;

    // Do not send if user currently has the tab active
    if (typeof document !== 'undefined' && !document.hidden) return;

    // Safe constructor invocation
    // eslint-disable-next-line no-new
    new Notification(title, { body });
  } catch (err) {
    // ignore errors (for example, security exceptions in some browsers)
  }
}

export default {
  requestPermission,
  sendNotification,
};
