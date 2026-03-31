import { useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import CTABig from '../components/CTABig'

/* ── HERO NEW ────────────────────────────────────────────── */
const HERO_CARDS = [
  { icon: 'fa-pen-nib',   line1: 'Grafički',   line2: 'Dizajn',   desc: 'Logotipi · Branding · Tiskovine' },
  { icon: 'fa-print',     line1: 'Visoki',      line2: 'Tisak',    desc: 'Digitalni · Ofsetni · Veliki formati' },
  { icon: 'fa-tshirt',    line1: 'Vez &',       line2: 'Tekstil',  desc: 'Uniforme · Majice · Suveniri' },
  { icon: 'fa-car',       line1: 'Brendiranje', line2: 'Vozila',   desc: 'Wrap · Foliranje · Fasade' },
  { icon: 'fa-lightbulb', line1: 'Svjetleće',   line2: 'Reklame',  desc: 'LED · Neonski · Kanalna slova' },
]
const L1 = 'SABIONCELLO'
const L2 = 'GRAFICA'

function HeroNew() {
  const wheelRef     = useRef(null)
  const l1Refs       = useRef([])
  const l2Refs       = useRef([])
  const rafRef       = useRef(null)
  const lastTsRef    = useRef(null)
  const angleRef     = useRef(0)
  const targetMxRef  = useRef(0)
  const currentMxRef = useRef(0)

  useEffect(() => {
    targetMxRef.current  = window.innerWidth / 2
    currentMxRef.current = window.innerWidth / 2

    function tick(ts) {
      if (lastTsRef.current === null) lastTsRef.current = ts
      const dt = Math.min(ts - lastTsRef.current, 50)
      lastTsRef.current = ts

      /* Rotate wheel clockwise: 24°/s = full circle in 15 s */
      angleRef.current = (angleRef.current + 24 * dt / 1000) % 360
      if (wheelRef.current) {
        const sc = window.innerWidth < 430 ? 0.38
                 : window.innerWidth < 560 ? 0.52
                 : window.innerWidth < 768 ? 0.65
                 : window.innerWidth < 960 ? 0.83
                 : 1
        wheelRef.current.style.transform =
          `scale(${sc}) rotateZ(-20deg) rotateX(-22deg) rotateY(${angleRef.current}deg)`
      }

      /* Smooth mouse X lerp */
      currentMxRef.current += (targetMxRef.current - currentMxRef.current) * 0.07

      /* Per-letter scaleY — height driven by proximity to mouse X */
      const mx     = currentMxRef.current
      const radius = window.innerWidth * 0.38
      ;[...l1Refs.current, ...l2Refs.current].forEach(el => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx   = rect.left + rect.width / 2
        const t    = Math.max(0, 1 - Math.abs(mx - cx) / radius)
        const sy   = 0.93 + (t * t * (3 - 2 * t)) * 0.14  /* smoothstep 0.93 – 1.07, ~15% range */
        el.style.transform = `scaleY(${sy})`
      })

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(rafRef.current); lastTsRef.current = null }
  }, [])

  const handleMouseMove  = useCallback(e => { targetMxRef.current = e.clientX }, [])
  const handleMouseLeave = useCallback(() => { targetMxRef.current = window.innerWidth / 2 }, [])

  return (
    <section
      className="hero-new"
      aria-label="Sabioncello Grafica — naše usluge"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shared 3D stage — title letters and carousel depth-sorted together */}
      <div className="hero-3d-stage">
        <div className="hero-3d-world">

          {/* Giant title — letters rendered at z = 0 */}
          <div className="hero-title-block" aria-hidden="true">
            <div className="hero-title-row">
              {L1.split('').map((ch, i) => (
                <span
                  key={i}
                  className="hero-letter"
                  ref={el => { l1Refs.current[i] = el }}
                >{ch}</span>
              ))}
            </div>
            <div className="hero-title-row">
              {L2.split('').map((ch, i) => (
                <span
                  key={i}
                  className="hero-letter hero-letter--2"
                  ref={el => { l2Refs.current[i] = el }}
                >{ch}</span>
              ))}
            </div>
          </div>

          {/* 3D carousel wheel — continuous clockwise rotation via RAF */}
          <div className="hero-wheel" ref={wheelRef} aria-hidden="true">
            {HERO_CARDS.map((card, cardIdx) => {
              /* Split each card into N slices placed on the circle surface */
              const N = 8, W = 240, R = 260, sliceW = W / N
              const base = cardIdx * 72
              return Array.from({ length: N }, (_, j) => {
                const xc  = (j - (N - 1) / 2) * sliceW
                const arc = Math.asin(xc / R) * (180 / Math.PI)
                const isL = j === 0, isR = j === N - 1
                return (
                  <div
                    key={`${cardIdx}-${j}`}
                    className="hero-slice"
                    style={{ transform: `rotateY(${base + arc}deg) translateZ(${R}px)` }}
                  >
                    <div className={`hero-slice__front${isL ? ' hero-slice__front--l' : ''}${isR ? ' hero-slice__front--r' : ''}`}>
                      <div className="hero-slice__content" style={{ left: `${-j * sliceW}px` }}>
                        <div className="hero-card__top">
                          <div className="hero-card__icon">
                            <i className={`fas ${card.icon}`} aria-hidden="true"></i>
                          </div>
                          <span className="hero-card__num">0{cardIdx + 1}</span>
                        </div>
                        <div className="hero-card__body">
                          <h2 className="hero-card__title">
                            {card.line1}<br /><em>{card.line2}</em>
                          </h2>
                          <p className="hero-card__desc">{card.desc}</p>
                        </div>
                      </div>
                    </div>
                    <div className={`hero-slice__back${isL ? ' hero-slice__back--l' : ''}${isR ? ' hero-slice__back--r' : ''}`} />
                  </div>
                )
              })
            })}
          </div>

        </div>
      </div>

      {/* Bottom CTA bar */}
      <div className="hero-new__footer">
        <p className="hero-new__tagline">20 godina iskustva · Orebić, Pelješac</p>
        <div className="hero-new__footer-btns">
          <Link to="/usluge"  className="btn btn-dark btn-lg">Naše usluge <i className="fas fa-arrow-right"></i></Link>
          <Link to="/kontakt" className="btn btn-outline-inv btn-lg">Kontaktirajte nas</Link>
        </div>
      </div>
    </section>
  )
}

