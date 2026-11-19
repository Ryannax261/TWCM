import { useTranslation } from 'react-i18next'
import { useContent } from '../content.js'
import { Wrap, Button } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import PageHead from '../components/PageHead.jsx'

export default function Partners() {
  const { t } = useTranslation()
  const { partners } = useContent()
  return (
    <>
      <PageHead crumbs={[[t('partners.crumb')]]} title={t('partners.title')} />
      <Wrap className="grid gap-6 py-16 md:grid-cols-2">
        {partners.map((p, i) => (
          <Reveal key={p.name} delay={i * 120}>
            <section className="h-full rounded-2xl border border-ink/10 p-7 transition duration-300 hover:-translate-y-1 hover:border-turmeric hover:shadow-xl">
              <h2 className="text-xl font-bold">{p.name}</h2>
              <p className="mt-2 text-ink/75">{p.text}</p>
            </section>
          </Reveal>
        ))}
      </Wrap>
      <Wrap className="pb-20">
        <p className="text-ink/80">{t('partners.become')}</p>
        <div className="mt-3"><Button to="/contact?besoin=partenariat">{t('partners.writeUs')}</Button></div>
      </Wrap>
    </>
  )
}