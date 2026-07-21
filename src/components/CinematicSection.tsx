import type { ReactNode } from 'react'
import { motion } from 'motion/react'

/**
 * A section that "cuts in" as it scrolls into frame: a slow, deliberate rise + fade +
 * de-blur on a cinematic ease. Wraps existing sections without changing their internals.
 */
export default function CinematicSection({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
