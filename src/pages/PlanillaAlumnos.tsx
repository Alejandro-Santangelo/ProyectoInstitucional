import './PlanillaAlumnos.css';
import React, { useState, useEffect, useRef } from "react";
import db from '../data/db';
import '../components/ModalVerAlumno.css';
import '../components/ModalAgregarAlumno.css';
import NavbarInstitucional from "../components/NavbarInstitucional";
import { Container, Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

export type Alumno = {
  idAlumno: number;
  nombre: string;
  apellido: string;
  matricula: string;
  dni: string;
  cuil: string;
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
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAlumno, setNewAlumno] = useState<Alumno | null>(null);

  const handleAddAlumno = () => {
    setNewAlumno({
      idAlumno: Date.now(),
      nombre: '',
      apellido: '',
      matricula: '',
      dni: '',
      cuil: '',
      email: '',
      edad: 18,
      direccion: '',
      localidad: '',
      telefono: '',
      estado: 'Activo',
      observaciones: ''
    });
    setShowAddModal(true);
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (newAlumno) {
      setNewAlumno({ ...newAlumno, [e.target.name]: e.target.value });
    }
  };

  const handleAddSave = async () => {
    if (newAlumno) {
      await db.table('alumnos').add(newAlumno);
      setAlumnos([...alumnos, newAlumno]);
      setShowAddModal(false);
      setNewAlumno(null);
    }
  };
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
              <div className="d-flex gap-4 ms-4 me-0">
                <Button size="sm" variant="secondary" onClick={() => navigate(-1)} style={{marginLeft: '96px'}}>
                  Volver al Dashboard
                </Button>
                <Button size="sm" variant="success" onClick={handleAddAlumno}>Agregar Alumno</Button>
      {/* Modal para agregar alumno */}
      {showAddModal && (
        <div className="modal-agregar-alumno-bg">
          <div className="modal-agregar-alumno">
            <h3>Agregar nuevo alumno</h3>
            <p style={{textAlign:'center',color:'#4a6cf7',marginBottom:18,fontSize:15}}>Completa los datos para registrar un nuevo alumno en el sistema.</p>
            <form autoComplete="off">
              <div className="form-grid">
                {(["nombre","apellido","matricula","dni","cuil","email","edad","direccion","localidad","telefono","estado","observaciones"] as (keyof Alumno)[]).map(col => (
                  <div key={col} style={{ display: 'flex', flexDirection: 'column', marginBottom: 16 }}>
                    <label className="form-label" htmlFor={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</label>
                    <input
                      className="form-control"
                      type={col === 'edad' ? 'number' : 'text'}
                      name={col}
                      id={col}
                      value={newAlumno ? String(newAlumno[col]) : ''}
                      onChange={handleAddChange}
                    />
                  </div>
                ))}
              </div>
            </form>
            <div className="modal-btns">
              <button type="button" className="btn btn-success" onClick={handleAddSave}>Guardar</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => { setShowAddModal(false); setNewAlumno(null); }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
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
                  onClick={() => setShowViewModal(true)}
                >Ver</Button>
      {/* Modal para ver información completa del alumno */}
      {showViewModal && selectedAlumno && (
        <div className="modal-ver-alumno-bg">
          <div className="modal-ver-alumno">
            <h4>Información completa</h4>
            <ul>
              <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#4a6cf7" width="22" height="22"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 13c-2.67 0-8 1.34-8 4v2a1 1 0 001 1h14a1 1 0 001-1v-2c0-2.66-5.33-4-8-4z"/></svg> <span className="campo-label">IdAlumno:</span> <span className="campo-valor">{selectedAlumno.idAlumno}</span></li>
              <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#4a6cf7" width="22" height="22"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg> <span className="campo-label">Dni:</span> <span className="campo-valor">{selectedAlumno.dni}</span></li>
              <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#4a6cf7" width="22" height="22"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12v4m0 0v4m0-4h4m-4 0H8"/></svg> <span className="campo-label">Email:</span> <span className="campo-valor">{selectedAlumno.email}</span></li>
              <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#4a6cf7" width="22" height="22"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14c-4.418 0-8 1.79-8 4v2a1 1 0 001 1h14a1 1 0 001-1v-2c0-2.21-3.582-4-8-4z"/></svg> <span className="campo-label">Edad:</span> <span className="campo-valor">{selectedAlumno.edad}</span></li>
              <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#4a6cf7" width="22" height="22"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4a1 1 0 001 1h3m10-5h3a1 1 0 011 1v4a1 1 0 01-1 1h-3m-10 0h10"/></svg> <span className="campo-label">Direccion:</span> <span className="campo-valor">{selectedAlumno.direccion}</span></li>
              <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#4a6cf7" width="22" height="22"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg> <span className="campo-label">Localidad:</span> <span className="campo-valor">{selectedAlumno.localidad}</span></li>
              <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#4a6cf7" width="22" height="22"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4-4 4 4"/></svg> <span className="campo-label">Observaciones:</span> <span className="campo-valor">{selectedAlumno.observaciones}</span></li>
            </ul>
            <div className="modal-btns">
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowViewModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
                <Button size="sm"
                  variant="warning"
                  disabled={!selectedAlumno}
                  onClick={() => {
                    if (selectedAlumno) {
                      navigate(`/planilla/${carrera}/${anio}/historial/${selectedAlumno.idAlumno}`);
                    }
                  }}
                >Historial</Button>
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
