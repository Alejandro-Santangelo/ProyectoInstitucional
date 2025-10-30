
// import { useState } from 'react';
import type { FC } from 'react';

type MateriaNotas = {
  cuatri1: number | string;
  cuatri2: number | string;
  iefi: number | string;
  final: number | string;
  promedio: number | string;
  obs: string;
};

type MateriasPorAnio = Record<1 | 2 | 3 | 4, string[]>;

const materiasPorAnio: MateriasPorAnio = {
  1: ['Matemática', 'Lengua', 'Historia', 'Biología'],
  2: ['Física', 'Química', 'Literatura', 'Geografía'],
  3: ['Inglés', 'Educación Física', 'Informática', 'Arte'],
  4: ['Filosofía', 'Economía', 'Sociología', 'Ética'],
};

const notasEjemplo: Record<string, MateriaNotas> = {
  // 1° año
  'Matemática': { cuatri1: 8, cuatri2: 7, iefi: 7, final: 9, promedio: 8, obs: '' },
  'Lengua': { cuatri1: 9, cuatri2: 8, iefi: 8, final: 10, promedio: 8.75, obs: '' },
  'Historia': { cuatri1: 7, cuatri2: 8, iefi: 7, final: 8, promedio: 7.5, obs: '' },
  'Biología': { cuatri1: 8, cuatri2: 9, iefi: 8, final: 9, promedio: 8.5, obs: '' },
  // 2° año
  'Física': { cuatri1: 6, cuatri2: 7, iefi: 7, final: 8, promedio: 7, obs: 'Recuperó 1° cuatr.' },
  'Química': { cuatri1: 8, cuatri2: 8, iefi: 9, final: 9, promedio: 8.5, obs: '' },
  'Literatura': { cuatri1: 7, cuatri2: 6, iefi: 7, final: 7, promedio: 6.75, obs: 'Faltas justificadas' },
  'Geografía': { cuatri1: 9, cuatri2: 8, iefi: 8, final: 10, promedio: 8.75, obs: '' },
  // 3° año
  'Inglés': { cuatri1: 8, cuatri2: 9, iefi: 8, final: 9, promedio: 8.5, obs: '' },
  'Educación Física': { cuatri1: 10, cuatri2: 10, iefi: 10, final: 10, promedio: 10, obs: 'Excelente desempeño' },
  'Informática': { cuatri1: 7, cuatri2: 8, iefi: 8, final: 8, promedio: 7.75, obs: '' },
  'Arte': { cuatri1: 9, cuatri2: 8, iefi: 9, final: 9, promedio: 8.75, obs: 'Participó en muestra' },
  // 4° año
  'Filosofía': { cuatri1: 8, cuatri2: 7, iefi: 8, final: 8, promedio: 7.75, obs: '' },
  'Economía': { cuatri1: 7, cuatri2: 8, iefi: 7, final: 8, promedio: 7.5, obs: '' },
  'Sociología': { cuatri1: 9, cuatri2: 8, iefi: 9, final: 9, promedio: 8.75, obs: 'Trabajo destacado' },
  'Ética': { cuatri1: 8, cuatri2: 9, iefi: 8, final: 9, promedio: 8.5, obs: '' },
};

interface HistorialAcademicoModalProps {
  alumno: {
    nombre: string;
    apellido: string;
    matricula: string;
  } | null;
  show: boolean;
  onClose: () => void;
  anio: number;
}

const HistorialAcademicoModal: FC<HistorialAcademicoModalProps> = ({ alumno, show, onClose, anio }) => {
  const yearToShow = Math.max(1, Math.min(anio, 4));
  return show ? (
    <div className="modal-historial-bg" style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.45)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div className="modal-historial" style={{background:'#fff',borderRadius:24,padding:'38px 38px 28px 38px',width:'90vw',maxWidth:'1200px',maxHeight:'90vh',overflowY:'auto',boxShadow:'0 8px 32px rgba(60,60,120,0.18)',position:'relative'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
          <h2 style={{color:'#222',fontWeight:800,fontSize:'2.5em',margin:0}}>Historial Académico</h2>
          <button type="button" className="btn btn-outline-secondary" style={{minWidth:'100px',fontSize:'1.1em',padding:'8px 0',marginLeft:'24px',background:'#eaf1fb',color:'#3556b0',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:700,boxShadow:'0 2px 8px rgba(60,120,200,0.10)'}} onClick={onClose}>Cerrar</button>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
          <span style={{fontSize:'1.2em',color:'#4a6cf7'}}>
            Alumno: <strong>{alumno?.nombre} {alumno?.apellido}</strong> | Matrícula: <strong>{alumno?.matricula}</strong>
          </span>
          <div>
            <button style={{margin:'0 6px',padding:'7px 18px',fontSize:'1.1em',borderRadius:8,border:'2px solid #4a6cf7',background:'#eaf1fb',color:'#222',fontWeight:700,cursor:'pointer'}} disabled>{anio}° Año</button>
          </div>
        </div>
        <div style={{overflowX:'auto'}}>
          {[...Array(yearToShow)].map((_, idx) => {
            const year = yearToShow - idx as 1|2|3|4;
            return (
              <div key={year} style={{marginBottom:32}}>
                <h3 style={{textAlign:'left',color:'#3556b0',fontWeight:700,fontSize:'1.5em',marginBottom:12}}>{year}° Año</h3>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'1.15em',background:'#fff',boxShadow:'0 2px 16px rgba(60,120,200,0.10)',borderRadius:'12px'}}>
                  <thead style={{background:'#eaf1fb'}}>
                    <tr>
                      <th style={{padding:'12px',border:'1px solid #b6c2e1'}}>Materia</th>
                      <th style={{padding:'12px',border:'1px solid #b6c2e1'}}>1° Cuatrimestre</th>
                      <th style={{padding:'12px',border:'1px solid #b6c2e1'}}>2° Cuatrimestre</th>
                      <th style={{padding:'12px',border:'1px solid #b6c2e1'}}>IEFI</th>
                      <th style={{padding:'12px',border:'1px solid #b6c2e1'}}>Final</th>
                      <th style={{padding:'12px',border:'1px solid #b6c2e1'}}>Promedio</th>
                      <th style={{padding:'12px',border:'1px solid #b6c2e1'}}>Observaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materiasPorAnio[year].map(materia => (
                      <tr key={materia}>
                        <td style={{padding:'10px',border:'1px solid #b6c2e1'}}>{materia}</td>
                        <td style={{padding:'10px',border:'1px solid #b6c2e1'}}>{notasEjemplo[materia]?.cuatri1 ?? '-'}</td>
                        <td style={{padding:'10px',border:'1px solid #b6c2e1'}}>{notasEjemplo[materia]?.cuatri2 ?? '-'}</td>
                        <td style={{padding:'10px',border:'1px solid #b6c2e1'}}>{notasEjemplo[materia]?.iefi ?? '-'}</td>
                        <td style={{padding:'10px',border:'1px solid #b6c2e1'}}>{notasEjemplo[materia]?.final ?? '-'}</td>
                        <td style={{padding:'10px',border:'1px solid #b6c2e1'}}>{notasEjemplo[materia]?.promedio ?? '-'}</td>
                        <td style={{padding:'10px',border:'1px solid #b6c2e1'}}>{notasEjemplo[materia]?.obs ?? '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
        {/* Botón de cerrar movido arriba */}
      </div>
    </div>
  ) : null;
};

export default HistorialAcademicoModal;
