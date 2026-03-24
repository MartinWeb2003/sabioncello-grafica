import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CTABand from '../components/CTABand'
import BlurText from '../components/BlurText/BlurText'
import ShapeGrid from '../components/ShapeGrid/ShapeGrid'

/* ── HERO SLIDER ─────────────────────────────────────────── */
const SLIDES = [
  {
    bg: 'slide-bg-1',
    icon: 'fa-star',
    type: 'intro',
    eyebrow: 'Orebić · 20 godina iskustva',
    title: ['Dajemo oblik', 'Vašim idejama'],
    desc: 'Grafički dizajn, tisak i branding koji ostavlja trag — diljem Dubrovačko-neretvanske županije.',
  },
  { bg: 'slide-bg-2', icon: 'fa-print',    type: 'service', name: 'Tisak',               desc: 'Digitalni i ofsetni tisak visoke rezolucije — od vizitki do velikih formata' },
  { bg: 'slide-bg-3', icon: 'fa-pen-nib',  type: 'service', name: 'Grafički Dizajn',      desc: 'Logotipi, vizualni identitet i promo materijali koji Vaš brend čine nezaboravnim' },
  { bg: 'slide-bg-4', icon: 'fa-tshirt',   type: 'service', name: 'Vez i Tekstil',        desc: 'Vez i tisak na tekstilu za uniforme, suvenire i promotivne tekstile' },
  { bg: 'slide-bg-5', icon: 'fa-lightbulb',type: 'service', name: 'Reklame i Vozila',     desc: 'Svjetleće reklame, oslikavanje vozila i natpisne ploče koje se ne mogu ignorirati' },
]

const SLIDE_DUR = 4000

