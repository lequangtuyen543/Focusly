export function toDateKey(date?: Date): string {
  const d = date ?? new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
}

export function isToday(dateString: string): boolean {
  return toDateKey(new Date(dateString)) === toDateKey();
}

export function isSameDay(a: string, b: string): boolean {
  return toDateKey(new Date(a)) === toDateKey(new Date(b));
}

export function getWeekDays(referenceDate?: Date): string[] {
  const end = referenceDate ?? new Date();
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(d.getDate() - i);
    days.push(toDateKey(d));
  }
  return days;
}
