import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export interface PermisosNoDocenteData {
  noDocenteId: string;
  permiso: string;
}

interface PermisosNoDocenteModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: PermisosNoDocenteData) => void;
}

const PermisosNoDocenteModal: React.FC<PermisosNoDocenteModalProps> = ({ show, onHide, onSubmit }) => {
  // Simulación de no docentes y permisos
  const [noDocenteId, setNoDocenteId] = useState("");
  const [permiso, setPermiso] = useState("");
  const noDocentes = [
    { id: "1", nombre: "María López" },
    { id: "2", nombre: "Pedro Sánchez" },
    { id: "3", nombre: "Lucía Fernández" },
  ];
  const permisos = ["Ver información", "Editar información", "Acceso total"];

  const handleSubmit = () => {
    const data: PermisosNoDocenteData = { noDocenteId, permiso };
    onSubmit(data);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered contentClassName="modal-permisos-nodocente" dialogClassName="modal-xl" style={{ minHeight: 'unset', maxWidth: 600 }}>
      <Modal.Header closeButton style={{ background: 'linear-gradient(90deg, #00509e 60%, #007bff 100%)', color: '#fff', borderBottom: 'none', minHeight: 36, padding: '8px 18px' }}>
        <Modal.Title style={{ fontWeight: 700, letterSpacing: 1, fontSize: 20, marginBottom: 0 }}>Asignar / Modificar permisos a No Docentes</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: 'linear-gradient(120deg, #f0f8ff 60%, #e3eefe 100%)', borderRadius: 12, padding: '24px 32px 12px 32px', minHeight: 220, maxHeight: 400, overflowY: 'auto' }}>
        <Form>
          <Row>
            <Col md={8} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>No Docente</Form.Label>
                <Form.Select value={noDocenteId} onChange={e => setNoDocenteId(e.target.value)} style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }}>
                  <option value="">Seleccionar no docente</option>
                  {noDocentes.map(nd => (
                    <option key={nd.id} value={nd.id}>{nd.nombre}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Permiso</Form.Label>
                <Form.Select value={permiso} onChange={e => setPermiso(e.target.value)} style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }}>
                  <option value="">Seleccionar permiso</option>
                  {permisos.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ background: 'linear-gradient(90deg, #00509e 60%, #007bff 100%)', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
        <Button variant="secondary" onClick={onHide} style={{ borderRadius: 16 }}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit} style={{ borderRadius: 16 }}>Guardar Permiso</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PermisosNoDocenteModal;
