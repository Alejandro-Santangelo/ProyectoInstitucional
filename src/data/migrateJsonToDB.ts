import db from './db';

import alumnosJson from '../../public/data/alumnos.json';
import personalDocentesJson from '../../public/data/personalDocentes.json';
import personalNoDocentesJson from '../../public/data/personalNoDocentes.json';
import usuariosJson from '../../public/data/usuarios.json';

export async function migrateJsonToDB() {
  // Eliminar el chequeo de migración para que siempre actualice los datos

  // Alumnos
  await db.table('alumnos').clear();
  await db.table('alumnos').bulkAdd(
    alumnosJson.map(a => ({
      id: a.idAlumno,
      ...a
    }))
  );

  // Personal Docente
  await db.table('personalDocentes').clear();
  await db.table('personalDocentes').bulkAdd(
    personalDocentesJson.map((d, idx) => ({
      id: idx + 1,
      ...d
    }))
  );

  // Personal No Docente
  await db.table('personalNoDocentes').clear();
  await db.table('personalNoDocentes').bulkAdd(
    personalNoDocentesJson.map((d, idx) => ({
      id: idx + 1,
      ...d
    }))
  );

  // Usuarios
  await db.table('usuarios').clear();
  await db.table('usuarios').bulkAdd(
    usuariosJson.map((u, idx) => ({
      id: idx + 1,
      ...u
    }))
  );
}
