import { useState } from 'react';
import { useApp }   from '../../context/AppContext.jsx';
import { SPORTS, LEVELS, LEVEL_DESCRIPTIONS, LEVEL_ICON, LEVEL_COLOR } from '../../data/sports.js';

/* ── Sport level picker popup ─────────────────────── */
function SportLevelPicker({ sport, onSelect, onCancel }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onCancel()}
      style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.72)', backdropFilter:'blur(6px)', zIndex:300, display:'flex', alignItems:'center', justifyContent:'center', padding:20, animation:'fadeIn .18s ease' }}>
      <div style={{ background:'var(--surface)', borderRadius:20, border:'1px solid var(--border)', padding:'28px 24px', width:'100%', maxWidth:360, animation:'slideUp .22s ease' }}>
        <div style={{ textAlign:'center', marginBottom:22 }}>
          <div style={{ fontSize:44, marginBottom:8, lineHeight:1 }}>{sport.emoji}</div>
          <h3 className="syne" style={{ fontSize:18, fontWeight:800, marginBottom:4 }}>Level in {sport.name}?</h3>
          <p style={{ color:'var(--muted)', fontSize:12 }}>Helps match you with the right players</p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
          {LEVELS.map(lv => {
            const color = LEVEL_COLOR[lv];
            const icon  = LEVEL_ICON[lv];
            return (
              <button key={lv} onClick={() => onSelect(lv)}
                style={{ display:'flex', alignItems:'center', gap:14, padding:'13px 15px', borderRadius:12, border:`1.5px solid ${color}28`, background: color + '0F', cursor:'pointer', transition:'all .15s', width:'100%' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color + '80'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = color + '28'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ width:38, height:38, borderRadius:10, background: color + '18', border:`1px solid ${color}40`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{icon}</div>
                <div style={{ flex:1, textAlign:'left' }}>
                  <div className="syne" style={{ fontWeight:800, fontSize:15, color, marginBottom:2 }}>{lv}</div>
                  <div style={{ fontSize:11, color:'var(--muted)' }}>{LEVEL_DESCRIPTIONS[lv]}</div>
                </div>
              </button>
            );
          })}
        </div>
        <button className="btn btn-ghost" style={{ width:'100%', padding:11, marginTop:12 }} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

/* ── Add custom sport popup ───────────────────────── */
function AddSportModal({ onAdd, onCancel, existingNames }) {
  const [name,  setName]  = useState('');
  const [emoji, setEmoji] = useState('🏅');
  const [err,   setErr]   = useState('');
  const EMOJIS = ['🏅','🎽','🥊','🤺','🏋️','🤸','🚴','🧗','🏊','🤾','⛷️','🎿','🥋','🏇','🚣','🤽','🎯','🥏','🛹','🎪'];

  const submit = () => {
    const t = name.trim();
    if (!t || t.length < 2) { setErr('Enter a valid name'); return; }
    if (existingNames.map(n => n.toLowerCase()).includes(t.toLowerCase())) { setErr('Already in the list'); return; }
    onAdd({ id: 'custom_' + t.toLowerCase().replace(/\s+/g, '_'), name: t, emoji, defaultPlayers: 10, custom: true });
  };

  return (
    <div onClick={e => e.target === e.currentTarget && onCancel()}
      style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.72)', backdropFilter:'blur(6px)', zIndex:300, display:'flex', alignItems:'center', justifyContent:'center', padding:20, animation:'fadeIn .18s ease' }}>
      <div style={{ background:'var(--surface)', borderRadius:20, border:'1px solid var(--border)', padding:'28px 24px', width:'100%', maxWidth:360, animation:'slideUp .22s ease' }}>
        <h3 className="syne" style={{ fontSize:18, fontWeight:800, marginBottom:4 }}>Add a sport</h3>
        <p style={{ color:'var(--muted)', fontSize:12, marginBottom:20 }}>Don't see your game? Add it here</p>

        <div style={{ marginBottom:14 }}>
          <label className="field-label">Pick an icon</label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {EMOJIS.map(em => (
              <button key={em} onClick={() => setEmoji(em)}
                style={{ width:34, height:34, borderRadius:8, fontSize:16, border:`1.5px solid ${emoji===em ? 'var(--lime)' : 'var(--border)'}`, background: emoji===em ? 'rgba(200,241,53,.1)' : 'var(--card)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .12s' }}>
                {em}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: name.trim() ? 10 : 16 }}>
          <label className="field-label">Sport name</label>
          <input className="input" placeholder="e.g. Cycling, Frisbee…" value={name} autoFocus onChange={e => { setName(e.target.value); setErr(''); }} onKeyDown={e => e.key === 'Enter' && submit()} />
          {err && <p style={{ color:'var(--danger)', fontSize:12, marginTop:5 }}>{err}</p>}
        </div>

        {name.trim() && (
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px', background:'var(--card)', borderRadius:10, border:'1px solid rgba(200,241,53,.25)', marginBottom:14 }}>
            <span style={{ fontSize:18 }}>{emoji}</span>
            <span className="syne" style={{ fontWeight:700, fontSize:13, color:'var(--lime)' }}>{name.trim()}</span>
            <span style={{ fontSize:10, color:'var(--muted)', marginLeft:'auto' }}>Preview</span>
          </div>
        )}

        <div style={{ display:'flex', gap:9 }}>
          <button className="btn btn-ghost" style={{ flex:1, padding:12 }} onClick={onCancel}>Cancel</button>
          <button className="btn btn-lime"  style={{ flex:2, padding:12, fontSize:14, opacity: name.trim() ? 1 : .4 }} onClick={submit} disabled={!name.trim()}>Add Sport</button>
        </div>
      </div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────── */
export default function ProfileSetup() {
  const { user, updateUser, setScreen } = useApp();

  const [selected,  setSelected]  = useState((user?.sports || []).map(id => ({ id, level: user?.sportLevels?.[id] || 'Intermediate' })));
  const [allSports, setAllSports] = useState([...SPORTS]);
  const [overall,   setOverall]   = useState(user?.level || '');
  const [step,      setStep]      = useState(1);
  const [pending,   setPending]   = useState(null);
  const [showAdd,   setShowAdd]   = useState(false);

  const handleChip = (sport) => {
    if (selected.find(s => s.id === sport.id)) setSelected(p => p.filter(s => s.id !== sport.id));
    else setPending(sport);
  };

  const onLevelPick  = (level) => { setSelected(p => [...p, { id: pending.id, level }]); setPending(null); };
  const onAddCustom  = (sport) => { setAllSports(p => [...p, sport]); setShowAdd(false); setPending(sport); };

  const goNext = () => {
    if (step === 1) { if (selected.length === 0) return; setStep(2); }
    else {
      if (!overall) return;
      updateUser({ sports: selected.map(s => s.id), sportLevels: Object.fromEntries(selected.map(s => [s.id, s.level])), level: overall, profileComplete: true });
      setScreen('home');
    }
  };

  const canGo = step === 1 ? selected.length > 0 : Boolean(overall);

  return (
    <>
      <div className="setup-root">
        <div className="setup-card">

          {/* Progress */}
          <div style={{ display:'flex', gap:8, marginBottom:24 }}>
            {[1,2].map(n => <div key={n} style={{ height:4, flex:1, borderRadius:2, background: n<=step ? 'var(--lime)' : 'var(--border)', transition:'background .3s' }} />)}
          </div>
          <p style={{ color:'var(--muted)', fontSize:13, marginBottom:4, fontWeight:500 }}>Step {step} of 2</p>
          <h2 className="syne" style={{ fontSize:26, fontWeight:800, letterSpacing:'-.03em', marginBottom:6, lineHeight:1.2 }}>
            {step === 1 ? 'What sports do you play?' : 'Your overall athlete level'}
          </h2>
          <p style={{ color:'var(--muted)', fontSize:13, marginBottom:20, lineHeight:1.55 }}>
            {step === 1 ? 'Select your sports. Tap each one to set your skill level — you\'ll see a small icon on the chip.' : 'As an athlete overall, across all the sports you play.'}
          </p>

          {/* ── Step 1 ── */}
          {step === 1 && (
            <>
              <div className="sports-grid" style={{ marginBottom:12 }}>
                {allSports.map(sport => {
                  const sel  = selected.find(s => s.id === sport.id);
                  const icon = sel ? LEVEL_ICON[sel.level]  : null;
                  const col  = sel ? LEVEL_COLOR[sel.level] : null;
                  return (
                    <button key={sport.id} className={`sp-chip ${sel ? 'active' : ''}`} onClick={() => handleChip(sport)}>
                      <span style={{ fontSize:17, flexShrink:0 }}>{sport.emoji}</span>
                      <span className="chip-name">{sport.name}</span>
                      {sport.custom && <span style={{ fontSize:8, color:'var(--orange)', background:'rgba(255,107,53,.15)', padding:'2px 5px', borderRadius:50, fontWeight:700, flexShrink:0 }}>NEW</span>}
                      {sel && <span className="chip-lvl" style={{ background: col+'20', border:`1.5px solid ${col}55`, title: sel.level }}>{icon}</span>}
                    </button>
                  );
                })}
                <button onClick={() => setShowAdd(true)}
                  style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7, padding:'10px 13px', borderRadius:11, border:'1.5px dashed var(--dim)', background:'transparent', color:'var(--lime)', cursor:'pointer', fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:13, transition:'all .2s', width:'100%' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--lime)'; e.currentTarget.style.background = 'rgba(200,241,53,.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--dim)';  e.currentTarget.style.background = 'transparent'; }}>
                  + Add sport
                </button>
              </div>

              {/* Legend */}
              <div style={{ display:'flex', gap:16, marginBottom:12, padding:'9px 13px', background:'var(--card)', borderRadius:10, border:'1px solid var(--border)' }}>
                <span style={{ fontSize:11, color:'var(--muted)', marginRight:4 }}>Level icons:</span>
                {LEVELS.map(lv => (
                  <span key={lv} style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color: LEVEL_COLOR[lv], fontWeight:600 }}>
                    <span style={{ fontSize:13 }}>{LEVEL_ICON[lv]}</span> {lv}
                  </span>
                ))}
              </div>

              {selected.length > 0 && (
                <div style={{ padding:'10px 13px', background:'rgba(200,241,53,.05)', border:'1px solid rgba(200,241,53,.18)', borderRadius:10 }}>
                  <p style={{ fontSize:11, color:'var(--muted)', marginBottom:7, fontWeight:600 }}>{selected.length} sport{selected.length > 1 ? 's' : ''} selected — tap to change level or deselect</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                    {selected.map(s => {
                      const sp   = allSports.find(a => a.id === s.id);
                      const col  = LEVEL_COLOR[s.level];
                      const icon = LEVEL_ICON[s.level];
                      return (
                        <span key={s.id} style={{ fontSize:12, background:'var(--card)', border:`1px solid ${col}35`, padding:'3px 9px', borderRadius:50, fontFamily:'Syne,sans-serif', fontWeight:600, display:'flex', alignItems:'center', gap:5, color:'var(--text)' }}>
                          {sp?.emoji} {sp?.name} <span style={{ fontSize:13 }}>{icon}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {LEVELS.map(lv => {
                const color  = LEVEL_COLOR[lv];
                const icon   = LEVEL_ICON[lv];
                const chosen = overall === lv;
                return (
                  <button key={lv} onClick={() => setOverall(lv)}
                    style={{ display:'flex', alignItems:'center', gap:14, padding:'15px', borderRadius:14, width:'100%', border:`2px solid ${chosen ? color : 'var(--border)'}`, background: chosen ? color + '10' : 'var(--card)', cursor:'pointer', transition:'all .18s' }}>
                    <div style={{ width:42, height:42, borderRadius:12, flexShrink:0, background: color+'18', border:`1px solid ${color}45`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{icon}</div>
                    <div style={{ flex:1, textAlign:'left' }}>
                      <div className="syne" style={{ fontWeight:800, fontSize:16, color: chosen ? color : 'var(--text)', marginBottom:2 }}>{lv}</div>
                      <div style={{ fontSize:12, color:'var(--muted)' }}>{LEVEL_DESCRIPTIONS[lv]}</div>
                    </div>
                    {chosen && <div style={{ width:22, height:22, borderRadius:'50%', background:color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:'#07090F', fontWeight:800, flexShrink:0 }}>✓</div>}
                  </button>
                );
              })}

              {/* Recap */}
              <div style={{ padding:'12px 14px', background:'var(--card)', borderRadius:12, border:'1px solid var(--border)', marginTop:4 }}>
                <p style={{ fontSize:11, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', marginBottom:9 }}>Sport levels you set</p>
                {selected.map(s => {
                  const sp   = allSports.find(a => a.id === s.id);
                  const col  = LEVEL_COLOR[s.level];
                  return (
                    <div key={s.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'4px 0', borderBottom:'1px solid var(--border)' }}>
                      <span style={{ fontSize:13 }}>{sp?.emoji} {sp?.name}</span>
                      <span style={{ fontSize:12, fontWeight:700, color:col, fontFamily:'Syne,sans-serif', display:'flex', alignItems:'center', gap:4 }}>{LEVEL_ICON[s.level]} {s.level}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{ marginTop:20 }}>
            <button className="btn btn-lime" style={{ width:'100%', padding:15, fontSize:15, opacity: canGo ? 1 : .4 }} onClick={goNext} disabled={!canGo}>
              {step === 1 ? `Next — Overall Level  (${selected.length} selected)` : "Finish Setup"}
            </button>
            {step === 2 && <button className="btn btn-ghost" style={{ width:'100%', padding:12, marginTop:9 }} onClick={() => setStep(1)}>Back to Sports</button>}
          </div>
        </div>
      </div>

      {pending  && <SportLevelPicker sport={pending} onSelect={onLevelPick} onCancel={() => setPending(null)} />}
      {showAdd  && <AddSportModal onAdd={onAddCustom} onCancel={() => setShowAdd(false)} existingNames={allSports.map(s => s.name)} />}
    </>
  );
}
