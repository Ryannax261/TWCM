import { useTranslation } from 'react-i18next'
import { useContent } from '../content.js'
import { Wrap } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import PageHead from '../components/PageHead.jsx'

export default function About() {
  const { t } = useTranslation()
  const { values } = useContent()
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
            {zones.map((z) => <li key={z} className="rounded-full bg-ink px-6 py-2.5 font-display text-lg font-bold text-white transition hover:bg-sea">{z}</li>)}
          </ul>
        </Reveal>
      </Wrap>

      <section className="bg-mist">
        <Wrap className="py-16">
          <Reveal><h2 className="text-3xl font-bold">{t('about.missionValues')}</h2></Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v} delay={i * 120}>
                <div className="h-full rounded-2xl border border-ink/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-turmeric hover:shadow-xl">
                  <span className="font-display text-4xl font-bold text-turmeric">0{i + 1}</span>
                  <p className="mt-3 text-xl font-semibold">{v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <Wrap className="py-16">
        <Reveal>
          <h2 className="text-3xl font-bold">{t('about.team')}</h2>
          <p className="mt-4 rounded-2xl border-2 border-dashed border-ink/20 p-8 text-ink/60">{t('about.teamTodo')}</p>
        </Reveal>
      </Wrap>
    </>
  )
}