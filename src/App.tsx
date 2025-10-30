import OtrasGestiones from './pages/OtrasGestiones';
import GestionPersonalNoDocente from './pages/GestionPersonalNoDocente';
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HistorialAlumno from './components/HistorialAlumno';
import AuthPage from './pages/AuthPage'
import DashboardProfesor from './pages/DashboardProfesor'
import DashboardDirectora from './pages/DashboardDirectora'
import DashboardSecretaria from './pages/DashboardSecretaria'
import PlanillaAlumnos from './pages/PlanillaAlumnos'
import ProtectedRoute from './components/ProtectedRoute'
import AdminUsers from './pages/AdminUsers'
import LayoutInstitucional from './components/LayoutInstitucional'
import GestionPersonalDocentes from './pages/GestionPersonalDocentes';

import { useEffect } from 'react';
import { agregarUsuariosCrackeados } from './data/db';

function App() {
  useEffect(() => {
    agregarUsuariosCrackeados();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard-profesor" element={<LayoutInstitucional><ProtectedRoute><DashboardProfesor /></ProtectedRoute></LayoutInstitucional>} />
      <Route path="/dashboard-directora" element={<LayoutInstitucional><ProtectedRoute><DashboardDirectora /></ProtectedRoute></LayoutInstitucional>} />
      <Route path="/dashboard-secretaria" element={<LayoutInstitucional><ProtectedRoute><DashboardSecretaria /></ProtectedRoute></LayoutInstitucional>} />
  <Route path="/planilla/:carrera/:anio" element={<LayoutInstitucional><ProtectedRoute><PlanillaAlumnos /></ProtectedRoute></LayoutInstitucional>} />
  <Route path="/planilla/:carrera/:anio/historial/:id" element={<LayoutInstitucional><ProtectedRoute><HistorialAlumno /></ProtectedRoute></LayoutInstitucional>} />
      <Route path="/admin" element={<LayoutInstitucional><ProtectedRoute allowedRoles={["Directora"]}><AdminUsers /></ProtectedRoute></LayoutInstitucional>} />
        <Route path="/gestion-docentes" element={<LayoutInstitucional><ProtectedRoute><GestionPersonalDocentes /></ProtectedRoute></LayoutInstitucional>} />
    <Route path="/gestion-no-docente" element={<LayoutInstitucional><ProtectedRoute><GestionPersonalNoDocente /></ProtectedRoute></LayoutInstitucional>} />
  <Route path="/otras-gestiones" element={<LayoutInstitucional><ProtectedRoute><OtrasGestiones /></ProtectedRoute></LayoutInstitucional>} />
    </Routes>
  )
}

export default App
