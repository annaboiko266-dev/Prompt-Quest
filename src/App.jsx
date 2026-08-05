import { GameProvider, useGame } from "./context/GameContext";
import AppHeader from "./components/AppHeader";
import Home from "./components/Home";
import ProfileSetup from "./components/ProfileSetup";
import MissionHub from "./components/MissionHub";
import MissionPlayer from "./components/MissionPlayer";
import Certificate from "./components/Certificate";
import Snowfall from "./components/Snowfall";
import Aurora from "./components/Aurora";
import "./App.css";

const NEEDS_PACK = new Set(["profile", "hub", "mission", "certificate"]);

const AMBIENT_EFFECTS = {
  snow: Snowfall,
  aurora: Aurora,
};

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

function AppRoot() {
  const { screen, pack } = useGame();
  const trackColor = pack?.theme?.primary;

  const activeEffects = new Set(pack?.ambientEffect ? [].concat(pack.ambientEffect) : []);
  if (screen === "home") activeEffects.add("snow");

  return (
    <div className="app-root" style={trackColor ? { "--track-color": trackColor } : undefined}>
      {[...activeEffects].map((name) => {
        const Effect = AMBIENT_EFFECTS[name];
        return Effect ? <Effect key={name} /> : null;
      })}
      <AppHeader />
      <div className="app-shell">
        <Screen />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppRoot />
    </GameProvider>
  );
}
