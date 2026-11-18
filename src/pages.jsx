import { useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { company, activities, projects, partners, values } from './content.js'

const Wrap = ({ children, className = '' }) => <div className={`mx-auto max-w-6xl px-5 ${className}`}>{children}</div>

function Crumbs({ items }) {
  return (
    <nav aria-label="Fil d’Ariane" className="text-sm text-ink/60">
      <Link to="/" className="hover:text-sea">Accueil</Link>
      {items.map(([label, to]) => (
        <span key={label}> / {to ? <Link to={to} className="hover:text-sea">{label}</Link> : <span className="text-ink">{label}</span>}</span>
      ))}
    </nav>
  )
}

function PageHead({ crumbs, title, intro }) {
  return (
    <section className="bg-mist">
      <Wrap className="py-12 md:py-16">
        <Crumbs items={crumbs} />
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-ink/80">{intro}</p>}
      </Wrap>
    </section>
  )
}

const Button = ({ to, children, dark }) => (
  <Link to={to} className={`inline-block rounded px-5 py-3 font-semibold ${dark ? 'bg-white text-ink hover:bg-turmeric' : 'bg-ink text-white hover:bg-sea'}`}>{children}</Link>
)

function Route() {
  return (
    <svg viewBox="0 0 600 200" className="w-full" role="img" aria-label="Route commerciale de l’Asie vers Maurice puis Madagascar">
      <path className="route-line" d="M580 40 C400 10 300 190 20 150" fill="none" stroke="#E3A81B" strokeWidth="3" strokeLinecap="round" strokeDasharray="1" />
      {[[580, 40, 'Asie', -10], [337, 99, 'Maurice', -14], [20, 150, 'Madagascar', -14]].map(([x, y, t, dy]) => (
        <g key={t}>
          <circle cx={x} cy={y} r="7" fill="#fff" />
          <text x={x} y={y + dy} fill="#fff" fontSize="15" textAnchor={x > 500 ? 'end' : x < 60 ? 'start' : 'middle'}>{t}</text>
        </g>
      ))}
    </svg>
  )
}

export function Home() {
  return (
    <>
      <section className="bg-ink text-white">
        <Wrap className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">De l’usine asiatique au client de l’océan Indien.</h1>
            <p className="mt-5 max-w-lg text-lg text-white/80">TWCM, société mauricienne, importe, conseille et distribue entre l’Asie, Maurice et Madagascar.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/activites" dark>Nos activités</Button>
              <Link to="/contact" className="inline-block rounded border border-white/40 px-5 py-3 font-semibold hover:bg-white/10">Nous contacter</Link>
            </div>
          </div>
          <Route />
        </Wrap>
      </section>

      <Wrap className="py-16">
        <h2 className="text-3xl font-bold">Trois métiers, un même interlocuteur</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {activities.map((a) => (
            <Link key={a.slug} to={`/activites/${a.slug}`} className="group border-t-4 border-sea bg-mist p-6 hover:border-turmeric">
              <h3 className="text-xl font-bold">{a.title}</h3>
              <p className="mt-3 text-ink/80">{a.intro}</p>
              <span className="mt-4 inline-block font-semibold text-sea group-hover:underline">Voir le détail</span>
            </Link>
          ))}
        </div>
      </Wrap>

      <section className="bg-mist">
        <Wrap className="py-16">
          <h2 className="text-3xl font-bold">Réalisations</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <Link key={p.slug} to={`/realisations/${p.slug}`} className="bg-white p-6 hover:shadow-md">
                <p className="text-sm text-ink/60">{p.pole}, {p.country}</p>
                <h3 className="mt-1 text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-ink/80">{p.mission}</p>
              </Link>
            ))}
          </div>
        </Wrap>
      </section>

      <Wrap className="py-16">
        <h2 className="text-3xl font-bold">Nos partenaires</h2>
        <ul className="mt-6 flex flex-wrap gap-4">
          {partners.map((p) => <li key={p.name} className="border border-ink/20 px-5 py-3 font-display font-bold">{p.name}</li>)}
        </ul>
      </Wrap>

      <section className="bg-sea text-white">
        <Wrap className="flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
          <h2 className="text-3xl font-bold">Parlons de votre projet</h2>
          <Button to="/contact" dark>Nous contacter</Button>
        </Wrap>
      </section>
    </>
  )
}

