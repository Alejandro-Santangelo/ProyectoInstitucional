import React, { useState } from "react";
import NuevaCarreraModal from "../components/NuevaCarreraModal";
import db from '../data/db';
import type { NuevaCarreraData } from "../components/NuevaCarreraModal";

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
    <div style={{ padding: "2rem", marginTop: "0.5rem" }}>
      <h1 style={{ textAlign: 'center', marginTop: '0.5rem' }}>Otras Gestiones</h1>
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
  );
};

export default OtrasGestiones;
