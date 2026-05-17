export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  if (h > 0 && m > 0) return h + ' giờ ' + m + ' phút';
  if (h > 0) return h + ' giờ';
  if (m > 0) return m + ' phút';
  return '0 phút';
}
