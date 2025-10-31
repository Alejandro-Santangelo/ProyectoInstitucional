import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Modal, Button } from "react-bootstrap";
import NuevoDocenteModal from "../components/NuevoDocenteModal";
import EditarDocenteModal from "../components/EditarDocenteModal";
import type { NuevoDocenteData } from "../components/NuevoDocenteModal";
import type { PermisosDocenteData } from "../components/PermisosDocenteModal";
import db from '../data/db';
import PermisosDocenteModal from "../components/PermisosDocenteModal";
import NavbarInstitucional from '../components/NavbarInstitucional';

const GestionPersonalDocentes: React.FC = () => {
  // Actualiza la lista de docentes desde la base de datos
  const actualizarListaDocentes = async () => {
    const lista = await db.table('personalDocentes').toArray();
    setDocentes(lista);
  };
  const [showListaDocentes, setShowListaDocentes] = useState(false);
  const [docentes, setDocentes] = useState<NuevoDocenteData[]>([]);
  const [docenteEditar, setDocenteEditar] = useState<NuevoDocenteData | null>(null);
  const [showEditarDocente, setShowEditarDocente] = useState(false);
  const [showNuevoDocente, setShowNuevoDocente] = useState(false);
  const [showPermisosDocente, setShowPermisosDocente] = useState(false);
  const [docenteAEliminar, setDocenteAEliminar] = useState<NuevoDocenteData | null>(null);
  const [showConfirmEliminar, setShowConfirmEliminar] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleNuevoDocente = () => setShowNuevoDocente(true);
  const handlePermisosDocente = () => setShowPermisosDocente(true);

  const handleCloseNuevoDocente = () => setShowNuevoDocente(false);
  const handleClosePermisosDocente = () => setShowPermisosDocente(false);

  const handleSubmitPermisosDocente = (data: PermisosDocenteData) => {
    // Guardar permisos en la base de datos
    console.log("Permisos docente:", data);
  };

  return (
    <>
      <NavbarInstitucional />
      <div style={{ padding: "2rem", marginTop: "6rem" }}>
        <h1 style={{ textAlign: 'center', marginTop: '0' }}>Gestión de Personal Docente</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '3rem' }}>
          <button
            style={{
              width: '100%',
              maxWidth: '400px',
              background: 'linear-gradient(135deg, #007bff 60%, #6dd5fa 100%)',
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              padding: '2rem',
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'Segoe UI, Arial, sans-serif',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              display: 'block',
            }}
            onClick={handleNuevoDocente}
          >
            Sumar nuevo Docente al Instituto
          </button>
          <button
            style={{
              width: '100%',
              maxWidth: '400px',
              background: 'linear-gradient(135deg, #00509e 60%, #6dd5fa 100%)',
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              padding: '2rem',
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'Segoe UI, Arial, sans-serif',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              display: 'block',
            }}
            onClick={handlePermisosDocente}
          >
            Asignar / Modificar permisos a Docentes
          </button>
          <button
            style={{
              width: '100%',
              maxWidth: '400px',
              background: 'linear-gradient(135deg, #00bfae 60%, #6dd5fa 100%)',
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              padding: '2rem',
              color: '#fff',
              textAlign: 'center',
              fontFamily: 'Segoe UI, Arial, sans-serif',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              display: 'block',
            }}
            onClick={async () => {
              const lista = await db.table('personalDocentes').toArray();
              setDocentes(lista);
              setShowListaDocentes(true);
            }}
          >
            Modificar Datos de Docentes
          </button>
        </div>
        {/* Mensaje si la lista está vacía */}
        {docentes.length === 0 && (
          <div style={{
            marginTop: '4rem',
            textAlign: 'center',
            color: '#00509e',
            fontWeight: 500,
            fontSize: 20,
            background: 'linear-gradient(120deg, #e3eefe 60%, #f0f8ff 100%)',
            borderRadius: 16,
            padding: '2rem 0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            No hay docentes registrados en el sistema.<br />Utiliza el botón "Sumar nuevo Docente al Instituto" para agregar uno.
          </div>
        )}
  <NuevoDocenteModal show={showNuevoDocente} onHide={handleCloseNuevoDocente} onDocenteAgregado={actualizarListaDocentes} />
        {/* Modal para lista de docentes */}
        <Modal
          show={showListaDocentes}
          onHide={() => setShowListaDocentes(false)}
          centered
          contentClassName="modal-nueva-docente"
          dialogClassName="modal-xl"
          style={{
            minHeight: 'unset',
            width: '700px',
            maxWidth: '95vw',
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '0 12px'
          }}
        >
          <div style={{background: 'linear-gradient(120deg, #f0f8ff 60%, #e3eefe 100%)', borderRadius: '18px', width: '100%', maxWidth: '95vw', padding: '32px 36px 18px', boxShadow: 'rgba(0,0,0,0.18) 0px 8px 32px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18}}>
              <h3 style={{fontWeight: 700, color: '#00509e', fontSize: 22, margin: 0}}>Listado de Docentes</h3>
              <button style={{background: 'none', border: 'none', fontSize: 22, color: '#00509e', cursor: 'pointer', fontWeight: 700}} onClick={() => setShowListaDocentes(false)}>×</button>
            </div>
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
              {docentes.map((doc, idx) => (
                <li key={doc.dni || idx} style={{marginBottom: 10, background: '#e3eefe', borderRadius: 12, padding: '10px 18px', fontWeight: 500, color: '#00509e', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px'}}>
                  <span>{doc.nombre} {doc.apellido} - DNI: {doc.dni}</span>
                  <div style={{display: 'flex', gap: '8px'}}>
                    <Button variant="outline-primary" style={{borderRadius: 12, fontWeight: 500, fontSize: 14, padding: '6px 14px'}}
                      onClick={() => {
                        setDocenteEditar(doc);
                        setShowListaDocentes(false);
                        setShowEditarDocente(true);
                      }}
                    >Editar</Button>
                    <Button variant="danger" style={{borderRadius: 12, fontWeight: 500, fontSize: 14, padding: '6px 14px'}}
                      onClick={() => {
                        setDocenteAEliminar(doc);
                        setShowConfirmEliminar(true);
                      }}
                    >Eliminar</Button>
                  </div>
                </li>
              ))}
              {docentes.length === 0 && <div style={{ color: '#00509e', fontWeight: 500, fontSize: 16, textAlign: 'center', marginTop: 24 }}>No hay docentes registrados.</div>}
            </ul>
          </div>
        </Modal>
        {/* Mensaje visual de éxito/error */}
        {mensaje && !showConfirmEliminar && ReactDOM.createPortal(
          <div style={{
            position: 'fixed',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#007bff',
            color: '#fff',
            padding: '12px 32px',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            zIndex: 9999,
            fontWeight: 500,
            fontSize: 16,
            minWidth: '220px',
            textAlign: 'center',
            transition: 'opacity 0.3s',
          }}>
            {mensaje}
          </div>,
          document.body
        )}
        {/* Modal de confirmación de eliminación */}
        <Modal show={showConfirmEliminar} onHide={() => setShowConfirmEliminar(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Seguro que deseas eliminar a <b>{docenteAEliminar?.nombre || ''} {docenteAEliminar?.apellido || ''}</b>?
            <br />Esta acción eliminará todos los datos relacionados.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmEliminar(false)}>Cancelar</Button>
            <Button variant="danger" onClick={async () => {
              setShowConfirmEliminar(false);
              setDocenteAEliminar(null);
              let eliminado = false;
              let mensajeFinal = '';
              setTimeout(async () => {
                try {
                  if (docenteAEliminar?.dni) {
                    await db.table('personalDocentes').where('dni').equals(docenteAEliminar.dni).delete();
                    eliminado = true;
                  } else if (docenteAEliminar) {
                    await db.table('personalDocentes').where('nombre').equals(docenteAEliminar.nombre || '').and(d => d.apellido === (docenteAEliminar.apellido || '')).delete();
                    eliminado = true;
                  }
                  if (docenteAEliminar?.dni) {
                    await db.table('usuarios').where('dni').equals(docenteAEliminar.dni).delete();
                  }
                  await actualizarListaDocentes();
                  mensajeFinal = eliminado ? 'Docente eliminado correctamente.' : 'No se encontró el docente para eliminar.';
                } catch (e) {
                  function getErrorMessage(error: unknown): string {
                    if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message?: unknown }).message === 'string') {
                      return (error as { message: string }).message;
                    }
                    return String(error);
                  }
                  mensajeFinal = 'Error al eliminar: ' + getErrorMessage(e);
                }
                setMensaje(mensajeFinal);
                // Eliminar cualquier alert, solo mostrar el cartel visual
                // El cartel se elimina automáticamente después de 3 segundos
                setTimeout(() => setMensaje(null), 3000);
              }, 100);
            }}>Eliminar</Button>
          </Modal.Footer>
        </Modal>
        {/* Modal de edición con datos precargados */}
        {docenteEditar && (
          <EditarDocenteModal
            show={showEditarDocente}
            onHide={() => { setShowEditarDocente(false); setDocenteEditar(null); }}
            docente={docenteEditar}
            onSubmit={async (data, usuario, contrasena) => {
              // Buscar el id en el docente
              let id = typeof data.id === 'number' ? data.id : undefined;
              if (!id) {
                const encontrado = await db.table('personalDocentes').where('dni').equals(data.dni).first();
                id = encontrado?.id;
              }
              if (id) {
                await db.table('personalDocentes').put({ ...data, id });
              }
              // Actualizar o crear usuario si se ingresan datos
              if (usuario && contrasena) {
                await db.table('usuarios').put({
                  nombre: `${data.nombre} ${data.apellido}`,
                  username: usuario,
                  password: contrasena,
                  route: '/dashboard-profesor',
                  rol: 'Profesor',
                  genero: '',
                  dni: data.dni
                }, undefined);
              }
              setShowEditarDocente(false);
              setDocenteEditar(null);
            }}
          />
        )}
        <PermisosDocenteModal show={showPermisosDocente} onHide={handleClosePermisosDocente} onSubmit={handleSubmitPermisosDocente} />
      </div>
    </>
  );
};

export default GestionPersonalDocentes;
