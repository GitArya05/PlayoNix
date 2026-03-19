import { useApp, AppProvider } from './context/AppContext.jsx';
import AuthScreen   from './components/auth/AuthScreen.jsx';
import ProfileSetup from './components/profile/ProfileSetup.jsx';
import HomeScreen   from './screens/HomeScreen.jsx';

function AppInner() {
  const { screen, loading } = useApp();

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)' }}>
      <div className="syne" style={{ fontSize:28, fontWeight:800, letterSpacing:'-.04em', color:'var(--lime)', animation:'blink 1s infinite' }}>PLAYONIX</div>
    </div>
  );

  if (screen === 'auth')          return <AuthScreen />;
  if (screen === 'profile-setup') return <ProfileSetup />;
  return <HomeScreen />;
}

export default function App() {
  return <AppProvider><AppInner /></AppProvider>;
}
