import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavbarInstitucional from '../components/NavbarInstitucional'

function HomePage() {
  return (
    <div style={{margin: 0, padding: 0}}>
      {/* Navbar Institucional */}
      <NavbarInstitucional />
      
      <Container fluid className="p-0" style={{paddingTop: '140px', minHeight: 'calc(100vh - 140px)'}}>
        <Row className="h-100 d-flex align-items-center justify-content-center">
          <Col className="text-center">
            <h1 className="titulo-principal">Gestión Institucional</h1>
            <Link to="/auth" className="boton-ingresar mt-4">
              Ingresar
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HomePage