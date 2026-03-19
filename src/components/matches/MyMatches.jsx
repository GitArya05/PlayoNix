import { useState } from 'react';
import { useApp }   from '../../context/AppContext.jsx';
import MatchCard    from '../shared/MatchCard.jsx';

export default function MyMatches({ onSelectMatch }) {
  const { user, matches, users } = useApp();
  const [tab, setTab] = useState('upcoming');

  const mine     = matches.filter((m) => m.joinedPlayers.includes(user?.id));
  const upcoming = mine.filter((m) => m.time > Date.now()).sort((a, b) => a.time - b.time);
  const past     = mine.filter((m) => m.time <= Date.now()).sort((a, b) => b.time - a.time);
  const shown    = tab === 'upcoming' ? upcoming : past;

  // Unconfirmed upcoming matches — show a warning banner
  const unconfirmed = upcoming.filter((m) => !m.confirmedPlayers?.includes(user?.id));

  return (
    <div className="scroll">
      <div style={{ padding: '52px 24px 16px' }}>
        <h2 className="syne" style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.03em', marginBottom: 8 }}>
          My Matches
        </h2>

        {/* Unconfirmed warning */}
        {unconfirmed.length > 0 && tab === 'upcoming' && (
          <div style={{ background: 'rgba(255,107,53,.1)', border: '1px solid rgba(255,107,53,.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: 'var(--orange)', fontWeight: 600 }}>
            ⚠ {unconfirmed.length} match{unconfirmed.length > 1 ? 'es' : ''} awaiting your confirmation
          </div>
        )}

        {/* Toggle */}
        <div style={{ display: 'flex', background: 'var(--card)', borderRadius: 12, padding: 4 }}>
          {[
            ['upcoming', upcoming.length, 'Upcoming'],
            ['past',     past.length,     'History'],
          ].map(([t, cnt, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="syne"
              style={{
                flex: 1, padding: '10px', borderRadius: 9,
                fontWeight: 700, fontSize: 11, border: 'none', cursor: 'pointer',
                transition: 'all .2s', textTransform: 'uppercase', letterSpacing: '.07em',
                background: tab === t ? 'var(--lime)' : 'transparent',
                color:      tab === t ? '#070B12'      : 'var(--muted)',
              }}
            >
              {label} {cnt > 0 && `(${cnt})`}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '8px 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {shown.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>
              {tab === 'upcoming' ? '📅' : '🏆'}
            </div>
            <p className="syne" style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
              {tab === 'upcoming' ? 'No upcoming matches' : 'No match history'}
            </p>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>
              {tab === 'upcoming'
                ? 'Join or create a match to get started!'
                : 'Your completed matches will appear here'}
            </p>
          </div>
        ) : (
          shown.map((m) => {
            const needsBadge = tab === 'upcoming' && !m.confirmedPlayers?.includes(user?.id);
            return (
              <div key={m.id} style={{ position: 'relative' }}>
                <MatchCard
                  match={m}
                  users={users}
                  currentUser={user}
                  onPress={(match) => onSelectMatch(match.id)}
                />
                {/* Orange dot for unconfirmed */}
                {needsBadge && (
                  <div style={{ position: 'absolute', top: -4, right: -4, width: 12, height: 12, borderRadius: '50%', background: 'var(--orange)', boxShadow: '0 0 8px var(--orange)' }} />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
