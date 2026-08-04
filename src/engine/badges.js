// Badges are derived from each mission's own "badge" field in the pack JSON, not
// hardcoded per-pack mission IDs — this is what lets any third-party mission pack
// (see docs/MISSION_PACK_SCHEMA.md) get badge support for free.
const THRESHOLD = 0.8;

function scoreRatio(result) {
  if (!result || !result.maxPoints) return 0;
  return result.points / result.maxPoints;
}

function slugify(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// The full set of badges a given pack can award, in mission order, deduped by label.
export function packBadgeDefs(pack) {
  const seen = new Set();
  const defs = [];
  for (const mission of pack.missions) {
    if (!mission.badge || seen.has(mission.badge)) continue;
    seen.add(mission.badge);
    defs.push({
      id: slugify(mission.badge),
      label: mission.badge,
      description: `Earned by doing well on "${mission.title}".`,
      missionId: mission.id,
    });
  }
  return defs;
}

export function computeBadges({ pack, missionResults }) {
  return packBadgeDefs(pack)
    .filter((def) => scoreRatio(missionResults[def.missionId]) >= THRESHOLD)
    .map(({ id, label, description }) => ({ id, label, description }));
}
