type IconProps = {
  className?: string;
};

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.8,
  viewBox: "0 0 24 24",
};

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Menu({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function X({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function MessageCircle({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.7 8.7 0 0 1-3.6-.8L4 20l1.2-3.8A7.4 7.4 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />
      <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" />
    </svg>
  );
}

export function Brain({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="M9 4.5A3 3 0 0 0 6 7.5v.3a3.5 3.5 0 0 0-1 6.5 3.5 3.5 0 0 0 4 5.2V4.5ZM15 4.5a3 3 0 0 1 3 3v.3a3.5 3.5 0 0 1 1 6.5 3.5 3.5 0 0 1-4 5.2V4.5ZM9 9h6M9 14h6M12 4v16" />
    </svg>
  );
}

export function Flame({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="M12.5 21a6.5 6.5 0 0 0 6.5-6.5c0-3.2-2.1-5.6-4.5-7.5.1 2.1-1.1 3.5-2.2 4.2.1-3.6-1.8-6.1-4-8.2.2 3.8-4.3 6.3-4.3 11.5A6.5 6.5 0 0 0 10.5 21h2Z" />
    </svg>
  );
}

export function Clock({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.5 1.5" />
    </svg>
  );
}

export function Filter({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

export function Sparkles({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="m12 3 1.2 4.8L18 9l-4.8 1.2L12 15l-1.2-4.8L6 9l4.8-1.2L12 3ZM19 15l.6 2.4L22 18l-2.4.6L19 21l-.6-2.4L16 18l2.4-.6L19 15Z" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   APP / DASHBOARD ICONS
───────────────────────────────────────── */

export function DashboardIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  );
}

export function BuildingIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="M4 20V6l8-3 8 3v14" />
      <path d="M8 20v-3h8v3M8 8h1M15 8h1M8 12h1M15 12h1" />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 4 5" />
    </svg>
  );
}

export function BarChartIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="M5 20V10M12 20V4M19 20v-7" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function SettingsIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.1h-2.6V20a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.6-1H6v-2.6h.4A1.7 1.7 0 0 0 8 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.1H15V5a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v2.6H21a1.7 1.7 0 0 0-1.6 1.4Z" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}