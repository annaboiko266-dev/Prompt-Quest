// Small hand-authored line-icon set (no external icon library dependency).
// Every icon is stroke-based and uses currentColor so it inherits text/accent color.

function Svg({ size, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function IconRocket({ size = 22, ...rest }) {
  return (
    <Svg size={size} {...rest}>
      <path d="M12 2.5c2.8 1.6 4.5 4.6 4.5 8.5 0 2-.5 3.8-1.4 5.3L12 19l-3.1-2.7C8 14.8 7.5 13 7.5 11c0-3.9 1.7-6.9 4.5-8.5Z" />
      <circle cx="12" cy="10.5" r="1.7" />
      <path d="M8.3 15.5 5.8 17c-.6.35-1 1-1 1.7v1.8l1.9-.9c.6-.3 1.1-.8 1.3-1.4l.6-1.9" />
      <path d="M15.7 15.5 18.2 17c.6.35 1 1 1 1.7v1.8l-1.9-.9c-.6-.3-1.1-.8-1.3-1.4l-.6-1.9" />
      <path d="M10.5 19.5c0 1-.5 1.8-1.2 2.2" />
      <path d="M13.5 19.5c0 1 .5 1.8 1.2 2.2" />
    </Svg>
  );
}

export function IconGraduationCap({ size = 22, ...rest }) {
  return (
    <Svg size={size} {...rest}>
      <path d="M2.5 9.5 12 5l9.5 4.5L12 14 2.5 9.5Z" />
      <path d="M6.5 11.6v4c0 1.1 2.5 2.4 5.5 2.4s5.5-1.3 5.5-2.4v-4" />
      <path d="M21.5 9.5v5.5" />
    </Svg>
  );
}

export function IconShield({ size = 22, ...rest }) {
  return (
    <Svg size={size} {...rest}>
      <path d="M12 2.8 19.5 5.5v5.6c0 4.6-3.1 8.3-7.5 10.1-4.4-1.8-7.5-5.5-7.5-10.1V5.5L12 2.8Z" />
      <path d="M8.7 12.1l2.1 2.1 4.3-4.4" />
    </Svg>
  );
}

export function IconCompass({ size = 22, ...rest }) {
  return (
    <Svg size={size} {...rest}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M15.3 8.7 13.4 13.4 8.7 15.3 10.6 10.6 15.3 8.7Z" />
    </Svg>
  );
}

export function IconSparkles({ size = 22, ...rest }) {
  return (
    <Svg size={size} {...rest}>
      <path d="M11.2 3.5 12.4 7 15.9 8.2 12.4 9.4 11.2 12.9 10 9.4 6.5 8.2 10 7 11.2 3.5Z" />
      <path d="M18 13l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z" />
    </Svg>
  );
}

const TRACK_ICONS = {
  rocket: IconRocket,
  graduationCap: IconGraduationCap,
  shield: IconShield,
  compass: IconCompass,
  sparkles: IconSparkles,
};

export function TrackIcon({ name, size = 22, ...rest }) {
  const Cmp = TRACK_ICONS[name] || IconCompass;
  return <Cmp size={size} {...rest} />;
}

export function IconCheck({ size = 16, ...rest }) {
  return (
    <Svg size={size} strokeWidth="2.4" {...rest}>
      <path d="M4 12.5 9 17.5 20 6.5" />
    </Svg>
  );
}

export function IconX({ size = 16, ...rest }) {
  return (
    <Svg size={size} strokeWidth="2.4" {...rest}>
      <path d="M5.5 5.5 18.5 18.5" />
      <path d="M18.5 5.5 5.5 18.5" />
    </Svg>
  );
}

export function IconCircle({ size = 16, ...rest }) {
  return (
    <Svg size={size} {...rest}>
      <circle cx="12" cy="12" r="8.5" />
    </Svg>
  );
}

export function IconLock({ size = 18, ...rest }) {
  return (
    <Svg size={size} {...rest}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
      <path d="M7.5 10.5V7.8a4.5 4.5 0 0 1 9 0v2.7" />
    </Svg>
  );
}

export function IconAward({ size = 18, ...rest }) {
  return (
    <Svg size={size} {...rest}>
      <circle cx="12" cy="8.5" r="5.5" />
      <path d="M9 13.2 7.3 21l4.7-2.6 4.7 2.6-1.7-7.8" />
    </Svg>
  );
}

export function IconInfo({ size = 16, ...rest }) {
  return (
    <Svg size={size} {...rest}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M12 11v6" />
      <circle cx="12" cy="7.8" r="0.15" fill="currentColor" stroke="currentColor" strokeWidth="2.4" />
    </Svg>
  );
}
