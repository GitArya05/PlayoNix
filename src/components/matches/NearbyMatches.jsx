import { useState } from 'react';
import { useApp }   from '../../context/AppContext.jsx';
import MatchCard    from '../shared/MatchCard.jsx';
import { SPORTS }   from '../../data/sports.js';

/* Fake map pin positions — swap with real coords when integrating a map SDK */
const PINS = [
  { top: '38%', left: '42%', sport: 'cricket'  },
  { top: '56%', left: '67%', sport: 'football'  },
  { top: '32%', left: '22%', sport: 'badminton' },
  { top: '65%', left: '35%', sport: 'volleyball'},
];

export default function NearbyMatches({ onSelectMatch }) {
  const { matches, users, user } = useApp();
  const [filter, setFilter] = useState('all');

  const sorted = [...matches]
    .filter((m) => filter === 'all' || m.sport === filter)
    .sort((a, b) => a.time - b.time);

  return (
    <div className="scroll">
      {/* Header */}
      <div style={{ padding: '52px 24px 16px' }}>
        <h2 className="syne" style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.03em', marginBottom: 16 }}>
          Discover Matches
        </h2>

        {/* Sport filter chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6, scrollbarWidth: 'none' }}>
          <button className={`sport-chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            🏆 All
          </button>
          {SPORTS.map((s) => (
            <button
              key={s.id}
              className={`sport-chip ${filter === s.id ? 'active' : ''}`}
              onClick={() => setFilter(s.id)}
            >
              {s.emoji} {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div style={{ margin: '0 20px 16px', borderRadius: 16, overflow: 'hidden', height: 148, background: 'var(--card)', border: '1px solid var(--border)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Grid texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)', backgroundSize: '24px 24px', opacity: 0.6 }} />

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>🗺️</div>
          <p style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>Map View</p>
          <p style={{ fontSize: 11, color: 'var(--muted)' }}>Malegaon, Maharashtra</p>
        </div>

        {/* Fake match pins */}
        {PINS.map((p, i) => {
          const sp = SPORTS.find((s) => s.id === p.sport) || SPORTS[0];
          return (
            <div
              key={i}
              title={sp.name}
              style={{
                position: 'absolute', top: p.top, left: p.left,
                width: 28, height: 28, borderRadius: '50%',
                background: 'var(--lime)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, boxShadow: '0 0 12px rgba(200,241,53,.5)',
                zIndex: 2, cursor: 'pointer', transform: 'translate(-50%,-50%)',
              }}
            >
              {sp.emoji}
            </div>
          );
        })}

        <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 10, color: 'var(--muted)', background: 'var(--bg)', padding: '3px 8px', borderRadius: 20, border: '1px solid var(--border)' }}>
          📍 Map integration ready
        </div>
      </div>

      {/* Match list */}
      <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sorted.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ color: 'var(--muted)' }}>
              No {filter === 'all' ? 'matches' : 'matches for this sport'} found
            </p>
          </div>
        ) : (
          sorted.map((m) => (
            <MatchCard
              key={m.id}
              match={m}
              users={users}
              currentUser={user}
              onPress={(match) => onSelectMatch(match.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
