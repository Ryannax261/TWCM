import { useEffect, useRef, useState } from 'react'

const ROW = 182    // espace vertical entre deux cartes (ordinateur)
const TICK = 1500  // durée d'une étape en millisecondes

const Pin = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 17v5M9 10.8a2 2 0 0 1-1.1 1.8l-1.8.9A2 2 0 0 0 5 15.2V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.8a2 2 0 0 0-1.1-1.8l-1.8-.9A2 2 0 0 1 15 10.8V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
  </svg>
)

// Cartes épinglées en zigzag, reliées par des pointillés. Dès que le bloc est visible,
// les étapes s'allument une par une, restent allumées un moment, puis le cycle recommence.
export default function ProcessSteps({ steps }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(-1)
  const n = steps.length

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStep(n - 1); return }
    let i = 0
    setStep(0)
    const t = setInterval(() => {
      i = i > n + 1 ? 0 : i + 1
      setStep(Math.min(i, n - 1))
    }, TICK)
    return () => clearInterval(t)
  }, [visible, n])

  return (
    <div ref={ref} className="relative mt-12 space-y-8 md:h-[920px] md:space-y-0">
      {/* Pointillés entre les cartes (ordinateur) */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox={`0 0 100 ${ROW * (n - 1) + 190}`} preserveAspectRatio="none">
        {steps.slice(0, -1).map((_, i) => {
          const fromLeft = i % 2 === 0
          const x1 = fromLeft ? 42 : 58, x2 = fromLeft ? 58 : 42
          const y1 = i * ROW + 95, y2 = (i + 1) * ROW + 95
          const dx = (x2 - x1) * 0.7
          return (
            <path key={i} d={`M${x1} ${y1} C${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`} fill="none"
              vectorEffect="non-scaling-stroke" strokeWidth="2" strokeLinecap="round"
              strokeDasharray={i < step ? undefined : '6 7'}
              className={`transition-all duration-700 ${i < step ? 'stroke-turmeric' : 'stroke-ink/25'}`} />
          )
        })}
      </svg>

      {steps.map((s, i) => {
        const on = i <= step
        const now = i === step
        const warm = i % 2 === 0 // alternance des teintes : jaune / bleu
        return (
          <article
            key={s.title}
            style={{ '--t': `${i * ROW}px` }}
            className={`relative rounded-2xl bg-ink p-2 shadow-xl transition-all duration-700 md:absolute md:top-[var(--t)] md:w-[38%] ${i % 2 === 0 ? 'md:left-[4%]' : 'md:right-[4%]'} ${
              now ? 'z-10 scale-105 rotate-0 shadow-2xl ring-4 ring-turmeric/40' : i % 2 === 0 ? '-rotate-2' : 'rotate-2'
            } ${on ? 'opacity-100' : 'opacity-45 saturate-50'}`}
          >
            <div className={`flex justify-center py-1.5 transition-colors duration-700 ${warm ? 'text-turmeric' : 'text-white'} ${on ? '' : '!text-white/40'}`}>
              <Pin />
            </div>
            <div className={`rounded-xl border p-4 ${warm ? 'border-turmeric/40 bg-turmeric/10' : 'border-white/20 bg-sea/40'}`}>
              <span className={`font-display text-2xl font-bold ${warm ? 'text-turmeric' : 'text-white'}`}>0{i + 1}</span>
              <h3 className="mt-1 text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-1 text-sm text-white/70">{s.text}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}