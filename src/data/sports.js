export const SPORTS = [
  { id: 'cricket',     name: 'Cricket',      emoji: '🏏', defaultPlayers: 11 },
  { id: 'football',    name: 'Football',     emoji: '⚽', defaultPlayers: 10 },
  { id: 'basketball',  name: 'Basketball',   emoji: '🏀', defaultPlayers: 10 },
  { id: 'tennis',      name: 'Tennis',       emoji: '🎾', defaultPlayers: 2  },
  { id: 'badminton',   name: 'Badminton',    emoji: '🏸', defaultPlayers: 4  },
  { id: 'volleyball',  name: 'Volleyball',   emoji: '🏐', defaultPlayers: 12 },
  { id: 'kabaddi',     name: 'Kabaddi',      emoji: '🤼', defaultPlayers: 14 },
  { id: 'tabletennis', name: 'Table Tennis', emoji: '🏓', defaultPlayers: 4  },
  { id: 'yoga',        name: 'Yoga',         emoji: '🧘', defaultPlayers: 1  },
];

export const LEVELS = ['Beginner', 'Intermediate', 'Pro'];

export const LEVEL_DESCRIPTIONS = {
  Beginner:     'Just getting started, learning the basics',
  Intermediate: 'Know the game, play regularly',
  Pro:          'Experienced and competitive',
};

// Compact icon shown on chips — small enough not to crowd the UI
export const LEVEL_ICON = { Beginner: '🌱', Intermediate: '⚡', Pro: '🔥' };
export const LEVEL_COLOR= { Beginner: '#3D8EFF', Intermediate: '#C8F135', Pro: '#FF6B35' };

export const getSport = (id) =>
  SPORTS.find((s) => s.id === id) || { name: id, emoji: '🏅', defaultPlayers: 10 };
