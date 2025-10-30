import React, { useState } from "react";
import NuevoNoDocenteModal from "../components/NuevoNoDocenteModal";
import PermisosNoDocenteModal from "../components/PermisosNoDocenteModal";
import type { NuevoNoDocenteData } from "../components/NuevoNoDocenteModal";
import type { PermisosNoDocenteData } from "../components/PermisosNoDocenteModal";
import db from '../data/db';
import NavbarInstitucional from '../components/NavbarInstitucional';

const GestionPersonalNoDocente: React.FC = () => {
  const [showNuevoNoDocente, setShowNuevoNoDocente] = useState(false);
  const [showPermisosNoDocente, setShowPermisosNoDocente] = useState(false);

  const handleNuevoNoDocente = () => setShowNuevoNoDocente(true);
  const handlePermisosNoDocente = () => setShowPermisosNoDocente(true);

  const handleCloseNuevoNoDocente = () => setShowNuevoNoDocente(false);
  const handleClosePermisosNoDocente = () => setShowPermisosNoDocente(false);

  const handleSubmitNuevoNoDocente = async (data: NuevoNoDocenteData) => {
    await db.table('personalNoDocentes').add({
      nombre: data.nombre,
      apellido: data.apellido,
      dni: data.dni,
      mail: data.mail,
      telefono: data.telefono,
      cargos: data.cargos
    });
    console.log("Nuevo no docente guardado:", data);
  };

  const handleSubmitPermisosNoDocente = (data: PermisosNoDocenteData) => {
    // Guardar permisos en la base de datos
    console.log("Permisos no docente:", data);
  };

  return (
    <>
      <NavbarInstitucional />
      <div style={{ padding: "2rem", marginTop: "6rem" }}>
        <h1 style={{ textAlign: 'center', marginTop: '0.5rem' }}>Gestión de Personal No Docente</h1>
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
            onClick={handleNuevoNoDocente}
          >
            Sumar nuevo personal no Docente al Instituto
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
            onClick={handlePermisosNoDocente}
          >
            Asignar / Modificar permisos a No Docentes
          </button>
        </div>
        <NuevoNoDocenteModal show={showNuevoNoDocente} onHide={handleCloseNuevoNoDocente} onSubmit={handleSubmitNuevoNoDocente} />
        <PermisosNoDocenteModal show={showPermisosNoDocente} onHide={handleClosePermisosNoDocente} onSubmit={handleSubmitPermisosNoDocente} />
      </div>
    </>
  );
};

export default GestionPersonalNoDocente;
