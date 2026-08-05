export default function Logo({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pq-logo-grad" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="#0a0c13" stroke="url(#pq-logo-grad)" strokeWidth="2" />
      <path
        d="M12.5 13.5L18.7 20L12.5 26.5"
        stroke="url(#pq-logo-grad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="21" y="24.3" width="7.5" height="3.2" rx="1.6" fill="url(#pq-logo-grad)" />
      <path
        d="M28.5 9.5l1.15 2.85 2.85 1.15-2.85 1.15-1.15 2.85-1.15-2.85-2.85-1.15 2.85-1.15z"
        fill="url(#pq-logo-grad)"
      />
    </svg>
  );
}
