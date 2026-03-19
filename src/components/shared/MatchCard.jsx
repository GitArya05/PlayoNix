import ReliabilityBadge from './ReliabilityBadge.jsx';
import { getSport }      from '../../data/sports.js';
import { fmtRelTime, fmtTime, slotsLeft } from '../../utils/matchUtils.js';

const STATUS_STYLE = {
  open:      { bg: 'rgba(200,241,53,.12)', color: '#C8F135' },
  full:      { bg: 'rgba(255,107,53,.12)', color: '#FF6B35' },
  completed: { bg: 'rgba(107,122,150,.12)', color: '#6B7A96' },
};

export default function MatchCard({ match, users, currentUser, onPress }) {
  const sport    = getSport(match.sport);
  const slots    = slotsLeft(match);
  const isJoined = match.joinedPlayers.includes(currentUser?.id);
  const isConf   = match.confirmedPlayers?.includes(currentUser?.id);
  const creator  = users[match.createdBy] || { name: 'Player', reliabilityScore: 80 };
  const { bg, color } = STATUS_STYLE[match.status] || STATUS_STYLE.completed;

  return (
    <div className="card match-card anim-in" onClick={() => onPress(match)}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>

        {/* Sport icon */}
        <div style={{
          width: 48, height: 48, borderRadius: 12, flexShrink: 0,
          background: 'var(--card2)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
        }}>
          {sport.emoji}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Title row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span className="syne" style={{ fontWeight: 800, fontSize: 15 }}>{sport.name}</span>
            <span className="status-pill" style={{ background: bg, color }}>{match.status}</span>
          </div>

          {/* Location */}
          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {match.location}
          </p>

          {/* Meta row */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--lime)', fontWeight: 600 }}>
              {fmtRelTime(match.time)} · {fmtTime(match.time)}
            </span>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>
              {match.joinedPlayers.length}/{match.playersNeeded} players
            </span>
            {slots > 0 && (
              <span style={{ fontSize: 12, color: 'var(--lime)', fontWeight: 600 }}>
                {slots} slot{slots !== 1 ? 's' : ''} left
              </span>
            )}
          </div>

          {/* User tags */}
          {(isJoined || isConf) && (
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              {isJoined && <span className="tag" style={{ background: 'rgba(34,197,94,.12)', color: '#22C55E', border: '1px solid rgba(34,197,94,.25)' }}>Joined</span>}
              {isConf   && <span className="tag" style={{ background: 'rgba(61,142,255,.12)', color: '#3D8EFF', border: '1px solid rgba(61,142,255,.25)' }}>Confirmed</span>}
            </div>
          )}
        </div>
      </div>

      {/* Footer — creator */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:12, paddingTop:10, borderTop:'1px solid var(--border)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:26, height:26, borderRadius:8, background:'var(--card2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'var(--lime)', fontFamily:'Syne,sans-serif' }}>
            {creator.name.charAt(0)}
          </div>
          <span style={{ fontSize:12, color:'var(--muted)' }}>{creator.name}</span>
        </div>
        <ReliabilityBadge score={creator.reliabilityScore || 80} size="sm" />
      </div>
    </div>
  );
}
