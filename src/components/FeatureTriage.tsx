import { motion } from 'motion/react'
import SectionEyebrow from './SectionEyebrow'

const chips = ['60+ languages', 'AI error correction', 'Instant minutes', 'One-click export']

const groups = [
  {
    name: 'Captions',
    count: 128,
    color: '#ffffff',
    items: ['"…public beta in about two weeks."', '"…公开测试版将在两周内上线。"'],
  },
  {
    name: 'Corrections',
    count: 23,
    color: '#e5e5e5',
    items: ['"defy" → "Dify" (vocabulary)', '"road map" → "roadmap"'],
  },
  {
    name: 'Minutes',
    count: 3,
    color: '#a3a3a3',
    items: ['Roadmap sync — 3 decisions', 'Interview — 2 action items'],
  },
  {
    name: 'Archived',
    count: 13,
    color: '#525252',
    items: ['Old sessions · Auto-cleanup'],
  },
]

export default function FeatureTriage() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionEyebrow label="Live Translate" tag="AI-native" />
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
            Understand anyone
            <br />
            in real time.
          </h2>
          <p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md">
            Duocap listens to both sides of the conversation, understands intent, and turns speech
            in 60+ languages into clean, corrected captions. Focus on the conversation — the
            transcript writes itself.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="liquid-glass rounded-2xl p-5"
        >
          <div className="text-xs text-white/50">Today · 42 minutes captioned</div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {groups.map((g) => (
              <div key={g.name} className="liquid-glass rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: g.color }} />
                    {g.name}
                  </span>
                  <span className="text-[11px] text-white/40">{g.count}</span>
                </div>
                <ul className="mt-2.5 space-y-1.5">
                  {g.items.map((item) => (
                    <li key={item} className="text-[11px] text-white/55 leading-[1.4] truncate">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
