import DashboardCommon from './DashboardCommon'

const DashboardProfesor: React.FC = () => {
  // Mantener un nombre/rol por defecto en caso de acceder sin state
  return <DashboardCommon defaultNombre="Juan Pérez" defaultRol="Profesor" />
}

export default DashboardProfesor
