import { useEffect, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import AppleButton from './AppleButton'

const gradientStyle: CSSProperties = {
  backgroundImage:
    'linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  filter: 'url(#c3-noise)',
}

const ease = [0.22, 1, 0.36, 1] as const

const languagePairs = [
  { from: '中文', to: 'English' },
  { from: '日本語', to: 'English' },
  { from: 'Español', to: 'English' },
  { from: 'English', to: '中文' },
  { from: 'Français', to: 'English' },
  { from: 'Deutsch', to: '中文' },
  { from: '한국어', to: 'English' },
  { from: 'Português', to: 'Español' },
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % languagePairs.length), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 md:pt-28 pb-20 text-center flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm"
      >
        <span className="relative inline-flex h-5 w-[5.5rem] items-center justify-end overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={`from-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease }}
              className="absolute font-medium text-white"
            >
              {languagePairs[index].from}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="text-white/40">→</span>
        <span className="relative inline-flex h-5 w-[5.5rem] items-center justify-start overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={`to-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, delay: 0.05, ease }}
              className="absolute font-medium text-white"
            >
              {languagePairs[index].to}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="text-white/40">· 60+ languages</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease }}
        className="text-4xl md:text-7xl font-semibold tracking-tight leading-[0.9]"
      >
        <span className="block">Any language.</span>
        <span className="block animate-shiny" style={gradientStyle}>
          Instantly yours.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease }}
        className="mt-8 text-white/60 max-w-md text-base leading-[1.5]"
      >
        Duocap hears Mandarin, Japanese, Spanish, French — 60+ languages in all — and floats
        clean, AI-corrected captions in the language you read over Zoom, Meet, Teams, or anything
        your Mac can play.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease }}
        className="mt-8 flex flex-col items-center gap-3"
      >
        <AppleButton />
        <span className="text-xs text-white/40">For macOS 15+ · Apple Silicon</span>
      </motion.div>
    </section>
  )
}
