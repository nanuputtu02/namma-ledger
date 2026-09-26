import React from 'react';

export function Icon({
  name,
  size = 22,
}: {
  name: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const paths: Record<string, React.ReactElement> = {
    home: (
      <>
        <path d="M3 10.8 12 3l9 7.8" />
        <path d="M5.5 9.5V21h13V9.5" />
        <path d="M9.5 21v-6h5v6" />
      </>
    ),

    ledger: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </>
    ),

    goal: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <path d="m12 12 5-5" />
        <path d="M17 7h-3M17 7v3" />
      </>
    ),

    chart: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h17" />
        <rect x="7" y="12" width="2.5" height="4" rx=".5" />
        <rect x="11" y="9" width="2.5" height="7" rx=".5" />
        <rect x="15" y="6" width="2.5" height="10" rx=".5" />
      </>
    ),

    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-2.6v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4v-2.6h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1L7 6.6l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.6v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v2.6h-.1a1.7 1.7 0 0 0-1.5 1Z" />
      </>
    ),

    calendar: (
      <>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
        <path d="M7 3v4M17 3v4M3.5 9h17" />
        <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" />
      </>
    ),

    logout: (
      <>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M13 4h6v16h-6" />
      </>
    ),

    wallet: (
      <>
        <path d="M4 7.5h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12" />
        <path d="M16 12h5" />
        <circle cx="16" cy="12" r=".8" />
      </>
    ),

    users: (
      <>
        <circle cx="9" cy="9" r="3" />
        <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
        <path d="M15 6.5a3 3 0 0 1 0 5.8M16.5 15.5a4.5 4.5 0 0 1 4 4.5" />
      </>
    ),

    target: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),

    chevron: (
      <>
        <path d="m8 10 4 4 4-4" />
      </>
    ),

    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),

    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),

    refresh: (
      <>
        <path d="M20 11a8 8 0 0 0-14-4L4 9" />
        <path d="M4 5v4h4" />
        <path d="M4 13a8 8 0 0 0 14 4l2-2" />
        <path d="M20 19v-4h-4" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] ?? paths.target}</svg>;
}