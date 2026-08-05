import { packBadgeDefs } from "../engine/badges";
import { IconAward, IconLock } from "./icons";

export default function BadgeList({ pack, earnedBadges }) {
  const earnedIds = new Set(earnedBadges.map((b) => b.id));
  const allBadges = packBadgeDefs(pack);

  return (
    <div className="badge-grid">
      {allBadges.map((b) => {
        const earned = earnedIds.has(b.id);
        return (
          <div key={b.id} className={`badge-card ${earned ? "badge-earned" : "badge-locked"}`}>
            <div className="badge-icon">{earned ? <IconAward size={26} /> : <IconLock size={26} />}</div>
            <div className="badge-name">{b.label}</div>
            <div className="badge-desc">{b.description}</div>
          </div>
        );
      })}
    </div>
  );
}
