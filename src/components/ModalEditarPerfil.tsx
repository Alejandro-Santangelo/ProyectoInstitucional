import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

interface ModalEditarPerfilProps {
  show: boolean;
  onHide: () => void;
  datos: {
    nombre?: string;
    username?: string;
    password?: string;
    rol?: string;
    route?: string;
    genero?: 'M' | 'F' | 'O';
    foto?: string;
    mail?: string;
    telefono?: string;
    dni?: string;
    materia?: string;
    sector?: string;
    passwordActual?: string;
  };
  onSave: (datos: {
    nombre?: string;
    username?: string;
    password?: string;
    rol?: string;
    route?: string;
    genero?: 'M' | 'F' | 'O';
    foto?: string;
    mail?: string;
    telefono?: string;
    dni?: string;
    materia?: string;
    sector?: string;
    passwordActual?: string;
  }) => void;
}

const ModalEditarPerfil: React.FC<ModalEditarPerfilProps> = ({ show, onHide, datos, onSave }) => {
  const [form, setForm] = useState<typeof datos>(datos);
  const [fotoPreview, setFotoPreview] = useState<string | undefined>(datos.foto);

  // Determinar campos según rol
  let campos: { label: string; name: string; type?: string }[] = [];
  if (form.rol === 'Directora' || form.rol === 'Secretaria' || form.rol === 'Profesor') {
    campos = [
      { label: 'Nombre', name: 'nombre' },
      { label: 'Usuario', name: 'username' },
      { label: 'Contraseña', name: 'password', type: 'password' },
      { label: 'Mail', name: 'mail' },
      { label: 'Teléfono', name: 'telefono' }
    ];
  } else if (form.materia) {
    campos = [
      { label: 'Nombre', name: 'nombre' },
      { label: 'DNI', name: 'dni' },
      { label: 'Materia', name: 'materia' },
      { label: 'Mail', name: 'mail' },
      { label: 'Teléfono', name: 'telefono' }
    ];
  } else if (form.sector) {
    campos = [
      { label: 'Nombre', name: 'nombre' },
      { label: 'DNI', name: 'dni' },
      { label: 'Sector', name: 'sector' },
      { label: 'Mail', name: 'mail' },
      { label: 'Teléfono', name: 'telefono' }
    ];
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result;
        if (typeof result === 'string') {
          setFotoPreview(result);
          setForm({ ...form, foto: result });
        }
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSave = () => {
    onSave(form);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName="modal-editar-perfil"
      dialogClassName="modal-xl"
  style={{ minHeight: 'unset', maxWidth: 800, marginLeft: 300 }}
    >
      <Modal.Header closeButton style={{ background: 'linear-gradient(90deg, #00509e 60%, #007bff 100%)', color: '#fff', borderBottom: 'none', minHeight: 36, padding: '8px 18px' }}>
        <Modal.Title style={{ fontWeight: 700, letterSpacing: 1, fontSize: 20, marginBottom: 0 }}>Editar Perfil</Modal.Title>
      </Modal.Header>
  <Modal.Body style={{ background: 'linear-gradient(120deg, #f0f8ff 60%, #e3eefe 100%)', borderRadius: 12, padding: '24px 32px 12px 32px', minHeight: 320, maxHeight: 480, overflow: 'visible' }}>
        <Form>
          <Row className="mb-2 justify-content-center">
            <Col xs="auto">
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 8px auto', boxShadow: '0 4px 16px #00509e44', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '1 / 1', background: '#e3eefe' }}>
                  {fotoPreview ? (
                    <img
                      src={fotoPreview}
                      alt="Foto de perfil"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="28" cy="28" r="28" fill="#e3eefe" />
                        <ellipse cx="28" cy="23" rx="10" ry="10" fill="#b0c4de" />
                        <ellipse cx="28" cy="41" rx="14" ry="8" fill="#b0c4de" />
                      </svg>
                      <span style={{ color: '#00509e', fontWeight: 500, fontSize: 14, textAlign: 'center', marginTop: 4 }}>
                        Foto de perfil
                      </span>
                    </div>
                  )}
                </div>
                <Form.Group style={{ marginBottom: 8 }}>
                  <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Cambiar foto de perfil</Form.Label>
                  <Form.Control type="file" accept="image/*" name="foto" onChange={handleInputChange} style={{ borderRadius: 16, border: '1px solid #007bff', background: '#e3eefe', fontSize: 14, padding: '4px 8px' }} />
                </Form.Group>
              </div>
            </Col>
          </Row>
          {/* Campos dinámicos según rol, dos por línea */}
          <Row>
            {campos.map((campo) => (
              <Col md={6} xs={12} key={campo.name} className="mb-2">
                <Form.Group>
                  <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>{campo.label}</Form.Label>
                  <div style={{ position: 'relative' }}>
                    <Form.Control
                      type={campo.type || 'text'}
                      name={campo.name}
                      value={form[campo.name as keyof typeof form] || ''}
                      onChange={handleInputChange}
                      style={{
                        borderRadius: 16,
                        border: '1px solid #007bff',
                        background: '#e3eefe',
                        paddingLeft: 34,
                        fontWeight: 500,
                        fontSize: 14,
                        height: 32,
                      }}
                    />
                    {/* Íconos decorativos para cada campo */}
                    <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#007bff', fontSize: 16 }}>
                      {campo.name === 'nombre' && '👤'}
                      {campo.name === 'username' && '🆔'}
                      {campo.name === 'password' && '🔒'}
                      {campo.name === 'mail' && '✉️'}
                      {campo.name === 'telefono' && '📞'}
                      {campo.name === 'dni' && '🪪'}
                      {campo.name === 'materia' && '📚'}
                      {campo.name === 'sector' && '🏢'}
                    </span>
                  </div>
                </Form.Group>
              </Col>
            ))}
            {/* Campo Contraseña actual en la tercera línea */}
            <Col md={6} xs={12} className="mb-2" style={{ marginTop: 0, marginBottom: 38 }}>
              <Form.Group>
                <Form.Label style={{ fontWeight: 500, color: '#00509e', fontSize: 14 }}>Contraseña actual</Form.Label>
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    type="password"
                    name="passwordActual"
                    value={form['passwordActual'] || ''}
                    onChange={handleInputChange}
                    style={{
                      borderRadius: 16,
                      border: '1px solid #007bff',
                      background: '#e3eefe',
                      paddingLeft: 34,
                      fontWeight: 500,
                      fontSize: 14,
                      height: 32,
                    }}
                  />
                  <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#007bff', fontSize: 16 }}>🔑</span>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
  <Modal.Footer style={{ background: '#e3eefe', borderTop: 'none', borderRadius: '0 0 12px 12px' }}>
        <Button
          variant="outline-secondary"
          onClick={onHide}
          style={{ borderRadius: 20, fontWeight: 500, minWidth: 120, border: '1px solid #00509e', color: '#00509e', background: '#fff' }}
        >
          Cerrar
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          style={{ borderRadius: 20, fontWeight: 500, minWidth: 140, background: 'linear-gradient(90deg, #00509e 60%, #007bff 100%)', border: 'none' }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditarPerfil;
