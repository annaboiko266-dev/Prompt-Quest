import { useState } from "react";
import { useGame } from "../context/GameContext";
import PackLoader from "./PackLoader";

export default function MissionHub() {
  const { pack, missionResults, setMissionIndex, setScreen, totalScore, maxTotalScore, badges } =
    useGame();
  const [showLoader, setShowLoader] = useState(false);

  const completedCount = pack.missions.filter((m) => missionResults[m.id]).length;
  const allDone = completedCount === pack.missions.length;

  function playMission(index) {
    setMissionIndex(index);
    setScreen("mission");
  }

  return (
    <div className="card hub">
      <div className="hub-header">
        <h2>{pack.title}</h2>
        <span className="score-chip">
          {totalScore} / {maxTotalScore} pts
        </span>
      </div>
      <p className="pack-desc">{pack.description}</p>

      <ol className="mission-list">
        {pack.missions.map((mission, i) => {
          const result = missionResults[mission.id];
          return (
            <li key={mission.id} className={result ? "mission-done" : ""}>
              <div className="mission-list-text">
                <strong>{mission.title}</strong>
                {result && (
                  <span className="mission-score">
                    {result.points}/{result.maxPoints} pts
                  </span>
                )}
              </div>
              <button className="secondary" onClick={() => playMission(i)}>
                {result ? "Replay" : "Play"}
              </button>
            </li>
          );
        })}
      </ol>

      {badges.length > 0 && (
        <div className="badge-preview">
          <h3>Badges earned so far</h3>
          <div className="badge-row">
            {badges.map((b) => (
              <span key={b.id} className="badge-pill" title={b.description}>
                🏅 {b.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {allDone && (
        <button className="primary" onClick={() => setScreen("certificate")}>
          View your certificate
        </button>
      )}

      <div className="hub-footer">
        <button className="link-button" onClick={() => setShowLoader((s) => !s)}>
          {showLoader ? "Hide" : "Load a different mission pack"}
        </button>
      </div>

      {showLoader && <PackLoader onDone={() => setShowLoader(false)} />}
    </div>
  );
}
