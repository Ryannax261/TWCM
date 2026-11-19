import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const AUTOPLAY = 4500 // millisecondes entre deux étapes

// Position de chaque carte selon son écart (d) avec l'étape active.
// m* : mobile (les voisines dépassent sur les côtés) · d* : ordinateur (voisines en diagonale)
const SLOTS = {
  '-2': { mx: -2.2, my: 0, dx: -2.6, dy: -0.9, s: 0.8, o: 0 },
  '-1': { mx: -1.1, my: 0, dx: -1.35, dy: -0.8, s: 0.85, o: 0.55 },
  '0': { mx: 0, my: 0, dx: 0, dy: 0, s: 1, o: 1 },
  '1': { mx: 1.1, my: 0, dx: 0.85, dy: 0.95, s: 0.85, o: 0.55 },
  '2': { mx: 2.2, my: 0, dx: 2.4, dy: 0.95, s: 0.8, o: 0 },
}

// Une icône par étape (dans l'ordre : fournisseurs, négociation, qualité, logistique, livraison).
const ICONS = [
  <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
  <><path d="m8 3-4 4 4 4" /><path d="M4 7h16" /><path d="m16 21 4-4-4-4" /><path d="M20 17H4" /></>,
  <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>,
  <><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></>,
  <><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" /><path d="M12 22V12" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="m7.5 4.27 9 5.15" /></>,
]

const StepIcon = ({ i }) => (
  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ICONS[i % ICONS.length]}
  </svg>
)

const Chevron = ({ dir }) => (
  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'left' ? 'm12 4-6 6 6 6' : 'm8 4 6 6-6 6'} />
  </svg>
)

// Carrousel : l'étape active est au centre avec sa légende à droite, la précédente
// dépasse en haut à gauche, la suivante en bas à droite. Un clic, une flèche du clavier
// ou un glissement du doigt fait glisser les cartes en diagonale.
export default function ProcessSteps({ steps }) {
  const { t } = useTranslation()
  const n = steps.length
  const ref = useRef(null)
  const startX = useRef(null)
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [paused, setPaused] = useState(false)   // survol ou focus
  const [stopped, setStopped] = useState(false) // l'utilisateur a pris la main

  const go = (i, manual = true) => {
    setIndex(((i % n) + n) % n)
    if (manual) setStopped(true)
  }

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  // Défilement automatique tant que le bloc est visible et que personne n'y touche
  useEffect(() => {
    if (!visible || paused || stopped) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % n), AUTOPLAY)
    return () => clearInterval(timer)
  }, [visible, paused, stopped, n])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1) }
  }
  const onPointerDown = (e) => { startX.current = e.clientX }
  const onPointerUp = (e) => {
    if (startX.current === null) return
    const dx = e.clientX - startX.current
    startX.current = null
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
  }

  const half = Math.floor(n / 2)
  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      aria-label={t('home.supplierToDelivery')}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="stepper relative mt-10 h-[540px] touch-pan-y select-none overflow-hidden rounded-3xl bg-ink text-white md:h-[560px]"
    >
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />

      {/* Cartes */}
      {steps.map((s, i) => {
        const d = ((i - index + n + half) % n) - half // écart circulaire : -2 … 2 pour 5 étapes
        const slot = SLOTS[Math.max(-2, Math.min(2, d))] ?? SLOTS['2']
        const hidden = Math.abs(d) > 2
        const warm = i % 2 === 0 // alternance jaune / bleu
        return (
          <div
            key={s.title}
            aria-hidden="true"
            onClick={() => Math.abs(d) === 1 && go(i)}
            className={`stepper-card ${Math.abs(d) === 1 ? 'cursor-pointer' : ''}`}
            style={{ '--mx': slot.mx, '--my': slot.my, '--dx': slot.dx, '--dy': slot.dy, '--s': slot.s, opacity: hidden ? 0 : slot.o, zIndex: 10 - Math.abs(d) }}
          >
            <div className={`flex h-full flex-col justify-between rounded-3xl p-6 shadow-2xl ${warm ? 'bg-turmeric text-ink' : 'bg-sea text-white'}`}>
              <StepIcon i={i} />
              <span className="font-display text-7xl font-bold leading-none">0{i + 1}</span>
            </div>
          </div>
        )
      })}

      {/* Légendes : celle de l'étape active apparaît pendant que l'autre se dissout */}
      <div className="stepper-box" aria-live={stopped || paused ? 'polite' : 'off'}>
        {steps.map((s, i) => (
          <div key={s.title} className="stepper-caption" data-on={i === index} aria-hidden={i !== index}>
            <h3 className="text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-white/70">{s.text}</p>
          </div>
        ))}
      </div>

      {/* Commandes : flèches et points */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/10 px-2 py-1.5 ring-1 ring-white/10 backdrop-blur-md">
        <button type="button" onClick={() => go(index - 1)} aria-label={t('home.stepPrev')} className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/15">
          <Chevron dir="left" />
        </button>
        <div className="flex items-center">
          {steps.map((s, i) => (
            <button key={s.title} type="button" onClick={() => go(i)} aria-label={t('home.stepGo', { n: i + 1 })} aria-current={i === index} className="group flex h-9 items-center px-1">
              <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/35 group-hover:bg-white/60'}`} />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(index + 1)} aria-label={t('home.stepNext')} className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/15">
          <Chevron dir="right" />
        </button>
      </div>
    </div>
  )
}