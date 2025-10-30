import DashboardCommon from './DashboardCommon'


const DashboardProfesor: React.FC = () => {
  // El nombre y rol se obtienen del contexto de autenticación
  return <DashboardCommon defaultRol="Profesor" />
}

export default DashboardProfesor
