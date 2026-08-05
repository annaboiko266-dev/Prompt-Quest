import { useState } from "react";
import { IconInfo } from "./icons";

export default function InfoNote({ children }) {
  const [open, setOpen] = useState(false);

  if (!children) return null;

  return (
    <div className="info-note">
      <button
        type="button"
        className="info-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <IconInfo size={15} />
        What this teaches
      </button>
      {open && <div className="info-panel">{children}</div>}
    </div>
  );
}
