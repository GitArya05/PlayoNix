import { useApp }        from '../../context/AppContext.jsx';
import ReliabilityBadge  from '../shared/ReliabilityBadge.jsx';
import { getSport }      from '../../data/sports.js';
import { scoreColor, scoreLabel, showRate } from '../../utils/scoreUtils.js';

export default function ProfileScreen() {
  const { user, matches, logout } = useApp();
  const mine    = matches.filter(m => m.joinedPlayers.includes(user?.id));
  const score   = user?.reliabilityScore || 100;
  const rate    = showRate(user?.matchesPlayed || 0, user?.noShows || 0);

  return (
    <div className="scroll">
      <div className="page-header">
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <div style={{ width:60, height:60, borderRadius:18, background:'var(--lime)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, fontWeight:800, color:'#07090F', fontFamily:'Syne,sans-serif', flexShrink:0 }}>
            {user?.name?.charAt(0) || '?'}
          </div>
          <div>
            <h2 className="syne" style={{ fontSize:20, fontWeight:800, letterSpacing:'-.02em' }}>{user?.name}</h2>
            <p style={{ color:'var(--muted)', fontSize:13, marginTop:2 }}>{user?.phone}</p>
          </div>
        </div>
      </div>

      <div className="px" style={{ display:'flex', flexDirection:'column', gap:12, paddingBottom:32 }}>

        {/* Reliability Score */}
        <div className="card" style={{ padding:18 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <div>
              <p style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', marginBottom:6 }}>Reliability Score</p>
              <div className="syne" style={{ fontSize:38, fontWeight:800, color: scoreColor(score), lineHeight:1 }}>{score}</div>
              <p style={{ fontSize:13, color: scoreColor(score), fontWeight:600, marginTop:3 }}>{scoreLabel(score)}</p>
            </div>
            <ReliabilityBadge score={score} size="lg" />
          </div>

          <div style={{ height:5, borderRadius:3, background:'var(--border)', overflow:'hidden', marginBottom:5 }}>
            <div style={{ height:'100%', width:`${score}%`, background: scoreColor(score), borderRadius:3, transition:'width .6s ease' }} />
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--muted)' }}>
            <span>Risky</span><span>Average (65+)</span><span>Reliable (85+)</span>
          </div>

          <div style={{ marginTop:14, padding:'10px 12px', background:'var(--card2)', borderRadius:9, fontSize:12, color:'var(--muted)', lineHeight:1.55 }}>
            +2 for each check-in · −10 for each no-show. Capped at 100.
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:9 }}>
          {[
            { label:'Played',   val: user?.matchesPlayed || 0, color:'var(--lime)' },
            { label:'No-shows', val: user?.noShows || 0,       color:(user?.noShows||0)>0 ? 'var(--danger)' : 'var(--muted)' },
            { label:'Show rate',val: `${rate}%`,               color:'var(--blue)' },
          ].map(s => (
            <div key={s.label} className="card" style={{ padding:'13px 10px', textAlign:'center' }}>
              <div className="syne" style={{ fontSize:20, fontWeight:800, color:s.color, marginBottom:4 }}>{s.val}</div>
              <div style={{ fontSize:11, color:'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Sports & Level */}
        <div className="card" style={{ padding:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
            <span style={{ fontSize:13, color:'var(--muted)', fontWeight:600 }}>Skill Level</span>
            <span style={{ background:'var(--lime)', color:'#07090F', padding:'4px 12px', borderRadius:50, fontSize:12, fontWeight:700, fontFamily:'Syne,sans-serif' }}>
              {user?.level || 'Not set'}
            </span>
          </div>
          <div style={{ divider:'height:1px;background:var(--border)', marginBottom:12 }} />
          <p style={{ fontSize:13, color:'var(--muted)', fontWeight:600, marginBottom:9 }}>Sports</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
            {user?.sports?.map(id => {
              const sp  = getSport(id);
              const lvl = user?.sportLevels?.[id];
              return (
                <span key={id} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, background:'var(--card2)', border:'1px solid var(--border)', padding:'5px 11px', borderRadius:50, fontFamily:'Syne,sans-serif', fontWeight:600 }}>
                  <span style={{ fontSize:15 }}>{sp.emoji}</span>
                  {sp.name}
                  {lvl && <span style={{ fontSize:11, color:'var(--muted)', fontWeight:500 }}>· {lvl}</span>}
                </span>
              );
            })}
          </div>
        </div>

        <button className="btn btn-ghost" style={{ padding:13, marginTop:2 }} onClick={logout}>Sign Out</button>
      </div>
    </div>
  );
}
