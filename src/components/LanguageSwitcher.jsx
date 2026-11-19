import { useTranslation } from 'react-i18next'

const LANGS = ['fr', 'en']

export default function LanguageSwitcher({ className = '' }) {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage
  return (
    <div role="group" aria-label={t('ui.language')} className={`inline-flex items-center rounded-full border border-white/25 p-0.5 text-sm font-semibold ${className}`}>
      {LANGS.map((lng) => (
        <button
          key={lng}
          type="button"
          lang={lng}
          onClick={() => i18n.changeLanguage(lng)}
          aria-pressed={current === lng}
          className={`rounded-full px-3 py-1 transition-colors ${current === lng ? 'bg-white text-ink' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
