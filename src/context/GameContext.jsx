import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { scoreMission, mergeCategoryTotals, totalScore, maxTotalScore } from "../engine/scoring";
import { computeBadges } from "../engine/badges";
const STORAGE_KEY = "prompt-quest:v1";
const GameContext = createContext(null);

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const DEFAULT_PROFILE = {
  experience: "",
  interests: "",
  difficulty: "standard",
  name: "",
};

export function GameProvider({ children }) {
  const saved = loadSaved();

  const [screen, setScreen] = useState(saved?.screen || "home");
  const [profile, setProfileState] = useState(saved?.profile || DEFAULT_PROFILE);
  const [pack, setPackState] = useState(saved?.pack || null);
  const [missionIndex, setMissionIndex] = useState(saved?.missionIndex || 0);
  const [missionResults, setMissionResults] = useState(saved?.missionResults || {});

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ screen, profile, pack, missionIndex, missionResults })
    );
  }, [screen, profile, pack, missionIndex, missionResults]);

  const setProfile = useCallback((updates) => {
    setProfileState((prev) => ({ ...prev, ...updates }));
  }, []);

  const selectPack = useCallback((newPack) => {
    setPackState(newPack);
    setMissionIndex(0);
    setMissionResults({});
  }, []);

  const submitMissionAnswer = useCallback(
    (mission, answer) => {
      const result = scoreMission(mission, answer);
      setMissionResults((prev) => ({ ...prev, [mission.id]: result }));
      return result;
    },
    []
  );

  const goToNextMission = useCallback(() => {
    setMissionIndex((i) => Math.min(i + 1, pack.missions.length));
  }, [pack]);

  const resetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setScreen("home");
    setProfileState(DEFAULT_PROFILE);
    setPackState(null);
    setMissionIndex(0);
    setMissionResults({});
  }, []);

  const categoryTotals = useMemo(() => mergeCategoryTotals(missionResults), [missionResults]);
  // Max achievable per category across the whole pack, independent of progress so far.
  const categoryMax = useMemo(() => (pack ? computeCategoryMax(pack) : emptyCategoryMax()), [pack]);

  const badges = useMemo(
    () => (pack ? computeBadges({ pack, missionResults }) : []),
    [pack, missionResults]
  );

  const value = {
    screen,
    setScreen,
    profile,
    setProfile,
    pack,
    selectPack,
    missionIndex,
    setMissionIndex,
    goToNextMission,
    missionResults,
    submitMissionAnswer,
    categoryTotals,
    categoryMax,
    badges,
    totalScore: totalScore(missionResults),
    maxTotalScore: maxTotalScore(missionResults),
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

function emptyCategoryMax() {
  return { clarity: 0, accuracy: 0, safety: 0, judgment: 0 };
}

function computeCategoryMax(pack) {
  const totals = emptyCategoryMax();
  for (const mission of pack.missions) {
    const items = mission.requiredElements || mission.claims || mission.items || [];
    for (const item of items) {
      if (totals[item.category] !== undefined) totals[item.category] += item.points;
    }
  }
  return totals;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
}
