import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Modal, Button } from "react-bootstrap";
import NuevoNoDocenteModal from "../components/NuevoNoDocenteModal";
import EditarNoDocenteModal from "../components/EditarNoDocenteModal";
import PermisosNoDocenteModal from "../components/PermisosNoDocenteModal";
import type { NuevoNoDocenteData } from "../components/NuevoNoDocenteModal";
import type { CargoAsignado } from "../components/NuevoNoDocenteModal";
import type { PermisosNoDocenteData } from "../components/PermisosNoDocenteModal";
import db from '../data/db';
import NavbarInstitucional from '../components/NavbarInstitucional';

const GestionPersonalNoDocente: React.FC = () => {
  // Actualiza la lista de no docentes desde la base de datos
  const actualizarListaNoDocentes = async () => {
    const lista = await db.table('personalNoDocentes').toArray();
    setNoDocentes(lista);
  };
  const [showListaNoDocentes, setShowListaNoDocentes] = useState(false);
  const [noDocentes, setNoDocentes] = useState<NuevoNoDocenteData[]>([]);
  const [noDocenteEditar, setNoDocenteEditar] = useState<{
    id?: number;
    nombre: string;
    apellido: string;
    dni: string;
    mail: string;
    telefono: string;
    cargos: string[];
  } | null>(null);
  const [showEditarNoDocente, setShowEditarNoDocente] = useState(false);
  const [showNuevoNoDocente, setShowNuevoNoDocente] = useState(false);
  const [showPermisosNoDocente, setShowPermisosNoDocente] = useState(false);
  const [noDocenteAEliminar, setNoDocenteAEliminar] = useState<NuevoNoDocenteData | null>(null);
  const [showConfirmEliminar, setShowConfirmEliminar] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleNuevoNoDocente = () => setShowNuevoNoDocente(true);
  const handlePermisosNoDocente = () => setShowPermisosNoDocente(true);

  const handleCloseNuevoNoDocente = () => setShowNuevoNoDocente(false);
  const handleClosePermisosNoDocente = () => setShowPermisosNoDocente(false);


  const handleSubmitPermisosNoDocente = (data: PermisosNoDocenteData) => {
    // Guardar permisos en la base de datos
    console.log("Permisos no docente:", data);
  };

  return (
    <>
      <NavbarInstitucional />
      <div style={{ padding: "2rem", marginTop: "6rem", position: 'relative' }}>
        {/* Botón volver */}
        <button
          onClick={() => window.history.back()}
          style={{
            position: 'absolute',
            top: 0,
            marginTop: '-85px',
            left: 10,
            background: '#1976d2',
            border: 'none',
            borderRadius: '50%',
            width: 54,
            height: 54,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'background 0.2s',
            padding: 0
          }}
          title="Volver"
        >
          <span style={{ fontSize: 24, color: '#fff', fontWeight: 700, lineHeight: 1 }}>&larr;</span>
          <span style={{ fontSize: 10, color: '#fff', fontWeight: 500, marginTop: 2 }}>Volver</span>
        </button>
  <h1 style={{ textAlign: 'center', marginTop: '-110px', marginBottom: '120px' }}>Gestión de Personal No Docente</h1>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          marginTop: '3rem',
        }}>
          <button
            style={{
              width: '400px',
              background: 'linear-gradient(135deg, #007bff 60%, #6dd5fa 100%)',
              borderRadius: '18px',
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
            onClick={handleNuevoNoDocente}
          >
            Sumar nuevo personal no Docente al Instituto
          </button>
          <button
            style={{
              width: '400px',
              background: 'linear-gradient(135deg, #00509e 60%, #6dd5fa 100%)',
              borderRadius: '18px',
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
            onClick={handlePermisosNoDocente}
          >
            Asignar / Modificar permisos a No Docentes
          </button>
          <button
            style={{
              width: '400px',
              background: 'linear-gradient(135deg, #00bfae 60%, #6dd5fa 100%)',
              borderRadius: '18px',
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
              const lista = await db.table('personalNoDocentes').toArray();
              setNoDocentes(lista);
              setShowListaNoDocentes(true);
            }}
          >
            Modificar Datos de No Docentes
          </button>
        </div>
          {/* Mensaje si la lista está vacía */}
          {noDocentes.length === 0 && (
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
              No hay personal No Docente registrado en el sistema.<br />Utiliza el botón "Sumar nuevo No Docente al Instituto" para agregar uno.
            </div>
          )}
  <NuevoNoDocenteModal show={showNuevoNoDocente} onHide={handleCloseNuevoNoDocente} onNoDocenteAgregado={actualizarListaNoDocentes} />
        {/* Modal para lista de no docentes */}
        <Modal
          show={showListaNoDocentes}
          onHide={() => setShowListaNoDocentes(false)}
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
              <h3 style={{fontWeight: 700, color: '#00509e', fontSize: 22, margin: 0}}>Listado de No Docentes</h3>
              <button style={{background: 'none', border: 'none', fontSize: 22, color: '#00509e', cursor: 'pointer', fontWeight: 700}} onClick={() => setShowListaNoDocentes(false)}>×</button>
            </div>
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
              {noDocentes.map((nd, idx) => (
                <li key={nd.dni || idx} style={{marginBottom: 10, background: '#e3eefe', borderRadius: 12, padding: '10px 18px', fontWeight: 500, color: '#00509e', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px'}}>
                  <span>{nd.nombre} {nd.apellido} - DNI: {nd.dni}</span>
                  <div style={{display: 'flex', gap: '8px'}}>
                    <Button variant="outline-primary" style={{borderRadius: 12, fontWeight: 500, fontSize: 14, padding: '6px 14px'}}
                      onClick={() => {
                        const cargosString = Array.isArray(nd.cargos)
                          ? nd.cargos.map((c: CargoAsignado | string) => typeof c === 'string' ? c : c.cargo)
                          : [];
                        setNoDocenteEditar({
                          id: typeof nd.id === 'number' ? nd.id : undefined,
                          nombre: nd.nombre,
                          apellido: nd.apellido,
                          dni: nd.dni,
                          mail: nd.mail,
                          telefono: nd.telefono,
                          cargos: cargosString
                        });
                        setShowListaNoDocentes(false);
                        setShowEditarNoDocente(true);
                      }}
                    >Editar</Button>
                    <Button variant="danger" style={{borderRadius: 12, fontWeight: 500, fontSize: 14, padding: '6px 14px'}}
                      onClick={() => {
                        setNoDocenteAEliminar(nd);
                        setShowConfirmEliminar(true);
                      }}
                    >Eliminar</Button>
                  </div>
                </li>
              ))}
              {noDocentes.length === 0 && <div style={{ color: '#00509e', fontWeight: 500, fontSize: 16, textAlign: 'center', marginTop: 24 }}>No hay personal no docente registrado.</div>}
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
            ¿Seguro que deseas eliminar a <b>{noDocenteAEliminar?.nombre} {noDocenteAEliminar?.apellido}</b>?
            <br />Esta acción eliminará todos los datos relacionados.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmEliminar(false)}>Cancelar</Button>
            <Button variant="danger" onClick={async () => {
              setShowConfirmEliminar(false);
              setNoDocenteAEliminar(null);
              let eliminado = false;
              let mensajeFinal = '';
              setTimeout(async () => {
                function getErrorMessage(error: unknown): string {
                  if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message?: unknown }).message === 'string') {
                    return (error as { message: string }).message;
                  }
                  return String(error);
                }
                try {
                  if (noDocenteAEliminar?.dni) {
                    await db.table('personalNoDocentes').where('dni').equals(noDocenteAEliminar.dni).delete();
                    eliminado = true;
                  } else if (noDocenteAEliminar) {
                    await db.table('personalNoDocentes').where('nombre').equals(noDocenteAEliminar.nombre || '').and(nd => nd.apellido === (noDocenteAEliminar.apellido || '')).delete();
                    eliminado = true;
                  }
                  if (noDocenteAEliminar?.dni) {
                    await db.table('usuarios').where('dni').equals(noDocenteAEliminar.dni).delete();
                  }
                  await actualizarListaNoDocentes();
                  mensajeFinal = eliminado ? 'No docente eliminado correctamente.' : 'No se encontró el no docente para eliminar.';
                } catch (e) {
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
        {noDocenteEditar && (
          <EditarNoDocenteModal
            show={showEditarNoDocente}
            onHide={() => { setShowEditarNoDocente(false); setNoDocenteEditar(null); }}
            noDocente={noDocenteEditar}
            onSubmit={async (data, usuario, contrasena) => {
              // Buscar el id en el no docente
              let id = typeof data.id === 'number' ? data.id : undefined;
              if (!id) {
                const encontrado = await db.table('personalNoDocentes').where('dni').equals(data.dni).first();
                id = encontrado?.id;
              }
              if (id) {
                await db.table('personalNoDocentes').put({ ...data, id });
              }
              // Actualizar o crear usuario si se ingresan datos
              if (usuario && contrasena) {
                await db.table('usuarios').put({
                  nombre: `${data.nombre} ${data.apellido}`,
                  username: usuario,
                  password: contrasena,
                  route: '/dashboard-secretaria',
                  rol: 'Secretaria',
                  genero: '',
                  dni: data.dni
                }, undefined);
              }
              setShowEditarNoDocente(false);
              setNoDocenteEditar(null);
            }}
          />
        )}
        <PermisosNoDocenteModal show={showPermisosNoDocente} onHide={handleClosePermisosNoDocente} onSubmit={handleSubmitPermisosNoDocente} />
      </div>
    </>
  );
};

export default GestionPersonalNoDocente;