/* ── STATS BAND ──────────────────────────────────────────── */
function StatsBand() {
  const ref = useRef(null)

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.stat-number[data-count]')
    if (!items) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const target = parseInt(entry.target.dataset.count, 10)
        const dur = 1800
        const t0 = performance.now();
        (function tick(now) {
          const p = Math.min((now - t0) / dur, 1)
          entry.target.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target).toLocaleString('hr-HR')
          if (p < 1) requestAnimationFrame(tick)
        })(performance.now())
      })
    }, { threshold: 0.5 })
    items.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="stats-band" aria-label="Statistike" ref={ref}>
      <div className="container">
        <div className="stats-band-layout">
          <div className="stats-band-copy">
            <h2 className="stats-band-headline">
              Iskustvo koje<br /><em>govori samo za sebe</em>
            </h2>
            <p className="stats-band-desc">
              Dva desetljeća grafičkog dizajna, tiska i brendiranja — od prve skice
              do gotovog proizvoda u Vašim rukama.
            </p>
            <div className="stats-band-divider" aria-hidden="true" />
          </div>
          <div className="stats-band-numbers">
            <div className="stat-item">
              <div className="stat-count">
                <span className="stat-number" data-count="20">0</span>
                <span className="stat-plus">+</span>
              </div>
              <span className="stat-label">Godina iskustva</span>
            </div>
            <div className="stat-item">
              <div className="stat-count">
                <span className="stat-number" data-count="500">0</span>
                <span className="stat-plus">+</span>
              </div>
              <span className="stat-label">Zadovoljnih klijenata</span>
            </div>
            <div className="stat-item">
              <div className="stat-count">
                <span className="stat-number" data-count="7">0</span>
              </div>
              <span className="stat-label">Kategorija usluga</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── AOS OBSERVER HOOK ───────────────────────────────────── */
