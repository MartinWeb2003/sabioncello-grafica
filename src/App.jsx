import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ONama from './pages/ONama'
import Usluge from './pages/Usluge'
import Izdvojeno from './pages/Izdvojeno'
import Kontakt from './pages/Kontakt'

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