export function About() {
  return (
    <>
      <PageHead crumbs={[['À propos']]} title="Une société mauricienne tournée vers l’Asie et l’océan Indien" />
      <Wrap className="grid gap-12 py-14 md:grid-cols-2">
        <section>
          <h2 className="text-2xl font-bold">Qui sommes-nous</h2>
          <p className="mt-3 text-ink/80">TWCM est une société de droit mauricien. Elle intervient à Maurice, à Madagascar et en Asie dans le trading, le conseil en business et la distribution d’équipements électriques.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold">Mission et valeurs</h2>
          <ul className="mt-3 space-y-2 text-ink/80">{values.map((v) => <li key={v}>{v}</li>)}</ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold">Équipe dirigeante</h2>
          <p className="mt-3 text-ink/80">Photo, nom, fonction et courte biographie de chaque membre : à compléter.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold">Notre réseau</h2>
          <p className="mt-3 text-ink/80">Nos partenaires et nos zones couvertes. <Link className="font-semibold text-sea underline" to="/partenaires">Voir les partenaires</Link></p>
        </section>
      </Wrap>
    </>
  )
}

export function Activities() {
  return (
    <>
      <PageHead crumbs={[['Activités']]} title="Nos activités" intro="Trois pôles complémentaires, un seul interlocuteur." />
      <Wrap className="grid gap-6 py-14 md:grid-cols-3">
        {activities.map((a) => (
          <Link key={a.slug} to={`/activites/${a.slug}`} className="border-t-4 border-sea bg-mist p-6 hover:border-turmeric">
            <h2 className="text-xl font-bold">{a.title}</h2>
            <p className="mt-3 text-ink/80">{a.intro}</p>
          </Link>
        ))}
      </Wrap>
    </>
  )
}

export function Activity() {
  const a = activities.find((x) => x.slug === useParams().slug)
  if (!a) return <NotFound />
  return (
    <>
      <PageHead crumbs={[['Activités', '/activites'], [a.title]]} title={a.title} intro={a.intro} />
      <Wrap className="grid gap-12 py-14 md:grid-cols-2">
        <section>
          <h2 className="text-2xl font-bold">Ce que nous faisons</h2>
          <ul className="mt-4 space-y-2 text-ink/80">{a.points.map((p) => <li key={p} className="border-l-4 border-turmeric pl-3">{p}</li>)}</ul>
        </section>
        {a.steps.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold">Notre méthode</h2>
            <ol className="mt-4 space-y-2 text-ink/80">{a.steps.map((s, i) => <li key={s}>{i + 1}. {s}</li>)}</ol>
          </section>
        )}
      </Wrap>
      <Wrap className="pb-16"><Button to={`/contact?besoin=${a.need}`}>{a.cta}</Button></Wrap>
    </>
  )
}

