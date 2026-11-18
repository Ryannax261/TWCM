import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { company } from '../content.js'
import { Wrap } from '../components/ui.jsx'
import Reveal from '../components/Reveal.jsx'
import PageHead from '../components/PageHead.jsx'

const input = 'mt-1.5 w-full rounded-xl border border-ink/20 bg-white px-4 py-3 outline-none transition focus:border-sea focus:ring-4 focus:ring-sea/15'

export default function Contact() {
  const params = new URLSearchParams(useLocation().search)
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.target))
    const body = `Nom : ${d.nom}\nSociété : ${d.societe}\nPays : ${d.pays}\nBesoin : ${d.besoin}\n\n${d.message}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent('Demande via le site : ' + d.besoin)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }
  const infos = [
    ['Email', company.email, `mailto:${company.email}`],
    ['Téléphone', company.phone, `tel:${company.phone.replace(/\s/g, '')}`],
    ['WhatsApp', 'Écrire sur WhatsApp', `https://wa.me/${company.whatsapp}`],
    ['Adresse', company.address],
    ['Horaires', company.hours],
  ]
  return (
    <>
      <PageHead crumbs={[['Contact']]} title="Contactez-nous" intro="Une question, un devis, un projet : écrivez-nous." />
      <Wrap className="grid gap-8 py-16 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <form onSubmit={submit} className="space-y-5 rounded-3xl border border-ink/10 bg-white p-7 shadow-lg md:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold">Nom<input name="nom" required className={input} /></label>
              <label className="block text-sm font-semibold">Société<input name="societe" className={input} /></label>
              <label className="block text-sm font-semibold">Pays<input name="pays" className={input} /></label>
              <label className="block text-sm font-semibold">Votre besoin
                <select name="besoin" defaultValue={params.get('besoin') || 'Trading'} className={input}>
                  {['Trading', 'Conseil', 'Distribution', 'Partenariat'].map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
            </div>
            <label className="block text-sm font-semibold">Message<textarea name="message" required rows="5" className={input} /></label>
            <button className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-sea hover:shadow-lg">
              Envoyer le message <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </button>
            {sent && <p role="status" className="rounded-xl bg-turmeric/20 px-4 py-3 text-ink">Votre application de messagerie s’est ouverte pour envoyer le message.</p>}
          </form>
        </Reveal>

        <Reveal delay={150} className="md:col-span-2">
          <div className="relative h-full overflow-hidden rounded-3xl bg-ink p-7 text-white md:p-9">
            <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
            <div aria-hidden="true" className="blob pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sea/60 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold">Coordonnées</h2>
              <dl className="mt-6 space-y-5">
                {infos.map(([k, v, href]) => (
                  <div key={k}>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-turmeric">{k}</dt>
                    <dd className="mt-1">{href ? <a href={href} className="transition hover:text-turmeric" {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>{v}</a> : v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </Wrap>
    </>
  )
}