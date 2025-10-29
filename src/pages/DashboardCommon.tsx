import React, { useState } from 'react';
import NavbarInstitucional from '../components/NavbarInstitucional';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

interface DashboardCommonProps {
  defaultNombre?: string;
  defaultRol?: string;
}

const defaultData = {
  nombre: 'Usuario',
  carreras: [
    { nombre: 'Diseño Gráfico' },
    { nombre: 'Hotelería' },
    { nombre: 'Marketing y Negocios Digitales' },
    { nombre: 'Programación Full Stack' },
    { nombre: 'Biología' },
    { nombre: 'Licenciatura en Administración de Empresas' },
    { nombre: 'Licenciatura en Turismo' },
  ],
};

const DashboardCommon: React.FC<DashboardCommonProps> = ({ defaultNombre = 'Usuario', defaultRol = 'Usuario' }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleAnioClick = (carrera: string, anio: number) => {
    navigate(`/planilla/${encodeURIComponent(carrera)}/${anio}`);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <div
          style={{
            backgroundColor: '#00509e',
            color: '#ffffff',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 100px', // Incrementar el padding para ampliar el bloque hacia los lados
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            marginTop: '70px', // Reducir ligeramente el margen superior para ajustar el bloque
            width: '100%', // Ajustar al tamaño de la página
          }}
        >
          <NavbarInstitucional />
        </div>

        <div style={{ display: 'flex', flex: 1 }}>
          <div
            style={{
              width: isSidebarCollapsed ? '60px' : '200px',
              backgroundColor: '#003366',
              color: '#ffffff',
              transition: 'width 0.3s ease',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: isSidebarCollapsed ? 'center' : 'flex-start',
            }}
          >
            <div style={{ padding: '10px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              {!isSidebarCollapsed && <span style={{ flex: 1 }}>Opciones</span>}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                {isSidebarCollapsed ? '▶' : '◀'}
              </button>
            </div>
            {!isSidebarCollapsed && (
              <ul style={{ listStyleType: 'none', padding: '0 20px', width: '100%' }}>
                <li style={{ marginBottom: '10px' }}>
                  <Button variant="link" style={{ color: '#ffffff', textDecoration: 'none' }} onClick={() => navigate('/opcion1')}>
                    Opción 1
                  </Button>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <Button variant="link" style={{ color: '#ffffff', textDecoration: 'none' }} onClick={() => navigate('/opcion2')}>
                    Opción 2
                  </Button>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <Button variant="link" style={{ color: '#ffffff', textDecoration: 'none' }} onClick={() => navigate('/opcion3')}>
                    Opción 3
                  </Button>
                </li>
              </ul>
            )}
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: '#f0f8ff',
              padding: '20px',
              overflowY: 'auto',
            }}
          >
            <Container className="pt-5">
              <Row style={{ paddingTop: '20px' }}>
                <Col md={8} className="mb-4 text-start d-flex flex-column justify-content-center">
                  <h2 style={{ marginBottom: '0.5rem', color: '#003366' }}>Bienvenido/a, {defaultNombre}</h2>
                  <p style={{ marginBottom: 0, color: '#003366' }}><strong>Rol:</strong> {defaultRol}</p>
                </Col>
                <Col md={4} className="mb-4 d-flex justify-content-end gap-3">
                  <Button
                    variant="secondary"
                    className="btn-volver"
                    style={{ backgroundColor: '#cccccc', borderColor: '#cccccc', color: '#003366' }}
                    onClick={() => navigate(-1)}
                  >
                    Volver
                  </Button>
                  <Button
                    variant="danger"
                    className="btn-volver"
                    style={{ backgroundColor: '#ff4d4d', borderColor: '#ff4d4d', color: '#ffffff' }}
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                  >
                    Cerrar sesión
                  </Button>
                </Col>
              </Row>
              <Row>
                {defaultData.carreras.map((carrera, idx) => (
                  <Col md={4} key={idx} className="mb-4">
                    <Card className="card" style={{ borderColor: '#003366', transform: 'scale(0.8)' }}>
                      <Card.Header style={{ backgroundColor: '#00509e', color: '#ffffff' }}>{carrera.nombre}</Card.Header>
                      <Card.Body style={{ height: '150px' }}>
                        <div className="row">
                          {[1, 2, 3, 4].map((anio, index) => (
                            <div key={index} className="col-6 mb-2">
                              <Button
                                className="btn-anio"
                                variant="outline-primary"
                                style={{ borderColor: '#00509e', color: '#00509e', whiteSpace: 'nowrap' }}
                                onClick={() => handleAnioClick(carrera.nombre, anio)}
                              >
                                {anio}° Año
                              </Button>
                            </div>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCommon;