function useAOS(containerRef) {
  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('[data-aos]')
    if (!els || !els.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = Array.from((entry.target.parentElement || document).querySelectorAll('[data-aos]'))
          const delay = siblings.indexOf(entry.target) * 80
          setTimeout(() => entry.target.classList.add('visible'), delay)
        } else {
          entry.target.classList.remove('visible')
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ── REVIEWS SECTION ─────────────────────────────────────── */
const REVIEWS = [
  { initials: 'D',  name: 'Dorian',              since: '3 years ago',  text: '"I highly recommend the graphic design services provided by Sabioncello Grafica. The team is incredibly talented and dedicated to creating visually stunning work."' },
  { initials: 'JP', name: 'Josip Prižmić',       since: '3 years ago',  text: '"Super!"' },
  { initials: 'TP', name: 'Tomislav Princivali', since: '3 years ago',  text: '"Kiki i Sabioncello su napravili super posao sa našim logom, vizitkama i naljepnicama. Za svaku preporuku. Hvala!"' },
  { initials: 'JK', name: 'Josip Klemen',        since: '2 years ago',  text: '"Profesionalni, odlična usluga. Preporuka 10/10."' },
  { initials: 'MV', name: 'Marko Vidović',       since: '9 months ago', text: '"Najbolji 🫶🏻"' },
]

/* Scatter positions — designed to look organic but balanced.
   vy / vx = total pixel drift over full scroll progress 0→1 */
const REVIEW_LAYOUT = [
  { left: '4%',  top: '14%', width: 440, vy: -480, vx:  20, rotate: '-1.5deg' },
  { left: '62%', top: '8%',  width: 320, vy: -660, vx: -28, rotate: '2.5deg'  },
  { left: '28%', top: '42%', width: 500, vy: -340, vx:  16, rotate: '-0.8deg' },
  { left: '4%',  top: '66%', width: 390, vy: -740, vx:  30, rotate: '-2.5deg' },
  { left: '62%', top: '56%', width: 340, vy: -590, vx: -20, rotate: '3deg'    },
]

function Reviews() {
  return (
    <section className="reviews-section" aria-labelledby="reviews-h">
      <div className="reviews-header-overlay">
        <div className="container">
          <div className="reviews-big-head" aria-hidden="true">
            <span className="reviews-big-word">ŠTO</span>
            <span className="reviews-big-word reviews-big-word--2">KAŽU</span>
          </div>
          <h2 className="section-title" id="reviews-h" style={{ marginTop: '4px' }}>Naši klijenti o nama</h2>
          <div className="reviews-rating-summary" style={{ justifyContent: 'flex-start', marginTop: '12px' }}>
            <div className="rrs-stars">{[1,2,3,4,5].map(n => <i key={n} className="fas fa-star"></i>)}</div>
            <span className="rrs-score">5.0</span>
            <span className="rrs-count">Google recenzije</span>
          </div>
        </div>
      </div>
      <div className="reviews-scatter" aria-hidden="true">
        {REVIEWS.map((r, i) => {
          const lay = REVIEW_LAYOUT[i]
          return (
            <article
              key={i}
              className="review-card review-card--scatter"
              style={{
                position: 'absolute',
                left:     lay.left,
                top:      lay.top,
                width:    lay.width + 'px',
                transform: `rotate(${lay.rotate})`,
                willChange: 'transform',
              }}
              data-vy={lay.vy}
              data-vx={lay.vx}
              data-rotate={lay.rotate}
            >
              <div className="review-top">
                <div className="reviewer-avatar">{r.initials}</div>
                <div className="reviewer-info">
                  <span className="reviewer-name">{r.name}</span>
                  <span className="reviewer-source"><i className="fab fa-google"></i> Google · {r.since}</span>
                </div>
                <div className="review-stars">{[1,2,3,4,5].map(n => <i key={n} className="fas fa-star"></i>)}</div>
              </div>
              <p className="review-text">{r.text}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

/* ── PRESSURE TITLE ──────────────────────────────────────── */
/* Each letter has class "pressure-letter"; a single global handler
   in Home drives scaleY based on mouse proximity (no per-component RAF) */
function PressureTitle({ text, className }) {
  const words = text.split(' ')
  return (
    <h2 className={className}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((ch, i) => (
            <span
              key={i}
              className="pressure-letter"
              style={{ display: 'inline-block', transformOrigin: '50% 100%', transition: 'transform .12s ease' }}
            >{ch}</span>
          ))}
          {wi < words.length - 1 && <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>}
        </span>
      ))}
    </h2>
  )
}

/* ── SVC CARDS ───────────────────────────────────────────── */
const SVC_CARDS = [
  { icon: 'fa-pen-nib',   title: 'Grafički dizajn',      desc: 'Logotipi, vizualni identitet, oglasi i brošure koje Vašoj marki daju prepoznatljivo lice.', href: '/usluge' },
  { icon: 'fa-print',     title: 'Tisak',                desc: 'Digitalni i ofsetni tisak visoke rezolucije — od vizitki do velikih formata.', href: '/usluge' },
  { icon: 'fa-lightbulb', title: 'Svjetleće reklame',    desc: 'LED i klasične reklame koje Vaš poslovni prostor čine vidljivim danju i noću.', href: '/usluge' },
  { icon: 'fa-tshirt',    title: 'Vez i tisak na tekstil', desc: 'Uniforme, suveniri i promo tekstil s Vašim logom — vez i direktni tisak na sve materijale.', href: '/usluge' },
  { icon: 'fa-car',       title: 'Oslikavanje vozila',   desc: 'Brendiranje vozila i velikih površina koje Vaš logo nosi diljem regije.', href: '/usluge' },
  { icon: 'fa-sign',      title: 'Putokazi i ploče',     desc: 'Natpisne ploče, putokazi i reklamni panoi — trajni i uočljivi na svakom koraku.', href: '/usluge' },
]


const FEAT_ITEMS = [
  { icon: 'fa-utensils', title: 'Jelovnici',               desc: 'Premium dizajn i tisak jelovnika za restorane, hotele i kafiće — od jednostavnih do luksuznih verzija.' },
  { icon: 'fa-heart',    title: 'Vjenčanja',               desc: 'Pozivnice, zahvalnice, oznake stola i sav tiskani materijal za Vaš savršen dan.' },
  { icon: 'fa-gift',     title: 'Poslovni pokloni',        desc: 'Personalizirani poslovni i privatni pokloni koji ostavljaju pravi dojam.' },
  { icon: 'fa-tag',      title: 'Etikete',                 desc: 'Etikete za vina, maslinova ulja i domaće proizvode s prepoznatljivim dizajnom.' },
  { icon: 'fa-trophy',   title: 'Trofeje i plakete',       desc: 'Personalizirani trofeje, plakete i nagrade za sportska i korporativna događanja.' },
  { icon: 'fa-user-tag', title: 'Personalizirani pokloni', desc: 'Unikatni pokloni s imenom, fotografijom ili posebnom porukom — za svaku prigodu.' },
]

const SVC_COLORS  = ['#050A10','#0C1E2E','#071524','#0F2438','#060E1A','#0B1D2C']
const FEAT_COLORS = ['#F2F7FA','#FFFFFF','#E6F0F7','#F5FBFF','#ECF4FA','#FAFCFF']

/* ── HOME PAGE ───────────────────────────────────────────── */
export default function Home() {
  const pageRef = useRef(null)
  useAOS(pageRef)

  /* Tilt + scroll-capture handler */
  useEffect(() => {
    let rafId = null
    function update() {
      rafId = null
      const vh = window.innerHeight

      /* — flip-reveal tilt + sticker image — */
      /* stickyTop = min(0, vh - height): pins when bottom reaches viewport bottom */
      pageRef.current?.querySelectorAll('.flip-reveal').forEach(el => {
        const H         = el.offsetHeight
        const stickyTop = Math.min(0, vh - H)
        el.style.top    = stickyTop + 'px'

        const top       = el.getBoundingClientRect().top
        const stickerEl = el.querySelector('.sticker-img')
        if (top <= stickyTop) {
          el.style.transform = ''
          if (stickerEl) { stickerEl.style.transform = ''; stickerEl.style.opacity = '' }
          return
        }
        const totalTravel = vh - stickyTop
        const p      = Math.max(0, Math.min(1, (vh - top) / totalTravel))
        const ease   = p * p * (3 - 2 * p)
        const angleX  = (1 - ease) * 22
        const angleZ  = (1 - ease) * 9
        const offsetY = (1 - ease) * -60
        el.style.transform = `perspective(1400px) rotateX(${-angleX}deg) rotateZ(${angleZ}deg) translateY(${offsetY}px)`
        /* Sticker slap: ease² for sharp snap-into-place near the end */
        if (stickerEl) {
          const slap = ease * ease
          stickerEl.style.opacity  = String(Math.min(1, slap * 2.8))
          stickerEl.style.transform =
            `perspective(800px) rotateX(${(1 - slap) * 32}deg) rotateY(${(1 - slap) * -22}deg) rotateZ(${(1 - slap) * 8}deg) scale(${0.78 + slap * 0.22})`
        }
      })

      /* — reviews scatter parallax — */
      pageRef.current?.querySelectorAll('.scroll-capture-reviews').forEach(wrap => {
        const rect = wrap.getBoundingClientRect()
        const totalScroll = wrap.offsetHeight - vh
        if (totalScroll <= 0) return
        const scrolled = -rect.top
        const p = Math.max(0, Math.min(1, scrolled / totalScroll))
        wrap.querySelectorAll('.review-card--scatter').forEach(card => {
          const vy     = parseFloat(card.dataset.vy)  || 0
          const vx     = parseFloat(card.dataset.vx)  || 0
          const rotate = card.dataset.rotate || '0deg'
          card.style.transform = `rotate(${rotate}) translateY(${vy * p}px) translateX(${vx * p}px)`
        })
      })

      /* — scroll-capture: advance active slide + alternate bg — */
      pageRef.current?.querySelectorAll('.scroll-capture').forEach(wrap => {
        const rect = wrap.getBoundingClientRect()
        const totalScroll = wrap.offsetHeight - vh
        if (totalScroll <= 0) return
        const scrolled = -rect.top
        const p = Math.max(0, Math.min(1, scrolled / totalScroll))
        const slides  = wrap.querySelectorAll('.cap-slide')
        const dots    = wrap.querySelectorAll('.cap-dot')
        const section = wrap.querySelector('.cap-section')
        const N = slides.length
        if (!N) return
        const rawIdx = p * N
        const idx = Math.min(N - 1, Math.floor(rawIdx))
        const isDark = wrap.dataset.dark === 'true'
        const colors = isDark ? SVC_COLORS : FEAT_COLORS
        slides.forEach((s, i) => {
          s.classList.toggle('is-active', i === idx)
          s.classList.toggle('was-active', i < idx)
          s.style.background = colors[i] || colors[0]
        })
        if (section) section.style.background = colors[idx] || colors[0]
        /* circle arc progress: stroke-dashoffset drives the fill */
        const fill = wrap.querySelector('[data-progress-fill]')
        if (fill) {
          const circ = 2 * Math.PI * 20           /* circumference for r=20 */
          fill.style.strokeDashoffset = circ * (1 - (idx + 1) / N)
        }
        /* update ALL counter elements (header + circle center) */
        wrap.querySelectorAll('.cap-counter-cur').forEach(el => {
          el.textContent = String(idx + 1).padStart(2, '0')
        })
        /* coin-flip icon on slide change */
        const prevIdx = parseInt(wrap.dataset.prevIdx ?? '-1', 10)
        if (idx !== prevIdx) {
          wrap.dataset.prevIdx = String(idx)
          const iconWrap = slides[idx]?.querySelector('.cap-slide-icon-wrap')
          if (iconWrap) {
            iconWrap.classList.remove('icon-flip')
            void iconWrap.offsetWidth          /* force reflow to restart animation */
            iconWrap.classList.add('icon-flip')
          }
        }
      })
    }
    function onScroll() { if (!rafId) rafId = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  /* Single global handler for pressure-letter effect on active slides */
  useEffect(() => {
    function onMove(e) {
      const mx     = e.clientX
      const radius = window.innerWidth * 0.38
      pageRef.current?.querySelectorAll('.cap-slide.is-active .pressure-letter').forEach(el => {
        const rect = el.getBoundingClientRect()
        const cx   = rect.left + rect.width / 2
        const t    = Math.max(0, 1 - Math.abs(mx - cx) / radius)
        el.style.transform = `scaleY(${0.93 + (t * t * (3 - 2 * t)) * 0.14})`
      })
    }
    function onLeave() {
      pageRef.current?.querySelectorAll('.pressure-letter').forEach(el => {
        el.style.transform = ''
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={pageRef}>
      <div className="hero-sticky" style={{ marginBottom: '240px' }}>
        <HeroNew />
      </div>

      <div className="flip-reveal" style={{ zIndex: 2, background: '#050A10', marginBottom: '240px' }}>
        <StatsBand />
      </div>

      {/* O NAMA PREVIEW */}
      <div className="flip-reveal flip-reveal--full" style={{ zIndex: 3, background: '#FFFFFF', marginBottom: '240px' }}>
        <section className="section" aria-labelledby="home-onam" style={{ padding: 'clamp(36px, 4.5vh, 60px) 0' }}>
          <div className="container">
            <div className="o-nama-split" style={{ gap: '52px', alignItems: 'center' }}>
              <div className="o-img sticker-img" style={{ willChange: 'transform, opacity', paddingBottom: '56px' }}>
                <div className="o-placeholder" style={{ aspectRatio: '4/5' }}>
                  <i className="fas fa-camera"></i>
                  <span>Fotografija tima / studija</span>
                </div>
                <div className="medal-badge" aria-label="Osnovani 2004">
                  <div className="medal-ribbons" aria-hidden="true">
                    <span className="ribbon ribbon-l"></span>
                    <span className="ribbon ribbon-r"></span>
                  </div>
                  <div className="medal-circle">
                    <span className="medal-year">2004</span>
                    <span className="medal-label">Osnovani</span>
                  </div>
                </div>
              </div>
              <div className="o-content" data-aos>
                <h2 className="section-title" id="home-onam"
                  style={{ fontSize: 'clamp(2.4rem, 3.6vw, 4.4rem)', marginBottom: '16px' }}>
                  Dvadeset godina<br /><em>strasti prema dizajnu</em>
                </h2>
                <div className="divider" style={{ marginBottom: '20px' }}></div>
                <p className="body-text" style={{ marginBottom: '12px' }}>
                  Sabioncello Grafica nastala je iz ljubavi prema vizualnoj komunikaciji i
                  želje da pomognemo lokalnim tvrtkama, ugostiteljima i privatnim
                  klijentima da ostave dojam koji traje.
                </p>
                <p className="body-text" style={{ marginBottom: '12px' }}>
                  Poslovnica nam je u <strong>Orebićima</strong>, ali poslujemo na cijelom
                  području <strong>Dubrovačko-neretvanske županije</strong>. Tijekom dvije
                  dekade izgradili smo mrežu klijenata — od malih obiteljskih biznisa do
                  poznatih brendova regije.
                </p>
                <ul className="feature-list" style={{ marginTop: '14px', gap: '8px' }}>
                  <li><i className="fas fa-check-circle"></i> Osobni pristup svakom projektu</li>
                  <li><i className="fas fa-check-circle"></i> Brza izrada i pouzdana dostava</li>
                  <li><i className="fas fa-check-circle"></i> Od ideje do finalnog proizvoda</li>
                  <li><i className="fas fa-check-circle"></i> Visoka kvaliteta, konkurentne cijene</li>
                </ul>
                <Link to="/o-nama" className="btn btn-primary" style={{ marginTop: '20px' }}>
                  Saznajte više <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* USLUGE — scroll capture: one service per scroll step */}
      <div className="scroll-capture" data-dark="true" style={{ position: 'relative', zIndex: 4, height: `${SVC_CARDS.length * 100}vh` }}>
        <div className="flip-reveal flip-reveal--capture" style={{ background: '#F0F9FA', marginBottom: 0 }}>
          <section className="cap-section cap-section--dark" aria-labelledby="home-usluge">
            <div className="cap-header">
              <span className="cap-label">Što nudimo</span>
              <div className="cap-counter">
                <span className="cap-counter-cur">01</span>
                <span className="cap-counter-sep">/</span>
                <span>{String(SVC_CARDS.length).padStart(2, '0')}</span>
              </div>
            </div>

            <div className="cap-stage">
              {SVC_CARDS.map((svc, i) => (
                <div className={`cap-slide${i === 0 ? ' is-active' : ''}`} key={i}>
                  <div className="cap-slide-inner">
                    <div className="cap-slide-icon-wrap">
                      <i className={`fas ${svc.icon} cap-slide-icon`}></i>
                      <span className="cap-slide-num">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="cap-slide-body">
                      <PressureTitle text={svc.title} className="cap-slide-title" />
                      <p className="cap-slide-desc">{svc.desc}</p>
                      <Link to={svc.href} className="btn btn-outline-inv cap-slide-btn">
                        Pogledajte uslugu <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cap-progress-row">
              <div className="cap-progress-circle">
                <svg viewBox="0 0 48 48" className="cap-progress-svg">
                  <circle cx="24" cy="24" r="20" className="cap-progress-track" />
                  <circle cx="24" cy="24" r="20" className="cap-progress-fill" data-progress-fill />
                </svg>
                <span className="cap-counter-cur cap-progress-cur">01</span>
              </div>
              <span className="cap-progress-total">/ {String(SVC_CARDS.length).padStart(2, '0')}</span>
            </div>
          </section>
        </div>
      </div>

      {/* IZDVOJENO — scroll capture */}
      <div className="scroll-capture" data-dark="false" style={{ position: 'relative', zIndex: 5, height: `${FEAT_ITEMS.length * 100}vh` }}>
        <div className="flip-reveal flip-reveal--capture" style={{ background: '#F2F7FA', marginBottom: 0 }}>
          <section className="cap-section cap-section--light" aria-labelledby="home-izdv">
            <div className="cap-header">
              <span className="cap-label">Posebnosti koje volimo raditi</span>
              <div className="cap-counter">
                <span className="cap-counter-cur">01</span>
                <span className="cap-counter-sep">/</span>
                <span>{String(FEAT_ITEMS.length).padStart(2, '0')}</span>
              </div>
            </div>

            <div className="cap-stage">
              {FEAT_ITEMS.map((f, i) => (
                <div className={`cap-slide${i === 0 ? ' is-active' : ''}`} key={i}>
                  <div className="cap-slide-inner">
                    <div className="cap-slide-icon-wrap">
                      <i className={`fas ${f.icon} cap-slide-icon`}></i>
                      <span className="cap-slide-num">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="cap-slide-body">
                      <PressureTitle text={f.title} className="cap-slide-title" />
                      <p className="cap-slide-desc">{f.desc}</p>
                      <Link to="/izdvojeno" className="btn btn-outline cap-slide-btn">
                        Pogledajte više <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cap-progress-row">
              <div className="cap-progress-circle">
                <svg viewBox="0 0 48 48" className="cap-progress-svg">
                  <circle cx="24" cy="24" r="20" className="cap-progress-track" />
                  <circle cx="24" cy="24" r="20" className="cap-progress-fill" data-progress-fill />
                </svg>
                <span className="cap-counter-cur cap-progress-cur">01</span>
              </div>
              <span className="cap-progress-total">/ {String(FEAT_ITEMS.length).padStart(2, '0')}</span>
            </div>
          </section>
        </div>
      </div>

      <div className="scroll-capture-reviews" style={{ position: 'relative', zIndex: 6, height: `${REVIEWS.length * 70}vh` }}>
        <div className="flip-reveal flip-reveal--capture" style={{ background: '#F0F9FA' }}>
          <Reviews />
        </div>
      </div>

      <div className="flip-reveal" style={{ zIndex: 7, background: '#0CBDCF', marginBottom: 0 }}>
        <CTABig />
      </div>
    </div>
  )
}
