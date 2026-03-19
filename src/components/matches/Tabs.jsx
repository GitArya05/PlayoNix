// NearbyMatches.jsx
import { useState } from 'react';
import { useApp }   from '../../context/AppContext.jsx';
import MatchCard    from '../shared/MatchCard.jsx';
import { SPORTS }   from '../../data/sports.js';

export function NearbyMatches({ onSelectMatch }) {
  const { matches, users, user } = useApp();
  const [filter, setFilter] = useState('all');
  const sorted = [...matches].filter(m => filter === 'all' || m.sport === filter).sort((a,b) => a.time - b.time);

  return (
    <div className="scroll">
      <div className="page-header">
        <h2 className="syne" style={{ fontSize:22, fontWeight:800, letterSpacing:'-.02em', marginBottom:14 }}>Discover</h2>
        <div style={{ display:'flex', gap:7, overflowX:'auto', paddingBottom:4, scrollbarWidth:'none' }}>
          <button className={`sp-chip ${filter==='all'?'active':''}`} onClick={() => setFilter('all')} style={{ flexShrink:0 }}>All</button>
          {SPORTS.map(s => (
            <button key={s.id} className={`sp-chip ${filter===s.id?'active':''}`} onClick={() => setFilter(s.id)} style={{ flexShrink:0, display:'flex', alignItems:'center', gap:5 }}>
              <span style={{ fontSize:14 }}>{s.emoji}</span> {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div style={{ margin:'0 22px 16px', borderRadius:13, overflow:'hidden', height:136, background:'var(--card)', border:'1px solid var(--border)', position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)', backgroundSize:'22px 22px', opacity:.5 }} />
        <div style={{ textAlign:'center', position:'relative', zIndex:1 }}>
          <p style={{ fontSize:13, color:'var(--muted)', fontWeight:600 }}>Map View</p>
          <p style={{ fontSize:11, color:'var(--dim)' }}>Malegaon, Maharashtra</p>
        </div>
        {[{top:'35%',left:'40%'},{top:'58%',left:'65%'},{top:'42%',left:'22%'}].map((p,i) => (
          <div key={i} style={{ position:'absolute', top:p.top, left:p.left, width:10, height:10, borderRadius:'50%', background:'var(--lime)', boxShadow:'0 0 8px rgba(200,241,53,.6)', transform:'translate(-50%,-50%)' }} />
        ))}
        <div style={{ position:'absolute', bottom:8, right:10, fontSize:10, color:'var(--dim)', background:'var(--bg)', padding:'3px 8px', borderRadius:20, border:'1px solid var(--border)' }}>Map integration ready</div>
      </div>

      <div className="px" style={{ display:'flex', flexDirection:'column', gap:9, paddingBottom:24 }}>
        {sorted.length === 0
          ? <div style={{ textAlign:'center', padding:'48px 0', color:'var(--muted)' }}>No matches found</div>
          : sorted.map(m => <MatchCard key={m.id} match={m} users={users} currentUser={user} onPress={m => onSelectMatch(m.id)} />)
        }
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────
export function MyMatches({ onSelectMatch }) {
  const { user, matches, users } = useApp();
  const [tab, setTab] = useState('upcoming');
  const mine     = matches.filter(m => m.joinedPlayers.includes(user?.id));
  const upcoming = mine.filter(m => m.time > Date.now()).sort((a,b) => a.time - b.time);
  const past     = mine.filter(m => m.time <= Date.now()).sort((a,b) => b.time - a.time);
  const shown    = tab === 'upcoming' ? upcoming : past;
  const unconf   = upcoming.filter(m => !m.confirmedPlayers?.includes(user?.id));

  return (
    <div className="scroll">
      <div className="page-header">
        <h2 className="syne" style={{ fontSize:22, fontWeight:800, letterSpacing:'-.02em', marginBottom:12 }}>My Matches</h2>
        {unconf.length > 0 && tab === 'upcoming' && (
          <div style={{ background:'rgba(255,107,53,.08)', border:'1px solid rgba(255,107,53,.25)', borderRadius:9, padding:'9px 13px', marginBottom:12, fontSize:13, color:'var(--orange)', fontWeight:600 }}>
            {unconf.length} match{unconf.length > 1 ? 'es' : ''} awaiting your confirmation
          </div>
        )}
        <div style={{ display:'flex', background:'var(--card)', borderRadius:10, padding:3 }}>
          {[['upcoming', upcoming.length, 'Upcoming'], ['past', past.length, 'History']].map(([t, cnt, label]) => (
            <button key={t} onClick={() => setTab(t)} className="syne"
              style={{ flex:1, padding:'9px', borderRadius:8, fontWeight:700, fontSize:12, border:'none', cursor:'pointer', transition:'all .2s', textTransform:'uppercase', letterSpacing:'.06em', background: tab===t ? 'var(--lime)' : 'transparent', color: tab===t ? '#07090F' : 'var(--muted)' }}>
              {label} {cnt > 0 && `(${cnt})`}
            </button>
          ))}
        </div>
      </div>

      <div className="px" style={{ display:'flex', flexDirection:'column', gap:9, paddingBottom:24 }}>
        {shown.length === 0
          ? <div style={{ textAlign:'center', padding:'48px 0', color:'var(--muted)' }}>
              <p style={{ fontWeight:600, marginBottom:6 }}>{tab === 'upcoming' ? 'No upcoming matches' : 'No history yet'}</p>
              <p style={{ fontSize:13 }}>{tab === 'upcoming' ? 'Join or create a match to get started' : 'Completed matches will appear here'}</p>
            </div>
          : shown.map(m => {
              const needsBadge = tab === 'upcoming' && !m.confirmedPlayers?.includes(user?.id);
              return (
                <div key={m.id} style={{ position:'relative' }}>
                  <MatchCard match={m} users={users} currentUser={user} onPress={m => onSelectMatch(m.id)} />
                  {needsBadge && <div style={{ position:'absolute', top:-3, right:-3, width:10, height:10, borderRadius:'50%', background:'var(--orange)', boxShadow:'0 0 6px var(--orange)' }} />}
                </div>
              );
            })
        }
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────
import { getSport } from '../../data/sports.js';
import { fmtRelTime, fmtTime } from '../../utils/matchUtils.js';

export function Notifications() {
  const { user, matches } = useApp();
  const mine = matches.filter(m => m.joinedPlayers.includes(user?.id));

  const items = [
    ...mine
      .filter(m => !m.confirmedPlayers?.includes(user?.id) && m.time > Date.now() && m.time - Date.now() < 86_400_000)
      .map(m => ({ id:'c_'+m.id, color:'var(--warn)', title:'Confirm your participation', body:`${getSport(m.sport).name} · ${m.location} · ${fmtTime(m.time)}`, time: fmtRelTime(m.time) })),
    ...matches
      .filter(m => !m.joinedPlayers.includes(user?.id) && m.status === 'open' && m.time > Date.now())
      .slice(0,3)
      .map(m => ({ id:'n_'+m.id, color:'var(--lime)', title:'Match nearby — slots open', body:`${getSport(m.sport).name} · ${m.location} — ${m.playersNeeded - m.joinedPlayers.length} slots left`, time: fmtRelTime(m.time) })),
    { id:'welcome', color:'var(--blue)', title:'Welcome to Playonix', body:'Your reliability score starts at 100. Show up, confirm, check in — keep it high.', time:'Now' },
  ];

  return (
    <div className="scroll">
      <div className="page-header">
        <h2 className="syne" style={{ fontSize:22, fontWeight:800, letterSpacing:'-.02em' }}>Notifications</h2>
        <p style={{ color:'var(--muted)', fontSize:13, marginTop:4 }}>{items.length} update{items.length !== 1 ? 's' : ''}</p>
      </div>
      <div className="px" style={{ display:'flex', flexDirection:'column', gap:9, paddingBottom:24 }}>
        {items.map(n => (
          <div key={n.id} className="notif-item">
            <div style={{ width:38, height:38, borderRadius:10, flexShrink:0, background: n.color+'18', border:`1px solid ${n.color}35`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background: n.color }} />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8, marginBottom:3 }}>
                <p style={{ fontWeight:600, fontSize:14, lineHeight:1.35 }}>{n.title}</p>
                <span style={{ fontSize:11, color: n.color, fontWeight:600, flexShrink:0 }}>{n.time}</span>
              </div>
              <p style={{ fontSize:13, color:'var(--muted)' }}>{n.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
