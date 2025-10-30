import { Container, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarInstitucional from '../components/NavbarInstitucional'
import { useAuth } from '../context/useAuth'

function HomePage() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validación simple: requerir ambos campos
    if (!usuario.trim() || !password.trim()) {
      setError('Por favor complete usuario y contraseña')
      return
    }
    setError('')
    const res = login(usuario, password)
    if (!res.ok) {
      setError(res.message || 'Credenciales inválidas')
      return
    }

    navigate(res.route || '/')
  }

  return (
  <div style={{margin: 0, marginLeft: '40px', marginRight: 0, marginTop: '10px', padding: 0, height: '65vh', background: 'linear-gradient(90deg, rgb(0, 80, 158) 0%, rgb(58, 123, 213) 100%)', overflow: 'hidden'}}>
      {/* Navbar Institucional */}
      <NavbarInstitucional />
      
  <Container fluid className="p-0" style={{paddingTop: '10px', minHeight: 'calc(100vh - 140px)', background: 'linear-gradient(90deg, rgb(0, 80, 158) 0%, rgb(58, 123, 213) 100%)'}}>
  <Row className="h-100" style={{minHeight: '65vh', maxHeight: '65vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: '0px', overflow: 'hidden'}}>
          <Col xs={12} md={8} className="d-flex flex-column align-items-center justify-content-start" style={{width: '100%'}}>
            <div className="bloque-inicio" style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', marginTop: '0px'}}>
              <h1 className="titulo-principal titulo-inicio" style={{marginTop: '0px'}}>Gestión Institucional</h1>
              <form onSubmit={handleSubmit} style={{width: '100%', maxWidth: 320, marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}} className="form-inicio">
                <div className="mb-3 w-100">
                  <label htmlFor="usuario" className="form-label">Usuario</label>
                  <input type="text" className="form-control" id="usuario" placeholder="Ingrese su usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                </div>
                <div className="mb-3 w-100">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div className="text-danger mb-2">{error}</div>}
                <div className="boton-ingresar-contenedor" style={{marginBottom: '40px'}}>
                  <button type="submit" className="boton-ingresar mt-1">Ingresar</button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HomePage