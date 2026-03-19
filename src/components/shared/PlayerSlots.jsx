export default function PlayerSlots({ match }) {
  const { playersNeeded, joinedPlayers, confirmedPlayers = [] } = match;
  return (
    <div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:8 }}>
        {Array.from({ length: playersNeeded }).map((_, i) => {
          const filled = i < joinedPlayers.length;
          const conf   = i < confirmedPlayers.length;
          return (
            <div key={i} style={{
              width:24, height:24, borderRadius:6,
              background: filled ? (conf ? 'rgba(34,197,94,.2)' : 'rgba(200,241,53,.15)') : 'var(--border)',
              border: `1.5px solid ${filled ? (conf ? '#22C55E' : 'var(--lime)') : 'var(--dim)'}`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:10, color: filled ? (conf ? '#22C55E' : 'var(--lime)') : 'transparent',
            }}>
              {filled ? '•' : ''}
            </div>
          );
        })}
      </div>
      <div style={{ display:'flex', gap:14, fontSize:12, color:'var(--muted)' }}>
        <span style={{ display:'flex', alignItems:'center', gap:5 }}>
          <span style={{ width:10, height:10, borderRadius:2, background:'rgba(200,241,53,.15)', border:'1.5px solid var(--lime)', display:'inline-block' }} />
          Joined ({joinedPlayers.length})
        </span>
        <span style={{ display:'flex', alignItems:'center', gap:5 }}>
          <span style={{ width:10, height:10, borderRadius:2, background:'rgba(34,197,94,.2)', border:'1.5px solid #22C55E', display:'inline-block' }} />
          Confirmed ({confirmedPlayers.length})
        </span>
      </div>
    </div>
  );
}
