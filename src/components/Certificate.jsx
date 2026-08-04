import { useGame } from "../context/GameContext";
import ScoreBar from "./ScoreBar";
import BadgeList from "./BadgeList";

function ratingFor(pct) {
  if (pct >= 90) return "AI Literacy: Expert";
  if (pct >= 75) return "AI Literacy: Proficient";
  if (pct >= 50) return "AI Literacy: Developing";
  return "AI Literacy: Getting Started";
}

export default function Certificate() {
  const { profile, pack, categoryTotals, categoryMax, badges, totalScore, maxTotalScore, resetGame, setScreen } =
    useGame();

  const pct = maxTotalScore > 0 ? Math.round((totalScore / maxTotalScore) * 100) : 0;
  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card">
      <div className="certificate" id="certificate">
        <div className="certificate-inner">
          <div className="certificate-kicker">Prompt Quest</div>
          <h1>Certificate of AI Literacy</h1>
          <p className="certificate-name">{profile.name || "Prompt Quest Player"}</p>
          <p className="certificate-rating">{ratingFor(pct)}</p>
          <p className="certificate-score">
            {totalScore} / {maxTotalScore} points ({pct}%) — {pack.title}
          </p>

          <ScoreBar categoryTotals={categoryTotals} categoryMax={categoryMax} />

          {badges.length > 0 && (
            <div className="certificate-badges">
              {badges.map((b) => (
                <span key={b.id} className="badge-pill">
                  🏅 {b.label}
                </span>
              ))}
            </div>
          )}

          <p className="certificate-date">Completed {today}</p>
        </div>
      </div>

      <div className="no-print">
        <h3>All badges</h3>
        <BadgeList pack={pack} earnedBadges={badges} />

        <div className="mission-actions">
          <button className="primary" onClick={() => window.print()}>
            Print / save as PDF
          </button>
          <button className="secondary" onClick={() => setScreen("hub")}>
            Back to missions
          </button>
          <button className="link-button" onClick={resetGame}>
            Start over
          </button>
        </div>
      </div>
    </div>
  );
}
