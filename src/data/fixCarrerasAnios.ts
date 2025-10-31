import db from './db';

async function fixCarrerasAnios() {
  const carreras = await db.table('carreras').toArray();
  for (const carrera of carreras) {
    if (!carrera.cantidadAnios || carrera.cantidadAnios < 4) {
      await db.table('carreras').update(carrera.id, { cantidadAnios: 4 });
    }
  }
  console.log('Todas las carreras ahora tienen cantidadAnios=4');
}

fixCarrerasAnios();