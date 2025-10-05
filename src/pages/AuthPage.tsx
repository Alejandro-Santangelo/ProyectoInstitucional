import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import NavbarInstitucional from '../components/NavbarInstitucional'

function AuthPage() {
  const navigate = useNavigate();

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulación: login exitoso como profesor
    navigate('/dashboard-profesor');
  }

  const handleSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de registro
    console.log('Register submitted')
  }

  return (
    <div className="auth-page" style={{margin: 0, padding: 0}}>
      {/* Navbar Institucional */}
      <NavbarInstitucional />
      
      <Container fluid className="p-0" style={{paddingTop: '70px', minHeight: 'calc(100vh - 70px)'}}>
        <Row className="h-100 d-flex align-items-center justify-content-center">
          <Col xs={12} className="px-4">
            {/* Título de la página */}
            <div className="text-center mb-3">
              <h1 className="titulo-secundario">Gestión Institucional</h1>
              <p className="subtitulo">Acceso al Sistema</p>
            </div>

            {/* Formularios lado a lado */}
            <Row className="justify-content-start g-3">
              {/* Formulario de Login */}
              <Col xs={12} md={6} lg={6} className="mb-4">
                <Card className="formulario-card h-100">
                  <Card.Header className="formulario-header">
                    <h3 className="formulario-titulo">Iniciar Sesión</h3>
                  </Card.Header>
                  
                  <Card.Body className="p-2">
                    <Form onSubmit={handleSubmitLogin}>
                      <Form.Group className="mb-1">
                        <Form.Label>Usuario o Email</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Ingrese su usuario o email"
                          className="form-input"
                          required
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-1">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control 
                          type="password" 
                          placeholder="Ingrese su contraseña"
                          className="form-input"
                          required
                        />
                      </Form.Group>
                      
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Form.Check 
                          type="checkbox" 
                          label="Recordarme" 
                          className="form-check"
                        />
                        <a href="#" className="link-secundario">¿Olvidaste tu contraseña?</a>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="boton-principal w-100"
                      >
                        Iniciar Sesión
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              {/* Formulario de Registro */}
              <Col xs={12} md={6} lg={6} className="mb-4 formulario-registro">
                <Card className="formulario-card h-100">
                  <Card.Header className="formulario-header">
                    <h3 className="formulario-titulo">Registrarse</h3>
                  </Card.Header>
                  
                  <Card.Body className="p-2">
                    <Form onSubmit={handleSubmitRegister}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="Ingrese su nombre"
                              className="form-input"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-1">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control 
                              type="text" 
                              placeholder="Ingrese su apellido"
                              className="form-input"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                          type="email" 
                          placeholder="Ingrese su email"
                          className="form-input"
                          required
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-1">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Elija un nombre de usuario"
                          className="form-input"
                          required
                        />
                      </Form.Group>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-1">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control 
                              type="password" 
                              placeholder="Ingrese su contraseña"
                              className="form-input"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-1">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Form.Control 
                              type="password" 
                              placeholder="Confirme su contraseña"
                              className="form-input"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Check 
                        type="checkbox" 
                        label="Acepto los términos y condiciones" 
                        className="form-check mb-2"
                        required
                      />
                      
                      <Button 
                        type="submit" 
                        className="boton-principal w-100"
                      >
                        Registrarse
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            {/* Botón volver */}
            <div className="text-center mt-2">
              <Link to="/" className="boton-secundario">
                Volver al Inicio
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AuthPage