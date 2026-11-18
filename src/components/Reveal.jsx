import { useEffect, useRef, useState } from 'react'

// Fait apparaître son contenu en glissant vers le haut quand il entre à l'écran.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} style={{ '--d': `${delay}ms` }} className={`reveal ${seen ? 'in' : ''} ${className}`}>{children}</Tag>
}