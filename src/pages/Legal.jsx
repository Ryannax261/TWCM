import { Wrap } from '../components/ui.jsx'
import PageHead from '../components/PageHead.jsx'

export default function Legal({ title }) {
  return (
    <>
      <PageHead crumbs={[[title]]} title={title} />
      <Wrap className="py-14"><p className="max-w-2xl text-ink/80">Contenu juridique à compléter : dénomination, numéro d’enregistrement, siège, hébergeur du site et traitement des données personnelles.</p></Wrap>
    </>
  )
}
