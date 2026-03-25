import { useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

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
        const sc = window.innerWidth < 768 ? 0.68 : 1
        wheelRef.current.style.transform =
          `scale(${sc}) rotateX(-22deg) rotateY(${angleRef.current}deg)`
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
          <Link to="/usluge"  className="btn btn-primary btn-lg">Naše usluge <i className="fas fa-arrow-right"></i></Link>
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

function Reviews() {
  const cardsRef = useRef([])

  useEffect(() => {
    const timer = setTimeout(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        setTimeout(() => card.classList.add('pop-in'), i * 120)
      })
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="section section-dark section--deco reviews-section" aria-labelledby="reviews-h">
      <span className="section-deco-bg" aria-hidden="true">KLIJENTI</span>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title section-title-inv" id="reviews-h">Što kažu naši klijenti</h2>
          <div className="reviews-rating-summary">
            <div className="rrs-stars">
              {[1,2,3,4,5].map(n => <i key={n} className="fas fa-star"></i>)}
            </div>
            <span className="rrs-score">5.0</span>
            <span className="rrs-count">Google recenzije</span>
          </div>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <article
              key={i}
              className="review-card"
              ref={el => cardsRef.current[i] = el}
            >
              <div className="review-top">
                <div className="reviewer-avatar">{r.initials}</div>
                <div className="reviewer-info">
                  <span className="reviewer-name">{r.name}</span>
                  <span className="reviewer-source"><i className="fab fa-google"></i> Google · {r.since}</span>
                </div>
                <div className="review-stars">
                  {[1,2,3,4,5].map(n => <i key={n} className="fas fa-star"></i>)}
                </div>
              </div>
              <p className="review-text">{r.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
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

const CTA_IMGS = [
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
  'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
  'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80',
]

const CTA_L1 = 'IMATE'
const CTA_L2 = 'IDEJU?'

function CTABig() {
  const leftRef    = useRef(null)
  const imgRef     = useRef(null)
  const l1Refs     = useRef([])
  const l2Refs     = useRef([])
  const rafRef     = useRef(null)
  const targetMxRef  = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const currentMxRef = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const intervalRef  = useRef(null)

  /* RAF: letter scaleY (shrinks near cursor) */
  useEffect(() => {
    function tick() {
      currentMxRef.current += (targetMxRef.current - currentMxRef.current) * 0.07
      const mx     = currentMxRef.current
      const radius = window.innerWidth * 0.32
      ;[...l1Refs.current, ...l2Refs.current].forEach(el => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx   = rect.left + rect.width / 2
        const t    = Math.max(0, 1 - Math.abs(mx - cx) / radius)
        const sy   = 1.0 - (t * t * (3 - 2 * t)) * 0.22   /* shrink up to 22% */
        el.style.transform = `scaleY(${sy})`
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    const onMove = e => { targetMxRef.current = e.clientX }
    rafRef.current = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove)
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('mousemove', onMove) }
  }, [])

  /* Hover image: follow cursor, cycle images */
  const pickImg = () => CTA_IMGS[Math.floor(Math.random() * CTA_IMGS.length)]

  function onLeftMove(e) {
    if (!imgRef.current || !leftRef.current) return
    const r = leftRef.current.getBoundingClientRect()
    imgRef.current.style.left = `${e.clientX - r.left}px`
    imgRef.current.style.top  = `${e.clientY - r.top}px`
  }
  function onLeftEnter() {
    if (!imgRef.current) return
    imgRef.current.src = pickImg()
    imgRef.current.style.opacity = '1'
    intervalRef.current = setInterval(() => {
      if (imgRef.current) imgRef.current.src = pickImg()
    }, 1400)
  }
  function onLeftLeave() {
    if (!imgRef.current) return
    imgRef.current.style.opacity = '0'
    clearInterval(intervalRef.current)
  }
  useEffect(() => () => clearInterval(intervalRef.current), [])

  return (
    <section className="cta-big">
      {/* LEFT — huge interactive text */}
      <div className="cta-big__left" ref={leftRef}
        onMouseMove={onLeftMove} onMouseEnter={onLeftEnter} onMouseLeave={onLeftLeave}>
        <div className="cta-big__text">
          <div className="cta-big__row">
            {CTA_L1.split('').map((ch, i) => (
              <span key={i} ref={el => l1Refs.current[i] = el} className="cta-big-letter">{ch}</span>
            ))}
          </div>
          <div className="cta-big__row">
            {CTA_L2.split('').map((ch, i) => (
              <span key={i} ref={el => l2Refs.current[i] = el} className="cta-big-letter">{ch}</span>
            ))}
          </div>
        </div>
        {/* floating hover image */}
        <img ref={imgRef} className="cta-big__hover-img" src={CTA_IMGS[0]} alt="" aria-hidden="true" />
      </div>

      {/* RIGHT — text + arrow + button */}
      <div className="cta-big__right">
        <p className="cta-big__sub">
          Kontaktirajte nas danas i zajedno osmislimo projekt koji će izdvojiti Vaš brend.
        </p>
        <div className="cta-big__arrow-row">
          {/* hand-drawn arrow SVG */}
          <svg className="cta-big__arrow" viewBox="0 0 140 55" fill="none" aria-hidden="true">
            <path d="M6 34 C22 12 52 9 84 20 C104 27 122 22 132 30"
              stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M122 20 L132 30 L120 37"
              stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <Link to="/kontakt" className="btn btn-dark btn-lg cta-big__btn">
            Zatražite ponudu <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}

const FEAT_ITEMS = [
  { icon: 'fa-utensils', title: 'Jelovnici',               desc: 'Premium dizajn i tisak jelovnika za restorane, hotele i kafiće — od jednostavnih do luksuznih verzija.' },
  { icon: 'fa-heart',    title: 'Vjenčanja',               desc: 'Pozivnice, zahvalnice, oznake stola i sav tiskani materijal za Vaš savršen dan.' },
  { icon: 'fa-gift',     title: 'Poslovni pokloni',        desc: 'Personalizirani poslovni i privatni pokloni koji ostavljaju pravi dojam.' },
  { icon: 'fa-tag',      title: 'Etikete',                 desc: 'Etikete za vina, maslinova ulja i domaće proizvode s prepoznatljivim dizajnom.' },
  { icon: 'fa-trophy',   title: 'Trofeje i plakete',       desc: 'Personalizirani trofeje, plakete i nagrade za sportska i korporativna događanja.' },
  { icon: 'fa-user-tag', title: 'Personalizirani pokloni', desc: 'Unikatni pokloni s imenom, fotografijom ili posebnom porukom — za svaku prigodu.' },
]

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

      /* — flip-reveal tilt — */
      pageRef.current?.querySelectorAll('.flip-reveal').forEach(el => {
        const top = el.getBoundingClientRect().top
        if (top <= 0) { el.style.transform = ''; return }
        const p      = Math.max(0, Math.min(1, 1 - top / vh))
        const ease   = p * p * (3 - 2 * p)
        const angleX = (1 - ease) * 22           /* more extreme flip */
        const angleZ = (1 - ease) * 9            /* more extreme right-side tilt */
        el.style.transform = `perspective(1400px) rotateX(${-angleX}deg) rotateZ(${angleZ}deg)`
      })

      /* — scroll-capture: advance active slide — */
      pageRef.current?.querySelectorAll('.scroll-capture').forEach(wrap => {
        const rect = wrap.getBoundingClientRect()
        const totalScroll = wrap.offsetHeight - vh
        if (totalScroll <= 0) return
        const scrolled = -rect.top
        const p = Math.max(0, Math.min(1, scrolled / totalScroll))
        const slides = wrap.querySelectorAll('.cap-slide')
        const dots   = wrap.querySelectorAll('.cap-dot')
        const cur    = wrap.querySelector('.cap-counter-cur')
        const N = slides.length
        if (!N) return
        const rawIdx = p * N
        const idx = Math.min(N - 1, Math.floor(rawIdx))
        slides.forEach((s, i) => {
          s.classList.toggle('is-active', i === idx)
          s.classList.toggle('was-active', i < idx)
        })
        dots.forEach((d, i) => d.classList.toggle('is-active', i === idx))
        if (cur) cur.textContent = String(idx + 1).padStart(2, '0')
      })
    }
    function onScroll() { if (!rafId) rafId = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={pageRef}>
      <div className="hero-sticky">
        <HeroNew />
      </div>

      <div className="flip-reveal" style={{ zIndex: 2, background: '#050A10' }}>
        <StatsBand />
      </div>

      {/* O NAMA PREVIEW */}
      <div className="flip-reveal" style={{ zIndex: 3, background: '#FFFFFF' }}>
        <section className="section" aria-labelledby="home-onam">
          <div className="container">
            <div className="o-nama-split">
              <div className="o-img" data-aos>
                <div className="o-placeholder">
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
                <h2 className="section-title" id="home-onam">
                  Dvadeset godina<br /><em>strasti prema dizajnu</em>
                </h2>
                <div className="divider"></div>
                <p className="body-text">
                  Sabioncello Grafica nastala je iz ljubavi prema vizualnoj komunikaciji i
                  želje da pomognemo lokalnim tvrtkama, ugostiteljima i privatnim
                  klijentima da ostave dojam koji traje.
                </p>
                <p className="body-text">
                  Poslovnica nam je u <strong>Orebićima</strong>, ali poslujemo na cijelom
                  području <strong>Dubrovačko-neretvanske županije</strong>. Tijekom dvije
                  dekade izgradili smo mrežu klijenata — od malih obiteljskih biznisa do
                  poznatih brendova regije.
                </p>
                <ul className="feature-list">
                  <li><i className="fas fa-check-circle"></i> Osobni pristup svakom projektu</li>
                  <li><i className="fas fa-check-circle"></i> Brza izrada i pouzdana dostava</li>
                  <li><i className="fas fa-check-circle"></i> Od ideje do finalnog proizvoda</li>
                  <li><i className="fas fa-check-circle"></i> Visoka kvaliteta, konkurentne cijene</li>
                </ul>
                <Link to="/o-nama" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                  Saznajte više <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* USLUGE — scroll capture: one service per scroll step */}
      <div className="scroll-capture" style={{ position: 'relative', zIndex: 4, height: `${SVC_CARDS.length * 100}vh` }}>
        <div className="flip-reveal flip-reveal--capture" style={{ background: '#050A10', marginBottom: 0 }}>
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
                      <h2 className="cap-slide-title">{svc.title}</h2>
                      <p className="cap-slide-desc">{svc.desc}</p>
                      <Link to={svc.href} className="btn btn-outline-inv cap-slide-btn">
                        Pogledajte uslugu <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cap-dots">
              {SVC_CARDS.map((_, i) => (
                <div className={`cap-dot${i === 0 ? ' is-active' : ''}`} key={i} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* IZDVOJENO — scroll capture */}
      <div className="scroll-capture" style={{ position: 'relative', zIndex: 5, height: `${FEAT_ITEMS.length * 100}vh` }}>
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
                      <h2 className="cap-slide-title">{f.title}</h2>
                      <p className="cap-slide-desc">{f.desc}</p>
                      <Link to="/izdvojeno" className="btn btn-outline cap-slide-btn">
                        Pogledajte više <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cap-dots">
              {FEAT_ITEMS.map((_, i) => (
                <div className={`cap-dot${i === 0 ? ' is-active' : ''}`} key={i} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="flip-reveal" style={{ zIndex: 6, background: '#0C1924' }}>
        <Reviews />
      </div>

      <div className="flip-reveal" style={{ zIndex: 7, background: '#0CBDCF' }}>
        <CTABig />
      </div>
    </div>
  )
}
