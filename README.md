# Prompt Quest

An open-source, adaptive game that teaches AI literacy through short, realistic
missions. Players write real prompts, review AI answers for confident-sounding
mistakes, decide what's safe to share, keep AI-assisted writing honest, and learn
when *not* to reach for AI at all.

**[How to write your own mission pack](docs/MISSION_PACK_SCHEMA.md)**

## Why

Most "AI literacy" content is a lecture. Prompt Quest is a loop players actually
practice:

**Ask → Review → Verify → Improve**

Every mission is scored by deterministic rules in plain JavaScript — never by
asking an AI model to grade itself — so the game stays consistent no matter what
a player writes. See [Design notes](#design-notes) below.

## Tracks

The platform currently ships three built-in mission packs (tracks), each
covering the same five-mission arc with age-appropriate scenarios:

| Track | Audience | Missions |
|---|---|---|
| 🧒 Explorers | Ages 7–11 | Plan a birthday party · Spot the silly mistake · Keep it secret or share it · Make my story better · Ask AI or ask a grown-up? |
| 🎓 Teens & Students | Ages 12–18 | Plan a school event · Detect hallucinations · Protect private information · Improve writing ethically · Choose the right tool |
| 🧓 Seniors | Adults & older adults | Plan a family reunion · Check the health tip · Protect yourself from scams · Polish my letter to the editor · Trust AI or call a real person? |

Anyone can write a fourth track (or replace these) as a single JSON file — see
[docs/MISSION_PACK_SCHEMA.md](docs/MISSION_PACK_SCHEMA.md). No code changes
required, and the in-app "Load a different mission pack" panel accepts a
pasted or uploaded JSON file directly for trying one out before contributing it.

## Scoring

Every mission scores against four categories, shown as bars on the hub and the
final certificate:

- **Clarity** — was the prompt specific? (goal, audience, constraints, format...)
- **Accuracy** — did the player verify a claim before trusting it?
- **Safety** — did they protect sensitive information?
- **Judgment** — did they know when (not) to rely on AI?

Badges (Prompt Builder, Fact Checker, Privacy Protector, Bias Detective, AI Team
Lead) are earned per-mission at an 80%+ score and are derived from each mission's
own `badge` field, so any new pack gets badge support automatically.

Completing all five missions in a track unlocks a printable AI Literacy
certificate with a name, score breakdown, and badges earned.

## Design notes

- **No external AI calls.** Everything — the mock "AI responses," the mission
  content, the scoring — runs entirely in the browser from static JSON and pure
  functions. Nothing a player types leaves their machine. This keeps the game
  free to run, safe to fork, and impossible to game by prompting a grading model.
- **Scoring lives in code, not in a model.** See `src/engine/scoring.js` and
  `src/engine/badges.js` — every point awarded traces to an explicit, readable
  rule.
- **Content is data.** `src/data/packs/*.json` are the only files you need to
  touch to add or edit missions; the three mission-type engines
  (`prompt-builder`, `claim-audit`, `classify`) are generic and reused across
  every track.

## Getting started

```bash
npm install
npm run dev
```

```bash
npm run build    # production build to dist/
npm run lint      # oxlint
```

## Project structure

```
src/
  data/packs/       # built-in mission packs (JSON)
  packs/            # pack loading + validation
  engine/           # scoring.js, badges.js — pure, deterministic, no AI calls
  context/          # GameContext — profile, progress, localStorage persistence
  components/       # screens + the 3 mission-type UI components
docs/
  MISSION_PACK_SCHEMA.md   # how to author a new track
```

## Contributing

New mission packs, new mission types, and bug fixes are all welcome — see
[CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
