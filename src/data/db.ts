import Dexie from 'dexie';

export const db = new Dexie('InstitucionalDB');
db.version(1).stores({
  alumnos: 'id, nombre, apellido',
  personalDocentes: 'id, nombre, apellido',
  personalNoDocentes: 'id, nombre, apellido',
  usuarios: 'id, usuario, tipo',
});

export default db;