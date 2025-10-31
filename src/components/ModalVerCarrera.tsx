

import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import type { Carrera } from "../pages/GestionCarreras";
import db from '../data/db';

interface ModalVerCarreraProps {
  show: boolean;
  onHide: () => void;
  carrera: Carrera | null;
  editable?: boolean;
  onSave?: (carrera: Carrera) => void;
}

const ModalVerCarrera: React.FC<ModalVerCarreraProps> = ({ show, onHide, carrera, editable = false, onSave }) => {
  const [docentes, setDocentes] = useState<Array<{ id?: number; nombre: string; apellido?: string }>>([]);

  useEffect(() => {
    db.table('personalDocentes').toArray().then(setDocentes);
  }, []);

  if (!carrera) return null;

  // Helper para buscar nombre del docente
  const getDocenteNombre = (docenteId?: number | null) => {
    if (!docenteId) return '';
    const docente = docentes.find(d => d.id === docenteId);
    if (docente) return docente.nombre + (docente.apellido ? ` ${docente.apellido}` : '');
    return '';
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton style={{ background: 'linear-gradient(90deg, #00509e 60%, #007bff 100%)', color: '#fff', borderBottom: 'none', minHeight: 36, padding: '8px 18px' }}>
        <Modal.Title style={{ fontWeight: 700, letterSpacing: 1, fontSize: 20, marginBottom: 0 }}>{editable ? 'Editar Carrera (Planilla Visual)' : 'Detalle de la Carrera'}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: 'linear-gradient(120deg, #f0f8ff 60%, #e3eefe 100%)', borderRadius: 12, padding: '24px 32px 12px 32px', minHeight: 320, maxHeight: 900, overflowY: 'auto' }}>
        {editable ? (
          <div>
            <input type="text" defaultValue={carrera.nombre} style={{ fontWeight: 700, color: '#00509e', fontSize: 22, marginBottom: 8, borderRadius: 12, border: '1px solid #007bff', padding: '4px 12px', width: '100%' }} readOnly />
            <div style={{ marginBottom: 12 }}>
              <strong>Turno:</strong> <input type="text" defaultValue={carrera.turno || ''} style={{ borderRadius: 12, border: '1px solid #007bff', padding: '2px 8px', width: 120 }} readOnly /> <br />
              <strong>Cantidad de años:</strong> <input type="number" defaultValue={carrera.cantidadAnios || 1} style={{ borderRadius: 12, border: '1px solid #007bff', padding: '2px 8px', width: 80 }} readOnly />
            </div>
            {carrera.anios && carrera.anios.length > 0 && (
              <div>
                {carrera.anios.map((anio, idx) => (
                  <div key={idx} style={{ border: '1px solid #007bff33', borderRadius: 16, padding: 18, marginBottom: 18, background: '#f8f9fa' }}>
                    <h5 style={{ color: '#00509e', fontWeight: 700, marginBottom: 12 }}>Año {idx + 1}</h5>
                    {anio.materias.length === 0 ? (
                      <div style={{ color: '#888', fontStyle: 'italic' }}>Sin materias registradas.</div>
                    ) : (
                      <ul style={{ paddingLeft: 18 }}>
                        {anio.materias.map((mat, mIdx) => (
                          <li key={mIdx} style={{ marginBottom: 8, color: '#00509e', fontWeight: 500 }}>
                            <input type="text" defaultValue={mat.nombre} style={{ fontWeight: 600, color: '#00509e', fontSize: 16, borderRadius: 10, border: '1px solid #007bff', padding: '2px 8px', marginRight: 8 }} readOnly />
                            {mat.docenteId ? (
                              <span style={{ color: '#1976d2', fontWeight: 400 }}>
                                — Docente: <input type="text" defaultValue={getDocenteNombre(mat.docenteId) || `ID ${mat.docenteId}`} style={{ borderRadius: 10, border: '1px solid #007bff', padding: '2px 8px', width: 120 }} readOnly />
                              </span>
                            ) : null}
                            <br />
                            <span style={{ fontSize: 13, color: '#1976d2' }}>Módulos mensuales: <input type="number" defaultValue={mat.modulosMensuales} style={{ borderRadius: 10, border: '1px solid #007bff', padding: '2px 8px', width: 60 }} readOnly /></span>
                            {mat.diasHorarios && mat.diasHorarios.length > 0 && (
                              <div style={{ fontSize: 12, color: '#222', marginTop: 2 }}>
                                Días y horarios:
                                <ul style={{ marginLeft: 12 }}>
                                  {mat.diasHorarios.map((dh, dhIdx) => (
                                    <li key={dhIdx}>
                                      <input type="text" defaultValue={dh.dia} style={{ borderRadius: 10, border: '1px solid #007bff', padding: '2px 8px', width: 80, marginRight: 6 }} readOnly />
                                      <input type="text" defaultValue={dh.horario} style={{ borderRadius: 10, border: '1px solid #007bff', padding: '2px 8px', width: 80 }} readOnly />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/* Botones de acción solo en modo editable visual */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
              <Button variant="secondary" onClick={onHide} style={{ borderRadius: 16 }}>Cancelar</Button>
              <Button variant="primary" onClick={() => { if (onSave && carrera) { onSave(carrera); } else { onHide(); } }} style={{ borderRadius: 16 }}>Guardar</Button>
            </div>
          </div>
        ) : (
          <>
            <h4 style={{ color: '#00509e', fontWeight: 700 }}>{carrera.nombre}</h4>
            <div style={{ marginBottom: 12 }}>
              <strong>Turno:</strong> {carrera.turno || '-'}<br />
              <strong>Cantidad de años:</strong> {carrera.cantidadAnios || '-'}
            </div>
            {carrera.anios && carrera.anios.length > 0 && (
              <div>
                {carrera.anios.map((anio, idx) => (
                  <div key={idx} style={{ border: '1px solid #007bff33', borderRadius: 16, padding: 18, marginBottom: 18, background: '#f8f9fa' }}>
                    <h5 style={{ color: '#00509e', fontWeight: 700, marginBottom: 12 }}>Año {idx + 1}</h5>
                    {anio.materias.length === 0 ? (
                      <div style={{ color: '#888', fontStyle: 'italic' }}>Sin materias registradas.</div>
                    ) : (
                      <ul style={{ paddingLeft: 18 }}>
                        {anio.materias.map((mat, mIdx) => (
                          <li key={mIdx} style={{ marginBottom: 8, color: '#00509e', fontWeight: 500 }}>
                            <strong>{mat.nombre}</strong>
                            {mat.docenteId ? (
                              <span style={{ color: '#1976d2', fontWeight: 400 }}> — Docente: {getDocenteNombre(mat.docenteId) || `ID ${mat.docenteId}`}</span>
                            ) : null}
                            <br />
                            <span style={{ fontSize: 13, color: '#1976d2' }}>Módulos mensuales: {mat.modulosMensuales}</span>
                            {mat.diasHorarios && mat.diasHorarios.length > 0 && (
                              <div style={{ fontSize: 12, color: '#222', marginTop: 2 }}>
                                Días y horarios:
                                <ul style={{ marginLeft: 12 }}>
                                  {mat.diasHorarios.map((dh, dhIdx) => (
                                    <li key={dhIdx}>{dh.dia} - {dh.horario}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={{ background: 'linear-gradient(90deg, #00509e 60%, #007bff 100%)', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
        {!editable && <Button variant="secondary" onClick={onHide} style={{ borderRadius: 16 }}>Cerrar</Button>}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalVerCarrera;
