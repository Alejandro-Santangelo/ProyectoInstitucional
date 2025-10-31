import React from "react";
import type { NuevoDocenteData } from "./NuevoDocenteModal";
import type { NuevoNoDocenteData } from "./NuevoNoDocenteModal";

const SidebarInstitucional = () => {
  const [showListaDocentes, setShowListaDocentes] = React.useState(false);
  const [showListaNoDocentes, setShowListaNoDocentes] = React.useState(false);
  const [docentes, setDocentes] = React.useState<NuevoDocenteData[]>([]);
  const [noDocentes, setNoDocentes] = React.useState<NuevoNoDocenteData[]>([]);

  const handleListarDocentes = async () => {
    const lista = await import('../data/db').then(m => m.default.table('personalDocentes').toArray());
    setDocentes(lista);
    setShowListaDocentes(true);
  };
  const handleListarNoDocentes = async () => {
    const lista = await import('../data/db').then(m => m.default.table('personalNoDocentes').toArray());
    setNoDocentes(lista);
    setShowListaNoDocentes(true);
  };

  return (
    <aside className="sidebar-institucional">
      <h2 className="sidebar-title" style={{ textAlign: 'center', marginTop: '0px', position: 'absolute', top: '10px', left: '60%', transform: 'translateX(-50%)' }}>Otras gestoras</h2>
      <button className="sidebar-btn">Gestión Personal Docentes</button>
      <button className="sidebar-btn">Gestión Personal no Docente</button>
      <button className="sidebar-btn" style={{ background: '#007bff', color: '#fff', marginTop: 20 }} onClick={handleListarDocentes}>Listar todos los Docentes</button>
      <button className="sidebar-btn" style={{ background: '#007bff', color: '#fff', marginTop: 10 }} onClick={handleListarNoDocentes}>Listar todos los no Docentes</button>

      {/* Modal listado docentes */}
      {showListaDocentes && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'linear-gradient(120deg, #f0f8ff 60%, #e3eefe 100%)', borderRadius: 18, width: '700px', maxWidth: '95vw', padding: '32px 36px 18px 36px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ fontWeight: 700, color: '#00509e', fontSize: 22, margin: 0 }}>Listado de Docentes</h3>
              <button onClick={() => setShowListaDocentes(false)} style={{ background: 'none', border: 'none', fontSize: 22, color: '#00509e', cursor: 'pointer', fontWeight: 700 }}>×</button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {docentes.map((doc, idx) => (
                <li key={doc.dni || idx} style={{ marginBottom: 10, background: '#e3eefe', borderRadius: 12, padding: '10px 18px', fontWeight: 500, color: '#00509e', fontSize: 16 }}>
                  {doc.nombre} {doc.apellido} - DNI: {doc.dni}
                </li>
              ))}
              {docentes.length === 0 && <div style={{ color: '#00509e', fontWeight: 500, fontSize: 16, textAlign: 'center', marginTop: 24 }}>No hay docentes registrados.</div>}
            </ul>
          </div>
        </div>
      )}
      {/* Modal listado no docentes */}
      {showListaNoDocentes && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'linear-gradient(120deg, #f0f8ff 60%, #e3eefe 100%)', borderRadius: 18, width: '700px', maxWidth: '95vw', padding: '32px 36px 18px 36px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ fontWeight: 700, color: '#00509e', fontSize: 22, margin: 0 }}>Listado de No Docentes</h3>
              <button onClick={() => setShowListaNoDocentes(false)} style={{ background: 'none', border: 'none', fontSize: 22, color: '#00509e', cursor: 'pointer', fontWeight: 700 }}>×</button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {noDocentes.map((nd, idx) => (
                <li key={nd.dni || idx} style={{ marginBottom: 10, background: '#e3eefe', borderRadius: 12, padding: '10px 18px', fontWeight: 500, color: '#00509e', fontSize: 16 }}>
                  {nd.nombre} {nd.apellido} - DNI: {nd.dni}
                </li>
              ))}
              {noDocentes.length === 0 && <div style={{ color: '#00509e', fontWeight: 500, fontSize: 16, textAlign: 'center', marginTop: 24 }}>No hay personal no docente registrado.</div>}
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SidebarInstitucional;
