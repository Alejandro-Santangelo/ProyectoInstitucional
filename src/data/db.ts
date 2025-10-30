export async function agregarUsuariosCrackeados() {
  await db.table('usuarios').bulkAdd([
    {
      nombre: 'Cristina Batista',
      username: 'Cristina',
      password: '1111',
      route: '/dashboard-directora',
      rol: 'Directora',
      genero: 'F'
    },
    {
      nombre: 'Narciso Perez',
      username: 'Narciso',
      password: '2222',
      route: '/dashboard-profesor',
      rol: 'Profesor',
      genero: 'M'
    },
    {
      nombre: 'Esmeralda Nieves',
      username: 'Esmeralda',
      password: '3333',
      route: '/dashboard-secretaria',
      rol: 'Secretaria',
      genero: 'F'
    }
  ]);
}
import Dexie from 'dexie';

export const db = new Dexie('InstitucionalDB');
db.version(1).stores({
  alumnos: 'id, nombre, apellido',
  personalDocentes: 'id, nombre, apellido, materias',
  personalNoDocentes: 'id, nombre, apellido, cargos',
  usuarios: 'id, usuario, tipo',
  carreras: '++id, nombre, turno, cantidadAnios', // id autoincremental
});

export default db;