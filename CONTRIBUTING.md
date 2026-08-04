# Contributing to Prompt Quest

Thanks for considering a contribution! The easiest and most valuable way to
contribute is a new mission pack — no code required.

## Contributing a mission pack

1. Read [docs/MISSION_PACK_SCHEMA.md](docs/MISSION_PACK_SCHEMA.md).
2. Write your pack as a single JSON file. Try it out locally by pasting or
   uploading it via "Load a different mission pack" on the mission hub — no
   build step needed to preview it.
3. Add it to `src/data/packs/` and register it in `src/packs/loadPack.js`
   (`BUILTIN_PACKS`).
4. Open a pull request. Please include:
   - What audience/scenario the pack is for and why it's distinct from the
     existing tracks.
   - Confirmation that you playtested all five missions and the point totals
     per mission sum to something sane (100 is the convention).

Keep mission content honest about AI's real limitations — the whole point of
this project is teaching people not to over-trust AI output, so packs should
model that, not undermine it (e.g. a `claim-audit` mission's "supported" claims
should genuinely not need a citation, and its fabricated claim should be a
clear, teachable example of an AI making something up with false confidence).

## Contributing code

- Keep changes minimal and focused — see the root `CLAUDE.md` if one exists in
  your checkout for any repo-specific conventions.
- Scoring must stay deterministic and free of any external API calls. If a
  change makes score depend on network state, randomness, or a model call, it
  will be rejected regardless of how it's implemented.
- Run `npm run lint` and `npm run build` before opening a PR.
- New mission *types* (beyond `prompt-builder`, `claim-audit`, `classify`) are
  welcome but should be proposed via an issue first, since they touch the
  scoring engine, the schema validator, and the pack schema docs together.

## Reporting issues

Open a GitHub issue with steps to reproduce. For scoring bugs, include the
exact pack ID, mission ID, and the input that produced an unexpected score —
scoring is deterministic, so this should always be reproducible.
