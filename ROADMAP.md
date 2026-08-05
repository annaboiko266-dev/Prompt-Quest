# Roadmap

## Community pack gallery (planned)

Today, sharing a mission pack means contributing it to the repo (see
[CONTRIBUTING.md](CONTRIBUTING.md)) or loading a JSON file locally via the
"Load a different mission pack" panel — nothing gets published anywhere else.

The planned next step is a **live community gallery**: anyone can publish a
pack from the app itself, and it instantly becomes playable by every other
visitor, with no GitHub or code review required.

### Planned design

- **Backend:** Supabase (Postgres). A `mission_packs` table storing the
  submitted pack JSON plus display metadata (title, author, emoji, theme,
  created_at, a `status` column for lightweight moderation).
- **Read:** public, unauthenticated — anyone can list and play published
  packs.
- **Write:** public, unauthenticated submission, but validated server-side
  (not just in the browser) via a Postgres trigger that re-runs the same
  structural checks as `src/packs/schema.js`, plus basic limits (payload
  size, title/description length) to keep the table sane.
- **Frontend:** a "Community" browsing screen alongside the built-in tracks
  on the home page, and a "Publish to community" action added to the
  existing `PackLoader` upload flow once a pack passes local validation.
- **No auth for v1** — low friction is the point, but that means anyone can
  publish anything within the schema constraints. A `status` column is
  there from day one so a moderation/hide mechanism can be added without a
  schema change later.

### Why this isn't built yet

It requires provisioning real cloud infrastructure (a Supabase project) and
making an explicit decision about hosting/ownership — that's a deliberate,
separate step from the rest of this app, which currently runs entirely
client-side with no external calls. Building it is scoped and ready to pick
up; it just needs someone to say "go."
