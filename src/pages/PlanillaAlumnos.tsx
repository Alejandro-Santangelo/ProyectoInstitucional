import React, { useState, useEffect, useRef } from "react";
import NavbarInstitucional from "../components/NavbarInstitucional";
import { Container, Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { alumnosEjemplo } from "../data/alumnosEjemplo";

export type Alumno = {
  idAlumno: number;
  nombre: string;
  apellido: string;
  matricula: string;
  dni: string;
  email: string;
  edad: number;
  direccion: string;
  localidad: string;
  telefono: string;
  estado: string;
  observaciones: string;
};

const columnas: (keyof Alumno)[] = [
  "idAlumno", "nombre", "apellido", "matricula", "dni", "email", "edad", "direccion", "localidad", "telefono", "estado", "observaciones"
];

const PlanillaAlumnos: React.FC = () => {
  const { carrera, anio } = useParams();
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState<Alumno[]>(alumnosEjemplo);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Alumno | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [pendingSearchValue, setPendingSearchValue] = useState('');
  const [pendingSearchField, setPendingSearchField] = useState<keyof Alumno>('nombre');

  const [searchField, setSearchField] = useState<keyof Alumno>('nombre');
  const [searchValue, setSearchValue] = useState('');

  const alumnosFiltrados = searchValue
    ? alumnos.filter(alumno =>
        String(alumno[searchField]).toLowerCase().includes(searchValue.toLowerCase())
      )
    : alumnos;

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setEditData(alumnos[idx]);
  };

  const handleSave = () => {
    if (editIndex !== null && editData) {
      const nuevos = [...alumnos];
      nuevos[editIndex] = editData;
      setAlumnos(nuevos);
      setEditIndex(null);
      setEditData(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editData) {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    }
  };

  const handleDelete = (idx: number) => {
    setAlumnos(alumnos.filter((_, i) => i !== idx));
  };

  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.focus();
    }
  }, []);

  return (
    <div className="dashboard-page">
      <NavbarInstitucional />
      <Container className="pt-5" style={{paddingTop: '140px'}}>
        <Row style={{paddingTop: '140px'}}>
          <Col md={8} className="mb-4 text-start d-flex flex-column justify-content-center">
            <h2 style={{marginBottom: '0.5rem'}}>Planilla de Alumnos</h2>
            <p style={{marginBottom: 0}}><strong>Carrera:</strong> {carrera} &nbsp; <strong>Año:</strong> {anio}</p>
          </Col>
          <Col md={4} className="mb-4 d-flex justify-content-end gap-3">
            <Button variant="secondary" className="btn-volver" onClick={() => navigate(-1)}>Volver</Button>
            <Button variant="danger" className="btn-volver" style={{marginTop: '18px'}} onClick={() => navigate('/')}>Cerrar sesión</Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card className="card">
              <Card.Body>
                <div className="mb-3 d-flex align-items-center gap-2">
                  <Button variant="info" onClick={() => setShowSearch(s => !s)}>
                    Buscar Alumno por :
                  </Button>
                  {showSearch && (
                    <Form className="d-flex gap-2 align-items-center" onSubmit={e => {e.preventDefault(); setSearchField(pendingSearchField); setSearchValue(pendingSearchValue);}}>
                      <Form.Select
                        value={pendingSearchField}
                        onChange={e => setPendingSearchField(e.target.value as keyof Alumno)}
                      >
                        {columnas.map(col => (
                          <option key={col} value={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</option>
                        ))}
                      </Form.Select>
                      <Form.Control
                        type="text"
                        placeholder="Buscar..."
                        value={pendingSearchValue}
                        onChange={e => setPendingSearchValue(e.target.value)}
                      />
                      <Button type="submit" variant="primary">Iniciar búsqueda</Button>
                      <Button type="button" variant="outline-secondary" className="btn-limpiar-busqueda" onClick={() => { setSearchValue(''); setPendingSearchValue(''); }}>Limpiar búsqueda</Button>
                    </Form>
                  )}
                </div>
                <div
                  ref={tableRef}
                  tabIndex={0}
                  style={{maxHeight: '60vh', minWidth: '900px', overflow: 'auto', overflowX: 'auto', outline: 'none', whiteSpace: 'nowrap'}}
                  onKeyDown={e => {
                    const el = tableRef.current;
                    if (!el) return;
                    const step = 60;
                    switch (e.key) {
                      case "ArrowDown":
                        el.scrollTop += step;
                        break;
                      case "ArrowUp":
                        el.scrollTop -= step;
                        break;
                      case "ArrowRight":
                        el.scrollLeft += step;
                        break;
                      case "ArrowLeft":
                        el.scrollLeft -= step;
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  <div style={{display: 'inline-block', minWidth: '1200px'}}>
                    <Table responsive bordered hover className="mb-0">
                      <thead>
                        <tr>
                          {columnas.map(col => (
                            <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
                          ))}
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {alumnosFiltrados.map((alumno, idx) => (
                          <tr key={alumno.idAlumno} className={editIndex === idx ? "table-primary" : ""}>
                            {columnas.map(col => (
                              <td key={col}>
                                {editIndex === idx ? (
                                  <Form.Control
                                    type="text"
                                    name={col}
                                    value={editData ? editData[col] : ""}
                                    onChange={handleChange}
                                  />
                                ) : (
                                  alumno[col]
                                )}
                              </td>
                            ))}
                            <td>
                              {editIndex === idx ? (
                                <Button size="sm" variant="success" onClick={handleSave}>Guardar</Button>
                              ) : (
                                <>
                                  <Button size="sm" variant="primary" onClick={() => handleEdit(idx)}>Editar</Button>{' '}
                                  <Button size="sm" variant="danger" onClick={() => handleDelete(idx)}>Eliminar</Button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className="mt-3">
                  <Button variant="success">Agregar Alumno</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PlanillaAlumnos;
