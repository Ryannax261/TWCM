// Logo TWCM Holding, reproduit d'après la carte de visite :
// un triangle contour, deux traits parallèles à ses côtés et une base horizontale.
// La couleur suit le texte courant (currentColor).
export function LogoMark({ className = '' }) {
  return (
    <svg
      viewBox="100 95 550 460"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="22"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M374 206 L223 470 L526 470 Z" />
      <path d="M124 526 L308 214" />
      <path d="M378 118 L560 418" />
      <path d="M216 528 L626 528" />
    </svg>
  )
}

// Symbole + logotype « TWCM / HOLDING » empilé, comme sur la carte.
export default function Logo({ className = '', compact = false }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className={compact ? 'h-9 w-auto' : 'h-11 w-auto'} />
      <span className="flex flex-col font-display leading-[0.95]">
        <span className={`font-bold tracking-[0.12em] ${compact ? 'text-xl' : 'text-2xl'}`}>TWCM</span>
        <span className={`font-medium tracking-[0.3em] opacity-80 ${compact ? 'text-[10px]' : 'text-xs'}`}>HOLDING</span>
      </span>
    </span>
  )
}
