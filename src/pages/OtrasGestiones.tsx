import React, { useState } from "react";
import NuevaCarreraModal from "../components/NuevaCarreraModal";
import db from '../data/db';
import type { NuevaCarreraData } from "../components/NuevaCarreraModal";
import NavbarInstitucional from '../components/NavbarInstitucional';

const OtrasGestiones: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSubmitCarrera = async (data: NuevaCarreraData) => {
    // Guardar la carrera en la base de datos
    await db.table('carreras').add({
      nombre: data.nombre,
      turno: data.turno,
      cantidadAnios: data.cantidadAnios,
      anios: data.anios // Guardar la estructura completa, incluyendo materias y docentes
    });
    console.log("Nueva carrera agregada:", data);
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
  <h1 style={{ textAlign: 'center', marginTop: '-110px', marginBottom: '120px' }}>Otras Gestiones</h1>
        <button
          style={{
            width: '100%',
            maxWidth: '400px',
            margin: '2rem auto',
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
          onClick={handleOpenModal}
        >
          Sumar una nueva Carrera al Instituto
        </button>
        <NuevaCarreraModal show={showModal} onHide={handleCloseModal} onSubmit={handleSubmitCarrera} />
      </div>
    </>
  );
};

export default OtrasGestiones;
