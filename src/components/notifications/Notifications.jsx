import { useApp } from '../../context/AppContext.jsx';
import { getSport } from '../../data/sports.js';
import { fmtRelTime, fmtTime } from '../../utils/matchUtils.js';

/**
 * Derives a live notification list from match + user state.
 * In production you'd push these from a backend (WebSocket / FCM).
 */
function buildNotifications(user, matches) {
  const mine = matches.filter((m) => m.joinedPlayers.includes(user?.id));

  const confirmAlerts = mine
    .filter((m) => !m.confirmedPlayers?.includes(user?.id) && m.time > Date.now() && m.time - Date.now() < 86_400_000)
    .map((m) => ({
      id:    'conf_' + m.id,
      type:  'confirm',
      icon:  '⏳',
      color: 'var(--warn)',
      title: 'Confirm your participation',
      body:  `${getSport(m.sport).name} at ${m.location} · ${fmtTime(m.time)}`,
      time:  fmtRelTime(m.time),
    }));

  const nearbyAlerts = matches
    .filter((m) => !m.joinedPlayers.includes(user?.id) && m.status === 'open' && m.time > Date.now())
    .slice(0, 4)
    .map((m) => {
      const slots = m.playersNeeded - m.joinedPlayers.length;
      return {
        id:    'near_' + m.id,
        type:  'nearby',
        icon:  '🏟️',
        color: 'var(--lime)',
        title: 'Match nearby — slots open',
        body:  `${getSport(m.sport).name} at ${m.location} — ${slots} slot${slots !== 1 ? 's' : ''} left`,
        time:  fmtRelTime(m.time),
      };
    });

  const welcome = {
    id:    'welcome',
    type:  'info',
    icon:  '⚡',
    color: 'var(--blue)',
    title: 'Welcome to Playonix!',
    body:  'Find nearby sports matches instantly. Your reliability score starts at 100.',
    time:  'Now',
  };

  return [...confirmAlerts, ...nearbyAlerts, welcome];
}

export default function Notifications() {
  const { user, matches } = useApp();
  const notifs = buildNotifications(user, matches);

  return (
    <div className="scroll">
      <div style={{ padding: '52px 24px 16px' }}>
        <h2 className="syne" style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.03em', marginBottom: 4 }}>
          Notifications
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>
          {notifs.length} update{notifs.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {notifs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔔</div>
            <p style={{ color: 'var(--muted)' }}>All caught up!</p>
          </div>
        ) : (
          notifs.map((n) => (
            <div key={n.id} className="notif anim-in">
              {/* Icon bubble */}
              <div style={{
                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                background: n.color + '20', border: `1px solid ${n.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>
                {n.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 3 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{n.title}</p>
                  <span style={{ fontSize: 11, color: n.color, fontWeight: 600, flexShrink: 0 }}>{n.time}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>{n.body}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
