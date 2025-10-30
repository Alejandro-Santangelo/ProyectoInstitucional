import React, { useState } from "react";
import { useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export interface CargoAsignado {
  cargo: string;
  dias: string[];
  turno: string;
  mediosModulos: number;
}

export interface NuevoNoDocenteData {
  nombre: string;
  apellido: string;
  dni: string;
  mail: string;
  telefono: string;
  cargos: CargoAsignado[];
}

interface NuevoNoDocenteModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: NuevoNoDocenteData) => void;
}

const NuevoNoDocenteModal: React.FC<NuevoNoDocenteModalProps> = ({ show, onHide, onSubmit }) => {
  const cargosDisponibles = [
    "Secretaria",
    "Ayudante",
    "Biblioteca",
    "Preceptor",
    "Ayudante Técnico"
  ];
  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const turnos = ["Mañana", "Tarde", "Noche"];

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [mail, setMail] = useState("");
  const [telefono, setTelefono] = useState("");

  const [cargos, setCargos] = useState<CargoAsignado[]>([]);
  const [cargo, setCargo] = useState("");
  const [dias, setDias] = useState<string[]>([]);
  const [turno, setTurno] = useState("");
  const [mediosModulos, setMediosModulos] = useState<number>(0);
  const diasRef = useRef<HTMLSelectElement>(null);

  const handleDiasChange = () => {
    const select = diasRef.current;
    if (select) {
      const selected = Array.from(select.selectedOptions, option => option.value);
      setDias(selected);
    }
  };

  const handleAgregarCargo = () => {
    if (cargo && turno && dias.length > 0 && mediosModulos > 0) {
      setCargos([...cargos, { cargo, dias, turno, mediosModulos }]);
      setCargo("");
      setDias([]);
      setTurno("");
      setMediosModulos(0);
    }
  };

  const handleSubmit = () => {
    const data: NuevoNoDocenteData = { nombre, apellido, dni, mail, telefono, cargos };
    onSubmit(data);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered contentClassName="modal-nueva-nodocente" dialogClassName="modal-xl" style={{ minHeight: 'unset', maxWidth: 600 }}>
      <Modal.Header closeButton style={{ background: 'linear-gradient(90deg, #00509e 60%, #007bff 100%)', color: '#fff', borderBottom: 'none', minHeight: 36, padding: '8px 18px' }}>
        <Modal.Title style={{ fontWeight: 700, letterSpacing: 1, fontSize: 20, marginBottom: 0 }}>Sumar nuevo No Docente</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: 'linear-gradient(120deg, #f0f8ff 60%, #e3eefe 100%)', borderRadius: 12, padding: '24px 32px 12px 32px', minHeight: 320, maxHeight: 500, overflowY: 'auto' }}>
        <Form>
          <Row>
            <Col md={6} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Nombre</Form.Label>
                <Form.Control value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }} />
              </Form.Group>
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Apellido</Form.Label>
                <Form.Control value={apellido} onChange={e => setApellido(e.target.value)} placeholder="Apellido" style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>DNI</Form.Label>
                <Form.Control value={dni} onChange={e => setDni(e.target.value)} placeholder="DNI" style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }} />
              </Form.Group>
            </Col>
            <Col md={4} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Mail</Form.Label>
                <Form.Control value={mail} onChange={e => setMail(e.target.value)} placeholder="Mail" style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }} />
              </Form.Group>
            </Col>
            <Col md={4} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Teléfono</Form.Label>
                <Form.Control value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Teléfono" style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Cargo/Puesto</Form.Label>
                <Form.Control as="select" value={cargo} onChange={e => setCargo(e.target.value)} style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14 }}>
                  <option value="">Seleccionar...</option>
                  {cargosDisponibles.map(c => <option key={c} value={c}>{c}</option>)}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Días de la semana</Form.Label>
                <Form.Control as="select" multiple value={dias} onChange={handleDiasChange} ref={diasRef} style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, minHeight: 40 }}>
                  {diasSemana.map(d => <option key={d} value={d}>{d}</option>)}
                </Form.Control>
                <Form.Text className="text-muted">Puedes seleccionar uno o varios días.</Form.Text>
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Turno</Form.Label>
                <Form.Control as="select" value={turno} onChange={e => setTurno(e.target.value)} style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14 }}>
                  <option value="">Seleccionar...</option>
                  {turnos.map(t => <option key={t} value={t}>{t}</option>)}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Cantidad de medios módulos por día</Form.Label>
                <Form.Control type="number" min={1} value={mediosModulos} onChange={e => setMediosModulos(Number(e.target.value))} style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14 }} />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Button variant="info" onClick={handleAgregarCargo} style={{ borderRadius: 16 }}>Agregar cargo</Button>
            </Col>
          </Row>
          {cargos.length > 0 && (
            <Row>
              <Col xs={12} className="mb-3">
                <div style={{ background: '#e3eefe', borderRadius: 12, padding: '12px', marginBottom: '8px' }}>
                  <strong>Cargos asignados:</strong>
                  <ul>
                    {cargos.map((c, idx) => (
                      <li key={idx}>
                        {c.cargo} - {c.turno} - {c.dias.join(", ")} - {c.mediosModulos} medios módulos/día
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          )}
  </Form>
      </Modal.Body>
      <Modal.Footer style={{ background: 'linear-gradient(90deg, #00509e 60%, #007bff 100%)', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
        <Button variant="secondary" onClick={onHide} style={{ borderRadius: 16 }}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit} style={{ borderRadius: 16 }}>Guardar No Docente</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NuevoNoDocenteModal;
