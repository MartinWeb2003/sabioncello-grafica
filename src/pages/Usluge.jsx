import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import CTABig from '../components/CTABig'

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
const UH_L1     = 'NAŠE'
const UH_L2     = 'USLUGE'
const N_SLICES  = 8
const CARD_W    = 200
const CARD_H    = 330
const SLICE_W   = CARD_W / N_SLICES
const R0        = 340   /* initial cylinder radius */

const UH_CARDS = [
  {
    bg: '#091624', accent: '#0CBDCF', icon: 'fa-pen-nib', num: '01',
    title: 'Grafički\nDizajn', sub: 'Logotipi · Branding · Tiskovine',
    tags: ['Logo', 'Brand', 'Print'],
    offsetX: -200, offsetY: 55,
    arcX: -80, arcY: -310,
    rotZ: -10, arcRotZ: -7,
  },
  {
    bg: '#091624', accent: '#7ED4DC', icon: 'fa-print', num: '02',
    title: 'Tisak\n& Print', sub: 'Digitalni · Ofsetni · Formati',
    tags: ['Vizitke', 'Banneri', 'Katalozi'],
    offsetX: 130, offsetY: -25,
    arcX: 104, arcY: -270,
    rotZ: 14, arcRotZ: 9,
  },
]

/* ── SERVICES LIST ───────────────────────────────────────────── */
const SERVICES = [
  {
    tag: '01 — Usluga', id: 'svc-dizajn', icon: 'fa-pen-nib', reverse: false, alt: false,
    title: 'Grafički <em>dizajn</em>',
    desc: 'Vizualni identitet koji priča Vašu priču. Od logotipa i poslovnih karata do kompletnih branding rješenja — stvaramo dizajn koji ostavlja snažan prvi dojam i gradi dugoročno povjerenje.',
    features: ['Logotipi i vizualni identitet', 'Poslovne karte i brošure', 'Reklamni materijali i banneri', 'Digitalni i print dizajn'],
  },
  {
    tag: '02 — Usluga', id: 'svc-tisak', icon: 'fa-print', reverse: true, alt: true,
    title: '<em>Tisak</em>',
    desc: 'Visokokvalitetni digitalni i ofsetni tisak za sve formate. Bilo da su Vam potrebne vizitke, letci, katalozi, banneri ili plakati velikih dimenzija — isporučujemo oštrinu i točnost boja na svakom tisku.',
    features: ['Digitalni i ofsetni tisak', 'Vizitke, letci i katalozi', 'Plakati i banneri velikih formata', 'Promo materijali za događanja'],
  },
  {
    tag: '03 — Usluga', id: 'svc-vez', icon: 'fa-tshirt', reverse: false, alt: false,
    title: 'Vez i tisak <em>na tekstil</em>',
    desc: 'Personalizacija tekstila za poslovne i privatne potrebe. Uniforme s Vašim logom, promotivne majice, kape i torbe — vez i direktni tisak na sve vrste materijala s dugotrajnim rezultatima.',
    features: ['Vez logotipa na uniforme', 'Direktni tisak na majice i kape', 'Promotivni tekstilni suveniri', 'Poslovni i sportski tekstil'],
  },
  {
    tag: '04 — Usluga', id: 'svc-vozila', icon: 'fa-car', reverse: true, alt: true,
    title: 'Oslikavanje <em>vozila i površina</em>',
    desc: 'Vaš logo i poruka na svakom kilometru. Profesionalno brendiranje osobnih i dostavnih vozila, autobusa i kamiona — ali i velikih površina poput fasada, izloga i građevinskih ograda.',
    features: ['Brendiranje osobnih i dostavnih vozila', 'Foliranje i wrap vozila', 'Oslikavanje fasada i izloga', 'Reklamni panoi i velike površine'],
  },
  {
    tag: '05 — Usluga', id: 'svc-reklame', icon: 'fa-lightbulb', reverse: false, alt: false,
    title: 'Svjetleće <em>reklame</em>',
    desc: 'Budite vidljivi danju i noću. Izrada LED i neonskih reklama, kanalnih slova i osvjetljenih fasadnih natpisa koji Vaš prostor čine uočljivim u svakom trenutku i privlače pažnju prolaznika.',
    features: ['LED kanalna slova i logotipi', 'Neonske i LED reklame', 'Osvjetljene fasadne ploče', 'Montaža i servis'],
  },
  {
    tag: '06 — Usluga', id: 'svc-ploce', icon: 'fa-sign', reverse: true, alt: true,
    title: 'Putokazi i <em>natpisne ploče</em>',
    desc: 'Profesionalna signalizacija koja vodi Vaše klijente i predstavlja Vaš brend. Od jednostavnih natpisnih ploča do kompleksnih sustavnih rješenja za turizam, ugostiteljstvo i poslovne prostore.',
    features: ['Natpisne ploče za poslovne prostore', 'Turistički putokazi i oznake', 'Prometna i informativna signalizacija', 'Aluminij, pleksiglas, inox i drvo'],
  },
  {
    tag: '07 — Usluga', id: 'svc-promo', icon: 'fa-box-open', reverse: false, alt: false,
    title: 'Promo <em>materijali</em>',
    desc: 'Sve što Vam treba za sajmove, prezentacije i svakodnevni marketing. Rokovnici, olovke, torbe, papirnate vrećice — brendirani promo artikli koji Vaš logo nose dalje od Vašeg ureda.',
    features: ['Brendirani uredski materijal', 'Sajamski i događajni materijali', 'Ambalaža i papirnate vrećice', 'Reklamni gadgeti i pokloni'],
  },
]

