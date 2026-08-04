import { useState } from "react";
import { useGame } from "../../context/GameContext";

export default function ClaimAuditMission({ mission }) {
  const { submitMissionAnswer, setScreen } = useGame();
  const [flagged, setFlagged] = useState(new Set());
  const [result, setResult] = useState(null);

  function toggle(claimId) {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(claimId)) {
        next.delete(claimId);
      } else {
        next.add(claimId);
      }
      return next;
    });
  }

  function handleSubmit() {
    const r = submitMissionAnswer(mission, Array.from(flagged));
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

      <div className="mock-response">
        <div className="mock-response-label">{mission.aiResponseIntro}</div>
        <ul className="claim-list">
          {mission.claims.map((claim) => {
            const reviewed = result?.results.find((c) => c.id === claim.id);
            return (
              <li key={claim.id} className={reviewed ? (reviewed.correct ? "claim-correct" : "claim-incorrect") : ""}>
                <label className="claim-item">
                  <input
                    type="checkbox"
                    checked={flagged.has(claim.id)}
                    disabled={!!result}
                    onChange={() => toggle(claim.id)}
                  />
                  <span>{claim.text}</span>
                </label>
                {reviewed && (
                  <div className="claim-feedback">
                    {reviewed.correct ? "✅" : "❌"}{" "}
                    {reviewed.supported ? "Supported claim." : "Unsupported claim."}{" "}
                    {reviewed.explanation}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {!result ? (
        <button className="primary" onClick={handleSubmit}>
          Submit review
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
