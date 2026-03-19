import { createContext, useContext, useState, useEffect } from 'react';
import { storage, KEYS, genId } from '../utils/storage.js';
import { SAMPLE_USERS, SAMPLE_MATCHES } from '../data/sampleData.js';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export function AppProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [users,   setUsers]   = useState({});
  const [matches, setMatches] = useState([]);
  const [screen,  setScreen]  = useState('auth');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const su = storage.get(KEYS.CURRENT_USER);
    const allUsers   = { ...SAMPLE_USERS, ...(storage.get(KEYS.USERS)   || {}) };
    const allMatches = storage.get(KEYS.MATCHES) || SAMPLE_MATCHES;
    setUsers(allUsers);
    setMatches(allMatches);
    if (su && allUsers[su.id]) {
      const fresh = allUsers[su.id];
      setUser(fresh);
      setScreen(fresh.profileComplete ? 'home' : 'profile-setup');
    }
    setLoading(false);
  }, []);

  const seedBase = () => {
    const allUsers = { ...SAMPLE_USERS, ...(storage.get(KEYS.USERS) || {}) };
    storage.set(KEYS.USERS, allUsers);
    setUsers(allUsers);
    if (!storage.get(KEYS.MATCHES)) storage.set(KEYS.MATCHES, SAMPLE_MATCHES);
  };

  const login = (u) => {
    seedBase();
    setUser(u);
    storage.set(KEYS.CURRENT_USER, u);
    setMatches(storage.get(KEYS.MATCHES) || SAMPLE_MATCHES);
    setScreen(u.profileComplete ? 'home' : 'profile-setup');
  };

  const logout = () => { setUser(null); storage.delete(KEYS.CURRENT_USER); setScreen('auth'); };

  const register = ({ name, phone, email }) => {
    const allUsers = storage.get(KEYS.USERS) || {};
    if (Object.values(allUsers).some(u => u.email === email)) return 'Email already registered';
    const id = genId();
    const u  = { id, name, phone, email, sports:[], sportLevels:{}, level:'', reliabilityScore:100, matchesPlayed:0, noShows:0, profileComplete:false };
    allUsers[id] = u;
    storage.set(KEYS.USERS, allUsers);
    seedBase();
    login(u);
    return null;
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    storage.set(KEYS.CURRENT_USER, updated);
    const allUsers = storage.get(KEYS.USERS) || {};
    allUsers[updated.id] = updated;
    storage.set(KEYS.USERS, allUsers);
    setUsers(p => ({ ...p, [updated.id]: updated }));
  };

  const addMatch = (m) => {
    const updated = [m, ...matches];
    setMatches(updated);
    storage.set(KEYS.MATCHES, updated);
  };

  const updateMatch = (m) => {
    const updated = matches.map(x => x.id === m.id ? m : x);
    setMatches(updated);
    storage.set(KEYS.MATCHES, updated);
  };

  return (
    <Ctx.Provider value={{ user, users, matches, screen, loading, setScreen, login, logout, register, updateUser, addMatch, updateMatch }}>
      {children}
    </Ctx.Provider>
  );
}
