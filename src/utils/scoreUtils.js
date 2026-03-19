export const applyCheckIn = (s) => Math.min(100, s + 2);
export const applyNoShow  = (s) => Math.max(0,   s - 10);
export const scoreColor   = (s) => s >= 85 ? '#22C55E' : s >= 65 ? '#F59E0B' : '#EF4444';
export const scoreLabel   = (s) => s >= 85 ? 'Reliable' : s >= 65 ? 'Average' : 'Risky';
export const showRate     = (played, noShows) => played === 0 ? 100 : Math.round(((played - noShows) / played) * 100);
