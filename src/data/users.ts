export type UserRecord = {
  nombre: string
  username: string
  password: string
  route: string
  rol: string
  genero?: 'M' | 'F' | 'O'
}

export const USERS: UserRecord[] = [
  { nombre: 'Cristina Batista', username: 'Cristina', password: '1111', route: '/dashboard-directora', rol: 'Directora', genero: 'F' },
  { nombre: 'Narciso Perez', username: 'Narciso', password: '2222', route: '/dashboard-profesor', rol: 'Profesor', genero: 'M' },
  { nombre: 'Esmeralda Nieves', username: 'Esmeralda', password: '3333', route: '/dashboard-secretaria', rol: 'Secretaria', genero: 'F' }
]