function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  const barRef = useRef(null)

  function goTo(idx) {
    setCurrent((idx + SLIDES.length) % SLIDES.length)
  }

  function startBar() {
    if (!barRef.current) return
    barRef.current.style.transition = 'none'
    barRef.current.style.width = '0%'
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!barRef.current) return
      barRef.current.style.transition = `width ${SLIDE_DUR}ms linear`
      barRef.current.style.width = '100%'
    }))
  }

  function startTimer() {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), SLIDE_DUR)
  }

  useEffect(() => {
    startBar()
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [current])

  const handlePrev = () => { goTo(current - 1); startTimer() }
  const handleNext = () => { goTo(current + 1); startTimer() }
  const touchX = useRef(0)

  const s = SLIDES[current]

  return (
    <section
      className="hero-slider"
      aria-label="Naše usluge"
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={startTimer}
      onTouchStart={e => { touchX.current = e.changedTouches[0].clientX }}
      onTouchEnd={e => {
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 48) { goTo(current + (dx < 0 ? 1 : -1)); startTimer() }
      }}
    >
      {/* ShapeGrid background — subtle, behind all slides */}
      <div className="hero-shapegrid-bg">
        <ShapeGrid
          direction="diagonal"
          speed={0.3}
          borderColor="rgba(255,255,255,0.06)"
          squareSize={52}
          hoverFillColor="rgba(255,255,255,0.04)"
          shape="square"
        />
      </div>

      <div className="slides-wrap">
        {SLIDES.map((slide, i) => (
          <div key={i} className={`slide${i === current ? ' slide-active' : ''}`} data-index={i}>
            <div className={`slide-bg ${slide.bg}`}>
              <i className={`fas ${slide.icon} slide-bg-icon`} aria-hidden="true"></i>
            </div>
          </div>
        ))}
      </div>

      {/* Slide content rendered outside slides-wrap so it's always on top and re-mounts on change */}
      <div className="slide-content-overlay">
        {s.type === 'intro' ? (
          <div className="slide-content slide-content-intro" key={`intro-${current}`}>
            <div className="container">
              <BlurText
                key={`eyebrow-${current}`}
                text={s.eyebrow}
                as="span"
                className="slide-eyebrow"
                delay={60}
                direction="bottom"
                stepDuration={0.28}
              />
              <h1 className="slide-title-main">
                <BlurText
                  key={`t0-${current}`}
                  text={s.title[0]}
                  as="span"
                  className="blur-line"
                  delay={70}
                  direction="bottom"
                  stepDuration={0.32}
                />
                <BlurText
                  key={`t1-${current}`}
                  text={s.title[1]}
                  as="em"
                  className="blur-line"
                  delay={70}
                  direction="bottom"
                  stepDuration={0.32}
                />
              </h1>
              <BlurText
                key={`desc-${current}`}
                text={s.desc}
                as="p"
                className="slide-desc"
                delay={45}
                direction="bottom"
                stepDuration={0.28}
              />
              <div className="slide-ctas">
                <Link to="/usluge" className="btn btn-primary btn-lg">Naše usluge <i className="fas fa-arrow-right"></i></Link>
                <Link to="/kontakt" className="btn btn-outline-inv btn-lg">Kontaktirajte nas</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="slide-content slide-content-service" key={`svc-${current}`}>
            <span className="slide-svc-tag">Usluge</span>
            <BlurText
              key={`name-${current}`}
              text={s.name}
              as="h2"
              className="slide-svc-name"
              delay={80}
              direction="bottom"
              stepDuration={0.35}
            />
            <BlurText
              key={`sdesc-${current}`}
              text={s.desc}
              as="p"
              className="slide-svc-desc"
              delay={50}
              direction="bottom"
              stepDuration={0.28}
            />
            <Link to="/usluge" className="btn btn-outline-inv btn-lg">Saznajte više <i className="fas fa-arrow-right"></i></Link>
          </div>
        )}
      </div>

      <button className="slider-btn slider-prev" onClick={handlePrev} aria-label="Prethodni slide">
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="slider-btn slider-next" onClick={handleNext} aria-label="Sljedeći slide">
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="slider-dots" role="tablist" aria-label="Navigacija slajdova">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`slider-dot${i === current ? ' dot-active' : ''}`}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slajd ${i + 1}`}
            onClick={() => { goTo(i); startTimer() }}
          />
        ))}
      </div>

      <div className="slider-progress" aria-hidden="true">
        <div className="slider-progress-bar" ref={barRef}></div>
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
        {/* 3-col centered grid */}
        <div className="stats-grid stats-grid--3">
          <div className="stat-item">
            <div className="stat-count">
              <span className="stat-number" data-count="20">0</span>
              <span className="stat-plus">+</span>
            </div>
            <span className="stat-label">Godina iskustva</span>
          </div>
          <div className="stat-item">
            <div className="stat-count">
              <span className="stat-number" data-count="100">0</span>
              <span className="stat-plus">+</span>
            </div>
            <span className="stat-label">Realiziranih projekata</span>
          </div>
          <div className="stat-item">
            <div className="stat-count">
              <span className="stat-number" data-count="7">0</span>
            </div>
            <span className="stat-label">Kategorija usluga</span>
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
    <section className="section section-alt reviews-section" aria-labelledby="reviews-h">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id="reviews-h">Što kažu naši klijenti</h2>
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
  { icon: 'fa-pen-nib',  img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80', title: 'Grafički dizajn',       desc: 'Logotipi, vizualni identitet, oglasi i brošure koje Vašoj marki daju prepoznatljivo lice.' },
  { icon: 'fa-print',    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',  title: 'Tisak',                   desc: 'Digitalni i ofsetni tisak visoke rezolucije — od vizitki do velikih formata.' },
  { icon: 'fa-lightbulb',img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',title: 'Svjetleće reklame',       desc: 'LED i klasične reklame koje Vaš poslovni prostor čine vidljivim danju i noću.' },
  { icon: 'fa-tshirt',   img: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',title: 'Vez i tisak na tekstil',  desc: 'Uniforme, suveniri i promo tekstil s Vašim logom — vez i direktni tisak na sve materijale.' },
  { icon: 'fa-car',      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',title: 'Oslikavanje vozila',      desc: 'Brendiranje vozila i velikih površina koje Vaš logo nosi diljem regije.' },
  { icon: 'fa-sign',     img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80',title: 'Putokazi i ploče',        desc: 'Natpisne ploče, putokazi i reklamni panoi — trajni i uočljivi na svakom koraku.' },
]

/* ── HOME PAGE ───────────────────────────────────────────── */
export default function Home() {
  const pageRef = useRef(null)
  useAOS(pageRef)

  return (
    <div ref={pageRef}>
      <HeroSlider />

      <StatsBand />

      {/* O NAMA PREVIEW */}
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

      {/* USLUGE PREVIEW */}
      <section className="section section-alt" aria-labelledby="home-usluge">
        <div className="container">
          <div className="section-header" data-aos>
            <h2 className="section-title" id="home-usluge">Što nudimo</h2>
            <p className="section-sub">Od ideje do finalnog proizvoda — sve pod jednim krovom.</p>
          </div>
          <div className="svc-fade-wrap">
            <div className="home-svc-grid">
              {SVC_CARDS.map((svc, i) => (
                <article className="svc-card" key={i} data-aos>
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="svc-card-img"
                    loading="lazy"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <div className="svc-icon"><i className={`fas ${svc.icon}`}></i></div>
                  <h3>{svc.title}</h3>
                  <p>{svc.desc}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="section-cta" data-aos>
            <Link to="/usluge" className="btn btn-outline">
              Sve usluge <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* IZDVOJENO PREVIEW */}
      <section className="section" aria-labelledby="home-izdv">
        <div className="container">
          <div className="section-header" data-aos>
            <h2 className="section-title" id="home-izdv">Posebnosti koje volimo raditi</h2>
            <p className="section-sub">Neki projekti zahtijevaju posebnu pažnju — evo nekoliko kojih smo posebno ponosni.</p>
          </div>
          <div className="feat-fade-wrap">
            <div className="featured-preview-grid">
              {[
                { icon: 'fa-utensils', title: 'Jelovnici',               desc: 'Premium dizajn i tisak jelovnika za restorane, hotele i kafiće — od jednostavnih do luksuznih verzija.' },
                { icon: 'fa-heart',    title: 'Vjenčanja',               desc: 'Pozivnice, zahvalnice, oznake stola i sav tiskani materijal za Vaš savršen dan.' },
                { icon: 'fa-gift',     title: 'Poslovni pokloni',        desc: 'Personalizirani poslovni i privatni pokloni koji ostavljaju pravi dojam.' },
                { icon: 'fa-tag',      title: 'Etikete',                 desc: 'Etikete za vina, maslinova ulja i domaće proizvode s prepoznatljivim dizajnom.' },
                { icon: 'fa-trophy',   title: 'Trofeje i plakete',       desc: 'Personalizirani trofeje, plakete i nagrade za sportska i korporativna događanja.' },
                { icon: 'fa-user-tag', title: 'Personalizirani pokloni', desc: 'Unikatni pokloni s imenom, fotografijom ili posebnom porukom — za svaku prigodu.' },
              ].map((f, i) => (
                <article className="feat-card" key={i} data-aos>
                  <div className="feat-icon"><i className={`fas ${f.icon}`}></i></div>
                  <div className="feat-body">
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                    <Link to="/izdvojeno" className="text-link">Pogledajte više <i className="fas fa-arrow-right"></i></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="section-cta" data-aos>
            <Link to="/izdvojeno" className="btn btn-outline">
              Sve posebnosti <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      <Reviews />

      <CTABand
        title="Imate ideju? Pretvorimo je u stvarnost."
        subtitle="Kontaktirajte nas danas i zajedno osmislimo projekt koji će izdvojiti Vaš brend."
        btnText="Zatražite ponudu"
        btnHref="/kontakt"
      />
    </div>
  )
}