/* ── USLUGE HERO ─────────────────────────────────────────────── */
function UslugeHero() {
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
      const cnX       = (currentMx - vw / 2) / (vw / 2)   /* -1 … +1 */
      const cnY       = (currentMy - vh / 2) / (vh / 2)

      /* ── Cards — scroll arc + cursor tilt ── */
      UH_CARDS.forEach((card, ci) => {
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

        /* Cylinder radius shrinks with scroll → card bends more */
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

      /* ── Letter scaleY — cursor proximity ── */
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
    <section className="uh-hero" aria-label="Naše usluge">
      <div className="uh-stage">
        <div className="uh-world">

          {/* Giant title letters */}
          <div className="uh-title-block" aria-hidden="true">
            <div className="uh-title-row">
              {UH_L1.split('').map((ch, i) => (
                <span key={i} ref={el => { l1Refs.current[i] = el }} className="uh-letter uh-letter--1">{ch}</span>
              ))}
            </div>
            <div className="uh-title-row">
              {UH_L2.split('').map((ch, i) => (
                <span key={i} ref={el => { l2Refs.current[i] = el }} className="uh-letter uh-letter--2">{ch}</span>
              ))}
            </div>
          </div>

          {/* 3D bent cards */}
          {UH_CARDS.map((card, ci) => (
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
                          <p className="uh-card-sub" style={{ color: `${card.accent}99` }}>{card.sub}</p>
                        </div>
                        <div className="uh-card-foot">
                          <div className="uh-card-tags">
                            {card.tags.map((tag, t) => (
                              <span
                                key={t}
                                className="uh-card-tag"
                                style={{ borderColor: `${card.accent}55`, color: `${card.accent}CC` }}
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
        <h1 className="uh-hero-label">Naše <em>usluge</em></h1>
        <Link to="/kontakt" className="btn btn-primary">
          Zatražite ponudu <i className="fas fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

/* ── SERVICE SECTION LETTER CONSTANTS ───────────────────────── */
const SL1 = 'NAŠE'
const SL2 = 'USLUGE'

/* ── USLUGE PAGE ─────────────────────────────────────────────── */
export default function Usluge() {
  const pageRef  = useRef(null)
  const sl1Refs  = useRef([])
  const sl2Refs  = useRef([])
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
        const p     = Math.max(0, Math.min(1, 1 - top / vh))
        const ease  = p * p * (3 - 2 * p)
        el.style.transform = `perspective(1400px) rotateX(${-(1 - ease) * 22}deg) rotateZ(${(1 - ease) * 9}deg) translateY(${(1 - ease) * -60}px)`
      })
    }
    function onScroll() { if (!rafId) rafId = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); if (rafId) cancelAnimationFrame(rafId) }
  }, [])

  /* Cursor-responsive scaleY for service section letters */
  useEffect(() => {
    let rafId
    let targetMx  = window.innerWidth / 2
    let currentMx = window.innerWidth / 2
    function tick() {
      currentMx += (targetMx - currentMx) * 0.07
      const radius = window.innerWidth * 0.45
      ;[...sl1Refs.current, ...sl2Refs.current].forEach(el => {
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
        <UslugeHero />
      </div>

      {/* Service sticky split layout — left: big letters, right: scrolling services */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="svc-sticky-layout">

          {/* LEFT: sticky big "NAŠE / USLUGE" */}
          <div className="svc-left">
            <div className="about-big-row">
              {SL1.split('').map((ch, i) => (
                <span key={i} ref={el => { sl1Refs.current[i] = el }} className="about-big-letter about-big-letter--sm">
                  {ch}
                </span>
              ))}
            </div>
            <div className="about-big-row">
              {SL2.split('').map((ch, i) => (
                <span key={i} ref={el => { sl2Refs.current[i] = el }} className="about-big-letter about-big-letter--lg">
                  {ch}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: all services scrolling */}
          <div className="svc-right">
            {SERVICES.map((s, i) => (
              <div className="svc-item" key={i}>
                {i > 0 && <div className="about-divider-line" style={{ borderColor: 'rgba(5,10,16,.08)' }} />}
                <div className="svc-item-img" data-aos>
                  <i className={`fas ${s.icon}`} aria-hidden="true" />
                  <span>Primjer usluge</span>
                </div>
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
            ))}
          </div>

        </div>
      </div>

      {/* CTA — flip-reveal pointing to Izdvojeno */}
      <div className="flip-reveal" style={{ zIndex: 3, marginBottom: 0 }}>
        <CTABig
          subtitle="Pregledajte galeriju naših najljepših projekata — od brendiranja i tiska do vozila i svjetlećih reklama."
          btnText="Izdvojeni radovi"
          btnHref="/izdvojeno"
        />
      </div>

    </div>
  )
}
