import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import DashboardProfesor from './pages/DashboardProfesor'
import PlanillaAlumnos from './pages/PlanillaAlumnos'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard-profesor" element={<DashboardProfesor />} />
      <Route path="/planilla/:carrera/:anio" element={<PlanillaAlumnos />} />
    </Routes>
  )
}

export default App
