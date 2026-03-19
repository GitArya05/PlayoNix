import { useState }  from 'react';
import { useApp }    from '../../context/AppContext.jsx';
import ReliabilityBadge from '../shared/ReliabilityBadge.jsx';
import PlayerSlots      from '../shared/PlayerSlots.jsx';
import { getSport }     from '../../data/sports.js';
import { fmtDate, fmtTime, fmtRelTime, isMatchSoon, isPastMatch, slotsLeft } from '../../utils/matchUtils.js';
import { applyCheckIn, applyNoShow } from '../../utils/scoreUtils.js';

const STATUS_STYLE = {
  open:      { bg:'rgba(200,241,53,.12)', color:'#C8F135' },
  full:      { bg:'rgba(255,107,53,.12)', color:'#FF6B35' },
  completed: { bg:'rgba(107,122,150,.12)', color:'#6B7A96' },
};

function InfoRow({ label, value, valueColor }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:'1px solid var(--border)' }}>
      <span style={{ color:'var(--muted)', fontSize:13 }}>{label}</span>
      <span style={{ fontWeight:600, fontSize:13, color: valueColor || 'var(--text)' }}>{value}</span>
    </div>
  );
}

export default function MatchDetail({ matchId, onClose }) {
  const { user, matches, users, updateMatch, updateUser } = useApp();
  const original = matches.find(m => m.id === matchId);
  if (!original) return null;

  const [m, setM] = useState({ ...original });
  const sync = (updated) => { setM(updated); updateMatch(updated); };

  const sport      = getSport(m.sport);
  const isJoined   = m.joinedPlayers.includes(user?.id);
  const isOwner    = m.createdBy === user?.id;
  const isConf     = m.confirmedPlayers?.includes(user?.id);
  const isChecked  = m.checkedInPlayers?.includes(user?.id);
  const soon       = isMatchSoon(m);
  const past       = isPastMatch(m);
  const slots      = slotsLeft(m);
  const creator    = users[m.createdBy] || { name:'Player', reliabilityScore:80 };
  const { bg, color } = STATUS_STYLE[m.status] || STATUS_STYLE.completed;

  const join = () => {
    if (isJoined || slots <= 0) return;
    const j = [...m.joinedPlayers, user.id];
    sync({ ...m, joinedPlayers: j, status: j.length >= m.playersNeeded ? 'full' : 'open' });
  };
  const leave   = () => { if (!isJoined || isOwner) return; sync({ ...m, joinedPlayers: m.joinedPlayers.filter(id => id !== user.id), confirmedPlayers:(m.confirmedPlayers||[]).filter(id=>id!==user.id), status:'open' }); };
  const confirm = () => { if (!isJoined || isConf) return; sync({ ...m, confirmedPlayers: [...(m.confirmedPlayers||[]), user.id] }); };
  const checkIn = () => {
    if (!isJoined || isChecked) return;
    sync({ ...m, checkedInPlayers: [...(m.checkedInPlayers||[]), user.id] });
    updateUser({ reliabilityScore: applyCheckIn(user.reliabilityScore||80), matchesPlayed:(user.matchesPlayed||0)+1 });
  };
  const noShow = () => updateUser({ reliabilityScore: applyNoShow(user.reliabilityScore||80), noShows:(user.noShows||0)+1 });

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        {/* Header */}
        <div style={{ padding:'22px 22px 0' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18 }}>
            <div style={{ display:'flex', alignItems:'center', gap:13 }}>
              <div style={{ width:52, height:52, borderRadius:14, background:'var(--card2)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, flexShrink:0 }}>{sport.emoji}</div>
              <div>
                <h2 className="syne" style={{ fontSize:20, fontWeight:800, lineHeight:1, marginBottom:5 }}>{sport.name}</h2>
                <span className="status-pill" style={{ background:bg, color }}>{m.status}</span>
              </div>
            </div>
            <button onClick={onClose} style={{ width:32, height:32, borderRadius:9, background:'var(--card2)', border:'none', color:'var(--muted)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>✕</button>
          </div>

          {/* Info */}
          <div className="card" style={{ padding:'4px 14px', marginBottom:14 }}>
            <InfoRow label="Location" value={m.location} />
            <InfoRow label="Date"     value={fmtDate(m.time)} />
            <InfoRow label="Time"     value={fmtTime(m.time)} valueColor="var(--lime)" />
            <InfoRow label="Starts"   value={fmtRelTime(m.time)} valueColor="var(--lime)" />
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:8 }}>
              <span style={{ color:'var(--muted)', fontSize:13 }}>Created by</span>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontWeight:600, fontSize:13 }}>{creator.name}{isOwner ? ' (you)' : ''}</span>
                <ReliabilityBadge score={creator.reliabilityScore||80} size="sm" />
              </div>
            </div>
          </div>

          {/* Slots */}
          <div style={{ marginBottom:14 }}>
            <p style={{ fontSize:12, color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', marginBottom:9 }}>
              Players — {m.joinedPlayers.length}/{m.playersNeeded}
            </p>
            <PlayerSlots match={m} />
          </div>

          {/* Status chips */}
          {isJoined && !past && (
            <div style={{ display:'flex', gap:7, marginBottom:12, flexWrap:'wrap' }}>
              <span className="tag" style={{ background: isConf   ? 'rgba(34,197,94,.12)' :'var(--card2)', color: isConf   ? '#22C55E':'var(--muted)', border:`1px solid ${isConf   ? '#22C55E':'var(--border)'}` }}>
                {isConf    ? 'Confirmed' : 'Not yet confirmed'}
              </span>
              <span className="tag" style={{ background: isChecked ? 'rgba(34,197,94,.12)' :'var(--card2)', color: isChecked ? '#22C55E':'var(--muted)', border:`1px solid ${isChecked ? '#22C55E':'var(--border)'}` }}>
                {isChecked ? 'Checked in' : 'Not checked in'}
              </span>
            </div>
          )}

          {soon && !past && (
            <div style={{ background:'rgba(200,241,53,.07)', border:'1px solid rgba(200,241,53,.25)', borderRadius:11, padding:'10px 13px', marginBottom:12, fontSize:13, color:'var(--lime)', fontWeight:600 }}>
              Match starts soon — confirm and check in when you arrive.
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ padding:'0 22px 36px', display:'flex', flexDirection:'column', gap:9 }}>
          {!isJoined && !past && slots > 0 && (
            <button className="btn btn-lime" style={{ padding:14 }} onClick={join}>
              Join Match — {slots} slot{slots !== 1 ? 's' : ''} left
            </button>
          )}
          {isJoined && !isConf && !past && (
            <button className="btn btn-lime" style={{ padding:14 }} onClick={confirm}>Confirm Participation</button>
          )}
          {isJoined && soon && !isChecked && (
            <button className="btn btn-orange" style={{ padding:14 }} onClick={checkIn}>I've Arrived</button>
          )}
          {past && isJoined && !isChecked && (
            <button className="btn btn-danger" style={{ padding:13 }} onClick={noShow}>Record as no-show</button>
          )}
          {isJoined && !isOwner && !past && (
            <button className="btn btn-ghost" style={{ padding:12 }} onClick={leave}>Leave Match</button>
          )}
          {!isJoined && slots <= 0 && !past && (
            <p style={{ textAlign:'center', color:'var(--muted)', fontSize:14, padding:10 }}>This match is full</p>
          )}
          {!isJoined && past && (
            <p style={{ textAlign:'center', color:'var(--muted)', fontSize:14, padding:10 }}>This match has already taken place</p>
          )}
        </div>
      </div>
    </div>
  );
}
