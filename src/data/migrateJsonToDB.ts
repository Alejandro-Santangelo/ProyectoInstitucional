import db from './db';

import alumnosJson from '../data/alumnos.json';
import personalDocentesJson from '../data/personalDocentes.json';
import personalNoDocentesJson from '../data/personalNoDocentes.json';
import usuariosJson from '../data/usuarios.json';

export async function migrateJsonToDB() {
  // Solo migrar si la tabla está vacía
  if ((await db.table('alumnos').count()) === 0) {
    await db.table('alumnos').bulkAdd(
      alumnosJson.map(a => ({
        id: a.idAlumno,
        ...a
      }))
    );
  }
  if ((await db.table('personalDocentes').count()) === 0) {
    await db.table('personalDocentes').bulkAdd(
      personalDocentesJson.map((d, idx) => ({
        id: idx + 1,
        ...d
      }))
    );
  }
  if ((await db.table('personalNoDocentes').count()) === 0) {
    await db.table('personalNoDocentes').bulkAdd(
      personalNoDocentesJson.map((d, idx) => ({
        id: idx + 1,
        nombre: d.nombre,
        dni: d.dni || '',
        mail: d.mail || '',
        telefono: d.telefono || '',
        cargos: [
          {
            cargo: d.sector || '',
            dias: [],
            turno: '',
            mediosModulos: 0
          }
        ]
      }))
    );
  }
  if ((await db.table('usuarios').count()) === 0) {
    await db.table('usuarios').bulkAdd(
      usuariosJson.map((u, idx) => ({
        id: idx + 1,
        ...u
      }))
    );
  }
}
