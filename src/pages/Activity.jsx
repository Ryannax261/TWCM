import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContent } from '../content.js'
import { Wrap, Button, CardLink } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import PageHead from '../components/PageHead.jsx'
import NotFound from './NotFound.jsx'

export default function Activity() {
  const { t } = useTranslation()
  const { activities } = useContent()
  const a = activities.find((x) => x.slug === useParams().slug)
  if (!a) return <NotFound />
  const others = activities.filter((x) => x.slug !== a.slug)
  return (
    <>
      <PageHead crumbs={[[t('activities.crumb'), '/activites'], [a.title]]} title={a.title} intro={a.intro} />

      <Wrap className="grid gap-12 py-16 md:grid-cols-3">
        <div className="space-y-12 md:col-span-2">
          <section>
            <Reveal><h2 className="text-2xl font-bold">{t('activity.whatWeDo')}</h2></Reveal>
            <ul className="mt-6 space-y-3">
              {a.points.map((p, i) => (
                <Reveal as="li" key={p} delay={i * 100} className="flex items-start gap-3 rounded-xl border border-ink/10 p-4 transition hover:border-turmeric hover:shadow-md">
                  <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-turmeric text-sm font-bold text-ink">✓</span>
                  <span>{p}</span>
                </Reveal>
              ))}
            </ul>
          </section>

          {a.steps.length > 0 && (
            <section>
              <Reveal><h2 className="text-2xl font-bold">{t('activity.method')}</h2></Reveal>
              <ol className="mt-6 border-l-2 border-turmeric/40">
                {a.steps.map((s, i) => (
                  <Reveal as="li" key={s} delay={i * 100} className="relative pb-6 pl-8 last:pb-0">
                    <span className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">{i + 1}</span>
                    <p className="pt-1 font-semibold">{s}</p>
                  </Reveal>
                ))}
              </ol>
            </section>
          )}
        </div>

        <aside>
          <Reveal className="sticky top-28 rounded-3xl bg-ink p-7 text-white">
            <p className="font-display text-2xl font-bold">{t('activity.ctaTitle')}</p>
            <p className="mt-2 text-white/75">{t('activity.ctaText')}</p>
            <div className="mt-6"><Button to={`/contact?besoin=${a.need}`} dark>{a.cta}</Button></div>
          </Reveal>
        </aside>
      </Wrap>

      <section className="bg-mist">
        <Wrap className="py-16">
          <Reveal><h2 className="text-2xl font-bold">{t('activity.alsoDiscover')}</h2></Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 120}>
                <CardLink to={`/activites/${o.slug}`}>
                  <h3 className="text-xl font-bold">{o.title}</h3>
                  <p className="mt-2 text-ink/75">{o.intro}</p>
                </CardLink>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>
    </>
  )
}