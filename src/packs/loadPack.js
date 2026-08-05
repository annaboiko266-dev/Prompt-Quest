import { validatePack } from "./schema";
import kids from "../data/packs/kids.json";
import teens from "../data/packs/teens.json";
import seniors from "../data/packs/seniors.json";
import alaska from "../data/packs/alaska.json";

export const BUILTIN_PACKS = [kids, teens, seniors, alaska];

export function getBuiltinPack(packId) {
  return BUILTIN_PACKS.find((p) => p.packId === packId) || BUILTIN_PACKS[0];
}

// Parses and validates a pack from raw JSON text (e.g. an uploaded/pasted file).
// Throws with a human-readable message on failure so the UI can surface it directly.
export function parsePackFromText(jsonText) {
  let pack;
  try {
    pack = JSON.parse(jsonText);
  } catch (e) {
    throw new Error(`That file isn't valid JSON: ${e.message}`);
  }
  const { valid, errors } = validatePack(pack);
  if (!valid) {
    throw new Error(`Mission pack failed validation:\n- ${errors.join("\n- ")}`);
  }
  return pack;
}
