import { useEffect, useRef, useState } from 'react'

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

/* ── IMAGE TRAIL POOL ────────────────────────────────────────── */
const TRAIL_IMGS = [
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
  'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
  'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80',
]

const KH_L1 = 'KONTAKT'

/* ── KONTAKT HERO ────────────────────────────────────────────── */
function KontaktHero() {
  const heroRef      = useRef(null)
  const l1Refs       = useRef([])
  const labelRef     = useRef(null)
  const titleBlockRef = useRef(null)
  const rafRef       = useRef(null)
  const targetMxRef  = useRef(0)
  const currentMxRef = useRef(0)
  const trailRefs    = useRef([null, null, null, null])
  const trailSlot    = useRef(0)
  const lastImgTime  = useRef(0)

  useEffect(() => {
    targetMxRef.current  = window.innerWidth / 2
    currentMxRef.current = window.innerWidth / 2

    function tick() {
      currentMxRef.current += (targetMxRef.current - currentMxRef.current) * 0.07
      const mx     = currentMxRef.current
      const vw     = window.innerWidth
      const radius = vw * 0.45

      /* Letter scaleY — cursor proximity */
      l1Refs.current.forEach(el => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx   = rect.left + rect.width / 2
        const t    = Math.max(0, 1 - Math.abs(mx - cx) / radius)
        el.style.transform = `scaleY(${0.93 + (t * t * (3 - 2 * t)) * 0.14})`
      })

      /* Cursor repulsion — label moves left, big text moves right */
      const cnX    = (mx - vw / 2) / (vw / 2)   // -1..+1
      const SHIFT  = 80
      const labelX = Math.min(0, cnX * -SHIFT)   // cursor right → label left
      const bigX   = Math.max(0, cnX * -SHIFT)   // cursor left  → big text right

      if (labelRef.current) {
        labelRef.current.style.transform = `translateY(-50%) translateX(${labelX}px)`
      }
      if (titleBlockRef.current) {
        titleBlockRef.current.style.transform = `translateX(${bigX}px)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    const onMove  = e => { targetMxRef.current = e.clientX }
    const onLeave = () => { targetMxRef.current = window.innerWidth / 2 }
    window.addEventListener('mousemove',  onMove,  { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  function onHeroMove(e) {
    const now = Date.now()
    if (now - lastImgTime.current < 180) return
    lastImgTime.current = now
    if (!heroRef.current) return
    const r    = heroRef.current.getBoundingClientRect()
    const x    = e.clientX - r.left
    const y    = e.clientY - r.top
    const slot = trailSlot.current
    const img  = trailRefs.current[slot]
    if (!img) return
    img.style.transition = 'opacity 0s'
    img.style.opacity    = '0'
    requestAnimationFrame(() => {
      img.src              = TRAIL_IMGS[Math.floor(Math.random() * TRAIL_IMGS.length)]
      img.style.left       = `${x}px`
      img.style.top        = `${y}px`
      img.style.transition = 'opacity 0.18s ease'
      img.style.opacity    = '1'
    })
    trailSlot.current = (slot + 1) % 4
  }

  function onHeroLeave() {
    trailRefs.current.forEach(img => {
      if (!img) return
      img.style.transition = 'opacity 0.25s ease'
      img.style.opacity    = '0'
    })
  }

  return (
    <section
      className="kh-hero"
      ref={heroRef}
      aria-label="Kontaktirajte nas"
      onMouseMove={onHeroMove}
      onMouseLeave={onHeroLeave}
    >
      {/* Giant ghost background letters */}
      <div className="kh-title-block" aria-hidden="true" ref={titleBlockRef}>
        <div className="kh-title-row">
          {KH_L1.split('').map((ch, i) => (
            <span key={i} ref={el => { l1Refs.current[i] = el }} className="kh-letter">{ch}</span>
          ))}
        </div>
      </div>

      {/* Foreground label */}
      <div className="kh-label" ref={labelRef}>
        <span>Stupite u <em>kontakt</em> s nama</span>
      </div>

      {/* Bottom info bar */}
      <div className="kh-footer">
        <span className="kh-tagline">Orebić, Pelješac · 20 godina iskustva</span>
        <div className="kh-footer-chips">
          <span><i className="fas fa-phone" aria-hidden="true"></i> +385 99 595 6567</span>
          <span><i className="fas fa-envelope" aria-hidden="true"></i> sabioncello.grafica@gmail.com</span>
          <span><i className="fas fa-clock" aria-hidden="true"></i> Pon–Sub 08:00–16:00</span>
        </div>
      </div>

      {/* Image trail — 4 pooled image slots */}
      {[0, 1, 2, 3].map(i => (
        <img
          key={i}
          ref={el => { trailRefs.current[i] = el }}
          className="cta-big__hover-img"
          src=""
          alt=""
          aria-hidden="true"
          style={{ opacity: 0 }}
        />
      ))}
    </section>
  )
}

/* ── MAIN PAGE ───────────────────────────────────────────────── */
export default function Kontakt() {
  const pageRef = useRef(null)
  useAOS(pageRef)

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
        const angleX  = (1 - ease) * 22
        const angleZ  = (1 - ease) * 9
        const offsetX = (1 - ease) * 100
        const offsetY = (1 - ease) * -60
        el.style.transform = `perspective(1400px) rotateX(${-angleX}deg) rotateZ(${angleZ}deg) translateX(${offsetX}px) translateY(${offsetY}px)`
      })
    }
    function onScroll() { if (!rafId) rafId = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); if (rafId) cancelAnimationFrame(rafId) }
  }, [])

  return (
    <div ref={pageRef}>
      <div className="hero-sticky" style={{ marginBottom: '240px' }}>
        <KontaktHero />
      </div>

      {/* ── MAP + CONTACT DETAILS ── */}
      <div className="flip-reveal" style={{ zIndex: 2, background: '#FFFFFF', marginBottom: '240px' }}>
        <section className="section k-section" aria-labelledby="k-details-title">
          <div className="container">
            <div className="k-split">

              {/* LEFT — Google Maps */}
              <div className="k-map-col" data-aos>
                <p className="k-col-label">Pronađite nas</p>
                <div className="k-map-wrap">
                  <iframe
                    title="Sabioncello Grafica lokacija"
                    src="https://maps.google.com/maps?q=Sabioncello+Grafica+d.o.o.+Josipa+bana+Jelacica+46+Orebic+Croatia&output=embed&hl=hr&z=15"
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* RIGHT — Contact details */}
              <div className="k-details-col" data-aos>
                <h2 className="k-details-title" id="k-details-title">
                  Kontakt <em>detalji</em>
                </h2>

                <div className="k-detail-block">
                  <p className="k-detail-company">Sabioncello Grafica d.o.o.</p>
                  <div className="k-detail-row">
                    <i className="fas fa-box" aria-hidden="true"></i>
                    <div>
                      <p>Perna 4</p>
                      <p>20250 Orebić, Hrvatska</p>
                    </div>
                  </div>
                </div>

                <div className="k-detail-block">
                  <p className="k-detail-label">Poslovnica</p>
                  <div className="k-detail-row">
                    <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                    <div>
                      <p>Josipa bana Jelačića 46</p>
                      <p>20250 Orebić, Hrvatska</p>
                    </div>
                  </div>
                </div>

                <div className="k-detail-block">
                  <p className="k-detail-label">Mobitel</p>
                  <div className="k-detail-row">
                    <i className="fas fa-phone" aria-hidden="true"></i>
                    <div>
                      <p>
                        <a href="tel:+385995956567">+385 99 595 6567</a>
                        <span className="k-person-tag">Tonći</span>
                      </p>
                      <p>
                        <a href="tel:+385981763072">+385 98 176 3072</a>
                        <span className="k-person-tag">Kristina</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="k-detail-block">
                  <p className="k-detail-label">E-mail</p>
                  <div className="k-detail-row">
                    <i className="fas fa-envelope" aria-hidden="true"></i>
                    <div>
                      <p>
                        <a href="mailto:sabioncello.grafica@gmail.com">
                          sabioncello.grafica@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="k-detail-block">
                  <p className="k-detail-label">Radno vrijeme</p>
                  <div className="k-detail-row">
                    <i className="fas fa-clock" aria-hidden="true"></i>
                    <div>
                      <p>Ponedjeljak – Subota</p>
                      <p>08:00 – 16:00</p>
                    </div>
                  </div>
                </div>

                <div className="k-socials">
                  <a href="#" className="social-btn" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="social-btn" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

    </div>
  )
}
