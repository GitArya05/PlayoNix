import { useState } from 'react';
import { useApp }   from '../../context/AppContext.jsx';
import { storage, KEYS } from '../../utils/storage.js';
import { SAMPLE_USERS, SAMPLE_MATCHES } from '../../data/sampleData.js';

export default function AuthScreen() {
  const { login, register } = useApp();
  const [mode,    setMode]    = useState('login');
  const [form,    setForm]    = useState({ name:'', phone:'', email:'', password:'' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const f = (key) => ({ value: form[key], onChange: (e) => setForm(p => ({ ...p, [key]: e.target.value })) });

  const submit = () => {
    setError('');
    if (mode === 'register' && (!form.name || !form.phone || !form.email)) { setError('Please fill all fields'); return; }
    if (!form.email) { setError('Enter your email'); return; }
    setLoading(true);
    setTimeout(() => {
      if (mode === 'register') {
        const err = register({ name: form.name, phone: form.phone, email: form.email });
        if (err) { setError(err); setLoading(false); }
      } else {
        const all   = { ...SAMPLE_USERS, ...(storage.get(KEYS.USERS) || {}) };
        const found = Object.values(all).find(u => u.email === form.email);
        if (found) { if (!storage.get(KEYS.MATCHES)) storage.set(KEYS.MATCHES, SAMPLE_MATCHES); login(found); }
        else { setError('No account found — register first'); setLoading(false); }
      }
    }, 600);
  };

  const tryDemo = () => {
    let all = storage.get(KEYS.USERS) || {};
    const id = 'demo_user';
    if (!all[id]) all[id] = { id, name:'Raj Kapoor', phone:'9876543210', email:'demo@playonix.app', sports:['cricket','football','badminton'], sportLevels:{cricket:'Pro',football:'Intermediate',badminton:'Beginner'}, level:'Intermediate', reliabilityScore:88, matchesPlayed:14, noShows:2, profileComplete:true };
    Object.entries(SAMPLE_USERS).forEach(([k,v]) => { if (!all[k]) all[k] = v; });
    storage.set(KEYS.USERS, all);
    if (!storage.get(KEYS.MATCHES)) storage.set(KEYS.MATCHES, SAMPLE_MATCHES);
    login(all[id]);
  };

  return (
    <div className="auth-root">
      <div className="auth-card">

        {/* Logo */}
        <div style={{ marginBottom: 40 }}>
          <h1 className="syne" style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-.05em', color: 'var(--lime)', lineHeight: 1 }}>
            PLAYONIX
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 6 }}>
            Real-time sports matching for nearby players
          </p>
        </div>

        {/* Mode toggle */}
        <div style={{ display:'flex', background:'var(--card)', borderRadius:11, padding:4, marginBottom:24 }}>
          {['login','register'].map(m => (
            <button key={m} onClick={() => setMode(m)} className="syne"
              style={{ flex:1, padding:'10px', borderRadius:8, fontWeight:700, fontSize:12, border:'none', cursor:'pointer', transition:'all .2s', textTransform:'uppercase', letterSpacing:'.06em', background: mode===m ? 'var(--lime)' : 'transparent', color: mode===m ? '#07090F' : 'var(--muted)' }}>
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {mode === 'register' && <>
            <input className="input" placeholder="Full name" {...f('name')} />
            <input className="input" placeholder="Phone number" type="tel" {...f('phone')} />
          </>}
          <input className="input" placeholder="Email address" type="email" {...f('email')} />
          <input className="input" placeholder="Password" type="password" {...f('password')} />

          {error && <p style={{ color:'var(--danger)', fontSize:13, textAlign:'center' }}>{error}</p>}

          <button className="btn btn-lime" style={{ padding:'14px', fontSize:15, marginTop:4, opacity: loading ? .6 : 1 }} onClick={submit} disabled={loading}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div className="divider" style={{ flex:1 }} />
            <span style={{ fontSize:12, color:'var(--muted)' }}>or</span>
            <div className="divider" style={{ flex:1 }} />
          </div>

          <button className="btn btn-ghost" style={{ padding:'13px', fontSize:14 }} onClick={tryDemo}>
            Continue with Demo
          </button>
        </div>
      </div>
    </div>
  );
}
