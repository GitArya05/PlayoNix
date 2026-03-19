/* Simple inline SVG icons — no emoji, no external deps */
const PATHS = {
  home:     ['M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', 'M9 22V12h6v10'],
  search:   ['M21 21l-4.35-4.35', 'M17 11A6 6 0 115 11a6 6 0 0112 0z'],
  calendar: ['M8 6V3m8 3V3', 'M3 9h18', 'M5 4h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z'],
  bell:     ['M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9', 'M13.73 21a2 2 0 01-3.46 0'],
  user:     ['M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2', 'M12 11a4 4 0 100-8 4 4 0 000 8z'],
  plus:     ['M12 5v14', 'M5 12h14'],
  check:    ['M20 6L9 17l-5-5'],
  x:        ['M18 6L6 18', 'M6 6l12 12'],
  arrow:    ['M5 12h14', 'M12 5l7 7-7 7'],
  back:     ['M19 12H5', 'M12 19l-7-7 7-7'],
  map:      ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z', 'M12 10a2 2 0 100-4 2 2 0 000 4z'],
  clock:    ['M12 22a10 10 0 100-20 10 10 0 000 20z', 'M12 6v6l4 2'],
  location: ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z', 'M12 10a2 2 0 100-4 2 2 0 000 4z'],
  users:    ['M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2', 'M9 11a4 4 0 100-8 4 4 0 000 8z', 'M23 21v-2a4 4 0 00-3-3.87', 'M16 3.13a4 4 0 010 7.75'],
  shield:   ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
  star:     ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
  trophy:   ['M6 9H3l1 7h8l1-7h-3', 'M8 9V4h8v5', 'M14 9h3l-1 7H9l-1-7h3', 'M9 16s.5 3 3 3 3-3 3-3'],
  zap:      ['M13 2L3 14h9l-1 8 10-12h-9l1-8z'],
};

export default function Icon({ name, size = 20, stroke = 'currentColor', strokeWidth = 1.75 }) {
  const paths = PATHS[name] || [];
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={stroke} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, display: 'block' }}
    >
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}
