import { Wrap, Button } from '../components/ui.jsx'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <Wrap className="relative py-28 text-center">
        <p className="fade-up font-display text-8xl font-bold text-turmeric md:text-9xl">404</p>
        <h1 className="fade-up mt-4 text-3xl font-bold" style={{ '--d': '100ms' }}>Page introuvable</h1>
        <p className="fade-up mt-3 text-white/75" style={{ '--d': '200ms' }}>Cette adresse n’existe pas ou a changé.</p>
        <div className="fade-up mt-8" style={{ '--d': '300ms' }}><Button to="/" dark>Retour à l’accueil</Button></div>
      </Wrap>
    </section>
  )
}