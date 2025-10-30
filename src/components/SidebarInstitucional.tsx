// ...existing code...

const SidebarInstitucional = () => {
  return (
    <aside className="sidebar-institucional">
      <h2 className="sidebar-title" style={{ textAlign: 'center', marginTop: '0px', position: 'absolute', top: '10px', left: '60%', transform: 'translateX(-50%)' }}>Otras gestoras</h2>
      <button className="sidebar-btn">Gestión Personal Docentes</button>
      <button className="sidebar-btn">Gestión Personal no Docente</button>
    </aside>
  );
};

export default SidebarInstitucional;
