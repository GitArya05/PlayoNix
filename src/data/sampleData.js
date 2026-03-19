const t = () => Date.now();

export const SAMPLE_USERS = {
  u_arjun: { id:'u_arjun', name:'Arjun Sharma', phone:'9876543210', email:'arjun@test.com', sports:['cricket','football'], sportLevels:{cricket:'Pro',football:'Intermediate'}, level:'Intermediate', reliabilityScore:87, matchesPlayed:23, noShows:3, profileComplete:true },
  u_priya: { id:'u_priya', name:'Priya Patel',  phone:'9123456789', email:'priya@test.com', sports:['football','badminton'], sportLevels:{football:'Beginner',badminton:'Intermediate'}, level:'Beginner', reliabilityScore:95, matchesPlayed:12, noShows:1, profileComplete:true },
  u_rahul: { id:'u_rahul', name:'Rahul Mehta',  phone:'9988776655', email:'rahul@test.com', sports:['badminton','tennis'], sportLevels:{badminton:'Pro',tennis:'Pro'}, level:'Pro', reliabilityScore:72, matchesPlayed:45, noShows:8, profileComplete:true },
  u_meera: { id:'u_meera', name:'Meera Joshi',  phone:'9800112233', email:'meera@test.com', sports:['volleyball','kabaddi'], sportLevels:{volleyball:'Intermediate',kabaddi:'Beginner'}, level:'Intermediate', reliabilityScore:91, matchesPlayed:18, noShows:2, profileComplete:true },
};

export const SAMPLE_MATCHES = [
  { id:'m_001', sport:'cricket',     location:'Malegaon City Ground',    time:t()+7_200_000,  playersNeeded:11, joinedPlayers:['u_arjun','u_priya'], createdBy:'u_arjun', status:'open',  confirmedPlayers:[],          checkedInPlayers:[], createdAt:t()-300_000  },
  { id:'m_002', sport:'football',    location:'City Park Ground, Sec 3', time:t()+14_400_000, playersNeeded:10, joinedPlayers:['u_priya'],            createdBy:'u_priya', status:'open',  confirmedPlayers:[],          checkedInPlayers:[], createdAt:t()-600_000  },
  { id:'m_003', sport:'badminton',   location:'Sports Complex',          time:t()+21_600_000, playersNeeded:4,  joinedPlayers:['u_rahul','u_meera','u_arjun','u_priya'], createdBy:'u_rahul', status:'full', confirmedPlayers:['u_rahul'], checkedInPlayers:[], createdAt:t()-900_000  },
  { id:'m_004', sport:'volleyball',  location:'Nehru Park Ground',       time:t()+3_600_000,  playersNeeded:12, joinedPlayers:['u_meera','u_rahul'], createdBy:'u_meera', status:'open',  confirmedPlayers:[],          checkedInPlayers:[], createdAt:t()-1_200_000},
  { id:'m_005', sport:'basketball',  location:'YMCA Court',              time:t()+86_400_000, playersNeeded:10, joinedPlayers:['u_priya','u_rahul'], createdBy:'u_priya', status:'open',  confirmedPlayers:[],          checkedInPlayers:[], createdAt:t()-1_800_000},
];
