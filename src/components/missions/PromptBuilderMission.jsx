import { useState } from "react";
import { useGame } from "../../context/GameContext";
import { IconCheck, IconCircle } from "../icons";
import InfoNote from "../InfoNote";
import Celebration from "../Celebration";
import AnimatedNumber from "../AnimatedNumber";
import { useCelebration } from "../../hooks/useCelebration";

export default function PromptBuilderMission({ mission }) {
  const { submitMissionAnswer, setScreen } = useGame();
  const [promptText, setPromptText] = useState("");
  const [result, setResult] = useState(null);
  const [editing, setEditing] = useState(true);
  const [fillIns, setFillIns] = useState({});
  const celebrating = useCelebration(result);

  function score(text) {
    const r = submitMissionAnswer(mission, text);
    setResult(r);
    return r;
  }

  function handleSubmit(e) {
    e.preventDefault();
    score(promptText);
    setEditing(false);
  }

  function mergedPrompt() {
    const additions = Object.values(fillIns)
      .map((v) => v.trim())
      .filter(Boolean);
    if (additions.length === 0) return promptText;
    const joined = additions.join(". ");
    return `${promptText.trim()} ${joined}${joined.endsWith(".") ? "" : "."}`;
  }

  function handleAddDetails() {
    const next = mergedPrompt();
    setPromptText(next);
    setFillIns({});
    score(next);
  }

  function handleRevise() {
    setPromptText(mergedPrompt());
    setFillIns({});
    setEditing(true);
  }

  return (
    <div>
      <Celebration active={celebrating} />
      <h2>{mission.title}</h2>
      <InfoNote>{mission.learningGoal}</InfoNote>
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
            Clarity score: <strong><AnimatedNumber value={result.points} /></strong> / {result.maxPoints}
          </div>

          <div className="checklist">
            {result.found.length > 0 && (
              <div className="checklist-group checklist-good">
                <h4>Your prompt included:</h4>
                <ul>
                  {result.found.map((el) => (
                    <li key={el.key}>
                      <IconCheck /> {el.label} <span className="pts">+{el.points}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.missing.length > 0 && (
              <div className="checklist-group checklist-missing">
                <h4>Missing — add a detail to improve your score:</h4>
                <ul>
                  {result.missing.map((el) => (
                    <li key={el.key}>
                      <IconCircle /> {el.label}
                      <div className="hint">{el.hint}</div>
                      <input
                        type="text"
                        className="fill-in"
                        value={fillIns[el.key] || ""}
                        onChange={(e) =>
                          setFillIns((prev) => ({ ...prev, [el.key]: e.target.value }))
                        }
                        placeholder={`Add: ${el.label.toLowerCase()}`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mission-actions">
            {result.missing.length > 0 && (
              <>
                <button
                  className="primary"
                  onClick={handleAddDetails}
                  disabled={Object.values(fillIns).every((v) => !v.trim())}
                >
                  Add details &amp; resend
                </button>
                <button className="secondary" onClick={handleRevise}>
                  Edit full prompt
                </button>
              </>
            )}
            <button
              className={result.missing.length > 0 ? "secondary" : "primary"}
              onClick={() => setScreen("hub")}
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
}
