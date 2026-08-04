import { useState } from "react";
import { useGame } from "../../context/GameContext";

export default function PromptBuilderMission({ mission }) {
  const { submitMissionAnswer, setScreen } = useGame();
  const [promptText, setPromptText] = useState("");
  const [result, setResult] = useState(null);
  const [editing, setEditing] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const r = submitMissionAnswer(mission, promptText);
    setResult(r);
    setEditing(false);
  }

  function handleRevise() {
    setEditing(true);
  }

  return (
    <div>
      <h2>{mission.title}</h2>
      <p className="scenario">{mission.scenario}</p>
      <p>{mission.briefing}</p>

      {editing ? (
        <form onSubmit={handleSubmit} className="prompt-form">
          <textarea
            rows={6}
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder={mission.placeholder}
            required
          />
          <button className="primary" type="submit">
            Send to AI
          </button>
        </form>
      ) : (
        <>
          <div className="mock-response">
            <div className="mock-response-label">AI response:</div>
            <pre>{result.mockResponse}</pre>
          </div>

          <div className="score-summary">
            Clarity score: <strong>{result.points}</strong> / {result.maxPoints}
          </div>

          <div className="checklist">
            {result.found.length > 0 && (
              <div className="checklist-group checklist-good">
                <h4>Your prompt included:</h4>
                <ul>
                  {result.found.map((el) => (
                    <li key={el.key}>
                      ✅ {el.label} <span className="pts">+{el.points}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.missing.length > 0 && (
              <div className="checklist-group checklist-missing">
                <h4>Missing — would improve the result:</h4>
                <ul>
                  {result.missing.map((el) => (
                    <li key={el.key}>
                      ⬜ {el.label}
                      <div className="hint">{el.hint}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mission-actions">
            {result.missing.length > 0 && (
              <button className="secondary" onClick={handleRevise}>
                Revise &amp; resend prompt
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
