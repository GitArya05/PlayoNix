const TABS = [
  { id: 'home',     icon: '⚡', label: 'Home' },
  { id: 'discover', icon: '🔍', label: 'Discover' },
  { id: 'my',       icon: '📋', label: 'My Matches' },
  { id: 'notifs',   icon: '🔔', label: 'Alerts' },
  { id: 'profile',  icon: '👤', label: 'Profile' },
];

export default function BottomNav({ active, onChange, badges = {} }) {
  return (
    <div className="tab-bar">
      {TABS.map((t) => (
        <button
          key={t.id}
          className={`tab-item ${active === t.id ? 'active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span className="tab-icon">{t.icon}</span>
            {badges[t.id] > 0 && (
              <span style={{
                position: 'absolute', top: -4, right: -6,
                minWidth: 16, height: 16, borderRadius: 8,
                background: 'var(--orange)', color: '#fff',
                fontSize: 9, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 4px', fontFamily: 'Syne, sans-serif',
              }}>
                {badges[t.id]}
              </span>
            )}
          </div>
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}
