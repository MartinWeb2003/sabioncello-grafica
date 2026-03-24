import { useEffect, useRef, useState } from 'react'
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

export default function Kontakt() {
  const pageRef = useRef(null)
  useAOS(pageRef)

  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  function validate() {
    const e = {}
    if (form.name.trim().length < 2) e.name = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = true
    if (form.message.trim().length < 5) e.message = true
    return e
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
      setTimeout(() => setSuccess(false), 6000)
    }, 1600)
  }

  return (
    <div ref={pageRef}>
      <header className="page-hero" aria-labelledby="ph-title">
        <div className="page-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Početna</Link>
            <i className="fas fa-chevron-right"></i>
            <span>Kontakt</span>
          </nav>
          <h1 className="page-hero-title" id="ph-title">Stupite u <em>kontakt</em></h1>
          <p className="page-hero-sub">Imate projekt, pitanje ili ideju? Javite nam se — odgovaramo brzo.</p>
        </div>
      </header>

      <main>
        <section className="section" aria-labelledby="kontakt-title">
          <div className="container">
            <div className="kontakt-grid">
              <div className="k-info" data-aos>
                <h2 className="section-title" id="kontakt-title">Pronađite <em>nas</em></h2>
                <div className="divider"></div>
                {[
                  { icon: 'fa-map-marker-alt', label: 'Adresa',        content: <p>Orebić, Pelješac<br />Dubrovačko-neretvanska županija</p> },
                  { icon: 'fa-phone',          label: 'Telefon',       content: <p><a href="tel:+38598XXXXXXX">+385 98 1763072</a><br /><a href="tel:+38599XXXXXXX">+385 99 595 6567</a></p> },
                  { icon: 'fa-envelope',       label: 'E-mail',        content: <p><a href="mailto:info@sabioncellografica.hr">info@sabioncellografica.hr</a></p> },
                  { icon: 'fa-clock',          label: 'Radno vrijeme', content: <p>Ponedjeljak – Subota<br />08:00 – 16:00</p> },
                ].map((item, i) => (
                  <div className="k-info-item" key={i}>
                    <div className="k-icon"><i className={`fas ${item.icon}`}></i></div>
                    <div><h4>{item.label}</h4>{item.content}</div>
                  </div>
                ))}
                <div className="socials-row">
                  <a href="#" className="social-btn" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="social-btn" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                </div>
              </div>

              <div data-aos>
                <div className="form-card">
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Ime i prezime <span className="req">*</span></label>
                        <input type="text" id="name" className={errors.name ? 'error' : ''} value={form.name} onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: false })) }} placeholder="Ana Horvat" autoComplete="name" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">E-mail adresa <span className="req">*</span></label>
                        <input type="email" id="email" className={errors.email ? 'error' : ''} value={form.email} onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: false })) }} placeholder="ana@primjer.hr" autoComplete="email" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Broj telefona</label>
                      <input type="tel" id="phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+385 XX XXX XXXX" autoComplete="tel" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="service">Usluga koja Vas zanima</label>
                      <select id="service" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                        <option value="">— Odaberite uslugu —</option>
                        {['Grafički dizajn','Tisak','Vez i tisak na tekstil','Oslikavanje vozila','Svjetleće reklame','Putokazi i natpisne ploče','Promo materijali','Jelovnici','Vjenčanja','Trofeje i plakete','Poslovni / personalizirani pokloni','Etikete','Ostalo'].map(opt => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Poruka <span className="req">*</span></label>
                      <textarea id="message" className={errors.message ? 'error' : ''} value={form.message} onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: false })) }} rows={5} placeholder="Opišite Vaš projekt, potrebe i rokove..." required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" disabled={sending} style={{ width: '100%', justifyContent: 'center' }}>
                      {sending ? <><i className="fas fa-spinner fa-spin"></i> Šalje se…</> : <>Pošaljite upit <i className="fas fa-paper-plane"></i></>}
                    </button>
                    {success && (
                      <div className="form-success show" role="alert">
                        <i className="fas fa-check-circle"></i> Hvala! Vaša poruka je primljena. Javit ćemo Vam se uskoro.
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>

            <div className="map-placeholder" data-aos>
              <i className="fas fa-map-marked-alt"></i>
              <p>Orebić, Pelješac — Dubrovačko-neretvanska županija</p>
            </div>
          </div>
        </section>

        <CTABand title="Brzi odgovor, bez obaveza." subtitle="Svaki upit tretiramo s pažnjom — odgovorimo u roku jednog radnog dana." btnText={<><i className="fas fa-phone"></i> Nazovite nas odmah</>} btnHref="tel:+38598XXXXXXX" phone={true} />
      </main>
    </div>
  )
}
