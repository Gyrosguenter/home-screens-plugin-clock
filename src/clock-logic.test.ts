import { describe, expect, it } from 'vitest';
import { formatDateLong, greetingFor, isoWeek, pad2 } from './clock-logic';

describe('greetingFor', () => {
  it('wechselt mit der Tageszeit', () => {
    expect(greetingFor(4)).toBe('Gute Nacht');
    expect(greetingFor(5)).toBe('Guten Morgen');
    expect(greetingFor(10)).toBe('Guten Morgen');
    expect(greetingFor(11)).toBe('Guten Tag');
    expect(greetingFor(17)).toBe('Guten Tag');
    expect(greetingFor(18)).toBe('Guten Abend');
    expect(greetingFor(21)).toBe('Guten Abend');
    expect(greetingFor(22)).toBe('Gute Nacht');
    expect(greetingFor(0)).toBe('Gute Nacht');
  });
});

describe('formatDateLong', () => {
  it('formatiert auf Deutsch', () => {
    expect(formatDateLong(new Date(2026, 9, 10))).toBe('Samstag, 10. Oktober 2026');
    expect(formatDateLong(new Date(2025, 8, 19))).toBe('Freitag, 19. September 2025');
  });
});

describe('isoWeek', () => {
  it('stimmt mit bekannten Kalenderwochen überein', () => {
    expect(isoWeek(new Date(2025, 8, 19))).toBe(38);
    expect(isoWeek(new Date(2026, 9, 10))).toBe(41);
    expect(isoWeek(new Date(2026, 0, 1))).toBe(1);
    expect(isoWeek(new Date(2021, 0, 3))).toBe(53);
    expect(isoWeek(new Date(2024, 11, 30))).toBe(1);
  });
});

describe('pad2', () => {
  it('füllt auf zwei Stellen', () => {
    expect(pad2(7)).toBe('07');
    expect(pad2(24)).toBe('24');
  });
});
