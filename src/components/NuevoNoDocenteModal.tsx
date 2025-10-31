import React, { useState } from "react";
import { useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// Importar la instancia de la base de datos Dexie.js
import db from '../data/db';

export interface CargoAsignado {
  cargo: string;
  dias: string[];
  turno: string;
  mediosModulos: number;
}

export interface NuevoNoDocenteData {
  id?: number;
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
  onNoDocenteAgregado?: () => void;
}

const NuevoNoDocenteModal: React.FC<NuevoNoDocenteModalProps> = ({ show, onHide, onNoDocenteAgregado }) => {
  const [emailError, setEmailError] = useState("");
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
    // Estado para usuario y contraseña inicial
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");

    // Funciones para enviar por Mail y WhatsApp
    const handleEnviarMail = () => {
      // Aquí iría la lógica para enviar por mail
      alert(`Usuario: ${usuario}\nContraseña: ${contrasena}\nEnviado por Mail.`);
    };
    const handleEnviarWhatsApp = () => {
      // Aquí iría la lógica para enviar por WhatsApp
      alert(`Usuario: ${usuario}\nContraseña: ${contrasena}\nEnviado por WhatsApp.`);
    };
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
    (async () => {
      try {
        await db.table('personalNoDocentes').add({
          nombre,
          apellido,
          dni,
          mail,
          telefono,
          cargos
        });
        alert('No Docente agregado correctamente.');
        if (onNoDocenteAgregado) onNoDocenteAgregado();
      } catch (error) {
        alert('Error al guardar en la base de datos: ' + error);
      }
    })();
    // El modal NO se cierra automáticamente
    // El usuario debe hacer clic en 'Cerrar' para cerrar el modal
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName="modal-nueva-nodocente"
      dialogClassName="modal-xl"
      style={{
        minHeight: 'unset',
  width: '750px',
        overflow: 'hidden',
  position: 'fixed',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  paddingTop: 0,
      }}
    >
      <Modal.Header closeButton style={{ background: 'linear-gradient(90deg, #00509e 60%, #007bff 100%)', color: '#fff', borderBottom: 'none', minHeight: 36, padding: '8px 18px' }}>
        <Modal.Title style={{ fontWeight: 700, letterSpacing: 1, fontSize: 20, marginBottom: 0 }}>Sumar nuevo No Docente</Modal.Title>
      </Modal.Header>
  <Modal.Body style={{ background: 'linear-gradient(120deg, #f0f8ff 60%, #e3eefe 100%)', borderRadius: 12, padding: '0px 18px 6px 18px', minHeight: 220, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        <Form>
          <Row>
            <Col md={6} xs={12} className="mb-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 12, marginBottom: 2 }}>Nombre</Form.Label>
                <Form.Control value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" style={{ borderRadius: 10, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 13, height: 26, padding: '2px 8px' }} />
              </Form.Group>
            </Col>
            <Col md={6} xs={12} className="mb-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 12, marginBottom: 2 }}>Apellido</Form.Label>
                <Form.Control value={apellido} onChange={e => setApellido(e.target.value)} placeholder="Apellido" style={{ borderRadius: 10, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 13, height: 26, padding: '2px 8px' }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4} xs={12} className="mb-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 12, marginBottom: 2 }}>DNI</Form.Label>
                <Form.Control value={dni} onChange={e => setDni(e.target.value)} placeholder="DNI" style={{ borderRadius: 10, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 13, height: 26, padding: '2px 8px' }} />
              </Form.Group>
            </Col>
            <Col md={4} xs={12} className="mb-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 12, marginBottom: 2 }}>Mail</Form.Label>
                <Form.Control
                  value={mail}
                  onChange={e => {
                    setMail(e.target.value);
                    if (e.target.value && !e.target.value.includes('@')) {
                      setEmailError('Formato de email inválido');
                    } else {
                      setEmailError('');
                    }
                  }}
                  placeholder="Mail"
                  style={{ borderRadius: 10, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 13, height: 26, padding: '2px 8px' }}
                />
                {emailError && (
                  <Form.Text className="text-danger" style={{ fontSize: 12 }}>{emailError}</Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={4} xs={12} className="mb-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 12, marginBottom: 2 }}>Teléfono</Form.Label>
                <Form.Control value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Teléfono" style={{ borderRadius: 10, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 13, height: 26, padding: '2px 8px' }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="mb-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 12, marginBottom: 2 }}>Cargo/Puesto</Form.Label>
                <Form.Control as="select" value={cargo} onChange={e => setCargo(e.target.value)} style={{ borderRadius: 10, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 13, height: 26, padding: '2px 8px' }}>
                  <option value="">Seleccionar...</option>
                  {cargosDisponibles.map(c => <option key={c} value={c}>{c}</option>)}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 12, marginBottom: 2 }}>Días de la semana</Form.Label>
                <Form.Control as="select" multiple value={dias} onChange={handleDiasChange} ref={diasRef} style={{ borderRadius: 10, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 13, minHeight: 28, padding: '2px 8px' }}>
                  {diasSemana.map(d => <option key={d} value={d}>{d}</option>)}
                </Form.Control>
                <Form.Text className="text-muted">Puedes seleccionar uno o varios días.</Form.Text>
                {cargos.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <strong>Cargos agregados:</strong>
                    <ul style={{ marginBottom: 0 }}>
                      {cargos.map((cargo, idx) => (
                        <li key={idx} style={{ fontSize: '13px', color: '#00509e' }}>
                          {cargo.cargo} - {cargo.turno} - {cargo.dias.join(", ")} - {cargo.mediosModulos} medios módulos/día
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 12, marginBottom: 2 }}>Turno</Form.Label>
                <Form.Control as="select" value={turno} onChange={e => setTurno(e.target.value)} style={{ borderRadius: 10, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 13, height: 26, padding: '2px 8px' }}>
                  <option value="">Seleccionar...</option>
                  {turnos.map(t => <option key={t} value={t}>{t}</option>)}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 12, marginBottom: 2 }}>Cantidad de medios módulos por día</Form.Label>
                <Form.Control type="number" min={1} value={mediosModulos} onChange={e => setMediosModulos(Number(e.target.value))} style={{ borderRadius: 10, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 13, height: 26, padding: '2px 8px' }} />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-2">
              <Button variant="info" onClick={handleAgregarCargo} style={{ borderRadius: 10, fontSize: '0.95em', padding: '4px 12px' }}>Agregar cargo</Button>
            </Col>
          </Row>
          {/* Sección nueva: Asignar usuario y contraseña inicial */}
          <hr style={{ margin: '10px 0', borderTop: '2px solid #007bff', borderRadius: '2px' }} />
          <div style={{ padding: '12px 0 0 0' }}>
            <h5 style={{ color: '#00509e', fontWeight: 700, marginBottom: '16px', letterSpacing: 1 }}>Asignar Usuario y Contraseña inicial</h5>
            <Row>
              <Col md={6} xs={12} className="mb-3">
                <Form.Group>
                  <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Usuario</Form.Label>
                  <Form.Control value={usuario} onChange={e => setUsuario(e.target.value)} placeholder="Usuario" style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }} />
                </Form.Group>
              </Col>
              <Col md={6} xs={12} className="mb-3">
                <Form.Group>
                  <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Contraseña inicial</Form.Label>
                  <Form.Control type="password" value={contrasena} onChange={e => setContrasena(e.target.value)} placeholder="Contraseña" style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="mb-2" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button variant="outline-primary" onClick={handleEnviarMail} style={{ borderRadius: 12, minWidth: '110px', fontSize: '0.95em', padding: '4px 10px' }}>Enviar por Mail</Button>
                <Button variant="outline-success" onClick={handleEnviarWhatsApp} style={{ borderRadius: 12, minWidth: '110px', fontSize: '0.95em', padding: '4px 10px' }}>Enviar por WhatsApp</Button>
                <Button variant="info" style={{ borderRadius: 12, minWidth: '110px', fontSize: '0.95em', padding: '4px 10px' }} onClick={() => alert('Asignación enviada (simulado)')}>Enviar usuario y contraseña</Button>
              </Col>
            </Row>
          </div>
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
      <Modal.Footer style={{ background: 'linear-gradient(90deg, #00509e 60%, #007bff 100%)', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '5px 20px' }}>
  <Button variant="primary" onClick={handleSubmit} style={{ borderRadius: 16, marginTop: '2px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Guardar No Docente</Button>
  <Button variant="secondary" onClick={onHide} style={{ borderRadius: 16, marginLeft: '20px', marginTop: '2px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NuevoNoDocenteModal;
