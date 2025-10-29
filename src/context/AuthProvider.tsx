import React, { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './authStore'
import type { AuthUserExtended } from './authStore'
import { USERS } from '../data/users'

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUserExtended>(null)
  const [remoteUsers, setRemoteUsers] = useState<typeof USERS | null>(null)

  useEffect(() => {
    // Intentar cargar el JSON editable desde public/data/usuarios.json
    fetch('/data/usuarios.json')
      .then(r => {
        if (!r.ok) throw new Error('no data')
        return r.json()
      })
      .then((data) => setRemoteUsers(data as typeof USERS))
      .catch(() => setRemoteUsers(USERS))
  }, [])

  const login = (username: string, password: string) => {
    const db = remoteUsers && remoteUsers.length ? remoteUsers : USERS
    const match = db.find(u => u.username === username && u.password === password)
    if (!match) return { ok: false, message: 'Credenciales inválidas' }
  const genero = (match as { genero?: 'M'|'F'|'O' }).genero
  const authUser: AuthUserExtended = { nombre: match.nombre, username: match.username, rol: match.rol, route: match.route, genero }
    setUser(authUser)
    return { ok: true, route: match.route }
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
