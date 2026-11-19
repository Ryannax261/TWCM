import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Wrap } from './ui.jsx'
import Facets from './Facets.jsx'

function Crumbs({ items }) {
  const { t } = useTranslation()
  return (
    <nav aria-label={t('ui.breadcrumb')} className="text-sm text-white/60">
      <Link to="/" className="hover:text-white">{t('ui.home')}</Link>
      {items.map(([label, to]) => (
        <span key={label}> / {to ? <Link to={to} className="hover:text-white">{label}</Link> : <span className="text-white">{label}</span>}</span>
      ))}
    </nav>
  )
}

export default function PageHead({ crumbs, title, intro }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <Facets className="absolute -right-32 -top-40 h-[30rem] w-[30rem] opacity-45" />
      <Wrap className="relative py-14 md:py-20">
        <Crumbs items={crumbs} />
        <h1 className="fade-up mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
        {intro && <p className="fade-up mt-4 max-w-2xl text-lg text-white/80" style={{ '--d': '120ms' }}>{intro}</p>}
      </Wrap>
    </section>
  )
}