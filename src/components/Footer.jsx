import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-simple">
          <div className="footer-simple-brand">
            <Link to="/"><img src="assets/img/logo.png" alt="Sabioncello Grafica" /></Link>
            <p>Orebić · Pelješac · DNŽ</p>
          </div>
          <nav className="footer-simple-nav" aria-label="Footer navigacija">
            <Link to="/">Početna</Link>
            <Link to="/o-nama">O Nama</Link>
            <Link to="/usluge">Usluge</Link>
            <Link to="/izdvojeno">Izdvojeno</Link>
            <Link to="/kontakt">Kontakt</Link>
          </nav>
          <div className="footer-simple-contact">
            <a href="tel:+38598XXXXXXX" className="footer-cline"><i className="fas fa-phone"></i>+385 98 1763072</a>
            <a href="mailto:info@sabioncellografica.hr" className="footer-cline"><i className="fas fa-envelope"></i>info@sabioncellografica.hr</a>
            <div className="footer-socials">
              <a href="#" className="footer-social-btn" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="footer-social-btn" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
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
