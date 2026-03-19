export const fmtRelTime = (ts) => {
  const d = ts - Date.now();
  if (d < 0) return 'Past';
  const h = Math.floor(d / 3_600_000);
  const m = Math.floor((d % 3_600_000) / 60_000);
  if (h === 0) return m <= 0 ? 'Now' : `${m}m`;
  if (h < 24)  return `${h}h ${m}m`;
  const days = Math.floor(h / 24);
  return `${days}d`;
};

export const fmtTime = (ts) =>
  new Date(ts).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:true });

export const fmtDate = (ts) =>
  new Date(ts).toLocaleDateString('en-IN', { weekday:'short', month:'short', day:'numeric' });

export const fmtDateTime = (ts) => `${fmtDate(ts)}, ${fmtTime(ts)}`;

export const isMatchSoon  = (m) => m.time - Date.now() < 7_200_000 && Date.now() < m.time + 3_600_000;
export const isPastMatch  = (m) => Date.now() > m.time + 3_600_000;
export const slotsLeft    = (m) => m.playersNeeded - m.joinedPlayers.length;
