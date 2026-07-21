import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import LogoMark from './LogoMark'

/**
 * Opening title sequence — plays once per browser session:
 *   black screen → letterbox bars retract → logo + film-slate line fade up →
 *   the whole card fades out to reveal the site.
 * Skippable by click / any key / scroll. Skipped entirely under prefers-reduced-motion.
 */

const REEL_EASE = [0.16, 1, 0.3, 1] as const

export default function CinematicIntro() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = sessionStorage.getItem('duocap-intro-played')
    if (reduce || seen) return
    setShow(true)
    sessionStorage.setItem('duocap-intro-played', '1')
    // lock scroll during the sequence
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const done = () => setShow(false)
    const timer = window.setTimeout(done, 3600)
    window.addEventListener('keydown', done)
    window.addEventListener('wheel', done, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', done)
      window.removeEventListener('wheel', done)
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    if (!show) document.body.style.overflow = ''
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          onClick={() => setShow(false)}
        >
          {/* Letterbox bars sweeping open from full black */}
          <motion.div
            className="absolute inset-x-0 top-0 bg-black"
            initial={{ height: '50%' }}
            animate={{ height: '14%' }}
            transition={{ duration: 1.4, delay: 0.9, ease: REEL_EASE }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-black"
            initial={{ height: '50%' }}
            animate={{ height: '14%' }}
            transition={{ duration: 1.4, delay: 0.9, ease: REEL_EASE }}
          />

          {/* Title card */}
          <div className="relative flex flex-col items-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.5, ease: REEL_EASE }}
            >
              <LogoMark className="w-14 h-14" />
            </motion.div>

            <motion.div
              className="mt-6 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <motion.p
                className="text-[11px] uppercase tracking-[0.5em] text-white/40"
                initial={{ y: 14 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 1.1, ease: REEL_EASE }}
              >
                Duocap Pictures
              </motion.p>
            </motion.div>

            <motion.h1
              className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.5, ease: REEL_EASE }}
            >
              Any language.{' '}
              <span
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #0B2551 0%, #A4F4FD 45%, #00d2ff 60%, #0B2551 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Instantly yours.
              </span>
            </motion.h1>

            <motion.p
              className="mt-8 text-[10px] uppercase tracking-[0.4em] text-white/25"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.4 }}
            >
              Click anywhere to enter
            </motion.p>
          </div>

          {/* Grain over the intro too, for continuity */}
          <div className="film-grain pointer-events-none absolute inset-0" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
