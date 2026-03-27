import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const CTA_IMGS = [
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
  'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
  'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80',
]

export default function CTABig({
  line1    = 'IMATE',
  line2    = 'IDEJU?',
  subtitle = 'Kontaktirajte nas danas i zajedno osmislimo projekt koji će izdvojiti Vaš brend.',
  btnText  = 'Zatražite ponudu',
  btnHref  = '/kontakt',
}) {
  const leftRef      = useRef(null)
  const trailRefs    = useRef([null, null, null, null])
  const trailSlot    = useRef(0)
  const lastImgTime  = useRef(0)
  const l1Refs       = useRef([])
  const l2Refs       = useRef([])
  const rafRef       = useRef(null)
  const targetMxRef  = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const currentMxRef = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)

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
        el.style.transform = `scaleY(${1.0 - (t * t * (3 - 2 * t)) * 0.22})`
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    const onMove = e => { targetMxRef.current = e.clientX }
    rafRef.current = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove)
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('mousemove', onMove) }
  }, [])

  const pickImg = () => CTA_IMGS[Math.floor(Math.random() * CTA_IMGS.length)]

  function onLeftMove(e) {
    const now = Date.now()
    if (now - lastImgTime.current < 180) return
    lastImgTime.current = now
    if (!leftRef.current) return
    const r   = leftRef.current.getBoundingClientRect()
    const x   = e.clientX - r.left
    const y   = e.clientY - r.top
    const slot = trailSlot.current
    const img  = trailRefs.current[slot]
    if (!img) return
    img.style.transition = 'opacity 0s'
    img.style.opacity    = '0'
    requestAnimationFrame(() => {
      img.src              = pickImg()
      img.style.left       = `${x}px`
      img.style.top        = `${y}px`
      img.style.transition = 'opacity 0.18s ease'
      img.style.opacity    = '1'
    })
    trailSlot.current = (slot + 1) % 4
  }

  function onLeftLeave() {
    trailRefs.current.forEach(img => {
      if (!img) return
      img.style.transition = 'opacity 0.25s ease'
      img.style.opacity    = '0'
    })
  }

  return (
    <section className="cta-big">
      <div className="cta-big__left" ref={leftRef}
        onMouseMove={onLeftMove} onMouseLeave={onLeftLeave}>
        <div className="cta-big__text">
          <div className="cta-big__row">
            {line1.split('').map((ch, i) => (
              <span key={i} ref={el => { l1Refs.current[i] = el }} className="cta-big-letter">{ch}</span>
            ))}
          </div>
          <div className="cta-big__row">
            {line2.split('').map((ch, i) => (
              <span key={i} ref={el => { l2Refs.current[i] = el }} className="cta-big-letter">{ch}</span>
            ))}
          </div>
        </div>
        {[0,1,2,3].map(i => (
          <img key={i} ref={el => { trailRefs.current[i] = el }}
            className="cta-big__hover-img" src="" alt="" aria-hidden="true"
            style={{ opacity: 0 }} />
        ))}
      </div>

      <div className="cta-big__right">
        <p className="cta-big__sub">{subtitle}</p>
        <div className="cta-big__btn-area">
          <svg className="cta-big__arrow" viewBox="0 0 120 70" fill="none" aria-hidden="true">
            <path d="M8 10 C18 10 40 22 72 46 C90 56 105 62 115 62"
              stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M104 54 L115 62 L106 68"
              stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <Link to={btnHref} className="btn btn-dark btn-lg cta-big__btn">
            {btnText} <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}
