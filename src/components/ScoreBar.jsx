const LABELS = {
  clarity: "Clarity",
  accuracy: "Accuracy",
  safety: "Safety",
  judgment: "Judgment",
};

export default function ScoreBar({ categoryTotals, categoryMax }) {
  return (
    <div className="score-bar-group">
      {Object.keys(LABELS).map((cat) => {
        const total = categoryTotals[cat] || 0;
        const max = categoryMax[cat] || 0;
        const pct = max > 0 ? Math.round((total / max) * 100) : 0;
        return (
          <div className="score-bar-row" key={cat}>
            <div className="score-bar-label">
              <span>{LABELS[cat]}</span>
              <span>
                {total}/{max}
              </span>
            </div>
            <div className="score-bar-track">
              <div className={`score-bar-fill score-bar-${cat}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
