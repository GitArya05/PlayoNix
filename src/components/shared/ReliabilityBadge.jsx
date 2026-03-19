import { scoreColor } from '../../utils/scoreUtils.js';

export default function ReliabilityBadge({ score, size = 'md' }) {
  const dim  = size === 'sm' ? 40 : size === 'lg' ? 76 : 60;
  const r    = size === 'sm' ? 15 : size === 'lg' ? 30 : 25;
  const sw   = size === 'sm' ? 3  : size === 'lg' ? 5  : 4;
  const fs   = size === 'sm' ? 11 : size === 'lg' ? 19 : 14;
  const circ = 2 * Math.PI * r;
  const off  = circ - (score / 100) * circ;
  const col  = scoreColor(score);

  return (
    <div style={{ position: 'relative', width: dim, height: dim, flexShrink: 0 }}>
      <svg width={dim} height={dim} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={dim/2} cy={dim/2} r={r} fill="none" stroke="var(--border)" strokeWidth={sw} />
        <circle cx={dim/2} cy={dim/2} r={r} fill="none" stroke={col}
          strokeWidth={sw} strokeDasharray={circ} strokeDashoffset={off}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset .5s ease' }} />
      </svg>
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <span style={{ fontSize: fs, fontWeight: 800, color: col, fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>
          {score}
        </span>
      </div>
    </div>
  );
}
