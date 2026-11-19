import { useTranslation } from 'react-i18next'
import { Wrap } from '../components/ui.jsx'
import PageHead from '../components/PageHead.jsx'

export default function Legal({ kind }) {
  const { t } = useTranslation()
  const title = t(kind === 'privacy' ? 'legal.privacyTitle' : 'legal.legalTitle')
  return (
    <>
      <PageHead crumbs={[[title]]} title={title} />
      <Wrap className="py-14"><p className="max-w-2xl text-ink/80">{t('legal.todo')}</p></Wrap>
    </>
  )
}
