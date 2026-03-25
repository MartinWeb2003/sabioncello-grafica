import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import CTABand from '../components/CTABand'

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

const ITEMS = [
  {
    icon: 'fa-utensils', reverse: false, alt: false, id: 'izdv-jelovnici',
    title: '<em>Jelovnici</em>',
    desc: 'Svaki restoran, hotel i kafić zaslužuje jelovnik koji je jednako ukusan kao i hrana koju nudi. Dizajniramo i tiskamo jelovnike koji odišu karakterom Vašeg objekta — od jednostavnih laminiranih do premium tvrdouvezanih verzija.',
    features: ['Individualni dizajn prema brendu', 'Laminiranje, spiralno uvezivanje, tvrdouvez', 'A4, A5, triptih i nestandardni formati', 'Sezonska ažuriranja i retiski'],
  },
  {
    icon: 'fa-heart', reverse: true, alt: true, id: 'izdv-vjencanja',
    title: '<em>Vjenčanja</em>',
    desc: 'Vaš savršen dan zaslužuje savršen tiskani materijal. Dizajniramo i tiskamo sve od pozivnica i zahvalnica do oznaka za stolove, mapa za goste i prilagođenih kutija za kolače — sve u jedinstvenoj estetici Vašeg vjenčanja.',
    features: ['Pozivnice i zahvalnice', 'Oznake za stolove i mape gostiju', 'Kuverti, naljepnice i pečati', 'Personalizirani suvenir paketi'],
  },
  {
    icon: 'fa-tag', reverse: false, alt: false, id: 'izdv-etikete',
    title: '<em>Etikete</em>',
    desc: 'Na Pelješcu raste iznimno vino i maslinovo ulje — a mi pazimo da i etiketa bude na razini sadržaja boce. Dizajniramo i tiskamo etikete za domaće proizvode koje privlače poglede na polici i pripovijedaju priču o tradiciji i kvaliteti.',
    features: ['Etikete za vina i maslinova ulja', 'Etikete za med, likere i rakije', 'Vodootporne i UV-lakirani tisak', 'Mala i velika naklada'],
  },
  {
    icon: 'fa-trophy', reverse: true, alt: true, id: 'izdv-trofeje',
    title: 'Trofeje i <em>plakete</em>',
    desc: 'Svako postignuće vrijedi biti obilježeno. Izrađujemo personalizirane trofeje, staklene i akrilne plakete te nagrade za sportske udruge, korporativne dodjele i obljetnice — sa graviranjem ili UV tiskom.',
    features: ['Staklene i akrilne plakete', 'Sportski trofeje i pehari', 'Graviranje i UV tisak', 'Korporativne nagrade i zahvalnice'],
  },
  {
    icon: 'fa-gift', reverse: false, alt: false, id: 'izdv-pokloni',
    title: 'Poslovni i personalizirani <em>pokloni</em>',
    desc: 'Poklon koji nosi Vaše ime ili osobnu poruku uvijek je bolji od generičkog. Uređujemo i tiskamo personalizirane kutije, knjige, fotoalbume, kalendare i setove koji ostavljaju trajan dojam na poslovne partnere, prijatelje i obitelj.',
    features: ['Poslovni pokloni s logotipom', 'Personalizirani fotoalbumi i knjige', 'Brendirani kalendari i planer', 'Poklon kutije i ambalaža'],
  },
]

export default function Izdvojeno() {
  const pageRef = useRef(null)
  useAOS(pageRef)

  return (
    <div ref={pageRef}>
      <header className="page-hero" aria-labelledby="ph-title">
        <span className="page-hero-deco" aria-hidden="true">IZDVOJENO</span>
        <div className="page-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Početna</Link>
            <i className="fas fa-chevron-right"></i>
            <span>Izdvojeno</span>
          </nav>
          <h1 className="page-hero-title" id="ph-title">Posebnosti koje <em>volimo raditi</em></h1>
          <p className="page-hero-sub">Projekti kojima posvećujemo posebnu pažnju — od vjenčanja do poslovnih poklona.</p>
        </div>
      </header>

      <main>
        {ITEMS.map((item, i) => (
          <section key={i} className={`section${item.alt ? ' section-dark' : ''}`} aria-labelledby={item.id}>
            <div className="container">
              <div className={`o-nama-split${item.reverse ? ' reverse' : ''}`}>
                {!item.reverse && (
                  <div className="o-img" data-aos>
                    <div className="o-placeholder"><i className={`fas ${item.icon}`}></i><span>Primjer</span></div>
                  </div>
                )}
                <div className="o-content" data-aos>
                  <h2 className="section-title" id={item.id} dangerouslySetInnerHTML={{ __html: item.title }} />
                  <div className="divider"></div>
                  <p className="body-text">{item.desc}</p>
                  <ul className="feature-list">
                    {item.features.map((f, j) => <li key={j}><i className="fas fa-check-circle"></i> {f}</li>)}
                  </ul>
                  <Link to="/kontakt" className="btn btn-primary" style={{ marginTop: '2rem' }}>Zatražite ponudu <i className="fas fa-arrow-right"></i></Link>
                </div>
                {item.reverse && (
                  <div className="o-img" data-aos>
                    <div className="o-placeholder"><i className={`fas ${item.icon}`}></i><span>Primjer</span></div>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}

        <CTABand title="Imate poseban projekt na umu?" subtitle="Javite nam se — svaki jedinstven projekt je priča za sebe i mi je volimo ispričati zajedno s Vama." btnText="Kontaktirajte nas" btnHref="/kontakt" />
      </main>
    </div>
  )
}
