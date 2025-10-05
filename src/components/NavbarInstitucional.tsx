import logoUPC from '../assets/LogoUpc.jpg'
import logoHoussay from '../assets/LogoHussay.jpg'
import logoCordoba from '../assets/LogoCordoba2.jpg'

function NavbarInstitucional() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        {/* Logo Sede Regional */}
        <div className="navbar-brand d-flex align-items-center col-12 col-lg-4">
          <div className="logo-sede-regional me-3">
            <div className="escudo-sede">
              <img src={logoHoussay} alt="Logo Houssay" className="houssay-logo-img" />
            </div>
            <div className="texto-sede">
              <div className="sede-line1">Sede Regional</div>
              <div className="sede-line2">Capilla del Monte</div>
              <div className="sede-line3">BERNARDO HOUSSAY</div>
            </div>
          </div>
        </div>
        
        {/* Universidad Provincial de Córdoba */}
        <div className="navbar-center col-12 col-lg-4 text-center">
          <div className="logo-upc d-flex align-items-center justify-content-center">
            <div className="upc-logo me-3">
              <img src={logoUPC} alt="UPC Logo" className="upc-logo-img" />
            </div>
            <div className="upc-text">
              <div className="upc-line1">UNIVERSIDAD</div>
              <div className="upc-line2">PROVINCIAL</div>
              <div className="upc-line3">DE CÓRDOBA</div>
            </div>
          </div>
        </div>
        
        {/* Logo Gobierno de Córdoba */}
        <div className="navbar-end col-12 col-lg-4 d-flex justify-content-end">
          <div className="logo-cordoba-completo">
            <img src={logoCordoba} alt="Gobierno de la Provincia de Córdoba" className="cordoba-completo-img" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarInstitucional