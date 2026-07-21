import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MessageSquare,
  Mic,
  MonitorUp,
  Pause,
  PhoneOff,
  Play,
  Radio,
  ThumbsUp,
  Users,
  Video,
  Volume2,
} from 'lucide-react'

type Translation = { code: string; text: string }

/* ---------------- shared floating caption panel ---------------- */

/** One caption "cue": the English line on top (primary), everything else below. */
type Cue = { primary: string; secondary: Translation[] }

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Streams a cue in line-by-line like a live caption: types the English line, then each
 * translation, holds, and calls onDone so the panel can advance to the next cue and loop.
 */
function TypedCue({ cue, onDone }: { cue: Cue; onDone: () => void }) {
  const [n, setN] = useState(0) // chars of the English line typed so far
  const [revealed, setRevealed] = useState(false) // all translations shown together

  const done = n >= cue.primary.length

  // Type the English line, character by character.
  useEffect(() => {
    setN(0)
    setRevealed(false)
    if (prefersReduced()) {
      setN(cue.primary.length)
      return
    }
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setN(i)
      if (i >= cue.primary.length) window.clearInterval(id)
    }, 34)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cue])

  // Once English finishes, drop ALL translations in together after a short beat,
  // then hold and advance to the next cue.
  useEffect(() => {
    if (!done) return
    const reveal = window.setTimeout(() => setRevealed(true), prefersReduced() ? 0 : 200)
    const next = window.setTimeout(onDone, 1900)
    return () => {
      window.clearTimeout(reveal)
      window.clearTimeout(next)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, cue])

  return (
    <>
      <p className="text-[13px] md:text-[15px] font-semibold leading-snug text-white min-h-[1.4em]">
        {cue.primary.slice(0, n)}
        {!done && (
          <span
            className="ml-0.5 inline-block w-[2px] align-middle bg-[#00d2ff] animate-pulse"
            style={{ height: '0.9em' }}
          />
        )}
      </p>
      <motion.div
        className="mt-2 space-y-1.5"
        initial={false}
        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 6 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {cue.secondary.map((t) => (
          <div key={t.code} className="flex items-start gap-2.5">
            <span className="mt-[3px] shrink-0 rounded px-1.5 py-[1px] text-[9px] font-medium tracking-wide text-white/45 bg-white/[0.06]">
              {t.code}
            </span>
            <p className="text-[12px] md:text-[13px] leading-snug text-white/55">{t.text}</p>
          </div>
        ))}
      </motion.div>
    </>
  )
}

function CaptionPanel({
  cues,
  elapsed,
}: {
  cues: Cue[]
  elapsed: string
}) {
  const [idx, setIdx] = useState(0)
  const advance = () => setIdx((i) => (i + 1) % cues.length)

  return (
    <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 w-[min(94%,660px)]">
      <div className="rounded-xl bg-black/75 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60 px-4 pt-3 pb-2.5">
        <div className="flex items-center justify-between text-[10px] text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
            Duocap · Live
          </span>
          <span>{elapsed}</span>
        </div>

        {/* Reserved height keeps the carousel from jumping while lines type in. */}
        <div className="mt-2 min-h-[7.5rem] md:min-h-[8rem]">
          <TypedCue key={idx} cue={cues[idx]} onDone={advance} />
        </div>
      </div>
    </div>
  )
}

/* ---------------- window chrome ---------------- */

function Window({ title, badge, children }: { title: string; badge?: ReactNode; children: ReactNode }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl">
      <div className="relative flex items-center h-10 px-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 text-xs text-white/50 truncate max-w-[60%]">
          {title}
        </span>
        <span className="ml-auto hidden sm:block">{badge}</span>
      </div>
      {children}
    </div>
  )
}

/* ---------------- scene 1 · video meeting ---------------- */

