// Deterministic, rule-based scoring. This file intentionally contains no AI calls —
// the game's scores must stay consistent and explainable no matter what an AI model returns.

export const CATEGORIES = ["clarity", "accuracy", "safety", "judgment"];

function emptyCategoryTotals() {
  return { clarity: 0, accuracy: 0, safety: 0, judgment: 0 };
}

function matchesKeyword(promptText, keyword) {
  if (keyword === "$") return promptText.includes("$");
  return promptText.includes(keyword.toLowerCase());
}

// Mission type: "prompt-builder"
// The player writes a free-text prompt. We check it against a checklist of
// required elements (each with its own keyword list) rather than calling an AI
// to judge it, so scoring is deterministic and reproducible.
export function scorePromptBuilder(mission, promptText) {
  const text = (promptText || "").toLowerCase();
  const categoryTotals = emptyCategoryTotals();
  const found = [];
  const missing = [];

  for (const el of mission.requiredElements) {
    const hit = el.keywords.some((kw) => matchesKeyword(text, kw));
    if (hit) {
      categoryTotals[el.category] = (categoryTotals[el.category] || 0) + el.points;
      found.push(el);
    } else {
      missing.push(el);
    }
  }

  const maxPoints = mission.requiredElements.reduce((sum, el) => sum + el.points, 0);
  const points = found.reduce((sum, el) => sum + el.points, 0);

  return {
    missionId: mission.id,
    points,
    maxPoints,
    categoryTotals,
    found,
    missing,
    mockResponse: buildMockPlanResponse(mission, found, missing),
  };
}

// Generates a templated "AI response" whose quality visibly reflects which
// checklist elements the player's prompt included. No API call, no cost, no latency.
function buildMockPlanResponse(mission, found, missing) {
  const foundKeys = new Set(found.map((el) => el.key));
  const lines = [];

  if (foundKeys.has("goal")) {
    lines.push("Here's a plan built around your stated goal.");
  } else {
    lines.push("Here's a generic event plan (you didn't tell me the goal, so I'm guessing).");
  }
  if (foundKeys.has("audience")) lines.push("- Tailored for the audience you described.");
  if (foundKeys.has("budget")) lines.push("- Kept within the budget you gave me.");
  if (foundKeys.has("date")) lines.push("- Scheduled around the date/timeframe you gave me.");
  if (foundKeys.has("location")) lines.push("- Set at the location you specified.");
  if (foundKeys.has("constraints")) lines.push("- Respecting the constraints you listed.");
  if (foundKeys.has("format")) {
    lines.push("- Delivered in the format you requested.");
  } else {
    lines.push("- Delivered as a generic paragraph, since you didn't ask for a specific format.");
  }

  if (missing.length > 0) {
    lines.push("");
    lines.push(
      `(A more detailed prompt — especially including ${missing
        .slice(0, 2)
        .map((m) => m.label.toLowerCase())
        .join(" and ")} — would get you a much more useful plan.)`
    );
  }

  return lines.join("\n");
}

// Mission type: "claim-audit"
// The player reviews an AI-authored text and selects which claim IDs are
// unsupported/fabricated. Scoring rewards correctly flagging bad claims AND
// correctly leaving supported claims alone (no over-flagging).
export function scoreClaimAudit(mission, selectedClaimIds) {
  const selected = new Set(selectedClaimIds || []);
  const categoryTotals = emptyCategoryTotals();
  const results = [];
  let points = 0;
  let maxPoints = 0;

  for (const claim of mission.claims) {
    const shouldFlag = claim.supported === false;
    const wasFlagged = selected.has(claim.id);
    const correct = shouldFlag === wasFlagged;
    maxPoints += claim.points;
    if (correct) {
      points += claim.points;
      categoryTotals[claim.category] = (categoryTotals[claim.category] || 0) + claim.points;
    }
    results.push({ ...claim, wasFlagged, correct });
  }

  return { missionId: mission.id, points, maxPoints, categoryTotals, results };
}

// Mission type: "classify"
// The player sorts each item into bucketA or bucketB. assignments is a map of
// itemId -> bucketKey.
export function scoreClassify(mission, assignments) {
  const categoryTotals = emptyCategoryTotals();
  const results = [];
  let points = 0;
  let maxPoints = 0;

  for (const item of mission.items) {
    const chosen = assignments?.[item.id];
    const correct = chosen === item.correctBucket;
    maxPoints += item.points;
    if (correct) {
      points += item.points;
      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.points;
    }
    results.push({ ...item, chosen, correct });
  }

  return { missionId: mission.id, points, maxPoints, categoryTotals, results };
}

export function scoreMission(mission, answer) {
  switch (mission.type) {
    case "prompt-builder":
      return scorePromptBuilder(mission, answer);
    case "claim-audit":
      return scoreClaimAudit(mission, answer);
    case "classify":
      return scoreClassify(mission, answer);
    default:
      throw new Error(`Unknown mission type: ${mission.type}`);
  }
}

export function mergeCategoryTotals(resultsById) {
  const totals = emptyCategoryTotals();
  for (const result of Object.values(resultsById)) {
    if (!result) continue;
    for (const cat of CATEGORIES) {
      totals[cat] += result.categoryTotals[cat] || 0;
    }
  }
  return totals;
}

export function totalScore(resultsById) {
  return Object.values(resultsById).reduce((sum, r) => sum + (r ? r.points : 0), 0);
}

export function maxTotalScore(resultsById) {
  return Object.values(resultsById).reduce((sum, r) => sum + (r ? r.maxPoints : 0), 0);
}
