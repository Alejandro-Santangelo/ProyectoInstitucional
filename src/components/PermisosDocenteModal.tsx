import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import db from '../data/db';

export interface PermisosDocenteData {
  docenteId: string;
  permiso: string;
}

interface PermisosDocenteModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: PermisosDocenteData) => void;
}

const PermisosDocenteModal: React.FC<PermisosDocenteModalProps> = ({ show, onHide, onSubmit }) => {
  const [docenteId, setDocenteId] = useState("");
  const [permiso, setPermiso] = useState("");
  const [docentes, setDocentes] = useState<Array<{ id: string, nombre: string, apellido: string }>>([]);
  const permisos = ["Ver notas", "Editar notas", "Acceso total"];

  useEffect(() => {
    async function fetchDocentes() {
      const result = await db.table('personalDocentes').toArray();
      setDocentes(result);
    }
    fetchDocentes();
  }, [show]);

  const handleSubmit = () => {
    const data: PermisosDocenteData = { docenteId, permiso };
    onSubmit(data);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName="modal-permisos-docente"
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
        <Modal.Title style={{ fontWeight: 700, letterSpacing: 1, fontSize: 20, marginBottom: 0 }}>Asignar / Modificar permisos a Docentes</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: 'linear-gradient(120deg, #f0f8ff 60%, #e3eefe 100%)', borderRadius: 12, padding: '24px 32px 12px 32px', minHeight: 220, maxHeight: 400, overflowY: 'auto' }}>
  <Form>
          <Row>
            <Col md={8} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Docente</Form.Label>
                <Form.Select value={docenteId} onChange={e => setDocenteId(e.target.value)} style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontWeight: 500, fontSize: 14, height: 32 }}>
                  <option value="">Seleccionar docente</option>
                  {docentes.map(doc => (
                    <option key={doc.id} value={doc.id}>{doc.nombre} {doc.apellido}</option>
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

export default PermisosDocenteModal;
