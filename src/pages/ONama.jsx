import { useEffect, useRef } from 'react'

/* ── ABOUT TEXT SECTIONS ────────────────────────────────────── */
const ABOUT_SECTIONS = [
  {
    label: 'Nastanak',
    text:  'Sabioncello Grafica osnovana je 2017. godine u Orebiću s jednom jasnom misijom: pomoći lokalnim tvrtkama, ugostiteljima i privatnim klijentima da komuniciraju svoju priču na najbolji mogući način — vizualno, jasno i upečatljivo.',
  },
  {
    label: 'Rast i razvoj',
    text:  'Kroz skoro 10 godina rada na području Orebića i 20 godina iskustva u reklamnoj industriji izgradili smo grafički studio koji razumije potrebe klijenata na Pelješcu i šire. Naša poslovnica u Orebiću centar je iz kojeg svakodnevno kreiramo rješenja za klijente s cijelog područja Dubrovačko-neretvanske županije.',
  },
  {
    label: 'Naš tim',
    text:  'Iza svakog projekta stoje Kristina — kreativna direktorica s okom za detalj i neiscrpnom energijom i Tonći — operativni stup koji nema projekta kojeg se boji. Mali tim s velikim srcem i više od deset zajedničkih godina iza sebe.',
  },
  {
    label: 'Naše vrijednosti',
    text:  'Ne pristajemo na kompromise. Svaki klijent je jedinstven — slušamo, razumijemo i prilagođavamo rješenje baš za Vas. Brzina, kvaliteta i kreativnost nisu klišej; to su principi koji vode svaki projekt od prve skice do gotovog proizvoda.',
  },
  {
    label: 'Doseg',
    text:  'Smješteni u srcu Pelješca, radimo za tvrtke, ugostitelje, udruge i privatne klijente od Metkovića i Opuzena do Dubrovnika, Korčule i ostalih otoka. Dugogodišnja suradnja s nizom poznatih brendova regije svjedoči o povjerenju koje smo gradili godinama.',
  },
]

/* ── BIG LETTER CONSTANTS ───────────────────────────────────── */
const L1 = 'NAŠA'
const L2 = 'PRIČA'
const L3 = 'NAŠA'
const L4 = 'EKIPA'

/* ── TEAM MEMBERS ───────────────────────────────────────────── */
const TEAM = [
  {
    img:   'assets/img/kike.jpeg',
    alt:   'Kristina',
    role:  'Osnivačica & Kreativna Direktorica',
    name:  'Kristina',
    desc:  'Vizija, preciznost i neiscrpna energija za stvaranje Kristina je pokretačka sila iza svakog projekta koji izađe iz naše poslovnice. Dvadeset godina strastvenog rada u dizajnu, komunikaciji i brendiranju.',
    phone: '+385 98 1763072',
    tel:   'tel:+38598XXXXXXX',
  },
  {
    img:   'assets/img/tonci.jpg',
    alt:   'Tonći',
    role:  'Operativni Direktor & Terenski Menadžer',
    name:  'Tonći',
    desc:  'Operativni stup agencije od montaže i realizacije do terenskog rada. Nema projekta koji ga uplaši, niti alata koji mu nije pri ruci. Tonći je razlog zašto svaki projekt završava na vrijeme i onako kako je dogovoreno.',
    phone: '+385 99 595 6567',
    tel:   'tel:+38599XXXXXXX',
  },
  {
    img:   'assets/img/neda.jpg',
    alt:   'Neda',
    role:  'Majstorica veza – "Štik Neda"',
    name:  'Neda',
    desc:  'Neda je majstorica za vez i osoba kojoj ništa ne promakne. Svaki detalj mora biti na svom mjestu, a svaki konac točno gdje treba. Ako treba nešto "uštikati kako treba" znate kome se ide.',
    phone: null,
  },
  {
    img:   'assets/img/kristina.jpg',
    alt:   'Kristina',
    role:  'Suradnica',
    name:  'Kristina',
    desc:  'Kristina je novo lice u timu, ali kao da je s nama oduvijek. Uvijek nasmijana, spremna pomoći i brzo uči sve što treba. S takvim pristupom, jasno je da je već postala neizostavan dio ekipe.',
    phone: null,
  },
]

