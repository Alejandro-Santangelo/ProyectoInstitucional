import React, { useState, useEffect } from "react";
import db from '../data/db';
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export interface EditarDocenteData {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  mail: string;
  telefono: string;
  materias: string[];
}

interface EditarDocenteModalProps {
  show: boolean;
  onHide: () => void;
  docente: EditarDocenteData;
  onSubmit: (data: EditarDocenteData, usuario: string, contrasena: string) => void;
}

const EditarDocenteModal: React.FC<EditarDocenteModalProps> = ({ show, onHide, docente, onSubmit }) => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  // Funciones para enviar por Mail y WhatsApp
  const handleEnviarMail = async () => {
    if (usuario && contrasena && dni) {
      await db.table('usuarios').put({
        nombre: `${nombre} ${apellido}`,
        username: usuario,
        password: contrasena,
        route: '/dashboard-profesor',
        rol: 'Profesor',
        genero: '',
        dni: dni
      }, undefined);
    }
    // Aquí podrías mostrar un cartel visual en vez de alert si lo prefieres
    alert(`Usuario: ${usuario}\nContraseña: ${contrasena}\nEnviado por Mail.`);
  };
  const handleEnviarWhatsApp = async () => {
    if (usuario && contrasena && dni) {
      await db.table('usuarios').put({
        nombre: `${nombre} ${apellido}`,
        username: usuario,
        password: contrasena,
        route: '/dashboard-profesor',
        rol: 'Profesor',
        genero: '',
        dni: dni
      }, undefined);
    }
    // Aquí podrías mostrar un cartel visual en vez de alert si lo prefieres
    alert(`Usuario: ${usuario}\nContraseña: ${contrasena}\nEnviado por WhatsApp.`);
  };
  const [emailError, setEmailError] = useState("");
  const [nombre, setNombre] = useState(docente.nombre || "");
  const [apellido, setApellido] = useState(docente.apellido || "");
  const [dni, setDni] = useState(docente.dni || "");
  const [mail, setMail] = useState(docente.mail || "");
  const [telefono, setTelefono] = useState(docente.telefono || "");
  const [materias, setMaterias] = useState<string[]>(docente.materias || []);
  const [materiaNueva, setMateriaNueva] = useState("");

  useEffect(() => {
    setNombre(docente.nombre || "");
    setApellido(docente.apellido || "");
    setDni(docente.dni || "");
    setMail(docente.mail || "");
    setTelefono(docente.telefono || "");
    setMaterias(docente.materias || []);
  }, [docente]);

  const handleAgregarMateriaNueva = () => {
    if (materiaNueva.trim() && !materias.includes(materiaNueva.trim())) {
      setMaterias([...materias, materiaNueva.trim()]);
      setMateriaNueva("");
    }
  };

  const handleSubmit = () => {
    const data: EditarDocenteData = { ...docente, nombre, apellido, dni, mail, telefono, materias };
    onSubmit(data, usuario, contrasena);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName="modal-nueva-docente"
      dialogClassName="modal-xl"
      style={{
        minHeight: 'unset',
        width: '900px',
        maxWidth: '98vw',
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '0 12px'
      }}
    >
      <Modal.Header closeButton style={{ background: 'linear-gradient(90deg, #00509e 60%, #007bff 100%)', color: '#fff', borderBottom: 'none', minHeight: 36, padding: '8px 18px' }}>
        <Modal.Title style={{ fontWeight: 700, letterSpacing: 1, fontSize: 20, marginBottom: 0 }}>Editar Docente</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: 'linear-gradient(120deg, #f0f8ff 60%, #e3eefe 100%)', borderRadius: 12, padding: '24px 32px 12px 32px', minHeight: 220, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        <Form style={{ padding: 0, margin: 0 }}>
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
                  style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }}
                />
                {emailError && (
                  <Form.Text className="text-danger" style={{ fontSize: 12 }}>{emailError}</Form.Text>
                )}
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
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Agregar materia personalizada</Form.Label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Form.Control
                    type="text"
                    value={materiaNueva}
                    onChange={e => setMateriaNueva(e.target.value)}
                    placeholder="Escribe una materia nueva"
                    style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14 }}
                  />
                  <Button variant="info" onClick={handleAgregarMateriaNueva} style={{ borderRadius: 16 }}>Agregar</Button>
                </div>
                <Form.Text className="text-muted">Las materias agregadas aparecerán en la lista de selección.</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="mb-3" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <Button variant="secondary" onClick={onHide} style={{ borderRadius: 16 }}>Cancelar</Button>
              <Button variant="primary" onClick={handleSubmit} style={{ borderRadius: 16 }}>Guardar Cambios</Button>
            </Col>
          </Row>
        </Form>
        {/* Sección nueva: Asignar usuario y contraseña inicial */}
        <hr style={{ margin: '24px 0', borderTop: '2px solid #007bff', borderRadius: '2px' }} />
        <div style={{ padding: '12px 0 0 0' }}>
          <h5 style={{ color: '#00509e', fontWeight: 700, marginBottom: '8px', letterSpacing: 1 }}>Asignar Usuario y Contraseña inicial</h5>
          <Row>
            <Col md={6} xs={12} className="mb-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Usuario</Form.Label>
                <Form.Control value={usuario} onChange={e => setUsuario(e.target.value)} placeholder="Usuario" style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }} />
              </Form.Group>
            </Col>
            <Col md={6} xs={12} className="mb-2">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Contraseña inicial</Form.Label>
                <Form.Control type="password" value={contrasena} onChange={e => setContrasena(e.target.value)} placeholder="Contraseña" style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={12} className="mb-1 d-flex justify-content-end">
              <Button variant="outline-primary" onClick={handleEnviarMail} style={{ borderRadius: 12, minWidth: '110px', fontSize: '0.95em', padding: '4px 10px', marginRight: '8px' }}>Mail</Button>
              <Button variant="outline-success" onClick={handleEnviarWhatsApp} style={{ borderRadius: 12, minWidth: '110px', fontSize: '0.95em', padding: '4px 10px' }}>WhatsApp</Button>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditarDocenteModal;
