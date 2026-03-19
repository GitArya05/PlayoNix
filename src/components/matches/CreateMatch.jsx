import { useState } from 'react';
import { useApp }   from '../../context/AppContext.jsx';
import { SPORTS, getSport } from '../../data/sports.js';
import { fmtTime }  from '../../utils/matchUtils.js';
import { genId }    from '../../utils/storage.js';

export default function CreateMatch({ onClose }) {
  const { user, addMatch } = useApp();
  const today    = new Date().toISOString().split('T')[0];
  const initSp   = user?.sports?.[0] || 'cricket';

  const [form,   setForm]   = useState({ sport: initSp, location:'', date: today, time:'', players: getSport(initSp).defaultPlayers });
  const [status, setStatus] = useState('idle');

  const setSport = (id) => setForm(f => ({ ...f, sport: id, players: getSport(id).defaultPlayers }));
  const valid    = form.location.trim() && form.date && form.time;

  const create = () => {
    if (!valid) return;
    setStatus('creating');
    const ts = new Date(`${form.date}T${form.time}`).getTime();
    const m  = { id: genId(), sport: form.sport, location: form.location.trim(), time: ts, playersNeeded: form.players, joinedPlayers:[user.id], createdBy: user.id, status:'open', confirmedPlayers:[], checkedInPlayers:[], createdAt: Date.now() };
    setTimeout(() => { addMatch(m); setStatus('done'); }, 800);
  };

  const S = { padding:'0 24px 36px' };

  if (status === 'done') return (
    <div className="modal-overlay">
      <div className="modal-sheet" style={{ padding:'36px 24px 48px', textAlign:'center' }}>
        <div style={{ width:56, height:56, borderRadius:16, background:'rgba(200,241,53,.15)', border:'1px solid rgba(200,241,53,.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, margin:'0 auto 16px' }}>{getSport(form.sport).emoji}</div>
        <h2 className="syne" style={{ fontSize:22, fontWeight:800, marginBottom:6 }}>Match Created</h2>
        <p style={{ color:'var(--muted)', marginBottom:4 }}>{getSport(form.sport).name} · {form.location}</p>
        <p style={{ color:'var(--muted)', fontSize:13, marginBottom:28 }}>{fmtTime(new Date(`${form.date}T${form.time}`).getTime())}</p>
        <button className="btn btn-lime" style={{ width:'100%', padding:14, fontSize:15 }} onClick={onClose}>Done</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'22px 24px 18px' }}>
          <h2 className="syne" style={{ fontSize:20, fontWeight:800 }}>Create Match</h2>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:9, background:'var(--card2)', border:'none', color:'var(--muted)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>✕</button>
        </div>

        <div style={{ ...S, display:'flex', flexDirection:'column', gap:18 }}>
          {/* Sport */}
          <div>
            <label className="field-label">Sport</label>
            <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
              {SPORTS.map(s => (
                <button key={s.id} onClick={() => setSport(s.id)}
                  style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 12px', borderRadius:9, fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:12, border:`1.5px solid ${form.sport===s.id ? 'var(--lime)' : 'var(--border)'}`, background: form.sport===s.id ? 'rgba(200,241,53,.1)' : 'transparent', color: form.sport===s.id ? 'var(--text)' : 'var(--muted)', cursor:'pointer', transition:'all .13s' }}>
                  <span style={{ fontSize:15 }}>{s.emoji}</span> {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="field-label">Ground / Location</label>
            <input className="input" placeholder="e.g. Malegaon City Ground" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
          </div>

          {/* Date & Time */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div>
              <label className="field-label">Date</label>
              <input className="input" type="date" value={form.date} min={today} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <label className="field-label">Time</label>
              <input className="input" type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
            </div>
          </div>

          {/* Players */}
          <div>
            <label className="field-label" style={{ display:'flex', justifyContent:'space-between' }}>
              <span>Players needed</span>
              <span style={{ color:'var(--lime)' }}>{form.players}</span>
            </label>
            <input type="range" className="range" min={2} max={22} value={form.players} onChange={e => setForm(f => ({ ...f, players: +e.target.value }))} />
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--muted)', marginTop:4 }}>
              <span>2</span><span>22</span>
            </div>
          </div>

          {!valid && <p style={{ fontSize:12, color:'var(--warn)', textAlign:'center' }}>Fill in location and time to continue</p>}

          <button className="btn btn-lime" style={{ padding:15, fontSize:15, opacity:(!valid || status==='creating') ? .4 : 1 }} onClick={create} disabled={!valid || status==='creating'}>
            {status === 'creating' ? 'Creating…' : 'Create Match'}
          </button>
        </div>
      </div>
    </div>
  );
}
