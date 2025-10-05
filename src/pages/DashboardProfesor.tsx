import React, { useState } from "react";
import NavbarInstitucional from "../components/NavbarInstitucional";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Simulación de datos que vendrían del backend
const profesorData = {
  nombre: "Juan Pérez",
  carreras: [
    { nombre: "Diseño Gráfico" },
    { nombre: "Hotelería" },
    { nombre: "Marketing y Negocios Digitales" },
    { nombre: "Programación Full Stack" },
    { nombre: "Biología" },
    { nombre: "Licenciatura en Administración de Empresas" },
    { nombre: "Licenciatura en Turismo" },
  ],
};

const DashboardProfesor: React.FC = () => {
  const [data] = useState(profesorData);
  const [selectedCarrera, setSelectedCarrera] = useState<string | null>(null);
  const [selectedAnio, setSelectedAnio] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleAnioClick = (carrera: string, anio: number) => {
    setSelectedCarrera(carrera);
    setSelectedAnio(anio);
    navigate(`/planilla/${encodeURIComponent(carrera)}/${anio}`);
  };

  return (
    <div className="dashboard-page">
      <NavbarInstitucional />
      <Container className="pt-5">
        <Row style={{paddingTop: '140px'}}>
          <Col md={8} className="mb-4 text-start d-flex flex-column justify-content-center">
            <h2 style={{marginBottom: '0.5rem'}}>Bienvenido, Juan Pérez</h2>
            <p style={{marginBottom: 0}}><strong>Rol:</strong> Profesor</p>
          </Col>
          <Col md={4} className="mb-4 d-flex justify-content-end gap-3">
            <Button variant="secondary" className="btn-volver" onClick={() => navigate(-1)}>Volver</Button>
            <Button variant="danger" className="btn-volver" onClick={() => navigate('/')}>Cerrar sesión</Button>
          </Col>
        </Row>
        <Row>
          {data.carreras.map((carrera, idx) => (
            <Col md={6} key={idx} className="mb-4">
              <Card className="card">
                <Card.Header>{carrera.nombre}</Card.Header>
                <Card.Body>
                  <div className="d-flex flex-wrap gap-2">
                    {[1,2,3,4].map(anio => (
                      <Button
                        key={anio}
                        className={`btn-anio${selectedCarrera === carrera.nombre && selectedAnio === anio ? ' active' : ''}`}
                        variant={selectedCarrera === carrera.nombre && selectedAnio === anio ? "primary" : "outline-primary"}
                        onClick={() => handleAnioClick(carrera.nombre, anio)}
                      >
                        {anio}° Año
                      </Button>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {/* Aquí se podrían mostrar las materias del año seleccionado */}
      </Container>
    </div>
  );
};

export default DashboardProfesor;
