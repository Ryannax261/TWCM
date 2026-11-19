import { useEffect, useMemo, useRef, useState } from 'react'
import Globe from 'react-globe.gl'

const GOLD = '#f5af19' // trait principal : or
const GOLD_DOTS = 'rgba(214,190,120,0.75)' // points des terres
const GLOBE_COLOR = '#353A38'
const ATMOSPHERE = '#AFB2B1'

// Points (lat, lng)
// side : côté du libellé par rapport à la pastille (évite le chevauchement Maurice / Madagascar)
const PLACES = [
  { id: 'asie', name: 'Asie', lat: 22.3, lng: 114.2, kind: 'place', side: 'right' }, // Hong Kong
  { id: 'maurice', name: 'Maurice', lat: -20.3, lng: 57.5, kind: 'place', side: 'right' },
  { id: 'madagascar', name: 'Madagascar', lat: -18.9, lng: 47.5, kind: 'place', side: 'left' },
]
const PLACE = Object.fromEntries(PLACES.map((p) => [p.id, p]))
const OCEAN = { id: 'ocean', name: 'Océan Indien', lat: -10, lng: 75, kind: 'slate' }
const LABELS = [...PLACES, OCEAN]

// Trajet : Asie -> Maurice, puis Maurice -> Madagascar
const ARCS = [
  { id: 'asie-maurice', startLat: 22.3, startLng: 114.2, endLat: -20.3, endLng: 57.5 },
  { id: 'maurice-madagascar', startLat: -20.3, startLng: 57.5, endLat: -18.9, endLng: 47.5 },
]

// Temporisations (ms)
const CAMERA_MS = 1500 // déplacement initial vers l'Asie
const ARC_MS = 2000 // tracé d'un arc ; la caméra suit pendant ce temps
const PAUSE_MAURICE_MS = 800
const PAUSE_END_MS = 1500
const CLICK_MS = 1000 // déplacement lors d'un clic sur un bouton
const ALTITUDE = 1.8

const pov = (p) => ({ lat: p.lat, lng: p.lng, altitude: ALTITUDE })

// Séquence en boucle :
// step 0 : aucun arc, caméra sur l'Asie
// step 1 : arc Asie -> Maurice, caméra vers Maurice, pause
// step 2 : arcs Asie -> Maurice et Maurice -> Madagascar, caméra vers Madagascar, pause, retour à 0
const STEPS = {
  0: { arcs: [], target: PLACE.asie, move: CAMERA_MS, wait: CAMERA_MS, next: 1 },
  1: { arcs: [ARCS[0]], target: PLACE.maurice, move: ARC_MS, wait: ARC_MS + PAUSE_MAURICE_MS, next: 2 },
  2: { arcs: ARCS, target: PLACE.madagascar, move: ARC_MS, wait: ARC_MS + PAUSE_END_MS, next: 0 },
}

const ARC_COLOR = () => [GOLD, 'rgba(245,175,25,0)']
const RING_COLOR = () => (t) => `rgba(245,175,25,${1 - t})`
const DOT_COLOR = () => GOLD_DOTS

// Étiquette HTML : pastille blanche à bordure jaune + nom dans un encadré sombre.
// L'océan est un simple libellé en italique, sans pastille.
function createLabel(d) {
  const el = document.createElement('div')
  el.style.pointerEvents = 'none'
  el.style.whiteSpace = 'nowrap'
  el.style.fontFamily = "'Montserrat', system-ui, sans-serif"
  if (d.kind === 'slate') {
    el.innerHTML = `<span style="display:inline-block;transform:translate(-50%,-50%);color:rgba(255,255,255,.8);font-style:italic;font-size:15px;letter-spacing:.05em;text-shadow:0 1px 4px rgba(0,0,0,.6)">${d.name}</span>`
  } else {
    const dot = `<span style="width:12px;height:12px;border-radius:50%;background:#fff;border:2px solid ${GOLD};box-sizing:border-box;flex:none"></span>`
    const name = `<span style="background:rgba(53,58,56,.8);color:#fff;padding:2px 8px;border-radius:4px;font-size:15px;font-weight:600">${d.name}</span>`
    // Libellé à droite : pastille puis nom. À gauche : nom puis pastille, décalé de sa largeur.
    const left = d.side === 'left'
    el.innerHTML = `<div style="display:flex;align-items:center;gap:6px;flex-direction:${left ? 'row-reverse' : 'row'};transform:translate(${left ? 'calc(-100% + 6px)' : '-6px'},-50%)">${dot}${name}</div>`
  }
  return el
}

