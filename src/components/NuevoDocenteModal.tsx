import React, { useState, useRef } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export interface NuevoDocenteData {
  nombre: string;
  apellido: string;
  dni: string;
  mail: string;
  telefono: string;
  materias: string[];
}

interface NuevoDocenteModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: NuevoDocenteData) => void;
}

const materiasDisponibles = [
  "Historia del Arte",
  "Diseño I",
  "Matemática"
];

const NuevoDocenteModal: React.FC<NuevoDocenteModalProps> = ({ show, onHide, onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [mail, setMail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [materias, setMaterias] = useState<string[]>([]);
  const materiasRef = useRef<HTMLSelectElement>(null);

  const handleMateriaChange = () => {
    const select = materiasRef.current;
    if (select) {
      const selected = Array.from(select.selectedOptions, option => option.value);
      setMaterias(selected);
    }
  };

  const handleSubmit = () => {
    const data: NuevoDocenteData = { nombre, apellido, dni, mail, telefono, materias };
    onSubmit(data);
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
        width: 480,
        maxWidth: '90vw',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '5vh'
      }}
    >
      <Modal.Header closeButton style={{ background: 'linear-gradient(90deg, #00509e 60%, #007bff 100%)', color: '#fff', borderBottom: 'none', minHeight: 36, padding: '8px 18px' }}>
        <Modal.Title style={{ fontWeight: 700, letterSpacing: 1, fontSize: 20, marginBottom: 0 }}>Sumar nuevo Docente</Modal.Title>
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
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Materia/s que dicta</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={materias}
                  onChange={handleMateriaChange}
                  ref={materiasRef}
                  style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, minHeight: 40 }}
                >
                  {materiasDisponibles.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </Form.Control>
                <Form.Text className="text-muted">Puedes seleccionar una o varias materias.</Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ background: 'linear-gradient(90deg, #00509e 60%, #007bff 100%)', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
        <Button variant="secondary" onClick={onHide} style={{ borderRadius: 16 }}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit} style={{ borderRadius: 16 }}>Guardar Docente</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NuevoDocenteModal;
