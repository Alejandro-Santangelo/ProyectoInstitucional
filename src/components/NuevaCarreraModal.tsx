import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";

interface MateriaConfig {
  nombre: string;
  modulosMensuales: number;
  diasHorarios: Array<{ dia: string; horario: string }>;
  docenteId?: number | null;
}

export interface AnioConfig {
  materias: MateriaConfig[];
}

export interface NuevaCarreraData {
  nombre: string;
  turno: string;
  cantidadAnios: number;
  anios: AnioConfig[];
}

interface NuevaCarreraModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: NuevaCarreraData) => void;
}

const turnos = ["Mañana", "Tarde", "Noche"];
const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

import db from '../data/db';

const NuevaCarreraModal: React.FC<NuevaCarreraModalProps> = ({ show, onHide, onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [turno, setTurno] = useState(turnos[0]);
  const [cantidadAnios, setCantidadAnios] = useState(1);
  const [anios, setAnios] = useState<AnioConfig[]>([{ materias: [] }]);
  const [docentes, setDocentes] = useState<Array<{ id: number, nombre: string, apellido: string }>>([]);

  React.useEffect(() => {
    db.table('personalDocentes').toArray().then(setDocentes);
  }, []);

  // Función para agregar materia a un año
  const agregarMateria = (anioIdx: number) => {
    const nuevosAnios = [...anios];
    nuevosAnios[anioIdx].materias.push({ nombre: "", modulosMensuales: 1, diasHorarios: [] });
    setAnios(nuevosAnios);
  };

  // Función para actualizar materia
  type MateriaCampo = "nombre" | "modulosMensuales" | "docenteId";
  const actualizarMateria = (anioIdx: number, materiaIdx: number, campo: MateriaCampo, valor: string | number | null) => {
    const nuevosAnios = [...anios];
    if (campo === "nombre") {
      nuevosAnios[anioIdx].materias[materiaIdx].nombre = valor as string;
    } else if (campo === "modulosMensuales") {
      nuevosAnios[anioIdx].materias[materiaIdx].modulosMensuales = valor as number;
    } else if (campo === "docenteId") {
      nuevosAnios[anioIdx].materias[materiaIdx].docenteId = valor === '' ? null : Number(valor);
    }
    setAnios(nuevosAnios);
  };

  // Función para agregar día/horario a una materia
  const agregarDiaHorario = (anioIdx: number, materiaIdx: number) => {
    const nuevosAnios = [...anios];
    nuevosAnios[anioIdx].materias[materiaIdx].diasHorarios.push({ dia: diasSemana[0], horario: "08:00" });
    setAnios(nuevosAnios);
  };

  // Actualizar cantidad de años
  const handleCantidadAnios = (value: number) => {
    setCantidadAnios(value);
    const nuevosAnios = [...anios];
    while (nuevosAnios.length < value) nuevosAnios.push({ materias: [] });
    while (nuevosAnios.length > value) nuevosAnios.pop();
    setAnios(nuevosAnios);
  };

  const handleSubmit = async () => {
    const data: NuevaCarreraData = { nombre, turno, cantidadAnios, anios };
    // Guardar en Dexie.js
    await db.table('carreras').add({
      nombre,
      turno,
      cantidadAnios,
      anios
    });
    onSubmit(data);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered
      contentClassName="modal-nueva-carrera"
      dialogClassName="modal-xl"
  style={{ minHeight: 'unset', maxWidth: 1100, marginLeft: 100 }}
    >
      <Modal.Header closeButton style={{ background: 'linear-gradient(90deg, #00509e 60%, #007bff 100%)', color: '#fff', borderBottom: 'none', minHeight: 36, padding: '8px 18px' }}>
        <Modal.Title style={{ fontWeight: 700, letterSpacing: 1, fontSize: 20, marginBottom: 0 }}>Agregar Nueva Carrera</Modal.Title>
      </Modal.Header>
  <Modal.Body style={{ background: 'linear-gradient(120deg, #f0f8ff 60%, #e3eefe 100%)', borderRadius: 12, padding: '24px 32px 12px 32px', minHeight: 320, maxHeight: 900, overflowY: 'auto' }}>
        <Form>
          <Row>
            <Col md={6} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Nombre de la Carrera</Form.Label>
                <Form.Control value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej: Programación" style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }} />
              </Form.Group>
            </Col>
            <Col md={3} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Turno</Form.Label>
                <Form.Select value={turno} onChange={e => setTurno(e.target.value)} style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }}>
                  {turnos.map(t => <option key={t}>{t}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Cantidad de años</Form.Label>
                <Form.Control type="number" min={1} value={cantidadAnios} onChange={e => handleCantidadAnios(Number(e.target.value))} style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }} />
              </Form.Group>
            </Col>
          </Row>
          {anios.map((anio, anioIdx) => (
            <div key={anioIdx} style={{ border: "1px solid #007bff33", borderRadius: 16, padding: 18, marginBottom: 18, background: '#f8f9fa' }}>
              <h5 style={{ color: '#00509e', fontWeight: 700, marginBottom: 12 }}>Año {anioIdx + 1}</h5>
              {anio.materias.map((materia, materiaIdx) => (
                <div key={materiaIdx} style={{ background: "#e3eefe", borderRadius: 16, padding: 14, marginBottom: 14, boxShadow: '0 2px 8px #00509e22' }}>
                  <Row className="mb-2">
                    <Col md={4}>
                      <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Materia</Form.Label>
                      <Form.Control value={materia.nombre} onChange={e => actualizarMateria(anioIdx, materiaIdx, "nombre", e.target.value)} placeholder="Nombre de la materia" style={{ borderRadius: 16, border: '1px solid #007bff', background: '#fff', fontWeight: 500, fontSize: 14, height: 32 }} />
                    </Col>
                    <Col md={4}>
                      <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Modulos mensuales</Form.Label>
                      <Form.Control type="number" min={1} value={materia.modulosMensuales} onChange={e => actualizarMateria(anioIdx, materiaIdx, "modulosMensuales", Number(e.target.value))} style={{ borderRadius: 16, border: '1px solid #007bff', background: '#fff', fontWeight: 500, fontSize: 14, height: 32 }} />
                    </Col>
                    <Col md={4}>
                      <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Docente asignado</Form.Label>
                      <Form.Select value={materia.docenteId ?? ''} onChange={e => actualizarMateria(anioIdx, materiaIdx, "docenteId", e.target.value)} style={{ borderRadius: 16, border: '1px solid #007bff', background: '#fff', fontWeight: 500, fontSize: 14, height: 32 }}>
                        <option value="">Sin asignar</option>
                        {docentes.map(doc => (
                          <option key={doc.id} value={doc.id}>{doc.nombre} {doc.apellido}</option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                  <div>
                    <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Días y horarios (medios módulos de 40 min)</Form.Label>
                    {materia.diasHorarios.map((dh, dhIdx) => (
                      <InputGroup className="mb-2" key={dhIdx} style={{ borderRadius: 16, background: '#fff', border: '1px solid #007bff', padding: 6 }}>
                        <Form.Select value={dh.dia} onChange={e => {
                          const nuevosAnios = [...anios];
                          nuevosAnios[anioIdx].materias[materiaIdx].diasHorarios[dhIdx].dia = e.target.value;
                          setAnios(nuevosAnios);
                        }} style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }}>
                          {diasSemana.map(d => <option key={d}>{d}</option>)}
                        </Form.Select>
                        <Form.Control type="time" value={dh.horario} onChange={e => {
                          const nuevosAnios = [...anios];
                          nuevosAnios[anioIdx].materias[materiaIdx].diasHorarios[dhIdx].horario = e.target.value;
                          setAnios(nuevosAnios);
                        }} style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32, marginLeft: 8 }} />
                        <Button variant="outline-danger" onClick={() => {
                          const nuevosAnios = [...anios];
                          nuevosAnios[anioIdx].materias[materiaIdx].diasHorarios.splice(dhIdx, 1);
                          setAnios(nuevosAnios);
                        }} style={{ borderRadius: 16, marginLeft: 8 }}>Eliminar</Button>
                      </InputGroup>
                    ))}
                    <Button variant="outline-primary" size="sm" onClick={() => agregarDiaHorario(anioIdx, materiaIdx)} style={{ borderRadius: 16, marginTop: 6 }}>
                      Agregar día/horario
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="success" onClick={() => agregarMateria(anioIdx)} style={{ borderRadius: 16, marginTop: 8 }}>
                Agregar Materia
              </Button>
            </div>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ background: 'linear-gradient(90deg, #00509e 60%, #007bff 100%)', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
        <Button variant="secondary" onClick={onHide} style={{ borderRadius: 16 }}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit} style={{ borderRadius: 16 }}>Guardar Carrera</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NuevaCarreraModal;