const buttonStyle = {
  border: `1px solid ${GOLD}`,
  background: 'rgba(53,58,56,.6)',
  color: '#fff',
  padding: '6px 14px',
  borderRadius: 999,
  fontFamily: "'Montserrat', system-ui, sans-serif",
  fontSize: 15,
  cursor: 'pointer',
}

export default function RouteGlobe() {
  const wrapRef = useRef(null)
  const globeRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [countries, setCountries] = useState([])
  const [ready, setReady] = useState(false)
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const [dragging, setDragging] = useState(false)

  // Le globe suit la taille du conteneur
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ w: Math.round(width), h: Math.round(height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Pays : GeoJSON ne_110m_admin_0_countries servi depuis public/data
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`${import.meta.env.BASE_URL}data/ne_110m_admin_0_countries.geojson`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((g) => setCountries(g.features))
      .catch((err) => {
        if (err.name !== 'AbortError') console.error('RouteGlobe : chargement des pays impossible', err)
      })
    return () => ctrl.abort()
  }, [])

  // Police serif de l'étiquette
  useEffect(() => {
    if (document.getElementById('route-globe-font')) return
    const link = document.createElement('link')
    link.id = 'route-globe-font'
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap'
    document.head.appendChild(link)
  }, [])

  // Texture unie aux couleurs du globe (évite d'importer three.js directement)
  const globeTexture = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 2
    const ctx = c.getContext('2d')
    ctx.fillStyle = GLOBE_COLOR
    ctx.fillRect(0, 0, 2, 2)
    return c.toDataURL()
  }, [])

  const handleReady = () => {
    const controls = globeRef.current.controls()
    controls.enableZoom = false // zoom désactivé, rotation à la souris conservée
    controls.autoRotate = false
    setReady(true)
  }

  // Séquence automatique. Le nettoyage annule le minuteur en cas de pause ou de démontage.
  useEffect(() => {
    if (!ready || paused) return
    const cfg = STEPS[step]
    globeRef.current.pointOfView(pov(cfg.target), cfg.move)
    const t = setTimeout(() => setStep(cfg.next), cfg.wait)
    return () => clearTimeout(t)
  }, [step, paused, ready])

  // Clic sur un bouton : la séquence se met en pause et la caméra centre le point
  const focus = (place) => {
    setPaused(true)
    globeRef.current?.pointOfView(pov(place), CLICK_MS)
  }

  return (
    <div
      ref={wrapRef}
      role="region"
      aria-label="Globe 3D : trajet de l'Asie vers l'île Maurice, puis Madagascar"
      onPointerDown={() => setDragging(true)}
      onPointerUp={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(360px, 60vh, 560px)',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 45%, #5C6361 0%, #353A38 75%)',
        cursor: dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
    >
      {size.w > 0 && (
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          onGlobeReady={handleReady}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={globeTexture}
          showAtmosphere
          atmosphereColor={ATMOSPHERE}
          atmosphereAltitude={0.18}
          hexPolygonsData={countries}
          hexPolygonUseDots
          hexPolygonResolution={3}
          hexPolygonMargin={0.3}
          hexPolygonColor={DOT_COLOR}
          arcsData={STEPS[step].arcs}
          arcColor={ARC_COLOR}
          arcStroke={0.6}
          arcDashLength={1}
          arcDashGap={0}
          arcDashInitialGap={1}
          arcDashAnimateTime={ARC_MS}
          arcAltitudeAutoScale={0.4}
          ringsData={PLACES}
          ringColor={RING_COLOR}
          ringMaxRadius={2.5}
          ringPropagationSpeed={1.2}
          ringRepeatPeriod={1400}
          htmlElementsData={LABELS}
          htmlElement={createLabel}
          htmlAltitude={(d) => (d.kind === 'slate' ? 0 : 0.03)}
        />
      )}

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 16,
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 8,
          padding: '0 12px',
        }}
      >
        {PLACES.map((p) => (
          <button key={p.id} type="button" onClick={() => focus(p)} style={buttonStyle}>
            {p.name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
          style={{ ...buttonStyle, background: paused ? GOLD : 'rgba(53,58,56,.6)', color: paused ? '#4A504E' : '#fff' }}
        >
          {paused ? 'Reprendre' : 'Pause'}
        </button>
      </div>
    </div>
  )
}
