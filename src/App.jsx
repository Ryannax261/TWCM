import { Routes, Route, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Activities from './pages/Activities.jsx'
import Activity from './pages/Activity.jsx'
import Projects from './pages/Projects.jsx'
import Project from './pages/Project.jsx'
import Partners from './pages/Partners.jsx'
import Contact from './pages/Contact.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  return (
    <>
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-ink">{t('ui.skip')}</a>
      <Header />
      <main id="contenu" key={pathname} className="page-enter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/activites" element={<Activities />} />
          <Route path="/activites/:slug" element={<Activity />} />
          <Route path="/realisations" element={<Projects />} />
          <Route path="/realisations/:slug" element={<Project />} />
          <Route path="/partenaires" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<Legal kind="legal" />} />
          <Route path="/confidentialite" element={<Legal kind="privacy" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}