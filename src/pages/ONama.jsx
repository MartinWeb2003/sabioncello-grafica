import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import CTABand from '../components/CTABand'

function useCounters(ref) {
  useEffect(() => {
    const items = ref.current?.querySelectorAll('.stat-number[data-count]')
    if (!items?.length) return
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
}

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

export default function ONama() {
  const pageRef = useRef(null)
  useAOS(pageRef)
  useCounters(pageRef)

  return (
    <div ref={pageRef}>
      <header className="page-hero" aria-labelledby="ph-title">
        <span className="page-hero-deco" aria-hidden="true">PRIČA</span>
        <div className="page-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Početna</Link>
            <i className="fas fa-chevron-right"></i>
            <span>O Nama</span>
          </nav>
          <h1 className="page-hero-title" id="ph-title">Naša <em>priča</em></h1>
          <p className="page-hero-sub">Dvadeset godina dizajna, tiska i strasti — sve za Vas.</p>
        </div>
      </header>

      <main>
        <section className="section" aria-labelledby="prica-title">
          <div className="container">
            <div className="o-nama-split">
              <div className="o-img" data-aos>
                <div className="o-placeholder"><i className="fas fa-camera"></i><span>Fotografija tima / studija</span></div>
                <div className="medal-badge" aria-label="Osnovani 2004">
                  <div className="medal-ribbons" aria-hidden="true"><span className="ribbon ribbon-l"></span><span className="ribbon ribbon-r"></span></div>
                  <div className="medal-circle"><span className="medal-year">2004</span><span className="medal-label">Osnovani</span></div>
                </div>
              </div>
              <div className="o-content" data-aos>
                <h2 className="section-title" id="prica-title">Dvadeset godina<br /><em>strasti prema dizajnu</em></h2>
                <div className="divider"></div>
                <p className="body-text">Sabioncello Grafica osnovana je 2004. godine u Orebićima, s jednom jasnom misijom: pomoći lokalnim tvrtkama, ugostiteljima i privatnim klijentima da komuniciraju svoju priču na najbolji mogući način — vizualno, jasno i upečatljivo.</p>
                <p className="body-text">Kroz dvadeset godina rada izgradili smo tim stručnjaka koji razumiju potrebe klijenata na Pelješcu i šire. Naša poslovnica u <strong>Orebićima</strong> centar je iz kojeg svakodnevno kreiramo rješenja za klijente s cijelog područja <strong>Dubrovačko-neretvanske županije</strong>.</p>
                <p className="body-text">Ponosni smo na dugogodišnje partnerstvo s nizom poznatih klijenata regije koji nam i danas vjeruju za sve svoje dizajnerske i tiskarske potrebe.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-band" aria-label="Naši rezultati u brojevima">
          <div className="container">
            <div className="stats-grid stats-grid--3">
              <div className="stat-item" data-aos><div className="stat-count"><span className="stat-number" data-count="20">0</span><span className="stat-plus">+</span></div><span className="stat-label">Godina iskustva</span></div>
              <div className="stat-item" data-aos><div className="stat-count"><span className="stat-number" data-count="100">0</span><span className="stat-plus">+</span></div><span className="stat-label">Realiziranih projekata</span></div>
              <div className="stat-item" data-aos><div className="stat-count"><span className="stat-number" data-count="7">0</span></div><span className="stat-label">Kategorija usluga</span></div>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="tim-title">
          <div className="container">
            <div className="section-header" data-aos>
              <h2 className="section-title" id="tim-title">Ljudi iza <em>svakog projekta</em></h2>
              <p className="section-sub">Mali tim s velikim srcem — i dvadeset godina zajedničkog rada iza nas.</p>
            </div>
            <div className="team-grid">
              {[
                { img: 'assets/img/kristina.jpg', alt: 'Kristina Bogoje', role: 'Osnivačica & Kreativna Direktorica', name: 'Kristina Bogoje', desc: 'Vizija, preciznost i neiscrpna energija za stvaranje — Kristina je pokretačka sila iza svakog projekta koji izađe iz naše poslovnice.', phone: '+385 98 1763072', tel: 'tel:+38598XXXXXXX' },
                { img: 'assets/img/tonci.jpg',    alt: 'Tonći Bogoje',    role: 'Operativni Direktor & Terenski Menadžer', name: 'Tonći Bogoje', desc: 'Operativni stup agencije — od montaže i realizacije do terenskog rada. Nema projekta koji ga uplaši, niti alata koji mu nije pri ruci.', phone: '+385 99 595 6567', tel: 'tel:+38599XXXXXXX' },
                { img: 'assets/img/niko.jpg',     alt: 'Niko Bogoje',     role: 'Budući Suradnik', name: 'Niko Bogoje', desc: 'Najmlađi, ali nimalo manje važan član tima. Pažljivo promatra, sve pamti i uvijek će vas dočekati s osmijehom na ulazu u poslovnicu.', phone: null },
              ].map((m, i) => (
                <article className="team-card" key={i} data-aos>
                  <div className="team-img">
                    <img src={m.img} alt={m.alt} onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
                    <div className="team-img-placeholder" style={{ display: 'none' }}><i className="fas fa-user"></i></div>
                  </div>
                  <div className="team-body">
                    <p className="team-role">{m.role}</p>
                    <h3 className="team-name">{m.name}</h3>
                    <p className="team-desc">{m.desc}</p>
                  </div>
                  {m.phone && <div className="team-phone"><i className="fas fa-phone"></i><a href={m.tel}>{m.phone}</a></div>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark" aria-labelledby="vrijednosti-title">
          <div className="container">
            <div className="section-header" data-aos>
              <h2 className="section-title section-title-inv" id="vrijednosti-title">Zašto biraju nas</h2>
              <p className="section-sub section-sub-inv">Principi koji vode svaki naš projekt i svaki odnos s klijentom.</p>
            </div>
            <div className="values-grid">
              {[
                { icon: 'fa-handshake', title: 'Osobni pristup', desc: 'Svaki klijent je jedinstven. Slušamo, razumijemo i prilagođavamo rješenje baš za Vas.' },
                { icon: 'fa-award',     title: 'Kvaliteta',      desc: 'Ne pristajemo na kompromise. Svaki projekt izrađujemo s maksimalnom pažnjom i preciznošću.' },
                { icon: 'fa-bolt',      title: 'Brzina',         desc: 'Znamo da su Vaši rokovi važni. Brza izrada i pouzdana dostava uvijek na vrijeme.' },
                { icon: 'fa-lightbulb', title: 'Kreativnost',    desc: 'Svježe ideje i kreativni pristup koji izdvaja Vaš brend od konkurencije.' },
              ].map((v, i) => (
                <div className="value-card" key={i} data-aos>
                  <div className="value-icon"><i className={`fas ${v.icon}`}></i></div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="lok-title">
          <div className="container">
            <div className="o-nama-split reverse">
              <div className="o-content" data-aos>
                <h2 className="section-title" id="lok-title">Orebić kao baza,<br /><em>cijela županija kao teren</em></h2>
                <div className="divider"></div>
                <p className="body-text">Smješteni u srcu Pelješca, naša poslovnica u <strong>Orebićima</strong> idealno je polazište za serviranje klijenata diljem regije. Radimo za tvrtke, ugostitelje, udruge i privatne klijente od <strong>Metkovića i Opuzena</strong> do <strong>Dubrovnika i otoka</strong>.</p>
                <p className="body-text">Dugogodišnja suradnja s nizom poznatih brendova i institucija Dubrovačko-neretvanske županije svjedoči o povjerenju koje smo gradili godinama — jedno po jedno partnerstvo.</p>
                <ul className="feature-list">
                  <li><i className="fas fa-map-marker-alt"></i> Poslovnica u Orebićima, Pelješac</li>
                  <li><i className="fas fa-truck"></i> Dostava na cijelom području DNŽ-a</li>
                  <li><i className="fas fa-users"></i> Poznati lokalni i regionalni klijenti</li>
                  <li><i className="fas fa-phone"></i> Dostupni Pon–Sub, 8:00–16:00</li>
                </ul>
                <Link to="/kontakt" className="btn btn-primary" style={{ marginTop: '2rem' }}>Stupite u kontakt <i className="fas fa-arrow-right"></i></Link>
              </div>
              <div className="o-img" data-aos>
                <div className="o-placeholder"><i className="fas fa-map-marked-alt"></i><span>Karta / fotografija lokacije</span></div>
              </div>
            </div>
          </div>
        </section>

        <CTABand title="Postanite naš sljedeći uspješan projekt." subtitle="Svaki veliki brend počeo je jednom dobrom idejom i pravim partnerom." btnText="Kontaktirajte nas" btnHref="/kontakt" />
      </main>
    </div>
  )
}
