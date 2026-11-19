import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'
import { useContent } from '../content.js'
import { Wrap, Button, CardLink } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import RouteMap from '../components/RouteMap.jsx'
import Facets from '../components/Facets.jsx'
import ProcessSteps from '../components/ProcessSteps.jsx'

function Rotating() {
  const { t } = useTranslation()
  const words = t('home.words', { returnObjects: true })
  const [i, setI] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setI((x) => (x + 1) % words.length), 2600)
    return () => clearInterval(timer)
  }, [words.length])
  return <span key={i} className="fade-up inline-block font-display font-bold text-accent">{words[i]}</span>
}

export default function Home() {
  const { t } = useTranslation()
  const { activities, projects, partners, values, parcours } = useContent()
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
        <Facets className="absolute -left-40 -bottom-44 h-[34rem] w-[34rem] opacity-35" />
        <Wrap className="relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-28">
          <div>
            <h1 className="fade-up mt-4 text-4xl font-bold leading-tight md:text-6xl" style={{ '--d': '100ms' }}>
              <Trans i18nKey="home.title" components={{ hl: <span className="text-accent" /> }} />
            </h1>
            <p className="fade-up mt-5 max-w-lg text-lg text-white/80" style={{ '--d': '200ms' }}>
              {t('home.intro')} <Rotating />
            </p>
            <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ '--d': '300ms' }}>
              <Button to="/activites" dark>{t('home.ourActivities')}</Button>
              <Link to="/contact" className="inline-block rounded-full border border-white/40 px-6 py-3 font-semibold transition hover:bg-white/10">{t('ui.contactUs')}</Link>
            </div>
          </div>
          <div className="fade-up rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur" style={{ '--d': '250ms' }}>
            <RouteMap />
          </div>
        </Wrap>
      </section>

      <Wrap className="py-20">
        <Reveal><h2 className="text-3xl font-bold md:text-4xl">{t('home.threeTrades')}</h2></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {activities.map((a, i) => (
            <Reveal key={a.slug} delay={i * 120}>
              <CardLink to={`/activites/${a.slug}`}>
                <span className="font-display text-4xl font-bold text-ink">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-bold">{a.title}</h3>
                <p className="mt-3 text-ink/75">{a.intro}</p>
              </CardLink>
            </Reveal>
          ))}
        </div>
      </Wrap>

      <section className="bg-mist">
        <Wrap className="py-20">
          <Reveal><h2 className="text-3xl font-bold md:text-4xl">{t('home.supplierToDelivery')}</h2></Reveal>
          <ProcessSteps steps={parcours} />
        </Wrap>
      </section>

      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
        <Wrap className="relative py-20">
          <Reveal><h2 className="text-3xl font-bold md:text-4xl">{t('home.why')}</h2></Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v} delay={i * 120}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/40">
                  <span className="font-display text-4xl font-bold text-mist">0{i + 1}</span>
                  <p className="mt-3 text-xl font-semibold">{v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <Wrap className="py-20">
        <Reveal><h2 className="text-3xl font-bold md:text-4xl">{t('home.achievements')}</h2></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 120}>
              <CardLink to={`/realisations/${p.slug}`}>
                <p className="text-sm text-ink/60">{p.pole}, {p.country}</p>
                <h3 className="mt-1 text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-ink/75">{p.mission}</p>
              </CardLink>
            </Reveal>
          ))}
        </div>
      </Wrap>

      <section className="border-y border-ink/10">
        <Wrap className="flex flex-col items-start gap-6 py-12 md:flex-row md:items-center">
          <h2 className="text-2xl font-bold">{t('home.partners')}</h2>
          <ul className="flex flex-wrap gap-3">
            {partners.map((p) => <li key={p.name} className="rounded-full border border-ink/20 px-5 py-2 font-display font-bold transition hover:border-accent hover:bg-ink/10">{p.name}</li>)}
          </ul>
        </Wrap>
      </section>

      <section className="bg-gradient-to-r from-slate to-ink text-white">
        <Wrap className="flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <Reveal><h2 className="text-3xl font-bold md:text-4xl">{t('home.letsTalk')}</h2></Reveal>
          <Reveal delay={150}><Button to="/contact" dark>{t('ui.contactUs')}</Button></Reveal>
        </Wrap>
      </section>
    </>
  )
}