import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Materia {
  nombre: string;
  nota: number | null;
  notaIefi?: number | null;
  notaFinal?: number | null;
}

interface HistorialAlumnoProps {
  alumnoId?: string;
  carrera?: string;
  anio?: string;
}

const HistorialAlumno: React.FC<HistorialAlumnoProps> = ({ alumnoId, carrera, anio }) => {
  // Si no se pasan por props, se obtienen de la URL
  const params = useParams();
  const id = alumnoId || params.id;
  const carreraParam = carrera || params.carrera;
  const anioParam = anio || params.anio;

  const [materias, setMaterias] = useState<Materia[]>([]);
  const [alumno, setAlumno] = useState<{ nombre: string; idAlumno?: number | string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/data/materiasNotas.json');
        const data: Array<{
          idAlumno: number;
          carrera: string;
          anio: number;
          materias: Materia[];
        }> = await res.json();
        // Buscar el registro correspondiente al alumno, carrera y año
        const historial = data.find((h) =>
          String(h.idAlumno) === String(id) &&
          h.carrera === carreraParam &&
          String(h.anio) === String(anioParam)
        );
        setMaterias(historial?.materias || []);
        // Opcional: buscar nombre del alumno desde alumnos.json
        const resAlu = await fetch('/data/alumnos.json');
        const alumnos: Array<{ idAlumno: number; nombre: string }> = await resAlu.json();
        const alumnoData = alumnos.find((a) => String(a.idAlumno) === String(id));
        setAlumno(alumnoData || { nombre: 'Alumno desconocido', idAlumno: id });
      } catch {
        setMaterias([]);
        setAlumno({ nombre: 'Alumno desconocido', idAlumno: id });
      }
    }
    fetchData();
  }, [id, carreraParam, anioParam]);

  return (
    <div>
      <h2>Historial académico de {alumno?.nombre}</h2>
      <p>Carrera: {carreraParam} | Año: {anioParam}</p>
      <table>
        <thead>
          <tr>
            <th>Materia</th>
            <th>Nota</th>
            <th>IEFI</th>
            <th>Final</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((mat, idx) => (
            <tr key={idx}>
              <td>{mat.nombre}</td>
              <td>{mat.nota ?? '-'}</td>
              <td>{mat.notaIefi ?? '-'}</td>
              <td>{mat.notaFinal ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialAlumno;
