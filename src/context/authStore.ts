import { createContext } from 'react'

export type AuthUser = {
  nombre: string
  username: string
  rol: string
  route: string
} | null
 
// Añadir genero opcional al usuario en sesión
export type AuthUserExtended = {
  nombre: string
  username: string
  rol: string
  route: string
  genero?: 'M' | 'F' | 'O'
} | null

export type AuthContextType = {
  user: AuthUserExtended
  login: (username: string, password: string) => { ok: boolean; message?: string; route?: string }
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
