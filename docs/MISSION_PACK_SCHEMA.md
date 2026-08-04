# Mission pack schema

A **mission pack** is a single JSON file describing a five-ish-mission "track" —
like the built-in Explorers (kids), Teens & Students, or Seniors packs. Anyone can
write one and load it from the "Load a different mission pack" link in the mission
hub, without touching any code.

Scoring is entirely rule-based and lives in [`src/engine/scoring.js`](../src/engine/scoring.js)
and [`src/engine/badges.js`](../src/engine/badges.js) — a pack only supplies *data*
(text, keywords, correct answers, point values). Nothing in a pack can call an AI
model or execute code, which is what makes packs safe to load from a file.

## Top-level shape

```json
{
  "packId": "my-pack",
  "packVersion": "1.0.0",
  "title": "Prompt Quest: My Pack",
  "description": "One sentence describing the track.",
  "author": "Your name",
  "emoji": "🚀",
  "audienceLabel": "Who this track is for",
  "theme": { "primary": "#7c3aed", "secondary": "#06b6d4" },
  "missions": [ /* 1 or more mission objects, see below */ ]
}
```

`packId` must be unique among loaded packs. `emoji`, `audienceLabel`, and `theme`
are optional display metadata used on the track-select cards; everything else is
required.

Every mission needs `id` (unique within the pack), `title`, and `type`. `type`
must be one of the three supported mission types below. A mission may also set
`badge` — a display label (e.g. `"Fact Checker"`) shown on the hub, certificate,
and badge gallery once the player scores at least 80% on that mission. Badge
labels are matched by exact text, so reusing a label across packs (like
`"AI Team Lead"`) is intentional if you want the same badge concept to appear in
multiple tracks.

## Mission type: `prompt-builder`

The player writes a free-text prompt. It's checked against a checklist of
required elements — each with a keyword list — and a small templated "AI
response" reflects back which elements were included. This is a heuristic
keyword match, not real language understanding, so:

- Keep keyword lists specific. A generic word from the mission's own scenario
  (e.g. using "school" as a location keyword in a mission literally about a
  school event) will match almost any prompt and silently give free credit.
- `String.includes()` substring matching is used, so a keyword like `"celebrat"`
  matches "celebrate", "celebrating", and "celebration" for free.

```json
{
  "id": "my-mission",
  "type": "prompt-builder",
  "title": "Mission title",
  "badge": "Prompt Builder",
  "briefing": "Instructions shown to the player.",
  "scenario": "Flavor text shown above the briefing.",
  "placeholder": "Textarea placeholder.",
  "requiredElements": [
    {
      "key": "goal",
      "label": "A clear goal or purpose",
      "hint": "Shown when this element is missing.",
      "points": 20,
      "category": "clarity",
      "keywords": ["goal", "purpose", "so that"]
    }
  ]
}
```

## Mission type: `claim-audit`

The player reviews an AI-authored passage made of individual claims and flags
which ones are unsupported or fabricated. Scoring rewards flagging bad claims
*and* correctly leaving good claims alone.

```json
{
  "id": "my-mission",
  "type": "claim-audit",
  "title": "Mission title",
  "badge": "Fact Checker",
  "briefing": "Instructions shown to the player.",
  "scenario": "Flavor text.",
  "aiResponseIntro": "Here's what the AI said:",
  "claims": [
    {
      "id": "c1",
      "text": "The claim text shown to the player.",
      "supported": true,
      "points": 20,
      "category": "accuracy",
      "explanation": "Shown after submission, whether flagged or not."
    }
  ]
}
```

## Mission type: `classify`

The player sorts each item into one of two labeled buckets.

```json
{
  "id": "my-mission",
  "type": "classify",
  "title": "Mission title",
  "badge": "Privacy Protector",
  "briefing": "Instructions shown to the player.",
  "scenario": "Flavor text.",
  "bucketA": { "key": "share", "label": "Safe to share" },
  "bucketB": { "key": "private", "label": "Keep private" },
  "items": [
    {
      "id": "i1",
      "label": "The item text shown to the player.",
      "correctBucket": "private",
      "points": 20,
      "category": "safety",
      "explanation": "Shown after submission."
    }
  ]
}
```

## Scoring categories

Every scorable element/claim/item declares a `category`, one of:

- `clarity` — was the prompt specific enough?
- `accuracy` — did the player verify claims before trusting them?
- `safety` — did they protect sensitive information?
- `judgment` — did they know when (not) to rely on AI?

These four totals drive the score bars on the mission hub and certificate. A
mission's items don't all need to share one category — mixing is fine — but the
four-category framing is what keeps different packs comparable to each other.

## Validating a pack

[`src/packs/schema.js`](../src/packs/schema.js) does structural validation (right
fields, right types, known mission types) whenever a pack is uploaded or pasted
in the UI. It intentionally does **not** validate keyword quality, point-total
balance, or content tone — that's a design/writing concern, not a schema concern.
Aim for each mission's points to sum to a round number (100 is used throughout
the built-in packs) so scores stay easy to reason about across packs.

## Adding a new mission type

The three types above cover checklist-style prompting, fact-checking, and
sorting/classification — which is enough to express a wide range of AI-literacy
lessons without new code. If you genuinely need a new interaction shape:

1. Add a `score<YourType>(mission, answer)` function to `src/engine/scoring.js`.
2. Add the type to `SUPPORTED_MISSION_TYPES` and a `validate<YourType>` check in
   `src/packs/schema.js`.
3. Add a component in `src/components/missions/` and register it in
   `src/components/MissionPlayer.jsx`.

Please open a pull request rather than forking silently — new mission types are
exactly the kind of contribution this project wants to collect in one place.
