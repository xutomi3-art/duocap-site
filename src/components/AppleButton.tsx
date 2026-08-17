import { ChevronRight } from 'lucide-react'
import AppleLogo from './AppleLogo'
import { DOWNLOAD_URL, DOWNLOAD_IS_EXTERNAL, DOWNLOAD_FILENAME } from '../downloadConfig'

export default function AppleButton({
  label = 'Download Duocap',
  full = false,
}: {
  label?: string
  full?: boolean
}) {
  return (
    <a
      href={DOWNLOAD_URL}
      {...(DOWNLOAD_IS_EXTERNAL ? { target: '_blank', rel: 'noopener noreferrer' } : { download: DOWNLOAD_FILENAME })}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium text-sm px-5 py-3 transition-all hover:bg-white/90 active:scale-[0.98] ${full ? 'w-full' : ''}`}
    >
      <AppleLogo />
      {label}
      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-[1px]" />
    </a>
  )
}
