import { useRef, useState } from "react";
import { useGame } from "../context/GameContext";
import { BUILTIN_PACKS, parsePackFromText } from "../packs/loadPack";

export default function PackLoader({ onDone }) {
  const { pack, selectPack } = useGame();
  const [error, setError] = useState(null);
  const [jsonText, setJsonText] = useState("");
  const fileInputRef = useRef(null);

  function tryLoad(text) {
    try {
      const parsed = parsePackFromText(text);
      selectPack(parsed);
      setError(null);
      onDone?.();
    } catch (e) {
      setError(e.message);
    }
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => tryLoad(String(reader.result));
    reader.readAsText(file);
  }

  return (
    <div className="pack-loader">
      <h3>Mission packs</h3>
      <p>
        Prompt Quest is open source — anyone can author a new set of missions as a JSON
        file and share it. See <code>docs/MISSION_PACK_SCHEMA.md</code> in the repo.
      </p>
      <p className="coming-soon">
        <span className="coming-soon-chip">Coming soon</span> a community gallery where
        you can publish your pack here and others can play it instantly, no GitHub
        required. For now, packs are shared by contributing them to the repo (see{" "}
        <code>CONTRIBUTING.md</code>) or by loading the file below.
      </p>

      <div className="builtin-packs">
        {BUILTIN_PACKS.map((p) => (
          <button
            key={p.packId}
            className={`secondary ${p.packId === pack.packId ? "pill-selected" : ""}`}
            onClick={() => {
              selectPack(p);
              onDone?.();
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="upload-row">
        <button className="secondary" onClick={() => fileInputRef.current?.click()}>
          Upload pack JSON file
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          onChange={handleFile}
          style={{ display: "none" }}
        />
      </div>

      <details>
        <summary>Or paste pack JSON directly</summary>
        <textarea
          rows={6}
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder='{"packId": "...", "title": "...", "missions": [...]}'
        />
        <button className="secondary" onClick={() => tryLoad(jsonText)}>
          Load pasted pack
        </button>
      </details>

      {error && <pre className="error-box">{error}</pre>}
    </div>
  );
}
