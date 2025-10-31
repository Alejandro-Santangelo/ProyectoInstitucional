import NavbarInstitucional from '../components/NavbarInstitucional';
import React, { useState } from 'react';
import db from '../data/db';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ModalEditarPerfil from '../components/ModalEditarPerfil';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import materiasNotas from '../../public/data/materiasNotas.json'; // Ajusta la ruta si es necesario

// Tipos para materiasNotas
type Materia = {
  nombre: string;
};

type CarreraMateria = {
  carrera: string;
  anio: number;
  materias: Materia[];
};

// Extiende el tipo de usuario para profesores
interface UsuarioProfesor {
  nombre: string;
  username: string;
  password: string;
  rol: string;
  route: string;
  genero?: 'M' | 'F' | 'O';
  foto?: string;
  mail?: string;
  telefono?: string;
  dni?: string;
  materia: string;
}

type Usuario = PerfilEditable | UsuarioProfesor;
// Tipo compatible con los datos requeridos por ModalEditarPerfil
type PerfilEditable = {
  nombre?: string;
  username?: string;
  password?: string;
  rol?: string;
  route?: string;
  genero?: 'M' | 'F' | 'O';
  foto?: string;
  mail?: string;
  telefono?: string;
  dni?: string;
  materia?: string;
  sector?: string;
};

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
  const { user } = useAuth() as { user: Usuario | null };
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  // Inicializar datosPerfil con los datos del usuario, evitando null
  const [datosPerfil, setDatosPerfil] = useState<PerfilEditable>(user ? { ...user } : {});

  const handleAnioClick = (carrera: string, anio: number) => {
    navigate(`/planilla/${encodeURIComponent(carrera)}/${anio}`);
  }

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Actualiza la foto de perfil localmente si se edita en el modal
  const handleSavePerfil = async (datos: PerfilEditable) => {
    setDatosPerfil(datos);
    if (datos.foto) setProfilePic(datos.foto);
    // Actualizar usuario en IndexedDB por username
    if (user && user.username) {
      const dbUser = await db.table('usuarios').where('username').equals(user.username).first();
      if (dbUser && dbUser.id) {
        await db.table('usuarios').put({ ...dbUser, ...datos, id: dbUser.id });
      }
    }
    setShowModal(false);
  }

  // Filtrado para docentes
  let materiasFiltradas: CarreraMateria[] = [];
  if (user?.rol === 'Profesor' && 'materia' in user && user.materia) {
    // Filtrar y eliminar duplicados por carrera y año
    const rawFiltradas = (materiasNotas as CarreraMateria[])
      .map(carrera => ({
        carrera: carrera.carrera,
        anio: carrera.anio,
        materias: carrera.materias.filter((m: Materia) => m.nombre === user.materia)
      }))
      .filter(c => c.materias.length > 0);

    // Eliminar duplicados por carrera y año
    const unique: { [key: string]: CarreraMateria } = {};
    rawFiltradas.forEach(c => {
      const key = `${c.carrera}-${c.anio}`;
      if (!unique[key]) unique[key] = c;
    });
    materiasFiltradas = Object.values(unique);
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <div
          style={{
            backgroundColor: '#00509e',
            color: '#ffffff',
            height: '35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            marginTop: '0',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
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
                <li style={{ marginBottom: '30px' }}>
                  <Button
                    variant="link"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      backgroundColor: '#007bff',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                    onClick={() => navigate('/gestion-docentes')}
                  >
                    Gestión Personal Docentes
                  </Button>
                </li>
                <li style={{ marginBottom: '30px' }}>
                  <Button
                    variant="link"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      backgroundColor: '#007bff',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                    onClick={() => navigate('/gestion-no-docente')}
                  >
                    Gestión Personal no Docente
                  </Button>
                </li>
                <li style={{ marginBottom: '30px' }}>
                  <Button
                    variant="link"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      backgroundColor: '#007bff',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                    onClick={() => navigate('/otras-gestiones')}
                  >
                    Otras Gestiones
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
            <Container>
              <Row>
                <Col md={8} className="mb-4 text-start d-flex flex-column justify-content-start">
                  <Button
                    variant="danger"
                    className="btn-volver btn-danger-important"
                    style={{
                      fontSize: '0.7rem',
                      padding: '3px 8px',
                      marginTop: '0',
                      alignSelf: 'flex-start',
                    }}
                    onClick={() => navigate('/')}
                  >
                    Cerrar Sesión
                  </Button>
                  <h2 style={{ marginBottom: '0.5rem', color: '#003366' }}>
                    {user?.genero === 'F'
                      ? 'Bienvenida'
                      : user?.genero === 'M'
                      ? 'Bienvenido'
                      : 'Bienvenido/a'}
                    {`, ${user?.nombre || defaultNombre}`}
                  </h2>
                  <p style={{ marginBottom: 0, color: '#003366' }}>
                    Con tu Rol de: <strong style={{ fontSize: '1.15em' }}>{defaultRol}</strong>
                  </p>
                  <h4 style={{
                    margin: '0px 0 0 70%',
                    color: '#222',
                    fontWeight: 700,
                    fontSize: '2.2em',
                    transform: 'translateX(-50%)',
                    width: 'max-content',
                    textAlign: 'center',
                  }}>Gestión de Alumnos</h4>
                </Col>
                <Col md={4} className="mb-4 d-flex justify-content-end gap-3">
                  <Button
                    variant="link"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      backgroundColor: '#007bff', // Celeste más intenso
                      padding: '10px',
                      borderRadius: '50%', // Hacer el botón redondo
                      width: '100px', // Ajustar el ancho para mantener la forma redonda
                      height: '100px', // Ajustar la altura para mantener la forma redonda
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                    onClick={handleShowModal}
                  >
                    {profilePic ? (
                      <img src={profilePic} alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      'Opciones personales'
                    )}
                  </Button>
                </Col>
              </Row>
              <Row>
                {(user?.rol === 'Profesor' && materiasFiltradas.length > 0)
                  ? materiasFiltradas.map((carrera, idx) => (
                      <Col md={4} key={idx} className="mb-4">
                        <Card className="card" style={{ borderColor: '#003366', transform: 'scale(0.8)' }}>
                          <Card.Header style={{ backgroundColor: '#00509e', color: '#ffffff' }}>{carrera.carrera}</Card.Header>
                          <Card.Body style={{ height: '150px' }}>
                            <div className="row">
                              <div className="col-12 mb-2">
                                <Button
                                  className="btn-anio"
                                  variant="outline-primary"
                                  style={{ borderColor: '#00509e', color: '#00509e', whiteSpace: 'nowrap' }}
                                  onClick={() => handleAnioClick(carrera.carrera, carrera.anio)}
                                >
                                  {carrera.anio}° Año - {carrera.materias.map(m => m.nombre).join(', ')}
                                </Button>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  : defaultData.carreras.map((carrera, idx) => (
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

      <ModalEditarPerfil
        show={showModal}
        onHide={handleCloseModal}
        datos={datosPerfil}
        onSave={handleSavePerfil}
      />
    </>
  );
};

export default DashboardCommon;
