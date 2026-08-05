import { useEffect, useMemo, useState } from "react";
import { useGame } from "../context/GameContext";
import { BUILTIN_PACKS } from "../packs/loadPack";
import { scoreMission } from "../engine/scoring";
import Logo from "./Logo";
import { TrackIcon, IconCheck, IconCircle } from "./icons";
import Celebration from "./Celebration";

const DEMO_MISSION = BUILTIN_PACKS.find((p) => p.packId === "kids").missions.find(
  (m) => m.id === "birthday-party"
);
const DEMO_BEFORE_PROMPT = "Help me plan a birthday party.";
const DEMO_AFTER_PROMPT =
  "Help me plan my daughter's birthday party for 12 friends and family, with a $150 budget, this Saturday, in our backyard, no nuts allowed for allergies, and give me a checklist.";

export default function Home() {
  const { selectPack, setScreen } = useGame();
  const [demoActive, setDemoActive] = useState(false);

  const demoBefore = useMemo(() => scoreMission(DEMO_MISSION, DEMO_BEFORE_PROMPT), []);
  const demoAfter = useMemo(() => scoreMission(DEMO_MISSION, DEMO_AFTER_PROMPT), []);

  function chooseTrack(pack) {
    selectPack(pack);
    setScreen("profile");
  }

  function playDemo() {
    setDemoActive(false);
    requestAnimationFrame(() => setDemoActive(true));
  }

  useEffect(() => {
    const start = setTimeout(playDemo, 700);
    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    if (!demoActive) return;
    const stop = setTimeout(() => setDemoActive(false), 2800);
    return () => clearTimeout(stop);
  }, [demoActive]);

  return (
    <div className="platform">
      <div className="platform-hero">
        <div className="logo-mark">
          <Logo size={56} />
        </div>
        <h1>Prompt Quest</h1>
        <p className="tagline">An AI-powered game platform that teaches you to prompt.</p>
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

      <div className="showcase">
        <Celebration active={demoActive} />
        <h2>Watch a prompt go from weak to a perfect score</h2>
        <p className="showcase-sub">
          Real output from the actual scoring engine — same mission, same rules you'll play.
        </p>
        <div className="showcase-compare">
          <div className="showcase-attempt">
            <div className="showcase-attempt-label">First try</div>
            <p className="showcase-prompt-text">&ldquo;{DEMO_BEFORE_PROMPT}&rdquo;</p>
            <div className="score-summary showcase-score-weak">
              Clarity score: <strong>{demoBefore.points}</strong> / {demoBefore.maxPoints}
            </div>
            <ul className="showcase-mini-list">
              {DEMO_MISSION.requiredElements.map((el) => {
                const hit = demoBefore.found.includes(el);
                return (
                  <li key={el.key} className={hit ? "hit" : "miss"}>
                    {hit ? <IconCheck /> : <IconCircle />} {el.label}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="showcase-arrow" aria-hidden="true">
            →
          </div>

          <div className="showcase-attempt">
            <div className="showcase-attempt-label">After fixing it</div>
            <p className="showcase-prompt-text">&ldquo;{DEMO_AFTER_PROMPT}&rdquo;</p>
            <div className="score-summary showcase-score-perfect">
              Clarity score: <strong>{demoAfter.points}</strong> / {demoAfter.maxPoints}
            </div>
            <ul className="showcase-mini-list">
              {DEMO_MISSION.requiredElements.map((el) => {
                const hit = demoAfter.found.includes(el);
                return (
                  <li key={el.key} className={hit ? "hit" : "miss"}>
                    {hit ? <IconCheck /> : <IconCircle />} {el.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <button className="secondary" onClick={playDemo}>
          Replay the celebration
        </button>
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
