// src/utils/api.js

// Replace this URL with your friend's backend server URL when it's ready.
const BASE_URL = 'http://localhost:5000/api';

export const api = {
    // --- MATCHES ---
    getMatches: async () => {
        const res = await fetch(`${BASE_URL}/matches`);
        if (!res.ok) throw new Error('Failed to fetch matches');
        return res.json();
    },

    createMatch: async (matchData) => {
        const res = await fetch(`${BASE_URL}/matches`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(matchData)
        });
        if (!res.ok) throw new Error('Failed to create match');
        return res.json();
    },

    updateMatch: async (matchId, updates) => {
        const res = await fetch(`${BASE_URL}/matches/${matchId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        return res.json();
    },

    // --- USERS & AUTH ---
    getUsers: async () => {
        const res = await fetch(`${BASE_URL}/users`);
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
    },

    register: async (userData) => {
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!res.ok) throw new Error('Registration failed');
        return res.json();
    },

    login: async (credentials) => {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!res.ok) throw new Error('Login failed');
        return res.json();
    }
};