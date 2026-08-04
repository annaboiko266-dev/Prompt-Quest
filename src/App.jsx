import { GameProvider, useGame } from "./context/GameContext";
import Home from "./components/Home";
import ProfileSetup from "./components/ProfileSetup";
import MissionHub from "./components/MissionHub";
import MissionPlayer from "./components/MissionPlayer";
import Certificate from "./components/Certificate";
import "./App.css";

const NEEDS_PACK = new Set(["profile", "hub", "mission", "certificate"]);

function Screen() {
  const { screen, pack } = useGame();

  if (NEEDS_PACK.has(screen) && !pack) {
    return <Home />;
  }

  switch (screen) {
    case "profile":
      return <ProfileSetup />;
    case "hub":
      return <MissionHub />;
    case "mission":
      return <MissionPlayer />;
    case "certificate":
      return <Certificate />;
    case "home":
    default:
      return <Home />;
  }
}

function AppShell() {
  const { pack } = useGame();
  const trackColor = pack?.theme?.primary;

  return (
    <div className="app-shell" style={trackColor ? { "--track-color": trackColor } : undefined}>
      <Screen />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppShell />
    </GameProvider>
  );
}
