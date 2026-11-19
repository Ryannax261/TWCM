import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

// Données non traduites (identiques dans toutes les langues).
// Coordonnées reprises de la carte de visite TWCM Holding.
export const company = {
  name: 'TWCM Holding Co., Ltd',
  shortName: 'TWCM',
  ceo: 'Mikyle Chou',
  email: 'info@twcmholding.com',
  phone: '+261 343 873 406',
  whatsapp: '261343873406', // format wa.me : indicatif pays sans « + »
  website: 'www.twcmholding.com',
  address: '10th Floor, Sterling Tower, 14 Poudrière St, Port Louis, Mauritius',
}

// Tout le texte du site est dans locales/fr.json et locales/en.json (clé « content »).
// Usage : const { activities, projects, partners, values, parcours, nav, needs } = useContent()
export function useContent() {
  const { t, i18n } = useTranslation()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => t('content', { returnObjects: true }), [i18n.resolvedLanguage])
}