export function Projects() {
  const [pole, setPole] = useState('Tous')
  const poles = ['Tous', ...new Set(projects.map((p) => p.pole))]
  const list = projects.filter((p) => pole === 'Tous' || p.pole === pole)
  return (
    <>
      <PageHead crumbs={[['Réalisations']]} title="Nos réalisations" />
      <Wrap className="py-10">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par pôle">
          {poles.map((p) => (
            <button key={p} onClick={() => setPole(p)} aria-pressed={pole === p}
              className={`rounded border px-4 py-2 text-sm ${pole === p ? 'border-ink bg-ink text-white' : 'border-ink/20 hover:border-ink'}`}>{p}</button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {list.map((p) => (
            <Link key={p.slug} to={`/realisations/${p.slug}`} className="bg-mist p-6 hover:shadow-md">
              <p className="text-sm text-ink/60">{p.pole}, {p.country}</p>
              <h2 className="mt-1 text-xl font-bold">{p.title}</h2>
              <p className="mt-2 text-ink/80">{p.mission}</p>
            </Link>
          ))}
        </div>
      </Wrap>
    </>
  )
}

export function Project() {
  const p = projects.find((x) => x.slug === useParams().slug)
  if (!p) return <NotFound />
  return (
    <>
      <PageHead crumbs={[['Réalisations', '/realisations'], [p.title]]} title={p.title} intro={`${p.pole}, ${p.country}`} />
      <Wrap className="grid gap-10 py-14 md:grid-cols-3">
        {[['Contexte', p.context], ['Mission', p.mission], ['Résultats', p.result]].map(([h, t]) => (
          <section key={h}><h2 className="text-2xl font-bold">{h}</h2><p className="mt-3 text-ink/80">{t}</p></section>
        ))}
      </Wrap>
    </>
  )
}

export function Partners() {
  return (
    <>
      <PageHead crumbs={[['Partenaires']]} title="Nos partenaires" />
      <Wrap className="grid gap-6 py-14 md:grid-cols-2">
        {partners.map((p) => (
          <section key={p.name} className="border border-ink/15 p-6"><h2 className="text-xl font-bold">{p.name}</h2><p className="mt-2 text-ink/80">{p.text}</p></section>
        ))}
      </Wrap>
      <Wrap className="pb-16">
        <p className="text-ink/80">Vous souhaitez devenir partenaire de TWCM ?</p>
        <div className="mt-3"><Button to="/contact?besoin=Partenariat">Nous écrire</Button></div>
      </Wrap>
    </>
  )
}

const field = 'mt-1 w-full rounded border border-ink/25 px-3 py-2'

export function Contact() {
  const params = new URLSearchParams(useLocation().search)
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.target))
    const body = `Nom : ${d.nom}\nSociété : ${d.societe}\nPays : ${d.pays}\nBesoin : ${d.besoin}\n\n${d.message}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent('Demande via le site : ' + d.besoin)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }
  return (
    <>
      <PageHead crumbs={[['Contact']]} title="Contactez-nous" />
      <Wrap className="grid gap-12 py-14 md:grid-cols-2">
        <form onSubmit={submit} className="space-y-4">
          <label className="block">Nom<input name="nom" required className={field} /></label>
          <label className="block">Société<input name="societe" className={field} /></label>
          <label className="block">Pays<input name="pays" className={field} /></label>
          <label className="block">Votre besoin
            <select name="besoin" defaultValue={params.get('besoin') || 'Trading'} className={field}>
              {['Trading', 'Conseil', 'Distribution', 'Partenariat'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
          <label className="block">Message<textarea name="message" required rows="5" className={field} /></label>
          <button className="rounded bg-ink px-5 py-3 font-semibold text-white hover:bg-sea">Envoyer le message</button>
          {sent && <p role="status" className="text-sea">Votre application de messagerie s’est ouverte pour envoyer le message.</p>}
        </form>
        <div className="space-y-3 text-ink/80">
          <h2 className="font-display text-2xl font-bold text-ink">Coordonnées</h2>
          <p>{company.address}</p>
          <p><a className="text-sea underline" href={`mailto:${company.email}`}>{company.email}</a></p>
          <p>{company.phone}</p>
          <p><a className="text-sea underline" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a></p>
          <p>{company.hours}</p>
        </div>
      </Wrap>
    </>
  )
}

export function Legal({ title }) {
  return (
    <>
      <PageHead crumbs={[[title]]} title={title} />
      <Wrap className="py-14"><p className="max-w-2xl text-ink/80">Contenu juridique à compléter : dénomination, numéro d’enregistrement, siège, hébergeur du site et traitement des données personnelles.</p></Wrap>
    </>
  )
}

export function NotFound() {
  return (
    <Wrap className="py-24">
      <h1 className="text-4xl font-bold">Page introuvable</h1>
      <p className="mt-3 text-ink/80">Cette adresse n’existe pas ou a changé.</p>
      <div className="mt-6"><Button to="/">Retour à l’accueil</Button></div>
    </Wrap>
  )
}
