// Carte simplifiée : Asie, Maurice et Madagascar.
// Le tracé des terres (très long) est rangé dans landPath.js.
import { useTranslation } from 'react-i18next'
import { LAND } from './landPath.js'

const TURMERIC = '#E3A21A'

// Route maritime : Canton, mer de Chine méridionale, détroit de Malacca,
// sud du Sri Lanka, puis traversée de l'océan Indien jusqu'à Maurice.
const WAYPOINTS = [
  [399, 122], [408, 146], [398, 176], [389, 192], [377, 196], [369, 188],
  [360, 180], [336, 185], [312, 194], [280, 228], [243, 268],
]

// Transforme des points en courbe lisse (Catmull-Rom vers Bézier).
function smooth(p) {
  let d = `M${p[0]}`
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${c1} ${c2} ${p2}`
  }
  return d
}

// Contour sombre autour du texte pour le lire même au-dessus des terres.
const halo = { stroke: '#10222E', strokeWidth: 2, paintOrder: 'stroke', strokeLinejoin: 'round' }
const label = { fill: '#FFFFFF', fontSize: 8, fontWeight: 600, ...halo }

export default function RouteMap() {
  const { t } = useTranslation()
  return (
    <svg
      viewBox="165 90 260 230"
      className="h-auto w-full"
      role="img"
      aria-label={t('map.aria')}
    >
      {/* Terres émergées */}
      <path d={LAND} fill="#FFFFFF" fillOpacity="0.14" stroke="none" />

      {/* Océan Indien */}
      <text x="330" y="306" textAnchor="middle" fill="#FFFFFF" fillOpacity="0.5" fontSize="8" fontStyle="italic" letterSpacing="1.5">
        {t('map.ocean')}
      </text>

      {/* Routes : se dessinent l'une après l'autre (voir .route-line dans index.css) */}
      <path className="route-line" pathLength="900" d={smooth(WAYPOINTS)} fill="none" stroke={TURMERIC} strokeWidth="1.6" strokeLinecap="round" />
      <path className="route-line" pathLength="900" style={{ animationDelay: '2.4s' }} d="M243 268L214 263" fill="none" stroke={TURMERIC} strokeWidth="1.6" strokeLinecap="round" />

      {/* Points */}
      <circle cx="399" cy="122" r="4" fill="#FFFFFF" stroke={TURMERIC} strokeWidth="1.6" />
      <circle cx="243" cy="268" r="3.2" fill="#FFFFFF" stroke={TURMERIC} strokeWidth="1.6" />
      <circle cx="214" cy="263" r="3.2" fill="#FFFFFF" stroke={TURMERIC} strokeWidth="1.6" />

      {/* Libellés */}
      <text x="399" y="111" textAnchor="middle" {...label}>{t('map.asia')}</text>
      <text x="249" y="279" textAnchor="start" {...label}>{t('map.mauritius')}</text>
      <text x="214" y="292" textAnchor="middle" {...label}>{t('map.madagascar')}</text>
    </svg>
  )
}