import './PlanillaAlumnos.css';
import React, { useState, useEffect, useRef } from "react";
import db from '../data/db';
import NavbarInstitucional from "../components/NavbarInstitucional";
import { Container, Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

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

const resumenColumnas: (keyof Alumno)[] = [
  "nombre", "apellido", "matricula", "telefono", "estado"
];
const columnas: (keyof Alumno)[] = [
  "idAlumno", "nombre", "apellido", "matricula", "dni", "email", "edad", "direccion", "localidad", "telefono", "estado", "observaciones"
];

const PlanillaAlumnos: React.FC = () => {
  const { carrera, anio } = useParams();
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedAlumno = selectedIndex !== null ? alumnosFiltrados[selectedIndex] : null;


  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<Alumno | null>(null);

  const handleEdit = () => {
    if (selectedAlumno) {
      setEditMode(true);
      setEditData(selectedAlumno);
    }
  };

  const handleSave = async () => {
    if (editData) {
      await db.table('alumnos').put(editData);
      setAlumnos(alumnos.map(a => a.idAlumno === editData.idAlumno ? editData : a));
      setEditMode(false);
      setEditData(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editData) {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    }
  };

  const handleDelete = async () => {
    if (selectedAlumno) {
      await db.table('alumnos').delete(selectedAlumno.idAlumno);
      setAlumnos(alumnos.filter(a => a.idAlumno !== selectedAlumno.idAlumno));
      setSelectedIndex(null);
    }
  };




  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.focus();
    }
  }, []);

  useEffect(() => {
    db.table('alumnos').toArray().then((data: Alumno[]) => {
      setAlumnos(data);
    });
  }, []);

  return (
    <div className="dashboard-page">
      <NavbarInstitucional />
  <Container className="pt-3 px-0" style={{paddingTop: '40px', maxWidth: '900px'}}>
  <Row style={{paddingTop: '80px'}}>
          <Col md={12} className="mb-4 text-start d-flex flex-column justify-content-start px-0" style={{paddingLeft: 0, marginLeft: 0}}>
            <div className="d-flex align-items-center gap-3">
              <div className="titulo-planilla-alumnos">
                <h2 style={{marginBottom: '0.5rem'}}>Planilla de Alumnos</h2>
                <p style={{marginBottom: 0}}><strong>Carrera:</strong> {carrera} &nbsp; <strong>Año:</strong> {anio}</p>
              </div>
              <div className="d-flex gap-5 ms-7 me-0">
                <Button size="sm" variant="secondary" onClick={() => navigate(-1)} style={{marginLeft: '96px'}}>
                  Volver al Dashboard
                </Button>
                <Button size="sm" variant="success">Agregar Alumno</Button>
                <Button size="sm"
                  variant="primary"
                  disabled={!selectedAlumno || editMode}
                  onClick={handleEdit}
                >Editar</Button>
                <Button size="sm"
                  variant="success"
                  disabled={!editMode}
                  onClick={handleSave}
                >Guardar</Button>
                <Button size="sm"
                  variant="danger"
                  disabled={!selectedAlumno || editMode}
                  onClick={handleDelete}
                >Eliminar</Button>
                <Button size="sm"
                  variant="info"
                  disabled={!selectedAlumno}
                  onClick={() => setExpandedIndex(selectedIndex)}
                >Ver</Button>
                <Button size="sm" variant="secondary" onClick={() => { setExpandedIndex(null); setSelectedIndex(null); }}>Volver a Lista</Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card className="card" style={{background: 'linear-gradient(135deg, #e0e0e0 60%, #f5f5f5 100%)', backdropFilter: 'blur(6px)', width: '100vw', maxWidth: '100vw', marginLeft: '-240px', marginRight: '0', padding: '0'}}>
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
                  style={{maxHeight: '45vh', minWidth: '100%', overflow: 'auto', outline: 'none', whiteSpace: 'nowrap', marginBottom: '8px'}}
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
                  <div style={{display: 'inline-block', width: '100vw', minWidth: '100vw'}}>
                    <Table responsive bordered hover className="mb-0">
                           <thead>
                             <tr>
                               {resumenColumnas.map(col => (
                                 <th key={col} className={col === "estado" ? "col-estado" : "col-estrecha"}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
                               ))}
                             </tr>
                           </thead>
                           <tbody>
                        {alumnosFiltrados.map((alumno, idx) => (
                          <React.Fragment key={alumno.idAlumno}>
                            <tr
                              className={selectedIndex === idx ? "table-info" : ""}
                              style={{ cursor: 'pointer' }}
                              onClick={() => setSelectedIndex(idx)}
                            >
                              {resumenColumnas.map(col => (
                                <td key={col} className={col === "estado" ? "col-estado" : "col-estrecha"}>
                                  {editMode && selectedIndex === idx ? (
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
                            </tr>
                            {expandedIndex === idx && (
                              <tr>
                                <td colSpan={resumenColumnas.length}>
                                  <div style={{ padding: '12px 18px', background: '#f5f5f5', borderRadius: 8 }}>
                                    <strong>Información completa:</strong>
                                    <ul style={{ margin: '8px 0 0 0', padding: 0, listStyle: 'none' }}>
                                      {columnas.filter(col => !resumenColumnas.includes(col)).map(col => (
                                        <li key={col} style={{ marginBottom: 4 }}>
                                          <span style={{ fontWeight: 500 }}>{col.charAt(0).toUpperCase() + col.slice(1)}:</span> {alumno[col]}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className="mt-3">
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
