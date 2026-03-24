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

export default function Usluge() {
  const pageRef = useRef(null)
  useAOS(pageRef)

  return (
    <div ref={pageRef}>
      <header className="page-hero" aria-labelledby="ph-title">
        <div className="page-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Početna</Link>
            <i className="fas fa-chevron-right"></i>
            <span>Usluge</span>
          </nav>
          <h1 className="page-hero-title" id="ph-title">Naše <em>usluge</em></h1>
          <p className="page-hero-sub">Od grafičkog dizajna do oslikavanja vozila — sve pod jednim krovom, 20 godina iskustva.</p>
        </div>
      </header>

      <main>
        {SERVICES.map((s, i) => (
          <section key={i} className={`section${s.alt ? ' section-alt' : ''}`} aria-labelledby={s.id}>
            <div className="container">
              <div className={`o-nama-split${s.reverse ? ' reverse' : ''}`}>
                {!s.reverse && (
                  <div className="o-img" data-aos>
                    <div className="o-placeholder"><i className={`fas ${s.icon}`}></i><span>Primjer usluge</span></div>
                  </div>
                )}
                <div className="o-content" data-aos>
                  <h2 className="section-title" id={s.id} dangerouslySetInnerHTML={{ __html: s.title }} />
                  <div className="divider"></div>
                  <p className="body-text">{s.desc}</p>
                  <ul className="feature-list">
                    {s.features.map((f, j) => <li key={j}><i className="fas fa-check-circle"></i> {f}</li>)}
                  </ul>
                  <Link to="/kontakt" className="btn btn-primary" style={{ marginTop: '2rem' }}>Zatražite ponudu <i className="fas fa-arrow-right"></i></Link>
                </div>
                {s.reverse && (
                  <div className="o-img" data-aos>
                    <div className="o-placeholder"><i className={`fas ${s.icon}`}></i><span>Primjer usluge</span></div>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}

        <CTABand title="Trebate nešto od navedenog?" subtitle="Kontaktirajte nas i dobijte ponudu prilagođenu Vašim potrebama i budžetu." btnText="Zatražite besplatnu ponudu" btnHref="/kontakt" />
      </main>
    </div>
  )
}
