// Motif graphique de la carte de visite : triangles superposés, légèrement en relief.
// Décor pur (aria-hidden) ; à placer dans un parent en position relative / overflow hidden.
export default function Facets({ className = '' }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="facet-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-6" dy="10" stdDeviation="8" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter="url(#facet-shadow)">
        <polygon points="0,0 330,0 60,260" fill="#5C6361" />
        <polygon points="330,0 600,80 420,300" fill="#434947" />
        <polygon points="60,260 420,300 180,520" fill="#565D5B" />
        <polygon points="420,300 600,80 600,420" fill="#3D4341" />
        <polygon points="180,520 420,300 600,600 0,600" fill="#4E5452" />
        <polygon points="600,420 600,600 470,600" fill="#F5AF19" />
      </g>
    </svg>
  )
}
