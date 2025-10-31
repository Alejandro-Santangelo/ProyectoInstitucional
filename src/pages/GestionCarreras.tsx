import React, { useEffect, useState } from "react";
import db from "../data/db";
import NuevaCarreraModal from "../components/NuevaCarreraModal";
import type { NuevaCarreraData, AnioConfig } from "../components/NuevaCarreraModal";
import { Button, Spinner } from "react-bootstrap";

// import type ya incluido arriba

export interface Carrera {
  id: number;
  nombre: string;
  turno?: string;
  cantidadAnios?: number;
  anios?: AnioConfig[];
}

const GestionCarreras: React.FC = () => {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editCarrera, setEditCarrera] = useState<Carrera | null>(null);
  const [mensaje, setMensaje] = useState<string>("");

  const cargarCarreras = async () => {
    setLoading(true);
    const lista = await db.table("carreras").toArray();
    setCarreras(lista as Carrera[]);
    setLoading(false);
  };

  useEffect(() => {
    cargarCarreras();
  }, []);

  const handleGuardar = async (data: NuevaCarreraData) => {
    if (!data.nombre.trim()) {
      setMensaje("El nombre de la carrera es obligatorio.");
      return;
    }
    if (editCarrera) {
      await db.table("carreras").update(editCarrera.id, data);
      setMensaje("Carrera actualizada correctamente.");
    } else {
      await db.table("carreras").add(data);
      setMensaje("Carrera agregada correctamente.");
    }
    setShowModal(false);
    setEditCarrera(null);
    cargarCarreras();
    setTimeout(() => setMensaje(""), 2500);
  };

  const handleEditar = (carrera: Carrera) => {
    setEditCarrera(carrera);
    setShowModal(true);
  };

  const handleNueva = () => {
    setEditCarrera(null);
    setShowModal(true);
  };

  return (
    <div style={{ padding: "2rem", marginTop: "6rem" }}>
      <h1 style={{ textAlign: "center", marginTop: "-110px", marginBottom: "80px" }}>Gestión de Carreras</h1>
      <Button variant="primary" style={{ borderRadius: 16, marginBottom: 24 }} onClick={handleNueva}>
        Agregar Nueva Carrera
      </Button>
      {mensaje && (
        <div style={{ textAlign: "center", color: "#1976d2", fontWeight: 600, marginBottom: 16 }}>{mensaje}</div>
      )}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: 40 }}><Spinner animation="border" /></div>
      ) : (
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '0' }}>
          {carreras.map(c => (
            <div key={c.id} className="col-md-4 mb-4" style={{ minWidth: 320, maxWidth: 400 }}>
              <div className="card" style={{ borderColor: '#003366', borderRadius: 18, boxShadow: '0 2px 12px #00509e22', transform: 'scale(0.98)' }}>
                <div className="card-header" style={{ backgroundColor: '#00509e', color: '#fff', fontWeight: 700, fontSize: 20, borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
                  {c.nombre}
                </div>
                <div className="card-body" style={{ minHeight: 120, padding: '18px 18px 8px 18px' }}>
                  <div style={{ marginBottom: 8, color: '#00509e', fontWeight: 500, fontSize: 16 }}>
                    Turno: <span style={{ fontWeight: 400 }}>{c.turno || '-'}</span>
                  </div>
                  <div style={{ marginBottom: 8, color: '#00509e', fontWeight: 500, fontSize: 16 }}>
                    Cantidad de años: <span style={{ fontWeight: 400 }}>{c.cantidadAnios || '-'}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 8 }}>
                    {Array.from({ length: c.cantidadAnios || 0 }).map((_, i) => (
                      <Button
                        key={i}
                        variant="outline-primary"
                        size="sm"
                        style={{ borderColor: '#00509e', color: '#00509e', borderRadius: 12, fontWeight: 500, minWidth: 80 }}
                        // Aquí podrías navegar a la planilla de materias de ese año si lo deseas
                      >
                        {i + 1}° Año
                      </Button>
                    ))}
                  </div>
                  <Button variant="outline-primary" size="sm" style={{ borderRadius: 12, marginTop: 8 }} onClick={() => handleEditar(c)}>
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {carreras.length === 0 && (
            <div style={{ textAlign: "center", color: "#888", fontWeight: 500, fontSize: 18, marginTop: 32 }}>No hay carreras registradas.</div>
          )}
        </div>
      )}
      <NuevaCarreraModal
        show={showModal}
        onHide={() => { setShowModal(false); setEditCarrera(null); }}
        onSubmit={handleGuardar}
        {...(editCarrera ? {
          // Pre-cargar datos si se edita
          nombre: editCarrera.nombre,
          turno: editCarrera.turno,
          cantidadAnios: editCarrera.cantidadAnios,
          anios: editCarrera.anios
        } : {})}
      />
    </div>
  );
};

export default GestionCarreras;
