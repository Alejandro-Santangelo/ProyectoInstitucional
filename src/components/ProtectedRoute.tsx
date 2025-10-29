import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

type Props = {
  children: React.ReactElement
  allowedRoles?: string[]
}

const ProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const { user } = useAuth()

  if (!user) {
    // No autenticado: redirigir al home (login)
    return <Navigate to="/" replace />
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.rol)) {
    // Usuario autenticado pero sin rol permitido
    return <div style={{ padding: 40 }}>
      <h3>Acceso denegado</h3>
      <p>No tiene permisos para ver esta página.</p>
    </div>
  }

  return children
}

export default ProtectedRoute
