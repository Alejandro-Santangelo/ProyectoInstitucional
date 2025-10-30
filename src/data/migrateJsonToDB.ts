import db from './db';

import alumnosJson from '../../public/data/alumnos.json';
import personalDocentesJson from '../../public/data/personalDocentes.json';
import personalNoDocentesJson from '../../public/data/personalNoDocentes.json';
import usuariosJson from '../../public/data/usuarios.json';

// Verifica si ya se migraron los datos
const MIGRATION_KEY = 'institucional_migracion_completa';

export async function migrateJsonToDB() {
  if (localStorage.getItem(MIGRATION_KEY)) return;

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

  localStorage.setItem(MIGRATION_KEY, 'true');
}
