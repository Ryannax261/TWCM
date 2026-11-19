import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContent } from '../content.js'
import LanguageSwitcher from './LanguageSwitcher.jsx'


const Chevron = ({ className = '' }) => (
  <svg viewBox="0 0 20 20" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 8 5 5 5-5" />
  </svg>
)

export default function Header() {
  const { t } = useTranslation()
  const { nav, projects, activities } = useContent()
  const submenus = {
    '/activites': activities.map((a) => ({ to: `/activites/${a.slug}`, label: a.title })),
    '/realisations': projects.map((p) => ({ to: `/realisations/${p.slug}`, label: p.title, hint: p.country })),
  }
  const [open, setOpen] = useState(false)      
  const [expanded, setExpanded] = useState('')  
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false); setExpanded(''); window.scrollTo(0, 0) }, [pathname])

  // Défilement : transparence, ombre et barre de progression
  useEffect(() => {
    const on = () => {
      const y = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 10)
      setProgress(h > 0 ? (y / h) * 100 : 0)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  // Menu mobile : pas de défilement de la page derrière, Échap pour fermer
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); document.activeElement?.blur?.() } }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  const desk = ({ isActive }) =>
    `flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${isActive ? 'bg-ink text-white' : 'text-ink/80 hover:bg-mist hover:text-ink'}`

  return (
    <header className={`sticky top-0 z-30 border-b border-ink/10 transition-all duration-300 ${open ? 'bg-white' : scrolled ? 'bg-white/70 shadow-md backdrop-blur-lg' : 'bg-white'}`}>
      <div className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-4'}`}>
        <Link to="/" className="flex items-baseline gap-3" aria-label={t('header.logoLabel')}>
          <span className="font-display text-2xl font-bold tracking-tight">TWCM<span className="text-turmeric">.</span></span>
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45 xl:inline">{t('header.tagline')}</span>
        </Link>

        {/* Navigation ordinateur */}
        <nav aria-label={t('header.mainNav')} className="hidden items-center gap-1 md:flex">
          {nav.map((n) => {
            const sub = submenus[n.to]
            if (!sub) return <NavLink key={n.to} to={n.to} end={n.to === '/'} className={desk}>{n.label}</NavLink>
            return (
              <div key={n.to} className="group relative">
                <NavLink to={n.to} className={desk}>
                  {n.label}
                  <Chevron className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                </NavLink>
                <div className="invisible absolute left-0 top-full w-80 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <ul className="rounded-2xl border border-ink/10 bg-white p-2 shadow-2xl">
                    {sub.map((s) => (
                      <li key={s.to}>
                        <NavLink to={s.to} className={({ isActive }) => `group/item flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-mist ${isActive ? 'bg-mist font-semibold' : ''}`}>
                          <span>
                            <span className="block leading-snug">{s.label}</span>
                            {s.hint && <span className="block text-xs text-ink/50">{s.hint}</span>}
                          </span>
                          <span aria-hidden="true" className="text-turmeric opacity-0 transition group-hover/item:translate-x-1 group-hover/item:opacity-100">→</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
          <Link to="/contact" className="group ml-3 inline-flex items-center gap-2 rounded-full bg-turmeric px-5 py-2.5 text-[15px] font-semibold text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-white hover:shadow-lg">
            {t('ui.contactUs')} <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
          </Link>
          <LanguageSwitcher className="ml-3" />
        </nav>

        {/* Bouton menu mobile */}
        <button className="relative h-10 w-10 md:hidden" aria-label={open ? t('header.closeMenu') : t('header.openMenu')} aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen(!open)}>
          <span className="absolute left-2 top-2.5 block h-5 w-6">
            <span className={`absolute left-0 block h-0.5 w-6 rounded bg-ink transition-all duration-300 ${open ? 'top-[9px] rotate-45' : 'top-[2px]'}`} />
            <span className={`absolute left-0 top-[9px] block h-0.5 w-6 rounded bg-ink transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 block h-0.5 w-6 rounded bg-ink transition-all duration-300 ${open ? 'top-[9px] -rotate-45' : 'top-[16px]'}`} />
          </span>
        </button>
      </div>

      {/* Navigation mobile */}
      <nav id="menu-mobile" aria-label={t('header.mobileNav')} className={`absolute left-0 top-full max-h-[calc(100vh-4rem)] w-full overflow-y-auto border-b border-ink/10 bg-white px-5 pb-6 pt-2 shadow-xl transition-all duration-300 md:hidden ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}>
        {nav.map((n) => {
          const sub = submenus[n.to]
          const isOpen = expanded === n.to
          return (
            <div key={n.to} className="border-b border-ink/10">
              <div className="flex items-center justify-between">
                <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => `flex-1 py-4 font-display text-xl font-bold ${isActive ? 'text-sea' : ''}`}>{n.label}</NavLink>
                {sub && (
                  <button aria-label={t('header.showPages', { label: n.label })} aria-expanded={isOpen} onClick={() => setExpanded(isOpen ? '' : n.to)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-mist">
                    <Chevron className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
              {sub && (
                <ul className={`ml-1 overflow-hidden border-l-2 border-turmeric pl-4 transition-all duration-300 ${isOpen ? 'mb-3 max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {sub.map((s) => <li key={s.to}><NavLink to={s.to} className="block py-2.5 text-ink/80 hover:text-sea">{s.label}</NavLink></li>)}
                </ul>
              )}
            </div>
          )
        })}
        <Link to="/contact" className="mt-6 flex items-center justify-center gap-2 rounded-full bg-turmeric px-6 py-3.5 text-lg font-semibold text-ink">
          {t('ui.contactUs')} <span aria-hidden="true">→</span>
        </Link>
        <LanguageSwitcher className="mt-5" />
      </nav>

      <div aria-hidden="true" className="absolute bottom-0 left-0 h-0.5 bg-turmeric" style={{ width: `${progress}%` }} />
    </header>
  )
}