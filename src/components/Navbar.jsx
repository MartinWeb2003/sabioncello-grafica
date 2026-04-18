import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/',          label: 'Početna'              },
  { to: '/o-nama',    label: 'O Nama'               },
  { to: '/usluge',    label: 'Usluge'               },
  { to: '/izdvojeno', label: 'Izdvojeno'            },
  { to: '/kontakt',   label: 'Kontakt', cta: true   },
]

/* Bubble menu — 3 items top row, 2 bottom (Kontakt wider CTA), random delays, per-item tilt */
const BUBBLE_ITEMS = [
  { to: '/',          label: 'Početna',   cta: false, delay: 1, rotate: -4   },
  { to: '/o-nama',    label: 'O Nama',    cta: false, delay: 3, rotate:  5   },
  { to: '/usluge',    label: 'Usluge',    cta: false, delay: 0, rotate: -3   },
  { to: '/izdvojeno', label: 'Izdvojeno', cta: false, delay: 2, rotate:  4   },
  { to: '/kontakt',   label: 'Kontakt',   cta: true,  delay: 4, rotate: -1.5 },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden,   setHidden]   = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 30)
      if (y > lastY && y > 80) setHidden(true)
      else if (y < lastY)      setHidden(false)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  /* Close on Escape */
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <nav
        className={`navbar${scrolled ? ' scrolled' : ''}${hidden && !open ? ' navbar--hidden' : ''}`}
        aria-label="Glavna navigacija"
      >
        <div className="nav-container">
          <NavLink to="/" className="nav-logo" aria-label="Sabioncello Grafica – početna" onClick={close}>
            <img
              src={`${import.meta.env.BASE_URL}assets/img/logo-favicon.png`}
              alt="Sabioncello Grafica"
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

          <ul className="nav-links" aria-label="Navigacija">
            {NAV_ITEMS.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    'nav-link' + (item.cta ? ' nav-cta' : '') + (isActive ? ' active' : '')
                  }
                  onClick={close}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            className={`hamburger${open ? ' open' : ''}`}
            aria-label={open ? 'Zatvori izbornik' : 'Otvori izbornik'}
            aria-expanded={open}
            aria-controls="bubble-menu"
            onClick={() => setOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── Bubble menu overlay ─────────────────────────────────── */}
      <div
        id="bubble-menu"
        className={`bubble-menu${open ? ' bubble-menu--open' : ''}`}
        aria-hidden={!open}
        role="dialog"
        aria-label="Navigacijski izbornik"
      >
        <div className="bubble-menu__backdrop" onClick={close} aria-hidden="true" />
        <nav className="bubble-menu__nav" aria-label="Stranice">
          {BUBBLE_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `bubble-item${item.cta ? ' bubble-item--cta' : ''}${isActive ? ' bubble-item--active' : ''}`
              }
              style={{ '--i': item.delay, '--r': `${item.rotate}deg` }}
              onClick={close}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  )
}