const participants = [
  { name: 'Sarah Lin', initials: 'SL', gradient: 'from-[#3b82f6] to-[#1e3a8a]', speaking: true },
  { name: 'Marcus Kim', initials: 'MK', gradient: 'from-[#10b981] to-[#064e3b]' },
  { name: 'Julia Torres', initials: 'JT', gradient: 'from-[#a855f7] to-[#4c1d95]' },
  { name: 'Alex Rivera', initials: 'AR', gradient: 'from-[#f59e0b] to-[#78350f]' },
]

function MeetingScene() {
  return (
    <Window
      title="Quarterly roadmap sync — Meeting"
      badge={
        <span className="flex items-center gap-1.5 text-[10px] text-white/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e5484d] animate-pulse" />
          REC 42:18
        </span>
      }
    >
      <div className="relative h-[460px] md:h-[520px] bg-[#101318]">
        <div className="absolute inset-0 grid grid-cols-2 gap-3 p-4 pb-28">
          {participants.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-xl bg-[#171a20] overflow-hidden flex items-center justify-center ${
                p.speaking ? 'ring-2 ring-[#00d2ff]/60' : ''
              }`}
            >
              <span
                className={`w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${p.gradient} inline-flex items-center justify-center text-lg md:text-2xl font-bold`}
              >
                {p.initials}
              </span>
              <span className="absolute left-3 bottom-3 text-[11px] px-2 py-0.5 rounded-md bg-black/50 text-white/80">
                {p.name}
              </span>
              {p.speaking && (
                <span className="absolute right-3 bottom-3 flex items-end gap-[3px] h-4">
                  <span className="w-[3px] h-2 rounded-full bg-[#00d2ff]" />
                  <span className="w-[3px] h-4 rounded-full bg-[#00d2ff]" />
                  <span className="w-[3px] h-2.5 rounded-full bg-[#00d2ff]" />
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-2 rounded-full bg-black/50 border border-white/10 px-3 py-2">
          {[Mic, Video, MonitorUp, MessageSquare, Users].map((Icon, i) => (
            <span
              key={i}
              className="w-8 h-8 rounded-full bg-white/[0.06] inline-flex items-center justify-center text-white/70"
            >
              <Icon className="w-3.5 h-3.5" />
            </span>
          ))}
          <span className="w-8 h-8 rounded-full bg-[#e5484d] inline-flex items-center justify-center">
            <PhoneOff className="w-3.5 h-3.5" />
          </span>
        </div>

        <CaptionPanel
          elapsed="00:42:18"
          cues={[
            {
              primary:
                'The engineering team has finished the core features, and we expect the public beta to go live in about two weeks.',
              secondary: [
                { code: '中文', text: '工程团队已经完成了核心功能，我们预计公开测试版将在大约两周内上线。' },
                { code: '日本語', text: 'エンジニアリングチームはコア機能を完成させ、約2週間後に公開ベータを開始する予定です。' },
                { code: 'ES', text: 'El equipo de ingeniería terminó las funciones principales; la beta pública saldrá en dos semanas.' },
              ],
            },
            {
              primary: "Let's lock the launch date on Friday and keep scope frozen until then.",
              secondary: [
                { code: '中文', text: '我们周五敲定发布日期，在那之前冻结需求范围。' },
                { code: '日本語', text: '金曜日にリリース日を確定し、それまでスコープは凍結しましょう。' },
                { code: 'ES', text: 'Fijemos la fecha de lanzamiento el viernes y congelemos el alcance hasta entonces.' },
              ],
            },
          ]}
        />
      </div>
    </Window>
  )
}

/* ---------------- scene 2 · YouTube ---------------- */

function YouTubeScene() {
  return (
    <Window
      title="次世代の音声認識はどう動くのか — YouTube"
      badge={<span className="text-[10px] text-white/40">1080p · 18:42</span>}
    >
      <div className="relative h-[460px] md:h-[520px] bg-[#0a0a0a]">
        {/* video stage */}
        <div className="absolute inset-x-0 top-0 h-[62%] bg-gradient-to-br from-[#1c1f26] via-[#0f1216] to-[#0a0c0f] flex items-center justify-center">
          <span className="w-16 h-16 rounded-full bg-[#ff0000] inline-flex items-center justify-center shadow-lg shadow-black/50">
            <Play className="w-6 h-6 fill-white text-white ml-0.5" />
          </span>
          <span className="absolute top-4 left-4 text-[10px] px-2 py-0.5 rounded bg-black/60 text-white/70">
            日本語 音声
          </span>
        </div>

        {/* player bar */}
        <div className="absolute top-[62%] inset-x-0 px-4 pt-3">
          <div className="h-[3px] w-full rounded-full bg-white/15 overflow-hidden">
            <div className="h-full w-[38%] bg-[#ff0000]" />
          </div>
          <div className="mt-2.5 flex items-center gap-3 text-white/70">
            <Pause className="w-4 h-4" />
            <Play className="w-4 h-4" />
            <Volume2 className="w-4 h-4" />
            <span className="text-[10px] text-white/50">7:04 / 18:42</span>
            <Maximize2 className="w-3.5 h-3.5 ml-auto" />
          </div>
          <div className="mt-3">
            <h4 className="text-[13px] font-semibold leading-snug">
              次世代の音声認識はどう動くのか｜エンジニア向け解説
            </h4>
            <div className="mt-1.5 flex items-center gap-2 text-[10px] text-white/45">
              <span className="w-4 h-4 rounded-full bg-gradient-to-br from-[#f43f5e] to-[#7f1d1d]" />
              Tech Lab JP · 128K views
              <span className="ml-2 inline-flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" /> 4.2K
              </span>
            </div>
          </div>
        </div>

        <CaptionPanel
          elapsed="00:07:04"
          cues={[
            {
              primary:
                'In streaming recognition, the key design point is returning partial results while waiting for the sentence to finalize.',
              secondary: [
                { code: '日本語', text: 'ストリーミング認識では、部分結果を返しながら文の確定を待つ設計が重要になります。' },
                { code: '中文', text: '在流式识别中，一边返回中间结果、一边等待整句确定，是关键的设计点。' },
                { code: 'ES', text: 'En streaming, la clave es devolver resultados parciales mientras se espera a que la frase se confirme.' },
              ],
            },
            {
              primary: 'That is why latency and accuracy have to be balanced frame by frame.',
              secondary: [
                { code: '日本語', text: 'だからこそ、遅延と精度をフレームごとに両立させる必要があります。' },
                { code: '中文', text: '正因如此，延迟和准确率必须逐帧地取得平衡。' },
                { code: 'ES', text: 'Por eso hay que equilibrar la latencia y la precisión fotograma a fotograma.' },
              ],
            },
          ]}
        />
      </div>
    </Window>
  )
}

/* ---------------- scene 3 · livestream ---------------- */

function StreamScene() {
  return (
    <Window
      title="Keynote en vivo — Congreso de Producto"
      badge={
        <span className="flex items-center gap-1.5 text-[10px] text-white/40">
          <Radio className="w-3 h-3 text-[#e5484d]" />
          LIVE · 3,412 watching
        </span>
      }
    >
      <div className="relative h-[460px] md:h-[520px] bg-[#0d1014]">
        <div className="absolute inset-x-0 top-0 h-[64%] bg-gradient-to-br from-[#132033] via-[#0f1620] to-[#0a0d12] flex items-center justify-center">
          <div className="text-center">
            <span className="inline-flex w-20 h-20 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#78350f] items-center justify-center text-2xl font-bold">
              LM
            </span>
            <div className="mt-3 text-sm font-medium">Lucía Márquez</div>
            <div className="text-[11px] text-white/45">VP Producto · Barcelona</div>
          </div>
          <span className="absolute top-4 left-4 text-[10px] px-2 py-0.5 rounded bg-[#e5484d] text-white font-medium">
            EN VIVO
          </span>
        </div>

        <div className="absolute top-[64%] inset-x-0 px-4 pt-3 flex items-center gap-2 text-[10px] text-white/45">
          <span className="px-2 py-0.5 rounded bg-white/[0.06]">Español 音声</span>
          <span className="px-2 py-0.5 rounded bg-white/[0.06]">Auto-detected</span>
          <span className="ml-auto">Chat · 1.2K messages</span>
        </div>

        <CaptionPanel
          elapsed="01:12:55"
          cues={[
            {
              primary: 'Our goal for next quarter is to cut new-team onboarding time in half.',
              secondary: [
                { code: 'Español', text: 'Nuestro objetivo para el próximo trimestre es reducir a la mitad el tiempo de incorporación de nuevos equipos.' },
                { code: '中文', text: '我们下个季度的目标是把新团队的上手时间缩短一半。' },
                { code: '日本語', text: '次の四半期の目標は、新しいチームの立ち上げ時間を半分に短縮することです。' },
              ],
            },
            {
              primary: "And we'll measure it every single week — no exceptions.",
              secondary: [
                { code: 'Español', text: 'Y lo mediremos cada semana, sin excepción.' },
                { code: '中文', text: '而且我们会每周衡量一次，没有例外。' },
                { code: '日本語', text: 'そして毎週欠かさず測定します。例外はありません。' },
              ],
            },
          ]}
        />
      </div>
    </Window>
  )
}

/* ---------------- carousel ---------------- */

const scenes = [
  { id: 'meeting', label: 'Video call', node: <MeetingScene /> },
  { id: 'youtube', label: 'YouTube', node: <YouTubeScene /> },
  { id: 'stream', label: 'Livestream', node: <StreamScene /> },
]

const AUTOPLAY_MS = 5000

export default function AppMockup() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const [paused, setPaused] = useState(false)

  const goTo = (i: number, wrap = false) => {
    const track = trackRef.current
    if (!track) return
    const next = wrap
      ? (i + scenes.length) % scenes.length
      : Math.max(0, Math.min(scenes.length - 1, i))
    track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' })
    activeRef.current = next
    setActive(next)
  }

  // Debounced: mid-flight positions during a smooth scroll must not be read as
  // the current slide, or the next autoplay tick advances from a stale index.
  const settleRef = useRef<number | undefined>(undefined)
  const onScroll = () => {
    window.clearTimeout(settleRef.current)
    settleRef.current = window.setTimeout(() => {
      const track = trackRef.current
      if (!track) return
      const i = Math.round(track.scrollLeft / track.clientWidth)
      activeRef.current = i
      setActive(i)
    }, 120)
  }
  useEffect(() => () => window.clearTimeout(settleRef.current), [])

  // Auto-advance every 5s; pauses on hover/focus and when the tab is hidden
  // or the visitor prefers reduced motion.
  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => {
      if (document.hidden) return
      goTo(activeRef.current + 1, true)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* scene tabs */}
        <div className="mb-4 flex items-center gap-2">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                active === i
                  ? 'border-white/20 bg-white/10 text-white'
                  : 'border-white/10 text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              {s.label}
            </button>
          ))}
          <div className="ml-auto hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => goTo(active - 1, true)}
              aria-label="Previous scene"
              className="w-8 h-8 rounded-full border border-white/10 inline-flex items-center justify-center text-white/70 hover:bg-white/5"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => goTo(active + 1, true)}
              aria-label="Next scene"
              className="w-8 h-8 rounded-full border border-white/10 inline-flex items-center justify-center text-white/70 hover:bg-white/5"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* scroll track */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar -mx-1"
        >
          {scenes.map((s) => (
            <div key={s.id} className="w-full shrink-0 snap-center px-1">
              {s.node}
            </div>
          ))}
        </div>

        {/* dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Go to ${s.label}`}
              className={`relative h-1.5 rounded-full overflow-hidden transition-all ${
                active === i ? 'w-6 bg-white/25' : 'w-1.5 bg-white/25 hover:bg-white/50'
              }`}
            >
              {active === i && (
                <span
                  key={`fill-${active}-${paused}`}
                  className={`absolute inset-y-0 left-0 bg-white ${paused ? 'w-full' : 'animate-dot-fill'}`}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
