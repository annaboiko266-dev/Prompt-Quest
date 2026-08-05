import { useGame } from "../context/GameContext";
import { BUILTIN_PACKS } from "../packs/loadPack";
import Logo from "./Logo";
import { TrackIcon } from "./icons";

export default function Home() {
  const { selectPack, setScreen } = useGame();

  function chooseTrack(pack) {
    selectPack(pack);
    setScreen("profile");
  }

  return (
    <div className="platform">
      <div className="platform-hero">
        <div className="logo-mark">
          <Logo size={56} />
        </div>
        <h1>Prompt Quest</h1>
        <p className="tagline">Learn to work with AI — not just prompt it.</p>
        <p className="hero-sub">
          Reading about good prompting doesn't make it stick — writing real prompts,
          watching them fail, and fixing them does. Prompt Quest teaches AI literacy the
          same way you'd teach anyone a hands-on skill: through short, realistic missions
          with a real task, an AI response, and immediate feedback on what to fix.
        </p>
        <p className="loop">
          <strong>Ask → Review → Verify → Improve</strong>
        </p>
      </div>

      <div className="how-it-works">
        <h2>How a mission works</h2>
        <div className="how-grid">
          <div className="how-step">
            <div className="how-num">1</div>
            <div className="how-title">Ask</div>
            <p>
              You get a realistic scenario — plan an event, polish a résumé, decide what's
              safe to share — and write the actual prompt you'd send an AI.
            </p>
          </div>
          <div className="how-step">
            <div className="how-num">2</div>
            <div className="how-title">Review</div>
            <p>
              The game shows you what a response like that would actually get you, and
              scores your prompt against what a genuinely good one needs.
            </p>
          </div>
          <div className="how-step">
            <div className="how-num">3</div>
            <div className="how-title">Verify</div>
            <p>
              In other missions, you're the one reviewing — catching a confident-sounding
              claim an AI made up, or a detail it invented that was never true.
            </p>
          </div>
          <div className="how-step">
            <div className="how-num">4</div>
            <div className="how-title">Improve</div>
            <p>
              You revise and resend, see the score change, and walk away having actually
              practiced the skill — not just read about it.
            </p>
          </div>
        </div>
        <p className="how-scoring">
          Every mission scores four skills — <strong>Clarity</strong>,{" "}
          <strong>Accuracy</strong>, <strong>Safety</strong>, and{" "}
          <strong>Judgment</strong> — using plain, transparent rules in code, not an AI
          grading itself. Finish every mission in a track to earn badges and a
          certificate.
        </p>
      </div>

      <h2 className="track-grid-heading">Pick a track to start</h2>
      <div className="track-grid">
        {BUILTIN_PACKS.map((pack) => (
          <button
            key={pack.packId}
            className="track-card"
            style={{ "--track-color": pack.theme?.primary || "#3b82f6" }}
            onClick={() => chooseTrack(pack)}
          >
            <div className="track-icon">
              <TrackIcon name={pack.icon} size={30} />
            </div>
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
