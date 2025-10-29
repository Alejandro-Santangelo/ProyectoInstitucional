import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import DashboardProfesor from './pages/DashboardProfesor'
import DashboardDirectora from './pages/DashboardDirectora'
import DashboardSecretaria from './pages/DashboardSecretaria'
import PlanillaAlumnos from './pages/PlanillaAlumnos'
import ProtectedRoute from './components/ProtectedRoute'
import AdminUsers from './pages/AdminUsers'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard-profesor" element={<ProtectedRoute><DashboardProfesor /></ProtectedRoute>} />
      <Route path="/dashboard-directora" element={<ProtectedRoute><DashboardDirectora /></ProtectedRoute>} />
      <Route path="/dashboard-secretaria" element={<ProtectedRoute><DashboardSecretaria /></ProtectedRoute>} />
      <Route path="/planilla/:carrera/:anio" element={<ProtectedRoute><PlanillaAlumnos /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={["Directora"]}><AdminUsers /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
