import { Link } from 'react-router-dom'
import LiquidEther from './LiquidEther/LiquidEther'

export default function CTABand({ title, subtitle, btnText, btnHref, phone = false }) {
  return (
    <section className="cta-band cta-band--liquid" aria-label="Poziv na akciju">
      <div className="cta-band__liquid-bg">
        <LiquidEther
    colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
    mouseForce={20}
    cursorSize={100}
    isViscous
    viscous={30}
    iterationsViscous={32}
    iterationsPoisson={32}
    resolution={0.5}
    isBounce={false}
    autoDemo
    autoSpeed={0.5}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={3000}
    autoRampDuration={0.6}
    color0="#2999AB"
    color1="#0C1924"
    color2="#135F6D"
/>
      </div>
      <div className="container cta-band__content">
        <div className="cta-band-inner" data-aos>
          <h2>{title}</h2>
          <p>{subtitle}</p>
          {phone ? (
            <a href={btnHref} className="btn btn-dark btn-lg">{btnText}</a>
          ) : (
            <Link to={btnHref} className="btn btn-dark btn-lg">
              {btnText} <i className="fas fa-arrow-right"></i>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
