import { useGame } from "../context/GameContext";
import Logo from "./Logo";
import { TrackIcon } from "./icons";

export default function AppHeader() {
  const { screen, setScreen, pack } = useGame();

  return (
    <header className="app-header">
      <button className="brand" onClick={() => setScreen("home")}>
        <Logo size={28} />
        <span>Prompt Quest</span>
      </button>
      {pack && screen !== "home" && (
        <div className="app-header-track" style={{ "--track-color": pack.theme?.primary || "#3b82f6" }}>
          <TrackIcon name={pack.icon} size={16} />
          {pack.title}
        </div>
      )}
    </header>
  );
}
