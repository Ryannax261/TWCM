import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useContent } from '../content.js'
import { Wrap, CardLink } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import PageHead from '../components/PageHead.jsx'

export default function Projects() {
  const { t } = useTranslation()
  const { projects } = useContent()
  const ALL = '__all__' // valeur interne, indépendante de la langue
  const [pole, setPole] = useState(ALL)
  const poles = [ALL, ...new Set(projects.map((p) => p.pole))]
  // si la langue change, le pôle sélectionné n’existe plus : on revient à « Tous »
  const active = poles.includes(pole) ? pole : ALL
  const list = projects.filter((p) => active === ALL || p.pole === active)
  return (
    <>
      <PageHead crumbs={[[t('projects.crumb')]]} title={t('projects.title')} />
      <Wrap className="py-12">
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('projects.filterLabel')}>
          {poles.map((p) => (
            <button key={p} onClick={() => setPole(p)} aria-pressed={active === p}
              className={`rounded-full border px-5 py-2 text-sm transition ${active === p ? 'border-ink bg-ink text-white' : 'border-ink/20 hover:border-ink'}`}>{p === ALL ? t('projects.all') : p}</button>
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