/* ── PRINCIP VALUES (Zašto biraju nas) ──────────────────────── */
const PRINCIP_VALUES = [
  {
    title: 'Osobni pristup',
    desc:  <>Svaki klijent je jedinstven. Slušamo, razumijemo i prilagođavamo <strong>rješenje baš za Vas</strong> bez kopiranja i bez kompromisa.</>,
  },
  {
    title: 'Kvaliteta bez kompromisa',
    desc:  <>Ne pristajemo na kompromise. Svaki projekt izrađujemo s <strong>maksimalnom pažnjom i preciznošću</strong>, od prve skice do finalnog proizvoda.</>,
  },
  {
    title: 'Brzina isporuke',
    desc:  <>Znamo da su Vaši rokovi važni. <strong>Brza izrada i pouzdana dostava</strong> uvijek na vrijeme jer Vaš poslovni uspjeh ne čeka.</>,
  },
  {
    title: 'Kreativno rješenje',
    desc:  <>Svježe ideje i <strong>kreativni pristup koji izdvaja</strong> Vaš brend od konkurencije jer vizualna komunikacija je Vaš najsnažniji alat.</>,
  },
]


/* ── HOOKS ──────────────────────────────────────────────────── */
function useCounters(ref) {
  useEffect(() => {
    const items = ref.current?.querySelectorAll('.stat-number[data-count]')
    if (!items?.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const target = parseInt(entry.target.dataset.count, 10)
        const dur = 1800, t0 = performance.now();
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
}

/* Handles both data-aos (slide up) and data-aos-top (slide down) */
function useAOS(ref) {
  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-aos], [data-aos-top]')
    if (!els?.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = Array.from(
            (entry.target.parentElement || document).querySelectorAll('[data-aos], [data-aos-top]')
          )
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

/* ── O NAMA PAGE ────────────────────────────────────────────── */
export default function ONama() {
  const pageRef      = useRef(null)
  const l1Refs       = useRef([])   /* NAŠA  about right panel */
  const l2Refs       = useRef([])   /* PRIČA about right panel */
  const l3Refs       = useRef([])   /* NAŠA  team left panel   */
  const l4Refs       = useRef([])   /* EKIPA team left panel   */
  const rafRef       = useRef(null)
  const targetMxRef  = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const currentMxRef = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const cardRef      = useRef(null)
  const arcActiveRef = useRef(false)

  useAOS(pageRef)
  useCounters(pageRef)

  /* Combined RAF cursor-responsive scaleY for all 4 big-letter sets */
  useEffect(() => {
    function tick() {
      currentMxRef.current += (targetMxRef.current - currentMxRef.current) * 0.07
      const mx     = currentMxRef.current
      const radius = window.innerWidth * 0.45
      ;[...l1Refs.current, ...l2Refs.current, ...l3Refs.current, ...l4Refs.current].forEach(el => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx   = rect.left + rect.width / 2
        const t    = Math.max(0, 1 - Math.abs(mx - cx) / radius)
        el.style.transform = `scaleY(${0.9 + (t * t * (3 - 2 * t)) * 0.18})`
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    const onMove = e => { targetMxRef.current = e.clientX }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('mousemove', onMove) }
  }, [])

  /* Hand control from CSS entrance animation to JS arc */
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const done = () => { card.style.animation = 'none'; arcActiveRef.current = true }
    card.addEventListener('animationend', done, { once: true })
    return () => card.removeEventListener('animationend', done)
  }, [])

  /* Flip-reveal tilt + Princip scroll capture handler */
  useEffect(() => {
    let rafId = null
    function update() {
      rafId = null
      const vh = window.innerHeight

      /* flip-reveal entrance tilt */
      pageRef.current?.querySelectorAll('.flip-reveal').forEach(el => {
        const top = el.getBoundingClientRect().top
        if (top <= 0) { el.style.transform = ''; return }
        const p       = Math.max(0, Math.min(1, 1 - top / vh))
        const ease    = p * p * (3 - 2 * p)
        const angleX  = (1 - ease) * 22
        const angleZ  = (1 - ease) * 9
        const offsetY = (1 - ease) * -60
        el.style.transform = `perspective(1400px) rotateX(${-angleX}deg) rotateZ(${angleZ}deg) translateY(${offsetY}px)`
      })

      /* video card arc path */
      if (arcActiveRef.current && cardRef.current) {
        const layout = pageRef.current?.querySelector('.about-sticky-layout')
        if (layout) {
          const layoutRect = layout.getBoundingClientRect()
          const totalScroll = layout.offsetHeight - vh
          const t = totalScroll > 0
            ? Math.max(0, Math.min(1, -layoutRect.top / totalScroll))
            : 0
          const tx  = t * 160
          const ty  = -4 * 65 * t * (1 - t)   /* parabolic arc, peaks −65px at t=0.5 */
          const rot = -7 + t * 20              /* −7deg → +13deg */
          cardRef.current.style.transform =
            `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg)`
        }
      }

      /* princip capture scroll */
      pageRef.current?.querySelectorAll('.princip-capture').forEach(wrap => {
        const rect = wrap.getBoundingClientRect()
        const totalScroll = wrap.offsetHeight - vh
        if (totalScroll <= 0) return
        const scrolled = -rect.top
        const p = Math.max(0, Math.min(1, scrolled / totalScroll))
        const N = PRINCIP_VALUES.length
        const idx = Math.min(N - 1, Math.floor(p * N))

        wrap.querySelectorAll('.princip-slide').forEach((s, i) => {
          s.classList.toggle('is-active', i === idx)
          s.classList.toggle('was-active', i < idx)
        })

        const track = wrap.querySelector('.princip-num-track')
        if (track) {
          const item = track.firstElementChild
          const itemH = item ? item.offsetHeight : 0
          track.style.transform = `translateY(${-idx * itemH}px)`
        }

        const indicator = wrap.querySelector('.princip-ruler-indicator')
        const fill      = wrap.querySelector('.princip-ruler-fill')
        const rulerLines = wrap.querySelector('.princip-ruler-lines')
        if (indicator && rulerLines) {
          const linesH = rulerLines.offsetHeight
          const newTop = (idx + 0.5) / N * linesH
          indicator.style.top = `${newTop}px`
          if (fill) fill.style.height = `${newTop}px`
        }
      })
    }
    function onScroll() { if (!rafId) rafId = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); if (rafId) cancelAnimationFrame(rafId) }
  }, [])

  return (
    <div ref={pageRef}>

      {/* ── NAŠA PRIČA sticky split layout ───────────────────── */}
      {/* z:1 so flip-reveals (z≥2) correctly stack over it */}
      <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="about-sticky-layout">
        <div className="about-left">
          {ABOUT_SECTIONS.map((s, i) => (
            <div className="about-section-item" key={i}>
              {i > 0 && <div className="about-divider-line" />}
              <h3 className="about-section-label">{s.label}</h3>
              <p className="about-section-text">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="about-right">
          <div className="about-right-inner">
            <div className="about-big-row about-big-row--top">
              {L1.split('').map((ch, i) => (
                <span key={i} ref={el => { l1Refs.current[i] = el }} className="about-big-letter about-big-letter--sm">
                  {ch}
                </span>
              ))}
            </div>

            <div className="about-img-card" ref={cardRef}>
              <div className="about-img-inner">
                <video
                  src={`${import.meta.env.BASE_URL}videos/ured.mp4`}
                  autoPlay muted loop playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <svg className="about-twinkle" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                <path d="M40 4 C39.4 20 40.6 20 40 40 C39.4 60 40.6 60 40 76 Z" fill="currentColor"/>
                <path d="M4 40 C20 39.4 20 40.6 40 40 C60 39.4 60 40.6 76 40 Z" fill="currentColor"/>
                <path d="M19 19 C27 32 32 32 40 40 C48 48 53 53 61 61 Z" fill="currentColor" opacity="0.55"/>
                <path d="M61 19 C53 32 48 32 40 40 C32 48 27 53 19 61 Z" fill="currentColor" opacity="0.55"/>
              </svg>
            </div>

            <div className="about-big-row about-big-row--bottom">
              {L2.split('').map((ch, i) => (
                <span key={i} ref={el => { l2Refs.current[i] = el }} className="about-big-letter about-big-letter--lg">
                  {ch}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>{/* end z:1 wrapper */}

      {/* ── STATS + DECO flip-reveal z:2 ─────────────────────── */}
      <div className="flip-reveal" style={{ zIndex: 2, background: '#FFFFFF', marginBottom: '240px' }}>
        <section className="stats-band stats-band--light" aria-label="Naši rezultati u brojevima">
          <div className="container">

            <div className="section-header" data-aos>
              <h2 className="section-title section-title-inv">20 godina iskustva<br /><em>u reklamnoj industriji</em></h2>
            </div>

            <div className="stats-grid stats-grid--3" style={{ marginTop: '48px' }}>
              <div className="stat-item" data-aos>
                <div className="stat-count"><span className="stat-number" data-count="20">0</span><span className="stat-plus">+</span></div>
                <span className="stat-label">Godina iskustva</span>
              </div>
              <div className="stat-item" data-aos>
                <div className="stat-count"><span className="stat-number" data-count="100">0</span><span className="stat-plus">+</span></div>
                <span className="stat-label">Zadovoljnih klijenata</span>
              </div>
              <div className="stat-item" data-aos>
                <div className="stat-count"><span className="stat-number" data-count="10">0</span></div>
                <span className="stat-label">Kategorija usluga</span>
              </div>
            </div>


          </div>
        </section>
      </div>

      {/* ── NAŠA EKIPA sticky split layout ───────────────────── */}
      {/* z:3 so it appears above sticky stats (z:2) as you scroll into it */}
      <div style={{ position: 'relative', zIndex: 3 }}>
      <div className="team-sticky-layout">

        {/* LEFT: sticky big "NAŠA / EKIPA" */}
        <div className="team-left">
          <div className="about-big-row">
            {L3.split('').map((ch, i) => (
              <span key={i} ref={el => { l3Refs.current[i] = el }} className="about-big-letter about-big-letter--sm">
                {ch}
              </span>
            ))}
          </div>
          <div className="about-big-row">
            {L4.split('').map((ch, i) => (
              <span key={i} ref={el => { l4Refs.current[i] = el }} className="about-big-letter about-big-letter--lg">
                {ch}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT: scrollable team member sections */}
        <div className="team-right">
          {TEAM.map((m, i) => (
            <div className="team-person" key={i}>
              {i > 0 && <div className="about-divider-line" />}

              {/* Image section */}
              <div className="team-person-img-section">
                <div className="team-person-photo">
                  <img
                    src={m.img} alt={m.alt}
                    onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                  />
                  <div className="team-img-placeholder" style={{ display: 'none' }}>
                    <i className="fas fa-user" aria-hidden="true"></i>
                  </div>
                </div>
                <p className="team-person-role">{m.role}</p>
              </div>

              {/* Info section */}
              <div className="team-person-info">
                <div className="about-divider-line" />
                <h3 className="team-person-name">{m.name}</h3>
                <p className="team-person-desc">{m.desc}</p>
                {m.phone && (
                  <div className="team-phone-link">
                    <i className="fas fa-phone" aria-hidden="true"></i>
                    <a href={m.tel}>{m.phone}</a>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
      </div>{/* end z:3 wrapper */}

      {/* ── ZAŠTO BIRAJU NAS Princip counter z:4 ─────────────── */}
      <div className="princip-capture" style={{ position: 'relative', zIndex: 4, height: `${PRINCIP_VALUES.length * 100}vh` }}>
        <div className="flip-reveal flip-reveal--capture" style={{ background: '#E8F5F8', marginBottom: 0 }}>
          <div className="princip-section" aria-label="Zašto biraju nas">

            {/* LEFT: sliding title + description */}
            <div className="princip-left">
              <div className="princip-slides">
                {PRINCIP_VALUES.map((v, i) => (
                  <div className={`princip-slide${i === 0 ? ' is-active' : ''}`} key={i}>
                    <div>
                      <p className="princip-slide-label">Zašto biraju nas</p>
                      <h2 className="princip-slide-title">{v.title}</h2>
                    </div>
                    <div>
                      <hr className="princip-slide-hr" />
                      <p className="princip-slide-desc">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CENTER: ruler with moving indicator */}
            <div className="princip-ruler">
              <div className="princip-ruler-lines">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div className="princip-ruler-line" key={i} />
                ))}
                {/* Fill layer grows down, clips white copies of the lines */}
                <div className="princip-ruler-fill">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div className="princip-ruler-line princip-ruler-line--white" key={i} />
                  ))}
                </div>
                <div className="princip-ruler-indicator" />
              </div>
            </div>

            {/* RIGHT: large PRINCIP + slot-machine number */}
            <div className="princip-right">
              <span className="princip-word">PRINCIP</span>
              <div className="princip-num-viewport">
                <div className="princip-num-track">
                  {PRINCIP_VALUES.map((_, i) => (
                    <span className="princip-num-item" key={i}>{i + 1}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


    </div>
  )
}
