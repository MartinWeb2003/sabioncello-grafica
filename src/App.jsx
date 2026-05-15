import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ONama from './pages/ONama'
import Usluge from './pages/Usluge'
import Izdvojeno from './pages/Izdvojeno'
import Kontakt from './pages/Kontakt'

const ALL_VIDEOS = [
  'videos/ured.mp4',
  'videos/usluge/graficki-dizajn.mp4',
  'videos/usluge/tisak.mp4',
  'videos/usluge/tisak-tekstil-1.mp4',
  'videos/usluge/tisak-tekstil-2.mp4',
  'videos/usluge/vozila.mp4',
  'videos/usluge/led.mp4',
  'videos/usluge/putokazi-ploce.mp4',
  'videos/usluge/promo-materijali.mp4',
  'videos/usluge/lasersko-graviranje.mp4',
  'videos/usluge/sportska-natjecanja.mp4',
  'videos/usluge/uv-tisak.mp4',
  'videos/izdvojeno/jelovnici.mp4',
  'videos/izdvojeno/pecat.mp4',
  'videos/izdvojeno/trofeji.mp4',
  'videos/izdvojeno/etikete.mp4',
  'videos/izdvojeno/pp-pokloni.mp4',
  'videos/izdvojeno/vjencanje.mp4',
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  useEffect(() => {
    const base = import.meta.env.BASE_URL
    const schedule = window.requestIdleCallback ?? (cb => setTimeout(cb, 1500))
    schedule(() => {
      ALL_VIDEOS.forEach(path => {
        const link = document.createElement('link')
        link.rel  = 'prefetch'
        link.as   = 'video'
        link.href = `${base}${path}`
        document.head.appendChild(link)
      })
    })
  }, [])

  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"             element={<Layout><Home /></Layout>} />
        <Route path="/index.html"   element={<Navigate to="/" replace />} />
        <Route path="/o-nama"       element={<Layout><ONama /></Layout>} />
        <Route path="/usluge"       element={<Layout><Usluge /></Layout>} />
        <Route path="/izdvojeno"    element={<Layout><Izdvojeno /></Layout>} />
        <Route path="/kontakt"      element={<Layout><Kontakt /></Layout>} />
        {/* Catch-all → home */}
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
