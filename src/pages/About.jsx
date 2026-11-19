import { useTranslation } from 'react-i18next'
import { useContent } from '../content.js'
import { Wrap } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import PageHead from '../components/PageHead.jsx'

export default function About() {
  const { t } = useTranslation()
  const { missionValues } = useContent()
  const zones = t('about.zones', { returnObjects: true })
  return (
    <>
      <PageHead crumbs={[[t('about.crumb')]]} title={t('about.title')} />

      <Wrap className="grid gap-10 py-16 md:grid-cols-2 md:items-center">
        <Reveal>
          <h2 className="text-3xl font-bold">{t('about.whoWeAre')}</h2>
          <p className="mt-4 text-lg text-ink/75">{t('about.whoText')}</p>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-sm font-semibold uppercase tracking-widest text-ink/50">{t('about.zonesTitle')}</p>
          <ul className="mt-3 flex flex-wrap gap-3">
            {zones.map((z) => <li key={z} className="rounded-full bg-ink px-6 py-2.5 font-display text-lg font-bold text-white transition hover:bg-slate">{z}</li>)}
          </ul>
        </Reveal>
      </Wrap>

      <section className="bg-mist">
        <Wrap className="py-16">
          <Reveal><h2 className="text-3xl font-bold">{t('about.missionValues')}</h2></Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {missionValues.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 100}>
                <div className="h-full rounded-2xl border-t-4 border-accent bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-accent px-3 font-display text-lg font-bold text-ink">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 text-xl font-bold">{v.title}</h3>
                  <p className="mt-2 text-ink/75">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>
    </>
  )
}