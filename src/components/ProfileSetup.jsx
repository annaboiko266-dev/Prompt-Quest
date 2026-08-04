import { useState } from "react";
import { useGame } from "../context/GameContext";

const EXPERIENCE_LEVELS = ["Never used AI", "Used it a little", "Use it regularly", "Power user"];
const DIFFICULTIES = ["gentle", "standard", "challenge"];

export default function ProfileSetup() {
  const { profile, setProfile, setScreen, pack } = useGame();
  const [local, setLocal] = useState(profile);

  function update(key, value) {
    setLocal((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setProfile(local);
    setScreen("hub");
  }

  return (
    <div className="card">
      <button className="link-button back-link" onClick={() => setScreen("home")}>
        ← Choose a different track
      </button>
      <div className="track-chip" style={{ "--track-color": pack.theme?.primary || "#7c3aed" }}>
        {pack.emoji} {pack.title}
      </div>
      <h2>Before we start</h2>
      <p>
        This helps flavor the missions to you. It doesn't change how they're scored —
        <em> the rules stay the same for everyone.</em>
      </p>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>
          What should we call you? <span className="optional">(optional, shown on your certificate)</span>
          <input
            type="text"
            value={local.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
          />
        </label>

        <label>
          Experience with AI tools
          <select
            required
            value={local.experience}
            onChange={(e) => update("experience", e.target.value)}
          >
            <option value="" disabled>
              Choose one
            </option>
            {EXPERIENCE_LEVELS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>

        <label>
          What are you interested in? <span className="optional">(optional)</span>
          <input
            type="text"
            value={local.interests}
            onChange={(e) => update("interests", e.target.value)}
            placeholder="e.g. science, business, art, sports..."
          />
        </label>

        <fieldset>
          <legend>Difficulty</legend>
          <div className="difficulty-options">
            {DIFFICULTIES.map((d) => (
              <label key={d} className={`pill ${local.difficulty === d ? "pill-selected" : ""}`}>
                <input
                  type="radio"
                  name="difficulty"
                  value={d}
                  checked={local.difficulty === d}
                  onChange={() => update("difficulty", d)}
                />
                {d}
              </label>
            ))}
          </div>
        </fieldset>

        <button className="primary" type="submit">
          Continue to missions
        </button>
      </form>
    </div>
  );
}
