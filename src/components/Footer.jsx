import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">

          <div className="footer-brand">
            <Link to="/">
              <img src="assets/img/logo-footer.png" alt="Sabioncello Grafica" />
            </Link>
            <p className="footer-tagline">Izrada svih vrsta reklama – Orebić Pelješac</p>
            <p className="footer-location">Orebić · Pelješac · DNŽ</p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigacija">
            <span className="footer-col-label">Stranice</span>
            <Link to="/">Početna</Link>
            <Link to="/o-nama">O Nama</Link>
            <Link to="/usluge">Usluge</Link>
            <Link to="/izdvojeno">Izdvojeno</Link>
            <Link to="/kontakt">Kontakt</Link>
          </nav>

          <div className="footer-contact">
            <span className="footer-col-label">Kontakt</span>
            <a href="tel:+38598XXXXXXX" className="footer-cline">
              <i className="fas fa-phone" aria-hidden="true"></i>+385 98 1763072
            </a>
            <a href="mailto:sabioncello.grafica@gmail.com" className="footer-cline">
              <i className="fas fa-envelope" aria-hidden="true"></i>sabioncello.grafica@gmail.com
            </a>
            <div className="footer-socials">
              <a href="#" className="footer-social-btn" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="footer-social-btn" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

        </div>
        <div className="footer-bottom">
          <p>© 2024 Sabioncello Grafica. Sva prava pridržana.</p>
        </div>
      </div>
    </footer>
  )
}
