import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { activities, projects, partners, values, parcours } from '../content.js'
import { Wrap, Button, CardLink } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import RouteMap from '../components/RouteMap.jsx'
import ProcessSteps from '../components/ProcessSteps.jsx'

const words = ['Trading', 'Conseil', 'Distribution']

function Rotating() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % words.length), 2600)
    return () => clearInterval(t)
  }, [])
  return <span key={i} className="fade-up inline-block font-display font-bold text-turmeric">{words[i]}</span>
}

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="blob pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-sea/60 blur-3xl" />
        <div aria-hidden="true" className="blob pointer-events-none absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-turmeric/20 blur-3xl" style={{ animationDelay: '-6s' }} />
        <Wrap className="relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-28">
          <div>
            <h1 className="fade-up mt-4 text-4xl font-bold leading-tight md:text-6xl" style={{ '--d': '100ms' }}>
              De l’usine asiatique au client de l’<span className="text-turmeric">océan Indien</span>.
            </h1>
            <p className="fade-up mt-5 max-w-lg text-lg text-white/80" style={{ '--d': '200ms' }}>
              TWCM importe, conseille et distribue entre l’Asie, Maurice et Madagascar. Nos métiers : <Rotating />
            </p>
            <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ '--d': '300ms' }}>
              <Button to="/activites" dark>Nos activités</Button>
              <Link to="/contact" className="inline-block rounded-full border border-white/40 px-6 py-3 font-semibold transition hover:bg-white/10">Nous contacter</Link>
            </div>
          </div>
          <div className="fade-up rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur" style={{ '--d': '250ms' }}>
            <RouteMap />
          </div>
        </Wrap>
      </section>

      <Wrap className="py-20">
        <Reveal><h2 className="text-3xl font-bold md:text-4xl">Trois métiers, un même interlocuteur</h2></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {activities.map((a, i) => (
            <Reveal key={a.slug} delay={i * 120}>
              <CardLink to={`/activites/${a.slug}`}>
                <span className="font-display text-4xl font-bold text-turmeric">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-bold">{a.title}</h3>
                <p className="mt-3 text-ink/75">{a.intro}</p>
              </CardLink>
            </Reveal>
          ))}
        </div>
      </Wrap>

      <section className="bg-mist">
        <Wrap className="py-20">
          <Reveal><h2 className="text-3xl font-bold md:text-4xl">Du fournisseur à la livraison</h2></Reveal>
          <ProcessSteps steps={parcours} />
        </Wrap>
      </section>

      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
        <Wrap className="relative py-20">
          <Reveal><h2 className="text-3xl font-bold md:text-4xl">Pourquoi travailler avec TWCM</h2></Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v} delay={i * 120}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-turmeric">
                  <span className="font-display text-4xl font-bold text-turmeric">0{i + 1}</span>
                  <p className="mt-3 text-xl font-semibold">{v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      <Wrap className="py-20">
        <Reveal><h2 className="text-3xl font-bold md:text-4xl">Réalisations</h2></Reveal>
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
          <h2 className="text-2xl font-bold">Nos partenaires</h2>
          <ul className="flex flex-wrap gap-3">
            {partners.map((p) => <li key={p.name} className="rounded-full border border-ink/20 px-5 py-2 font-display font-bold transition hover:border-turmeric hover:bg-turmeric/10">{p.name}</li>)}
          </ul>
        </Wrap>
      </section>

      <section className="bg-gradient-to-r from-sea to-ink text-white">
        <Wrap className="flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <Reveal><h2 className="text-3xl font-bold md:text-4xl">Parlons de votre projet</h2></Reveal>
          <Reveal delay={150}><Button to="/contact" dark>Nous contacter</Button></Reveal>
        </Wrap>
      </section>
    </>
  )
}