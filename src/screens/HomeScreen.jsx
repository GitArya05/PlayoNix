// src/screens/HomeScreen.jsx
import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import Icon from '../components/shared/Icon.jsx';
import ReliabilityBadge from '../components/shared/ReliabilityBadge.jsx';
import MatchCard from '../components/shared/MatchCard.jsx';
import CreateMatch from '../components/matches/CreateMatch.jsx';
import MatchDetail from '../components/matches/MatchDetail.jsx';
import { NearbyMatches, MyMatches, Notifications } from '../components/matches/Tabs.jsx';
import ProfileScreen from '../components/profile/ProfileScreen.jsx';
import { getSport } from '../data/sports.js';
import { fmtRelTime, fmtTime } from '../utils/matchUtils.js';

/* ── Home tab content ─────────────────────────────── */
function HomeTab({ setShowCreate, onSelect }) {
  const { user, matches, users } = useApp();

  const myUpcoming = matches
    .filter(m => m.joinedPlayers?.includes(user?.id) && m.time > Date.now())
    .sort((a, b) => a.time - b.time);

  const openNearby = matches
    .filter(m => m.status !== 'completed' && !m.joinedPlayers?.includes(user?.id))
    .slice(0, 4);

  const next = myUpcoming[0];
  const isConf = next?.confirmedPlayers?.includes(user?.id);

  return (
    <div className="scroll">
      {/* Header */}
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 3 }}>Hello,</p>
            <h1 className="syne" style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1 }}>
              {user?.name?.split(' ')[0]}
            </h1>
            {/* Added requested Quote feature */}
            <p className="syne" style={{ color: 'var(--lime)', fontSize: 16, fontWeight: 700, marginTop: 10 }}>
              "Let's connect, not cancel."
            </p>
            <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>
              Every match is an opportunity. Step up and play.
            </p>
          </div>
          <ReliabilityBadge score={user?.reliabilityScore || 100} />
        </div>
      </div>

      <div className="px" style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 24 }}>

        {/* Action tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button
            onClick={() => setShowCreate(true)}
            style={{ background: 'var(--lime)', borderRadius: 16, padding: '20px 16px', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'filter .18s' }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.07)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}>
            <Icon name="plus" size={22} stroke="#07090F" strokeWidth={2.5} />
            <div className="syne" style={{ fontWeight: 800, fontSize: 14, color: '#07090F', marginTop: 10, lineHeight: 1.2 }}>Create Match</div>
            <div style={{ fontSize: 11, color: 'rgba(7,9,15,.55)', marginTop: 3 }}>Set up your game</div>
          </button>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px 16px', position: 'relative', opacity: .7 }}>
            <Icon name="zap" size={22} stroke="var(--lime)" strokeWidth={2} />
            <div className="syne" style={{ fontWeight: 800, fontSize: 14, marginTop: 10, lineHeight: 1.2 }}>Play Now</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>Instant match</div>
            <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 8, background: 'var(--orange)', color: '#fff', padding: '2px 7px', borderRadius: 50, fontWeight: 700, fontFamily: 'Syne,sans-serif', letterSpacing: '.04em' }}>SOON</span>
          </div>
        </div>

        {/* Next match */}
        {next && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div className="live-dot" />
              <span className="syne" style={{ fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)' }}>Next Match</span>
            </div>
            <div className="card" style={{ padding: 16, borderColor: 'rgba(200,241,53,.25)', cursor: 'pointer' }} onClick={() => onSelect(next.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--card2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {getSport(next.sport).emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="syne" style={{ fontWeight: 800, fontSize: 16, marginBottom: 2 }}>{getSport(next.sport).name}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{next.location}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ color: 'var(--lime)', fontWeight: 700, fontSize: 13, fontFamily: 'Syne,sans-serif' }}>{fmtRelTime(next.time)}</div>
                  <div style={{ color: 'var(--muted)', fontSize: 12 }}>{fmtTime(next.time)}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {!isConf && (
                  <button className="btn btn-lime" style={{ padding: '9px 14px', fontSize: 13, flex: 1 }} onClick={e => { e.stopPropagation(); onSelect(next.id); }}>
                    Confirm
                  </button>
                )}
                <button className="btn btn-ghost" style={{ padding: '9px 14px', fontSize: 13 }} onClick={e => { e.stopPropagation(); onSelect(next.id); }}>
                  View
                </button>
              </div>
              {isConf && <p style={{ marginTop: 9, fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>You have confirmed this match</p>}
            </div>
          </div>
        )}

        {/* Nearby preview */}
        {openNearby.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span className="syne" style={{ fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)' }}>Nearby Matches</span>
              <span style={{ fontSize: 12, color: 'var(--lime)', fontWeight: 600 }}>{openNearby.length} open</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {openNearby.map(m => <MatchCard key={m.id} match={m} users={users} currentUser={user} onPress={m => onSelect(m.id)} />)}
            </div>
          </div>
        )}

        {myUpcoming.length === 0 && openNearby.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
            <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>No matches yet</p>
            <p style={{ fontSize: 13 }}>Create a match or explore Discover for nearby games</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Navigation config ────────────────────────────── */
const TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'discover', label: 'Discover', icon: 'search' },
  { id: 'my', label: 'Matches', icon: 'calendar' },
  { id: 'notifs', label: 'Alerts', icon: 'bell' },
  { id: 'profile', label: 'Profile', icon: 'user' },
];

/* ── Main shell ───────────────────────────────────── */
export default function HomeScreen() {
  const { matches, user } = useApp();
  const [tab, setTab] = useState('home');
  const [showCreate, setShowCreate] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const unconf = matches.filter(m => m.joinedPlayers?.includes(user?.id) && !m.confirmedPlayers?.includes(user?.id) && m.time > Date.now()).length;
  const badges = { my: unconf, notifs: unconf };

  const renderTab = () => {
    if (tab === 'home') return <HomeTab setShowCreate={setShowCreate} onSelect={setSelectedId} />;
    if (tab === 'discover') return <NearbyMatches onSelectMatch={setSelectedId} />;
    if (tab === 'my') return <MyMatches onSelectMatch={setSelectedId} />;
    if (tab === 'notifs') return <Notifications />;
    if (tab === 'profile') return <ProfileScreen />;
  };

  return (
    <div className="app-shell">
      <div className="app-frame" style={{ margin: '0 auto' }}>

        {/* ── Desktop side nav ── */}
        <nav className="side-nav">
          <div className="side-logo">
            <h1>PLAYONIX</h1>
            <p>Sports matching</p>
          </div>

          {TABS.map(t => (
            <button key={t.id} className={`nav-item ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              <Icon name={t.icon} size={18} stroke="currentColor" strokeWidth={1.75} />
              {t.label}
              {badges[t.id] > 0 && <span className="nav-badge">{badges[t.id]}</span>}
            </button>
          ))}

          {/* User + score at bottom */}
          <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: '#07090F', fontFamily: 'Syne,sans-serif', flexShrink: 0 }}>
                {user?.name?.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</p>
                <p style={{ fontSize: 11, color: 'var(--muted)' }}>{user?.level}</p>
              </div>
              <ReliabilityBadge score={user?.reliabilityScore || 100} size="sm" />
            </div>
          </div>
        </nav>

        {/* ── Content ── */}
        <div className="main-col">
          {renderTab()}

          {/* ── Mobile bottom tab bar ── */}
          <div className="tab-bar">
            {TABS.map(t => (
              <button key={t.id} className={`tab-item ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
                <span style={{ position: 'relative', display: 'inline-flex' }}>
                  <Icon name={t.icon} size={20} stroke="currentColor" strokeWidth={tab === t.id ? 2 : 1.75} />
                  {badges[t.id] > 0 && <span className="tab-badge">{badges[t.id]}</span>}
                </span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {showCreate && <CreateMatch onClose={() => setShowCreate(false)} />}
      {selectedId && <MatchDetail matchId={selectedId} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
