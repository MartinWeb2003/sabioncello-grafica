import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const BASE = import.meta.env.BASE_URL
const iv = p => `${BASE}videos/izdvojeno/${p}`

/* ── AOS HOOK ────────────────────────────────────────────────── */
function useAOS(ref) {
  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-aos]')
    if (!els?.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = Array.from((entry.target.parentElement || document).querySelectorAll('[data-aos]'))
          setTimeout(() => entry.target.classList.add('visible'), siblings.indexOf(entry.target) * 80)
        } else {
          entry.target.classList.remove('visible')
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ── HERO CONSTANTS ──────────────────────────────────────────── */
const IH_L1    = 'NAŠI'
const IH_L2    = 'RADOVI'
const N_SLICES = 8
const CARD_W   = 200
const CARD_H   = 330
const SLICE_W  = CARD_W / N_SLICES
const R0       = 340

const IH_CARDS = [
  {
    bg: '#091624', accent: '#0CBDCF', icon: 'fa-star', num: '01',
    title: 'Etikete\n& Vina',   sub: 'Pelješki Proizvodi',
    tags: ['Vino', 'Ulje', 'Med'],
    offsetX: -295, offsetY: 50,
    arcX: -85, arcY: -300,
    rotZ: -11, arcRotZ: -7,
  },
  {
    bg: '#131F30', accent: '#7ED4DC', icon: 'fa-heart', num: '02',
    title: 'Vjenčanja\n& Događaji', sub: 'Posebne Prigode',
    tags: ['Pozivnice', 'Dekor', 'Suveniri'],
    offsetX: 225, offsetY: -30,
    arcX: 108, arcY: -265,
    rotZ: 13, arcRotZ: 9,
  },
]

/* ── FEATURED ITEMS ──────────────────────────────────────────── */
const ITEMS = [
  {
    tag: '01 — Izdvojeno', id: 'izdv-jelovnici', icon: 'fa-utensils',
    video: iv('jelovnici.mp4'),
    title: '<em>Jelovnici</em>',
    desc: 'Svaki restoran, hotel i kafić zaslužuje jelovnik koji je jednako ukusan kao i hrana koju nudi. Dizajniramo i tiskamo jelovnike koji odišu karakterom Vašeg objekta — od jednostavnih laminiranih do premium tvrdouvezanih verzija.',
    features: ['Individualni dizajn prema brendu', 'Laminiranje, spiralno uvezivanje, tvrdouvez', 'A4, A5, triptih i nestandardni formati', 'Sezonska ažuriranja i retiski'],
  },
  {
    tag: '02 — Izdvojeno', id: 'izdv-pecati', icon: 'fa-stamp',
    video: iv('pecat.mp4'), stacked: true,
    title: '<em>Pečati</em>',
    desc: 'Brza izrada pečata za tvrtke, obrte i udruge. Automatski i ručni pečati, trodijelni pečati i flaširani tinteni pečati — sve prema Vašim zahtjevima i u kratkom roku.',
    features: ['Automatski samobojni pečati', 'Ručni i trodijelni pečati', 'Individualni motiv i tekst', 'Brza izrada i dostava'],
  },
  {
    tag: '03 — Izdvojeno', id: 'izdv-trofeje', icon: 'fa-trophy',
    video: iv('trofeji.mp4'),
    title: 'Trofeji i <em>plakete</em>',
    desc: 'Svako postignuće vrijedi biti obilježeno. Izrađujemo personalizirane trofeje, staklene i akrilne plakete te nagrade za sportske udruge, korporativne dodjele i obljetnice — sa graviranjem ili UV tiskom.',
    features: ['Staklene i akrilne plakete', 'Sportski trofeji i pehari', 'Graviranje i UV tisak', 'Korporativne nagrade i zahvalnice'],
  },
  {
    tag: '04 — Izdvojeno', id: 'izdv-etikete', icon: 'fa-tag',
    video: null,
    title: '<em>Etikete</em>',
    desc: 'Na Pelješcu raste iznimno vino i maslinovo ulje — a mi pazimo da i etiketa bude na razini sadržaja boce. Dizajniramo i tiskamo etikete za domaće proizvode koje privlače poglede na polici i pripovijedaju priču o tradiciji i kvaliteti.',
    features: ['Etikete za vina i maslinova ulja', 'Etikete za med, likere i rakije', 'Vodootporne i UV-lakirani tisak', 'Mala i velika naklada'],
  },
  {
    tag: '05 — Izdvojeno', id: 'izdv-pokloni', icon: 'fa-gift',
    video: null,
    title: 'Poslovni i personalizirani <em>pokloni</em>',
    desc: 'Poklon koji nosi Vaše ime ili osobnu poruku uvijek je bolji od generičkog. Uređujemo i tiskamo personalizirane kutije, knjige, fotoalbume, kalendare i setove koji ostavljaju trajan dojam na poslovne partnere, prijatelje i obitelj.',
    features: ['Poslovni pokloni s logotipom', 'Personalizirani fotoalbumi i knjige', 'Brendirani kalendari i planer', 'Poklon kutije i ambalaža'],
  },
  {
    tag: '06 — Izdvojeno', id: 'izdv-vjencanja', icon: 'fa-heart',
    video: iv('vjencanje.mp4'),
    title: '<em>Vjenčanja</em>',
    desc: 'Vaš savršen dan zaslužuje savršen tiskani materijal. Dizajniramo i tiskamo sve od pozivnica i zahvalnica do oznaka za stolove, mapa za goste i prilagođenih kutija za kolače — sve u jedinstvenoj estetici Vašeg vjenčanja.',
    features: ['Pozivnice i zahvalnice', 'Oznake za stolove i mape gostiju', 'Kuverti, naljepnice i pečati', 'Personalizirani suvenir paketi'],
  },
]

/* ── IZDVOJENO HERO ──────────────────────────────────────────── */
function IzdvojenoHero() {
  const l1Refs        = useRef([])
  const l2Refs        = useRef([])
  const cardWraps     = useRef([])
  const cardEntrances = useRef([])

  useEffect(() => {
    let rafId
    let targetMx  = window.innerWidth  / 2
    let currentMx = window.innerWidth  / 2
    let targetMy  = window.innerHeight / 2
    let currentMy = window.innerHeight / 2
    const startTime = Date.now()

    function tick() {
      const now = Date.now()
      currentMx += (targetMx - currentMx) * 0.07
      currentMy += (targetMy - currentMy) * 0.07

      const vw        = window.innerWidth
      const vh        = window.innerHeight
      const scrollRaw = Math.min(1, Math.max(0, window.scrollY / vh))
      const ease      = scrollRaw * scrollRaw * (3 - 2 * scrollRaw)
      const cnX       = (currentMx - vw / 2) / (vw / 2)
      const cnY       = (currentMy - vh / 2) / (vh / 2)

      /* Cards — scroll arc + cursor tilt */
      IH_CARDS.forEach((card, ci) => {
        const wrap     = cardWraps.current[ci]
        const entrance = cardEntrances.current[ci]
        if (!wrap) return
        const baseX = vw / 2 - CARD_W / 2
        const baseY = vh / 2 - CARD_H / 2
        const arcX  = card.offsetX + ease * (card.arcX + cnX * 55)
        const arcY  = card.offsetY + ease * (card.arcY - cnY * 28)
        const rotY  = cnX * 12 + (ci === 0 ? -5 : 5)
        const rotX  = cnY * -6 + ease * -14
        const rotZ  = card.rotZ + ease * card.arcRotZ

        wrap.style.transform =
          `translate(${baseX + arcX}px, ${baseY + arcY}px)` +
          ` rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`

        const R = R0 - ease * 80
        wrap.querySelectorAll('.uh-slice').forEach((slice, j) => {
          const xc  = (j - (N_SLICES - 1) / 2) * SLICE_W
          const arc = Math.asin(Math.min(0.999, Math.max(-0.999, xc / R))) * (180 / Math.PI)
          slice.style.transform = `rotateY(${arc}deg) translateZ(${R}px)`
        })

        /* Entrance animation — JS-driven so cursor reactivity is live throughout */
        if (entrance) {
          const delay    = 1000 + ci * 180
          const duration = 700
          const elapsed  = now - startTime - delay
          if (elapsed < 0) {
            entrance.style.opacity   = '0'
            entrance.style.transform = 'translateY(22px)'
          } else {
            const p  = Math.min(1, elapsed / duration)
            const ep = 1 - (1 - p) * (1 - p)  /* ease-out */
            entrance.style.opacity   = String(Math.min(1, p / 0.4))
            if (p < 1) {
              entrance.style.transform = `translateY(${22 * (1 - ep)}px)`
            } else {
              entrance.style.transform = ''
              entrance.style.opacity   = '1'
            }
          }
        }
      })

      /* Letter scaleY */
      const radius = vw * 0.38
      ;[...l1Refs.current, ...l2Refs.current].forEach(el => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx   = rect.left + rect.width / 2
        const t    = Math.max(0, 1 - Math.abs(currentMx - cx) / radius)
        el.style.transform = `scaleY(${0.93 + (t * t * (3 - 2 * t)) * 0.14})`
      })

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    const onMove  = e => { targetMx = e.clientX; targetMy = e.clientY }
    const onLeave = () => { targetMx = window.innerWidth / 2; targetMy = window.innerHeight / 2 }
    window.addEventListener('mousemove',  onMove,  { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section className="uh-hero ih-hero" aria-label="Naši radovi">
      <div className="uh-stage">
        <div className="uh-world">

          {/* Giant title letters */}
          <div className="uh-title-block" aria-hidden="true">
            <div className="uh-title-row">
              {IH_L1.split('').map((ch, i) => (
                <span key={i} ref={el => { l1Refs.current[i] = el }} className="uh-letter uh-letter--1">{ch}</span>
              ))}
            </div>
            <div className="uh-title-row">
              {IH_L2.split('').map((ch, i) => (
                <span key={i} ref={el => { l2Refs.current[i] = el }} className="uh-letter uh-letter--2">{ch}</span>
              ))}
            </div>
          </div>

          {/* 3D bent cards */}
          {IH_CARDS.map((card, ci) => (
            <div
              key={ci}
              className="uh-card-entrance"
              ref={el => { cardEntrances.current[ci] = el }}
            >
            <div
              className="uh-card-wrap"
              ref={el => { cardWraps.current[ci] = el }}
              style={{ zIndex: ci === 0 ? 2 : 1 }}
            >
              {Array.from({ length: N_SLICES }, (_, j) => {
                const xc   = (j - (N_SLICES - 1) / 2) * SLICE_W
                const arc0 = Math.asin(Math.min(0.999, Math.max(-0.999, xc / R0))) * (180 / Math.PI)
                const isL  = j === 0
                const isR  = j === N_SLICES - 1
                return (
                  <div
                    key={j}
                    className={`uh-slice${isL ? ' uh-slice--l' : ''}${isR ? ' uh-slice--r' : ''}`}
                    style={{ transform: `rotateY(${arc0}deg) translateZ(${R0}px)`, width: SLICE_W + 8, height: CARD_H }}
                  >
                    <div className="uh-slice-front">
                      <div className="uh-slice-content" style={{ left: -j * SLICE_W, background: card.bg }}>
                        <div className="uh-card-top">
                          <span className="uh-card-icon" style={{ color: card.accent }}>
                            <i className={`fas ${card.icon}`} aria-hidden="true" />
                          </span>
                          <span className="uh-card-num" style={{ color: card.accent }}>{card.num}</span>
                        </div>
                        <div className="uh-card-body">
                          <h3 className="uh-card-title">
                            {card.title.split('\n').map((line, k, arr) => (
                              <span key={k}>{line}{k < arr.length - 1 && <br />}</span>
                            ))}
                          </h3>
                          <p className="uh-card-sub" style={{ color: `${card.accent}BB` }}>{card.sub}</p>
                        </div>
                        <div className="uh-card-foot">
                          <div className="uh-card-tags">
                            {card.tags.map((tag, t) => (
                              <span
                                key={t}
                                className="uh-card-tag"
                                style={{ borderColor: `${card.accent}44`, color: `${card.accent}CC` }}
                              >{tag}</span>
                            ))}
                          </div>
                          <div className="uh-card-bar" style={{ background: card.accent }} />
                        </div>
                      </div>
                    </div>
                    <div className={`uh-slice-back${isL ? ' uh-slice-back--l' : ''}${isR ? ' uh-slice-back--r' : ''}`} />
                  </div>
                )
              })}
            </div>
            </div>
          ))}

        </div>
      </div>

      {/* Bottom bar */}
      <div className="uh-hero-footer">
        <h1 className="uh-hero-label">Naši <em>izdvojeni radovi</em></h1>
        <Link to="/kontakt" className="btn btn-primary">
          Zatražite ponudu <i className="fas fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

/* ── STICKY SECTION LETTER CONSTANTS ─────────────────────────── */
const IL1 = 'NAŠI'
const IL2 = 'RADOVI'

/* ── IZDVOJENO PAGE ──────────────────────────────────────────── */
export default function Izdvojeno() {
  const pageRef  = useRef(null)
  const il1Refs  = useRef([])
  const il2Refs  = useRef([])
  useAOS(pageRef)

  /* Flip-reveal entrance tilt */
  useEffect(() => {
    let rafId = null
    function update() {
      rafId = null
      const vh = window.innerHeight
      pageRef.current?.querySelectorAll('.flip-reveal').forEach(el => {
        const top = el.getBoundingClientRect().top
        if (top <= 0) { el.style.transform = ''; return }
        const p    = Math.max(0, Math.min(1, 1 - top / vh))
        const ease = p * p * (3 - 2 * p)
        el.style.transform = `perspective(1400px) rotateX(${-(1 - ease) * 22}deg) rotateZ(${(1 - ease) * 9}deg) translateX(${(1 - ease) * 100}px) translateY(${(1 - ease) * -60}px)`
      })
    }
    function onScroll() { if (!rafId) rafId = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); if (rafId) cancelAnimationFrame(rafId) }
  }, [])

  /* Cursor-responsive scaleY for sticky section letters */
  useEffect(() => {
    let rafId
    let targetMx  = window.innerWidth / 2
    let currentMx = window.innerWidth / 2
    function tick() {
      currentMx += (targetMx - currentMx) * 0.07
      const radius = window.innerWidth * 0.45
      ;[...il1Refs.current, ...il2Refs.current].forEach(el => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx   = rect.left + rect.width / 2
        const t    = Math.max(0, 1 - Math.abs(currentMx - cx) / radius)
        el.style.transform = `scaleY(${0.9 + (t * t * (3 - 2 * t)) * 0.18})`
      })
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    const onMove = e => { targetMx = e.clientX }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('mousemove', onMove) }
  }, [])

  return (
    <div ref={pageRef}>

      {/* Hero */}
      <div className="hero-sticky">
        <IzdvojenoHero />
      </div>

      {/* Featured items sticky split layout */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="svc-sticky-layout">

          {/* LEFT: sticky big "NAŠI / RADOVI" */}
          <div className="svc-left">
            <div className="about-big-row">
              {IL1.split('').map((ch, i) => (
                <span key={i} ref={el => { il1Refs.current[i] = el }} className="about-big-letter about-big-letter--sm">
                  {ch}
                </span>
              ))}
            </div>
            <div className="about-big-row">
              {IL2.split('').map((ch, i) => (
                <span key={i} ref={el => { il2Refs.current[i] = el }} className="about-big-letter about-big-letter--lg">
                  {ch}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: all featured items scrolling */}
          <div className="svc-right">
            {ITEMS.map((s, i) => (
              <div className="svc-item" key={i}>
                {i > 0 && <div className="about-divider-line" style={{ borderColor: 'rgba(5,10,16,.08)' }} />}
                {s.stacked ? (
                  <div className="svc-item-col">
                    <div className="svc-item-video svc-item-video--h" data-aos>
                      <video src={s.video} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="svc-item-text">
                      <p className="svc-item-tag">{s.tag}</p>
                      <h2
                        className="svc-item-title"
                        id={s.id}
                        dangerouslySetInnerHTML={{ __html: s.title }}
                      />
                      <p className="svc-item-desc">{s.desc}</p>
                      <ul className="svc-item-features">
                        {s.features.map((f, j) => (
                          <li key={j}><i className="fas fa-check-circle" aria-hidden="true" /> {f}</li>
                        ))}
                      </ul>
                      <Link to="/kontakt" className="btn btn-primary">
                        Zatražite ponudu <i className="fas fa-arrow-right" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="svc-item-row">
                    <div className="svc-item-video" data-aos>
                      {s.video
                        ? <video src={s.video} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <><i className={`fas ${s.icon}`} aria-hidden="true" /><span>Video primjer</span></>
                      }
                    </div>
                    <div className="svc-item-text">
                      <p className="svc-item-tag">{s.tag}</p>
                      <h2
                        className="svc-item-title"
                        id={s.id}
                        dangerouslySetInnerHTML={{ __html: s.title }}
                      />
                      <p className="svc-item-desc">{s.desc}</p>
                      <ul className="svc-item-features">
                        {s.features.map((f, j) => (
                          <li key={j}><i className="fas fa-check-circle" aria-hidden="true" /> {f}</li>
                        ))}
                      </ul>
                      <Link to="/kontakt" className="btn btn-primary">
                        Zatražite ponudu <i className="fas fa-arrow-right" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  )
}
