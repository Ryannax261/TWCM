import { useState } from 'react'
import { projects } from '../content.js'
import { Wrap, CardLink } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import PageHead from '../components/PageHead.jsx'

export default function Projects() {
  const [pole, setPole] = useState('Tous')
  const poles = ['Tous', ...new Set(projects.map((p) => p.pole))]
  const list = projects.filter((p) => pole === 'Tous' || p.pole === pole)
  return (
    <>
      <PageHead crumbs={[['Réalisations']]} title="Nos réalisations" />
      <Wrap className="py-12">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par pôle">
          {poles.map((p) => (
            <button key={p} onClick={() => setPole(p)} aria-pressed={pole === p}
              className={`rounded-full border px-5 py-2 text-sm transition ${pole === p ? 'border-ink bg-ink text-white' : 'border-ink/20 hover:border-ink'}`}>{p}</button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={i * 120}>
              <CardLink to={`/realisations/${p.slug}`}>
                <p className="text-sm text-ink/60">{p.pole}, {p.country}</p>
                <h2 className="mt-1 text-xl font-bold">{p.title}</h2>
                <p className="mt-2 text-ink/75">{p.mission}</p>
              </CardLink>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </>
  )
}