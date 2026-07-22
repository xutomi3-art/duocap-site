/** The real Duocap app icon (blue rounded square with caption bars) — synced from
 *  design/Duocap.iconset in the app repo. Replaces the old abstract SVG mark so the
 *  site and the shipped app share one identity (user 2026-07-22). */
export default function LogoMark({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <img
      src="/app-icon.png"
      srcSet="/app-icon.png 1x, /app-icon-512.png 2x"
      alt="Duocap"
      className={className}
      draggable={false}
    />
  )
}
