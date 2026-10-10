/** Tageszeit-abhängige Begrüßung. */
export function greetingFor(hour: number): string {
  if (hour >= 5 && hour < 11) return 'Guten Morgen';
  if (hour >= 11 && hour < 18) return 'Guten Tag';
  if (hour >= 18 && hour < 22) return 'Guten Abend';
  return 'Gute Nacht';
}

const WEEKDAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
const MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

/** "Samstag, 10. Oktober 2026" — ohne Intl, damit das Ergebnis in jeder
 *  Umgebung (auch Tests) identisch ist. */
export function formatDateLong(date: Date): string {
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()}. ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** ISO-8601-Kalenderwoche (Woche beginnt Montag, Woche 1 enthält den
 *  ersten Donnerstag des Jahres). */
export function isoWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - yearStart) / 86400000 + 1) / 7);
}

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}
