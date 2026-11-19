import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { company, useContent } from '../content.js'

export default function Footer() {
  const { t } = useTranslation()
  const { nav } = useContent()
  return (
    <footer className="relative overflow-hidden bg-ink text-white/75">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-4xl font-bold text-white">TWCM<span className="text-turmeric">.</span></p>
          <p className="mt-3 max-w-sm">{t('footer.about')}</p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-turmeric px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white">
            {t('footer.talk')} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div>
          <p className="font-semibold text-white">{t('footer.navigation')}</p>
          <ul className="mt-3 space-y-2">{nav.map((n) => <li key={n.to}><Link className="transition hover:text-turmeric" to={n.to}>{n.label}</Link></li>)}</ul>
        </div>
        <div>
          <p className="font-semibold text-white">{t('footer.contact')}</p>
          <ul className="mt-3 space-y-2">
            <li><a href={`mailto:${company.email}`} className="transition hover:text-turmeric">{company.email}</a></li>
            {company.linkedin && <li><a href={company.linkedin} className="transition hover:text-turmeric" target="_blank" rel="noreferrer">LinkedIn</a></li>}
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10 px-5 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm sm:flex-row">
          <p>
            © {new Date().getFullYear()} TWCM ·{' '}
            <Link to="/mentions-legales" className="hover:text-turmeric">{t('footer.legal')}</Link> ·{' '}
            <Link to="/confidentialite" className="hover:text-turmeric">{t('footer.privacy')}</Link>
          </p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-full border border-white/25 px-4 py-1.5 transition hover:border-turmeric hover:text-turmeric">
            {t('footer.top')}
          </button>
        </div>
      </div>
    </footer>
  )
}