import React, { useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './authStore'
import type { AuthUserExtended, AuthContextType } from './authStore'
// import { USERS } from '../data/users' // Eliminado porque no se usa
import db from '../data/db';
import personalDocentes from '../data/personalDocentes.json';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUserExtended>(null)

    // Eliminado código de remoteUsers, ya no se usa
  
  const login: AuthContextType["login"] = async (username: string, password: string) => {
    const dbUser = await db.table('usuarios').where('username').equals(username).first();
    if (!dbUser || dbUser.password !== password) {
      return { ok: false, message: 'Credenciales inválidas' };
    }
    const genero = dbUser.genero;
    let materia: string | undefined = undefined;
    if (dbUser.rol === 'Profesor') {
      const docente = (personalDocentes as Array<{ nombre: string; materia: string }>).find(d => d.nombre === dbUser.nombre);
      if (docente) materia = docente.materia;
    }
    const authUser: AuthUserExtended & { materia?: string } = {
      nombre: dbUser.nombre,
      username: dbUser.username,
      rol: dbUser.rol,
      route: dbUser.route,
      genero,
      ...(materia ? { materia } : {})
    };
    setUser(authUser);
    return { ok: true, route: dbUser.route };
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
