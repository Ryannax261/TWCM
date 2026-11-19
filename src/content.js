import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

// Données non traduites (identiques dans toutes les langues).
export const company = {
  name: 'TWCM',
  email: 'twcm@gmail.com',
}

// Tout le texte du site est dans locales/fr.json et locales/en.json (clé « content »).
// Usage : const { activities, projects, partners, values, parcours, nav, needs } = useContent()
export function useContent() {
  const { t, i18n } = useTranslation()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => t('content', { returnObjects: true }), [i18n.resolvedLanguage])
}
