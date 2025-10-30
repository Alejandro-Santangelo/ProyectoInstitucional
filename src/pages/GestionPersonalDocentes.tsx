import React, { useState } from "react";
import NuevoDocenteModal from "../components/NuevoDocenteModal";
import type { NuevoDocenteData } from "../components/NuevoDocenteModal";
import type { PermisosDocenteData } from "../components/PermisosDocenteModal";
import db from '../data/db';
import PermisosDocenteModal from "../components/PermisosDocenteModal";

const GestionPersonalDocentes: React.FC = () => {
  const [showNuevoDocente, setShowNuevoDocente] = useState(false);
  const [showPermisosDocente, setShowPermisosDocente] = useState(false);

  const handleNuevoDocente = () => setShowNuevoDocente(true);
  const handlePermisosDocente = () => setShowPermisosDocente(true);

  const handleCloseNuevoDocente = () => setShowNuevoDocente(false);
  const handleClosePermisosDocente = () => setShowPermisosDocente(false);

  const handleSubmitNuevoDocente = async (data: NuevoDocenteData) => {
    await db.table('personalDocentes').add({
      nombre: data.nombre,
      apellido: data.apellido,
      dni: data.dni,
      mail: data.mail,
      telefono: data.telefono,
      materias: data.materias
    });
    console.log("Nuevo docente guardado:", data);
  };
  const handleSubmitPermisosDocente = (data: PermisosDocenteData) => {
    // Guardar permisos en la base de datos
    console.log("Permisos docente:", data);
  };

  return (
    <div style={{ padding: "2rem", marginTop: "6rem" }}>
      <h1 style={{ textAlign: 'center', marginTop: '-3rem' }}>Gestión de Personal Docente</h1>
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
      </div>
      <NuevoDocenteModal show={showNuevoDocente} onHide={handleCloseNuevoDocente} onSubmit={handleSubmitNuevoDocente} />
      <PermisosDocenteModal show={showPermisosDocente} onHide={handleClosePermisosDocente} onSubmit={handleSubmitPermisosDocente} />
    </div>
  );
};

export default GestionPersonalDocentes;
