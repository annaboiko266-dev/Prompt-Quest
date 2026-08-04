import { useGame } from "../context/GameContext";
import { BUILTIN_PACKS } from "../packs/loadPack";

export default function Home() {
  const { selectPack, setScreen } = useGame();

  function chooseTrack(pack) {
    selectPack(pack);
    setScreen("profile");
  }

  return (
    <div className="platform">
      <div className="platform-hero">
        <h1>Prompt Quest</h1>
        <p className="tagline">Learn to work with AI — not just prompt it.</p>
        <p className="hero-sub">
          Pick a track below and complete five short missions that teach the loop every
          good AI user follows:
        </p>
        <p className="loop">
          <strong>Ask → Review → Verify → Improve</strong>
        </p>
      </div>

      <div className="track-grid">
        {BUILTIN_PACKS.map((pack) => (
          <button
            key={pack.packId}
            className="track-card"
            style={{ "--track-color": pack.theme?.primary || "#7c3aed" }}
            onClick={() => chooseTrack(pack)}
          >
            <div className="track-emoji">{pack.emoji || "🎮"}</div>
            <div className="track-title">{pack.title}</div>
            <div className="track-audience">{pack.audienceLabel}</div>
            <p className="track-desc">{pack.description}</p>
            <span className="track-cta">Start this quest →</span>
          </button>
        ))}
      </div>

      <p className="fine-print">
        Nothing you enter leaves your browser — this demo uses no external AI calls,
        everything is scored locally by open-source rules. Want to build your own track?
        See <code>docs/MISSION_PACK_SCHEMA.md</code> in the repo.
      </p>
    </div>
  );
}
