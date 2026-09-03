import { ChevronRight } from 'lucide-react'
import { WIN_DOWNLOAD_URL, WIN_DOWNLOAD_FILENAME } from '../downloadConfig'

/** Windows logo — the four-pane mark, drawn to match AppleLogo's weight next to it. */
function WindowsLogo() {
  return (
    <svg viewBox="0 0 16 16" className="w-[14px] h-[14px]" fill="currentColor" aria-hidden="true">
      <path d="M0 2.3 6.5 1.4v6.1H0V2.3Zm7.3-1L16 0v7.4H7.3V1.3ZM0 8.3h6.5v6.2L0 13.6V8.3Zm7.3 0H16V16l-8.7-1.2V8.3Z" />
    </svg>
  )
}

/** SECONDARY download affordance (2026-09-03). Deliberately outlined, not the white pill —
 *  macOS is the shipping product and keeps the primary CTA; Windows is a labelled test build
 *  (see WIN_NOTE in downloadConfig) and must not look equally finished. */
export default function WindowsButton({
  label = 'Download for Windows',
  full = false,
}: {
  label?: string
  full?: boolean
}) {
  return (
    <a
      href={WIN_DOWNLOAD_URL}
      download={WIN_DOWNLOAD_FILENAME}
      className={`group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 text-white/80 font-medium text-sm px-5 py-3 transition-colors hover:bg-white/5 hover:text-white ${full ? 'w-full' : ''}`}
    >
      <WindowsLogo />
      {label}
      <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-white/60">
        Beta
      </span>
      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-[1px]" />
    </a>
  )
}
