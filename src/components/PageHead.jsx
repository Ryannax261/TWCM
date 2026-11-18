import { Link } from 'react-router-dom'
import { Wrap } from './ui.jsx'

function Crumbs({ items }) {
  return (
    <nav aria-label="Fil d’Ariane" className="text-sm text-white/60">
      <Link to="/" className="hover:text-turmeric">Accueil</Link>
      {items.map(([label, to]) => (
        <span key={label}> / {to ? <Link to={to} className="hover:text-turmeric">{label}</Link> : <span className="text-white">{label}</span>}</span>
      ))}
    </nav>
  )
}

export default function PageHead({ crumbs, title, intro }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="blob pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-sea/60 blur-3xl" />
      <div aria-hidden="true" className="blob pointer-events-none absolute -bottom-28 left-10 h-56 w-56 rounded-full bg-turmeric/20 blur-3xl" />
      <Wrap className="relative py-14 md:py-20">
        <Crumbs items={crumbs} />
        <h1 className="fade-up mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
        {intro && <p className="fade-up mt-4 max-w-2xl text-lg text-white/80" style={{ '--d': '120ms' }}>{intro}</p>}
      </Wrap>
    </section>
  )
}