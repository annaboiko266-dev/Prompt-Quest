import { useState } from "react";
import { useGame } from "../../context/GameContext";

export default function ClassifyMission({ mission }) {
  const { submitMissionAnswer, setScreen } = useGame();
  const [assignments, setAssignments] = useState({});
  const [result, setResult] = useState(null);

  const allAssigned = mission.items.every((item) => assignments[item.id]);

  function assign(itemId, bucketKey) {
    setAssignments((prev) => ({ ...prev, [itemId]: bucketKey }));
  }

  function handleSubmit() {
    const r = submitMissionAnswer(mission, assignments);
    setResult(r);
  }

  function handleRetry() {
    setResult(null);
  }

  return (
    <div>
      <h2>{mission.title}</h2>
      <p className="scenario">{mission.scenario}</p>
      <p>{mission.briefing}</p>

      <ul className="classify-list">
        {mission.items.map((item) => {
          const reviewed = result?.results.find((r) => r.id === item.id);
          return (
            <li key={item.id} className={reviewed ? (reviewed.correct ? "claim-correct" : "claim-incorrect") : ""}>
              <div className="classify-label">{item.label}</div>
              <div className="classify-buckets">
                <button
                  type="button"
                  className={`bucket-btn ${assignments[item.id] === mission.bucketA.key ? "bucket-selected" : ""}`}
                  disabled={!!result}
                  onClick={() => assign(item.id, mission.bucketA.key)}
                >
                  {mission.bucketA.label}
                </button>
                <button
                  type="button"
                  className={`bucket-btn ${assignments[item.id] === mission.bucketB.key ? "bucket-selected" : ""}`}
                  disabled={!!result}
                  onClick={() => assign(item.id, mission.bucketB.key)}
                >
                  {mission.bucketB.label}
                </button>
              </div>
              {reviewed && (
                <div className="claim-feedback">
                  {reviewed.correct ? "✅" : "❌"} {reviewed.explanation}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {!result ? (
        <button className="primary" onClick={handleSubmit} disabled={!allAssigned}>
          Submit
        </button>
      ) : (
        <>
          <div className="score-summary">
            Score: <strong>{result.points}</strong> / {result.maxPoints}
          </div>
          <div className="mission-actions">
            {result.points < result.maxPoints && (
              <button className="secondary" onClick={handleRetry}>
                Try again
              </button>
            )}
            <button className="primary" onClick={() => setScreen("hub")}>
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
}
