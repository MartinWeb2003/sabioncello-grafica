import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Glavna navigacija">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo" aria-label="Sabioncello Grafica – početna" onClick={close}>
          <img src="assets/img/logo.png" alt="Sabioncello Grafica"
            onError={e => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <span className="nav-logo-text" style={{ display: 'none' }}>
            <span className="logo-main">Sabioncello</span>
            <span className="logo-sub">Grafica</span>
          </span>
        </NavLink>

        <ul className={`nav-links${open ? ' open' : ''}`}>
          <li><NavLink to="/"          className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={close}>Početna</NavLink></li>
          <li><NavLink to="/o-nama"    className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={close}>O Nama</NavLink></li>
          <li><NavLink to="/usluge"    className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={close}>Usluge</NavLink></li>
          <li><NavLink to="/izdvojeno" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={close}>Izdvojeno</NavLink></li>
          <li><NavLink to="/kontakt"   className={({isActive}) => 'nav-link nav-cta' + (isActive ? ' active' : '')} onClick={close}>Kontakt</NavLink></li>
        </ul>

        <button
          className={`hamburger${open ? ' open' : ''}`}
          aria-label="Izbornik"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
