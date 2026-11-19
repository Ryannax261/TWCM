import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { company, useContent } from '../content.js'
import { Wrap } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import PageHead from '../components/PageHead.jsx'

const input = 'mt-1.5 w-full rounded-xl border border-ink/20 bg-white px-4 py-3 outline-none transition placeholder:text-ink/35 focus:border-sea focus:ring-4 focus:ring-sea/15'

export default function Contact() {
  const { t } = useTranslation()
  const { needs } = useContent()
  const params = new URLSearchParams(useLocation().search)
  const ids = needs.map((n) => n.id)
  const wanted = ids.includes(params.get('besoin')) ? params.get('besoin') : ids[0]
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.target))
    const needLabel = needs.find((n) => n.id === d.besoin)?.label ?? d.besoin
    const body = `${t('contact.mailName')} : ${d.nom}\n${t('contact.mailCompany')} : ${d.societe}\n${t('contact.mailCountry')} : ${d.pays}\n${t('contact.mailNeed')} : ${needLabel}\n\n${d.message}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(t('contact.mailSubject', { need: needLabel }))}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <PageHead crumbs={[[t('contact.crumb')]]} title={t('contact.title')} intro={t('contact.intro')} />

      <Wrap className="py-16">
        <Reveal className="mx-auto max-w-3xl">
          <form onSubmit={submit} className="relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-7 shadow-xl md:p-10">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-turmeric via-turmeric to-sea" />

            <p className="text-sm font-semibold uppercase tracking-widest text-sea">{t('contact.eyebrow')}</p>
            <h2 className="mt-2 font-display text-3xl font-bold">{t('contact.heading')}</h2>
            <p className="mt-2 text-ink/65">{t('contact.sub')}</p>

            <fieldset className="mt-8">
              <legend className="text-sm font-semibold">{t('contact.need')}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {needs.map((n) => (
                  <label key={n.id} className="cursor-pointer">
                    <input type="radio" name="besoin" value={n.id} defaultChecked={n.id === wanted} className="peer sr-only" />
                    <span className="inline-block rounded-full border border-ink/20 px-5 py-2 text-sm font-semibold transition hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-sea/25">{n.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <label className="block text-sm font-semibold">{t('contact.name')}<input name="nom" required autoComplete="name" className={input} /></label>
              <label className="block text-sm font-semibold">{t('contact.company')}<input name="societe" autoComplete="organization" className={input} /></label>
              <label className="block text-sm font-semibold">{t('contact.country')}<input name="pays" autoComplete="country-name" className={input} /></label>
            </div>

            <label className="mt-5 block text-sm font-semibold">{t('contact.message')}
              <textarea name="message" required rows="6" placeholder={t('contact.placeholder')} className={input} />
            </label>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xs text-xs text-ink/50">{t('contact.privacy')}</p>
              <button className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-sea hover:shadow-lg">
                {t('contact.send')} <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
              </button>
            </div>

            {sent && <p role="status" className="mt-6 rounded-xl bg-turmeric/20 px-4 py-3 text-ink">{t('contact.sent')}</p>}
          </form>
        </Reveal>
      </Wrap>
    </>
  )
}