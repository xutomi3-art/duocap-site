/**
 * Persistent cinematic overlays that sit above the content but never intercept input:
 *   · letterbox bars (top & bottom) — the single strongest "this is a movie" signal
 *   · vignette — darkened corners pull the eye to center, like a projected frame
 *   · film grain — animated 24-ish fps noise so the whole page has moving texture
 * All fixed, pointer-events-none, and disabled under prefers-reduced-motion (grain only).
 */
export default function FilmOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden="true">
      {/* Letterbox bars */}
      <div className="film-letterbox film-letterbox--top" />
      <div className="film-letterbox film-letterbox--bottom" />
      {/* Vignette */}
      <div className="film-vignette" />
      {/* Moving grain */}
      <div className="film-grain" />
    </div>
  )
}
