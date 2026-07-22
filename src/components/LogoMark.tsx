/** Duocap logo mark for dark surfaces: the caption-bar glyph from the app icon,
 *  rendered pure white on a transparent background (user 2026-07-22 — the full-color
 *  rounded-square icon clashed with the site's palette; favicon keeps the color icon). */
export default function LogoMark({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="#fff" className={className} aria-label="Duocap">
      {/* top caption bar */}
      <rect x="52" y="92" width="152" height="30" rx="15" />
      {/* bottom caption bar + speaker dot */}
      <rect x="52" y="138" width="96" height="30" rx="15" />
      <circle cx="182" cy="153" r="15" />
    </svg>
  )
}
