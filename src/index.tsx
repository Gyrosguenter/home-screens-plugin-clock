import React from 'react';
import type { PluginComponentProps } from './hs-plugin';
import { hostFrameStyle } from './host-style';
import { formatDateLong, greetingFor, isoWeek, pad2 } from './clock-logic';

const DEFAULT_SUBTITLE = 'Schön, dass du da bist!';

function useNow(intervalMs: number): Date {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

export default function ClockGreetingPlugin({ config, style }: PluginComponentProps) {
  const showGreeting = config.showGreeting !== false;
  const showSeconds = config.showSeconds === true;
  const showWeek = config.showWeek !== false;
  const subtitle = typeof config.subtitle === 'string' ? config.subtitle.trim() : DEFAULT_SUBTITLE;

  const now = useNow(showSeconds ? 1000 : 5000);
  const time = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
  const week = isoWeek(now);

  return (
    <div
      style={{
        ...hostFrameStyle(style),
        // Container-Abfrage-Einheiten (cqh/cqw): Schrift füllt das Fenster,
        // egal wie groß es im Editor gezogen wird — das alte Modul hatte eine
        // feste Schrift in einem viel größeren Fenster.
        containerType: 'size',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '2.5cqh',
      }}
    >
      {showGreeting && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1cqh' }}>
          <div style={{ fontSize: 'min(10cqh, 5cqw)', fontWeight: 300, lineHeight: 1.1 }}>{greetingFor(now.getHours())}</div>
          {subtitle && (
            <div style={{ fontSize: 'min(6.5cqh, 3.2cqw)', opacity: 0.75, lineHeight: 1.2 }}>{subtitle}</div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.15em' }}>
        <span
          style={{
            fontSize: showGreeting ? 'min(44cqh, 19cqw)' : 'min(70cqh, 26cqw)',
            fontWeight: 200,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {time}
        </span>
        {showSeconds && (
          <span style={{ fontSize: 'min(12cqh, 5cqw)', fontWeight: 300, opacity: 0.6, fontVariantNumeric: 'tabular-nums' }}>
            {pad2(now.getSeconds())}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8cqh' }}>
        <div style={{ fontSize: 'min(8cqh, 3.6cqw)', fontWeight: 400, lineHeight: 1.2 }}>{formatDateLong(now)}</div>
        {showWeek && <div style={{ fontSize: 'min(6cqh, 2.8cqw)', opacity: 0.65 }}>KW {week}</div>}
      </div>
    </div>
  );
}
