import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import fr from './locales/fr.json'
import en from './locales/en.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { fr: { translation: fr }, en: { translation: en } },
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    nonExplicitSupportedLngs: true, // « en-US » → « en »
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
  })

// Garde l’attribut lang de <html> synchronisé (accessibilité, SEO).
const setLang = (lng) => { document.documentElement.lang = (lng || 'fr').slice(0, 2) }
setLang(i18n.resolvedLanguage)
i18n.on('languageChanged', setLang)

export default i18n
