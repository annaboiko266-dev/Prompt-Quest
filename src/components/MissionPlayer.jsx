import { useGame } from "../context/GameContext";
import PromptBuilderMission from "./missions/PromptBuilderMission";
import ClaimAuditMission from "./missions/ClaimAuditMission";
import ClassifyMission from "./missions/ClassifyMission";

const COMPONENTS = {
  "prompt-builder": PromptBuilderMission,
  "claim-audit": ClaimAuditMission,
  classify: ClassifyMission,
};

export default function MissionPlayer() {
  const { pack, missionIndex, setScreen } = useGame();
  const mission = pack.missions[missionIndex];

  if (!mission) {
    setScreen("hub");
    return null;
  }

  const MissionComponent = COMPONENTS[mission.type];
  if (!MissionComponent) {
    return (
      <div className="card">
        <p>Unknown mission type "{mission.type}".</p>
        <button className="secondary" onClick={() => setScreen("hub")}>
          Back to hub
        </button>
      </div>
    );
  }

  return (
    <div className="card mission-player">
      <button className="link-button back-link" onClick={() => setScreen("hub")}>
        ← Back to missions
      </button>
      <MissionComponent mission={mission} />
    </div>
  );
}
