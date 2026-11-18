import { useParams } from 'react-router-dom'
import { projects } from '../content.js'
import { Wrap, CardLink } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import PageHead from '../components/PageHead.jsx'
import NotFound from './NotFound.jsx'

export default function Project() {
  const idx = projects.findIndex((x) => x.slug === useParams().slug)
  if (idx < 0) return <NotFound />
  const p = projects[idx]
  const next = projects[(idx + 1) % projects.length]
  return (
    <>
      <PageHead crumbs={[['Réalisations', '/realisations'], [p.title]]} title={p.title} intro={`${p.pole}, ${p.country}`} />

      <Wrap className="grid gap-6 py-16 md:grid-cols-3">
        {[['Contexte', p.context], ['Mission', p.mission], ['Résultats', p.result]].map(([h, t], i) => (
          <Reveal key={h} delay={i * 120}>
            <section className="h-full rounded-2xl border border-ink/10 p-7 transition duration-300 hover:-translate-y-1 hover:border-turmeric hover:shadow-xl">
              <span className="font-display text-4xl font-bold text-turmeric">0{i + 1}</span>
              <h2 className="mt-3 text-2xl font-bold">{h}</h2>
              <p className="mt-3 text-ink/75">{t}</p>
            </section>
          </Reveal>
        ))}
      </Wrap>

      {next.slug !== p.slug && (
        <section className="bg-mist">
          <Wrap className="py-16">
            <Reveal><h2 className="text-2xl font-bold">Réalisation suivante</h2></Reveal>
            <Reveal delay={120} className="mt-6 max-w-xl">
              <CardLink to={`/realisations/${next.slug}`}>
                <p className="text-sm text-ink/60">{next.pole}, {next.country}</p>
                <h3 className="mt-1 text-xl font-bold">{next.title}</h3>
              </CardLink>
            </Reveal>
          </Wrap>
        </section>
      )}
    </>
  )
}