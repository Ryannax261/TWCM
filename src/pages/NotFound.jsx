import { useTranslation } from 'react-i18next'
import { Wrap, Button } from '../components/ui.jsx'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <Wrap className="relative py-28 text-center">
        <p className="fade-up font-display text-8xl font-bold text-turmeric md:text-9xl">404</p>
        <h1 className="fade-up mt-4 text-3xl font-bold" style={{ '--d': '100ms' }}>{t('notFound.title')}</h1>
        <p className="fade-up mt-3 text-white/75" style={{ '--d': '200ms' }}>{t('notFound.text')}</p>
        <div className="fade-up mt-8" style={{ '--d': '300ms' }}><Button to="/" dark>{t('notFound.back')}</Button></div>
      </Wrap>
    </section>
  )
}