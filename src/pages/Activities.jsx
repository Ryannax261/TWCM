import { useTranslation } from 'react-i18next'
import { useContent } from '../content.js'
import { Wrap, CardLink } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import PageHead from '../components/PageHead.jsx'

export default function Activities() {
  const { t } = useTranslation()
  const { activities } = useContent()
  return (
    <>
      <PageHead crumbs={[[t('activities.crumb')]]} title={t('activities.title')} intro={t('activities.intro')} />
      <Wrap className="grid gap-6 py-16 md:grid-cols-3">
        {activities.map((a, i) => (
          <Reveal key={a.slug} delay={i * 120}>
            <CardLink to={`/activites/${a.slug}`}>
              <span className="font-display text-4xl font-bold text-ink">0{i + 1}</span>
              <h2 className="mt-3 text-xl font-bold">{a.title}</h2>
              <p className="mt-3 text-ink/75">{a.intro}</p>
            </CardLink>
          </Reveal>
        ))}
      </Wrap>
    </>
  )
}