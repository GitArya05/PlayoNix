export const storage = {
  get:    (k)    => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set:    (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) { console.error(e); } },
  delete: (k)    => localStorage.removeItem(k),
};

export const KEYS = { CURRENT_USER: 'px_user', USERS: 'px_users', MATCHES: 'px_matches' };
export const genId = () => 'px_' + Math.random().toString(36).slice(2, 10);
