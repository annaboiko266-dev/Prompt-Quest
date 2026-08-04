// Lightweight structural validation for mission packs — intentionally not a full
// JSON Schema library so packs stay easy to hand-author. See docs/MISSION_PACK_SCHEMA.md.

export const SUPPORTED_MISSION_TYPES = ["prompt-builder", "claim-audit", "classify"];

function fail(errors, msg) {
  errors.push(msg);
}

function validatePromptBuilder(mission, errors) {
  if (!Array.isArray(mission.requiredElements) || mission.requiredElements.length === 0) {
    fail(errors, `Mission "${mission.id}": prompt-builder missions need a non-empty requiredElements array.`);
    return;
  }
  mission.requiredElements.forEach((el, i) => {
    if (!el.key || !el.label || typeof el.points !== "number" || !Array.isArray(el.keywords)) {
      fail(errors, `Mission "${mission.id}": requiredElements[${i}] is missing key/label/points/keywords.`);
    }
  });
}

function validateClaimAudit(mission, errors) {
  if (!Array.isArray(mission.claims) || mission.claims.length === 0) {
    fail(errors, `Mission "${mission.id}": claim-audit missions need a non-empty claims array.`);
    return;
  }
  mission.claims.forEach((c, i) => {
    if (!c.id || typeof c.text !== "string" || typeof c.supported !== "boolean" || typeof c.points !== "number") {
      fail(errors, `Mission "${mission.id}": claims[${i}] is missing id/text/supported/points.`);
    }
  });
}

function validateClassify(mission, errors) {
  if (!mission.bucketA?.key || !mission.bucketB?.key) {
    fail(errors, `Mission "${mission.id}": classify missions need bucketA.key and bucketB.key.`);
  }
  if (!Array.isArray(mission.items) || mission.items.length === 0) {
    fail(errors, `Mission "${mission.id}": classify missions need a non-empty items array.`);
    return;
  }
  mission.items.forEach((it, i) => {
    if (!it.id || !it.label || !it.correctBucket || typeof it.points !== "number") {
      fail(errors, `Mission "${mission.id}": items[${i}] is missing id/label/correctBucket/points.`);
    }
  });
}

export function validatePack(pack) {
  const errors = [];

  if (!pack || typeof pack !== "object") {
    return { valid: false, errors: ["Pack is not a JSON object."] };
  }
  if (!pack.packId || !pack.title) {
    fail(errors, "Pack is missing packId or title.");
  }
  if (!Array.isArray(pack.missions) || pack.missions.length === 0) {
    fail(errors, "Pack must include a non-empty missions array.");
    return { valid: errors.length === 0, errors };
  }

  const seenIds = new Set();
  for (const mission of pack.missions) {
    if (!mission.id || !mission.title || !mission.type) {
      fail(errors, `Every mission needs an id, title, and type. Offending mission: ${JSON.stringify(mission).slice(0, 80)}...`);
      continue;
    }
    if (seenIds.has(mission.id)) {
      fail(errors, `Duplicate mission id "${mission.id}".`);
    }
    seenIds.add(mission.id);

    if (!SUPPORTED_MISSION_TYPES.includes(mission.type)) {
      fail(errors, `Mission "${mission.id}" has unsupported type "${mission.type}". Supported types: ${SUPPORTED_MISSION_TYPES.join(", ")}.`);
      continue;
    }

    if (mission.type === "prompt-builder") validatePromptBuilder(mission, errors);
    if (mission.type === "claim-audit") validateClaimAudit(mission, errors);
    if (mission.type === "classify") validateClassify(mission, errors);
  }

  return { valid: errors.length === 0, errors };
}
