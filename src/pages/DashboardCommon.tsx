// ...existing code...
import NavbarInstitucional from '../components/NavbarInstitucional';
import ModalVerCarrera from '../components/ModalVerCarrera';
import type { Carrera } from '../pages/GestionCarreras';
import React, { useState, useEffect } from 'react';
import type { NuevoDocenteData } from '../components/NuevoDocenteModal';
import type { NuevoNoDocenteData } from '../components/NuevoNoDocenteModal';
import db from '../data/db';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ModalEditarPerfil from '../components/ModalEditarPerfil';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
// Removed unused imports and types

// Extiende el tipo de usuario para profesores
interface UsuarioProfesor {
  nombre: string;
  username: string;
  password: string;
  rol: string;
  route: string;
  genero?: 'M' | 'F' | 'O';
  foto?: string;
  mail?: string;
  telefono?: string;
  dni?: string;
  materia: string;
}

type Usuario = PerfilEditable | UsuarioProfesor;
// Tipo compatible con los datos requeridos por ModalEditarPerfil
type PerfilEditable = {
  nombre?: string;
  username?: string;
  password?: string;
  rol?: string;
  route?: string;
  genero?: 'M' | 'F' | 'O';
  foto?: string;
  mail?: string;
  telefono?: string;
  dni?: string;
  materia?: string;
  sector?: string;
};

interface DashboardCommonProps {
  defaultNombre?: string;
  defaultRol?: string;
}

const defaultData = {
  nombre: 'Usuario',
  carreras: [
    {
      id: 1,
      nombre: 'Diseño Gráfico',
      cantidadAnios: 4,
      anios: [
        { materias: [
          { nombre: 'Historia del Arte', modulosMensuales: 4, docenteId: 1, diasHorarios: [] },
          { nombre: 'Diseño I', modulosMensuales: 4, docenteId: 2, diasHorarios: [] },
          { nombre: 'Matemática', modulosMensuales: 3, docenteId: 3, diasHorarios: [] },
          { nombre: 'Comunicación Visual', modulosMensuales: 2, docenteId: 4, diasHorarios: [] },
          { nombre: 'Taller de Creatividad', modulosMensuales: 2, docenteId: 5, diasHorarios: [] }
        ] },
        { materias: [
          { nombre: 'Diseño II', modulosMensuales: 4, docenteId: 2, diasHorarios: [] },
          { nombre: 'Fotografía', modulosMensuales: 3, docenteId: 6, diasHorarios: [] },
          { nombre: 'Tipografía', modulosMensuales: 2, docenteId: 7, diasHorarios: [] },
          { nombre: 'Historia del Diseño', modulosMensuales: 2, docenteId: 1, diasHorarios: [] },
          { nombre: 'Taller de Color', modulosMensuales: 2, docenteId: 8, diasHorarios: [] }
        ] },
        { materias: [
          { nombre: 'Diseño III', modulosMensuales: 4, docenteId: 2, diasHorarios: [] },
          { nombre: 'Publicidad', modulosMensuales: 3, docenteId: 9, diasHorarios: [] },
          { nombre: 'Animación Digital', modulosMensuales: 2, docenteId: 10, diasHorarios: [] },
          { nombre: 'Gestión de Proyectos', modulosMensuales: 2, docenteId: 11, diasHorarios: [] },
          { nombre: 'Taller de Branding', modulosMensuales: 2, docenteId: 12, diasHorarios: [] }
        ] },
        { materias: [
          { nombre: 'Diseño IV', modulosMensuales: 4, docenteId: 2, diasHorarios: [] },
          { nombre: 'Packaging', modulosMensuales: 3, docenteId: 13, diasHorarios: [] },
          { nombre: 'Diseño Web', modulosMensuales: 2, docenteId: 14, diasHorarios: [] },
          { nombre: 'Ética Profesional', modulosMensuales: 2, docenteId: 15, diasHorarios: [] },
          { nombre: 'Taller Final', modulosMensuales: 2, docenteId: 16, diasHorarios: [] }
        ] }
      ]
    },
    {
      id: 2,
      nombre: 'Hotelería',
      cantidadAnios: 4,
      anios: [
        { materias: [
         { nombre: 'Introducción a la Hotelería', modulosMensuales: 3, docenteId: 17, diasHorarios: [] },
         { nombre: 'Matemática', modulosMensuales: 2, docenteId: 3, diasHorarios: [] },
         { nombre: 'Comunicación Oral y Escrita', modulosMensuales: 2, docenteId: 18, diasHorarios: [] },
         { nombre: 'Inglés I', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Taller de Recepción', modulosMensuales: 2, docenteId: 20, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Gestión Hotelera', modulosMensuales: 3, docenteId: 17, diasHorarios: [] },
         { nombre: 'Inglés II', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Contabilidad', modulosMensuales: 2, docenteId: 21, diasHorarios: [] },
         { nombre: 'Marketing Turístico', modulosMensuales: 2, docenteId: 22, diasHorarios: [] },
         { nombre: 'Taller de Reservas', modulosMensuales: 2, docenteId: 23, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Legislación Hotelera', modulosMensuales: 3, docenteId: 24, diasHorarios: [] },
         { nombre: 'Inglés III', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Gestión de Eventos', modulosMensuales: 2, docenteId: 25, diasHorarios: [] },
         { nombre: 'Taller de Housekeeping', modulosMensuales: 2, docenteId: 26, diasHorarios: [] },
         { nombre: 'Recursos Humanos', modulosMensuales: 2, docenteId: 27, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Práctica Profesional', modulosMensuales: 3, docenteId: 28, diasHorarios: [] },
         { nombre: 'Inglés IV', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Gestión de Calidad', modulosMensuales: 2, docenteId: 29, diasHorarios: [] },
         { nombre: 'Taller Final', modulosMensuales: 2, docenteId: 30, diasHorarios: [] },
         { nombre: 'Ética Profesional', modulosMensuales: 2, docenteId: 15, diasHorarios: [] },
        ] },
      ]
    },
    {
      id: 3,
      nombre: 'Marketing y Negocios Digitales',
      cantidadAnios: 4,
      anios: [
        { materias: [
         { nombre: 'Introducción al Marketing', modulosMensuales: 3, docenteId: 31, diasHorarios: [] },
         { nombre: 'Matemática', modulosMensuales: 2, docenteId: 3, diasHorarios: [] },
         { nombre: 'Comunicación Digital', modulosMensuales: 2, docenteId: 32, diasHorarios: [] },
         { nombre: 'Inglés I', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Taller de Creatividad', modulosMensuales: 2, docenteId: 5, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Publicidad Online', modulosMensuales: 3, docenteId: 33, diasHorarios: [] },
         { nombre: 'Inglés II', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'E-commerce', modulosMensuales: 2, docenteId: 34, diasHorarios: [] },
         { nombre: 'SEO y SEM', modulosMensuales: 2, docenteId: 35, diasHorarios: [] },
         { nombre: 'Taller de Campañas', modulosMensuales: 2, docenteId: 36, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Analítica Web', modulosMensuales: 3, docenteId: 37, diasHorarios: [] },
         { nombre: 'Inglés III', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Gestión de Redes Sociales', modulosMensuales: 2, docenteId: 38, diasHorarios: [] },
         { nombre: 'Taller de Branding', modulosMensuales: 2, docenteId: 12, diasHorarios: [] },
         { nombre: 'Gestión de Proyectos', modulosMensuales: 2, docenteId: 11, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Práctica Profesional', modulosMensuales: 3, docenteId: 39, diasHorarios: [] },
         { nombre: 'Inglés IV', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Gestión de Crisis', modulosMensuales: 2, docenteId: 40, diasHorarios: [] },
         { nombre: 'Taller Final', modulosMensuales: 2, docenteId: 16, diasHorarios: [] },
         { nombre: 'Ética Profesional', modulosMensuales: 2, docenteId: 15, diasHorarios: [] },
        ] },
      ]
    },
    {
      id: 4,
      nombre: 'Programación Full Stack',
      cantidadAnios: 4,
      anios: [
        { materias: [
         { nombre: 'Introducción a la Programación', modulosMensuales: 3, docenteId: 41, diasHorarios: [] },
         { nombre: 'Matemática', modulosMensuales: 2, docenteId: 3, diasHorarios: [] },
         { nombre: 'Algoritmos', modulosMensuales: 2, docenteId: 42, diasHorarios: [] },
         { nombre: 'Inglés Técnico I', modulosMensuales: 2, docenteId: 43, diasHorarios: [] },
         { nombre: 'Taller de Lógica', modulosMensuales: 2, docenteId: 44, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Programación I', modulosMensuales: 3, docenteId: 41, diasHorarios: [] },
         { nombre: 'Inglés Técnico II', modulosMensuales: 2, docenteId: 43, diasHorarios: [] },
         { nombre: 'Bases de Datos', modulosMensuales: 2, docenteId: 45, diasHorarios: [] },
         { nombre: 'Desarrollo Web I', modulosMensuales: 2, docenteId: 46, diasHorarios: [] },
         { nombre: 'Taller de Proyectos', modulosMensuales: 2, docenteId: 47, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Programación II', modulosMensuales: 3, docenteId: 41, diasHorarios: [] },
         { nombre: 'Inglés Técnico III', modulosMensuales: 2, docenteId: 43, diasHorarios: [] },
         { nombre: 'Desarrollo Web II', modulosMensuales: 2, docenteId: 46, diasHorarios: [] },
         { nombre: 'Taller de Testing', modulosMensuales: 2, docenteId: 48, diasHorarios: [] },
         { nombre: 'Gestión de Proyectos', modulosMensuales: 2, docenteId: 11, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Práctica Profesional', modulosMensuales: 3, docenteId: 49, diasHorarios: [] },
         { nombre: 'Inglés Técnico IV', modulosMensuales: 2, docenteId: 43, diasHorarios: [] },
         { nombre: 'Taller Final', modulosMensuales: 2, docenteId: 16, diasHorarios: [] },
         { nombre: 'Ética Profesional', modulosMensuales: 2, docenteId: 15, diasHorarios: [] },
         { nombre: 'Desarrollo Móvil', modulosMensuales: 2, docenteId: 50, diasHorarios: [] },
        ] },
      ]
    },
    {
      id: 5,
      nombre: 'Biología',
      cantidadAnios: 4,
      anios: [
        { materias: [
         { nombre: 'Biología General', modulosMensuales: 3, docenteId: 51, diasHorarios: [] },
         { nombre: 'Matemática', modulosMensuales: 2, docenteId: 3, diasHorarios: [] },
         { nombre: 'Química', modulosMensuales: 2, docenteId: 52, diasHorarios: [] },
         { nombre: 'Inglés I', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Taller de Laboratorio', modulosMensuales: 2, docenteId: 53, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Biología Celular', modulosMensuales: 3, docenteId: 54, diasHorarios: [] },
         { nombre: 'Inglés II', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Física', modulosMensuales: 2, docenteId: 55, diasHorarios: [] },
         { nombre: 'Taller de Genética', modulosMensuales: 2, docenteId: 56, diasHorarios: [] },
         { nombre: 'Química Orgánica', modulosMensuales: 2, docenteId: 57, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Biología Molecular', modulosMensuales: 3, docenteId: 58, diasHorarios: [] },
         { nombre: 'Inglés III', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Ecología', modulosMensuales: 2, docenteId: 59, diasHorarios: [] },
         { nombre: 'Taller de Microbiología', modulosMensuales: 2, docenteId: 60, diasHorarios: [] },
         { nombre: 'Fisiología', modulosMensuales: 2, docenteId: 61, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Práctica Profesional', modulosMensuales: 3, docenteId: 62, diasHorarios: [] },
         { nombre: 'Inglés IV', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Taller Final', modulosMensuales: 2, docenteId: 16, diasHorarios: [] },
         { nombre: 'Ética Profesional', modulosMensuales: 2, docenteId: 15, diasHorarios: [] },
         { nombre: 'Genética Humana', modulosMensuales: 2, docenteId: 63, diasHorarios: [] },
        ] },
      ]
    },
    {
      id: 6,
      nombre: 'Licenciatura en Administración de Empresas',
      cantidadAnios: 4,
      anios: [
        { materias: [
         { nombre: 'Introducción a la Administración', modulosMensuales: 3, docenteId: 64, diasHorarios: [] },
         { nombre: 'Matemática', modulosMensuales: 2, docenteId: 3, diasHorarios: [] },
         { nombre: 'Contabilidad I', modulosMensuales: 2, docenteId: 21, diasHorarios: [] },
         { nombre: 'Inglés I', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Taller de Liderazgo', modulosMensuales: 2, docenteId: 65, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Administración II', modulosMensuales: 3, docenteId: 64, diasHorarios: [] },
         { nombre: 'Inglés II', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Contabilidad II', modulosMensuales: 2, docenteId: 21, diasHorarios: [] },
         { nombre: 'Marketing', modulosMensuales: 2, docenteId: 31, diasHorarios: [] },
         { nombre: 'Taller de Negociación', modulosMensuales: 2, docenteId: 66, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Administración III', modulosMensuales: 3, docenteId: 64, diasHorarios: [] },
         { nombre: 'Inglés III', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Gestión de Recursos Humanos', modulosMensuales: 2, docenteId: 27, diasHorarios: [] },
         { nombre: 'Taller de Proyectos', modulosMensuales: 2, docenteId: 47, diasHorarios: [] },
         { nombre: 'Gestión Financiera', modulosMensuales: 2, docenteId: 67, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Práctica Profesional', modulosMensuales: 3, docenteId: 68, diasHorarios: [] },
         { nombre: 'Inglés IV', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Taller Final', modulosMensuales: 2, docenteId: 16, diasHorarios: [] },
         { nombre: 'Ética Profesional', modulosMensuales: 2, docenteId: 15, diasHorarios: [] },
         { nombre: 'Gestión de Empresas', modulosMensuales: 2, docenteId: 69, diasHorarios: [] },
        ] },
      ]
    },
    {
      id: 7,
      nombre: 'Licenciatura en Turismo',
      cantidadAnios: 4,
      anios: [
        { materias: [
         { nombre: 'Introducción al Turismo', modulosMensuales: 3, docenteId: 70, diasHorarios: [] },
         { nombre: 'Matemática', modulosMensuales: 2, docenteId: 3, diasHorarios: [] },
         { nombre: 'Geografía Turística', modulosMensuales: 2, docenteId: 71, diasHorarios: [] },
         { nombre: 'Inglés I', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Taller de Recepción', modulosMensuales: 2, docenteId: 20, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Gestión Turística', modulosMensuales: 3, docenteId: 70, diasHorarios: [] },
         { nombre: 'Inglés II', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Marketing Turístico', modulosMensuales: 2, docenteId: 22, diasHorarios: [] },
         { nombre: 'Taller de Reservas', modulosMensuales: 2, docenteId: 23, diasHorarios: [] },
         { nombre: 'Geografía Argentina', modulosMensuales: 2, docenteId: 72, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Legislación Turística', modulosMensuales: 3, docenteId: 73, diasHorarios: [] },
         { nombre: 'Inglés III', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Gestión de Eventos', modulosMensuales: 2, docenteId: 25, diasHorarios: [] },
         { nombre: 'Taller de Housekeeping', modulosMensuales: 2, docenteId: 26, diasHorarios: [] },
         { nombre: 'Geografía Mundial', modulosMensuales: 2, docenteId: 74, diasHorarios: [] },
        ] },
        { materias: [
         { nombre: 'Práctica Profesional', modulosMensuales: 3, docenteId: 75, diasHorarios: [] },
         { nombre: 'Inglés IV', modulosMensuales: 2, docenteId: 19, diasHorarios: [] },
         { nombre: 'Taller Final', modulosMensuales: 2, docenteId: 16, diasHorarios: [] },
         { nombre: 'Ética Profesional', modulosMensuales: 2, docenteId: 15, diasHorarios: [] },
         { nombre: 'Gestión de Destinos', modulosMensuales: 2, docenteId: 76, diasHorarios: [] },
        ] },
      ]
    },
  ],
};

const DashboardCommon: React.FC<DashboardCommonProps> = ({ defaultNombre = 'Usuario', defaultRol = 'Usuario' }) => {
  // Normaliza las carreras de ejemplo para que todas las materias tengan diasHorarios: []
  const carrerasEjemploNormalizadas = defaultData.carreras.map(carrera => ({
    ...carrera,
    id: typeof carrera.id !== 'undefined' ? carrera.id : Math.random(), // id ficticio para carreras de ejemplo
    anios: (carrera.anios || Array.from({ length: carrera.cantidadAnios || 4 }, () => ({ materias: [] })))
      .map(anio => ({
        materias: (anio.materias || []).map(m => ({
          ...m,
          diasHorarios: Array.isArray(m.diasHorarios) ? m.diasHorarios : []
        }))
      }))
  }));
  // Corrección automática de cantidadAnios en carreras
  useEffect(() => {
    const fixCarrerasAnios = async () => {
      const carreras = await db.table('carreras').toArray();
      for (const carrera of carreras) {
        if (!carrera.cantidadAnios || carrera.cantidadAnios < 4) {
          await db.table('carreras').update(carrera.id, { cantidadAnios: 4 });
        }
      }
    };
    fixCarrerasAnios();
  }, []);
  // ...existing code...
  // Guardar cambios de edición de carrera
  // Recibe NuevaCarreraData y adapta el id

  // Confirmar eliminación de carrera
  const confirmarEliminarCarrera = async () => {
    if (!carreraEliminando) return;
    await db.table('carreras').delete(carreraEliminando.id);
    setMensajeCarrera('Carrera eliminada correctamente.');
    setShowConfirmEliminar(false);
    setCarreraEliminando(null);
    setTimeout(() => setMensajeCarrera(''), 2500);
  };
  const [showListaDocentes, setShowListaDocentes] = useState(false);
  const [showListaNoDocentes, setShowListaNoDocentes] = useState(false);
  const [docentes, setDocentes] = useState<NuevoDocenteData[]>([]);
  const [noDocentes, setNoDocentes] = useState<NuevoNoDocenteData[]>([]);
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [showNuevaCarrera, setShowNuevaCarrera] = useState(false);
  const [loadingCarreras, setLoadingCarreras] = useState(true);
  const [showEditarCarrera, setShowEditarCarrera] = useState(false);
  const [carreraEditando, setCarreraEditando] = useState<Carrera | null>(null);
  const [showConfirmEliminar, setShowConfirmEliminar] = useState(false);
  const [carreraEliminando, setCarreraEliminando] = useState<Carrera | null>(null);
  const [mensajeCarrera, setMensajeCarrera] = useState<string>("");
  const { user } = useAuth() as { user: Usuario | null };
  const navigate = useNavigate();
  // Cargar carreras reales desde Dexie.js
  useEffect(() => {
    const cargar = async () => {
      setLoadingCarreras(true);
      const lista = await db.table("carreras").toArray();
      setCarreras(lista as Carrera[]);
      setLoadingCarreras(false);
    };
    cargar();
  }, [showEditarCarrera, showConfirmEliminar, showNuevaCarrera]);
  // Función para agregar una carrera nueva y persistirla
  const handleAgregarCarrera = async (nuevaCarrera: Carrera) => {
    // Generar id único
    const id = Date.now();
    await db.table('carreras').add({ ...nuevaCarrera, id });
    setMensajeCarrera('Carrera agregada correctamente.');
    setShowNuevaCarrera(false);
    setTimeout(() => setMensajeCarrera(''), 2500);
  };
  // Función para editar carrera
  const handleEditarCarrera = (carrera: Carrera) => {
    setCarreraEditando(carrera);
    setShowEditarCarrera(true);
  };

  // Función para eliminar carrera (mostrar confirmación)
  const handleEliminarCarrera = (carrera: Carrera) => {
    setCarreraEliminando(carrera);
    setShowConfirmEliminar(true);
  };
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  // Inicializar datosPerfil con los datos del usuario, evitando null
  const [datosPerfil, setDatosPerfil] = useState<PerfilEditable>(user ? { ...user } : {});

  const handleAnioClick = (carrera: string, anio: number) => {
    navigate(`/planilla/${encodeURIComponent(carrera)}/${anio}`);
  }

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Actualiza la foto de perfil localmente si se edita en el modal
  const handleSavePerfil = async (datos: PerfilEditable) => {
    setDatosPerfil(datos);
    if (datos.foto) setProfilePic(datos.foto);
    // Actualizar usuario en IndexedDB por username
    if (user && user.username) {
      const dbUser = await db.table('usuarios').where('username').equals(user.username).first();
      if (dbUser && dbUser.id) {
        await db.table('usuarios').put({ ...dbUser, ...datos, id: dbUser.id });
      }
    }
    setShowModal(false);
  }

  // Filtrado para docentes
  // Eliminado materiasFiltradas: variable no usada

  // Estado para modal ver carrera
  const [showVerCarrera, setShowVerCarrera] = useState(false);
  const [carreraSeleccionada, setCarreraSeleccionada] = useState<Carrera | null>(null);

  const handleVerCarrera = (carrera: Carrera) => {
    setCarreraSeleccionada(carrera);
    setShowVerCarrera(true);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <div
          style={{
            backgroundColor: '#00509e',
            color: '#ffffff',
            height: '35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            marginTop: '0',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
          }}
        >
          <NavbarInstitucional />
        </div>

        <div style={{ display: 'flex', flex: 1 }}>
          <div
            style={{
              width: isSidebarCollapsed ? '60px' : '200px',
              backgroundColor: '#003366',
              color: '#ffffff',
              transition: 'width 0.3s ease',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: isSidebarCollapsed ? 'center' : 'flex-start',
            }}
          >
            <div style={{ padding: '10px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              {!isSidebarCollapsed && <span style={{ flex: 1 }}>Opciones</span>}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                {isSidebarCollapsed ? '▶' : '◀'}
              </button>
            </div>
            {!isSidebarCollapsed && (
              <ul style={{ listStyleType: 'none', padding: '0 20px', width: '100%' }}>
                <li style={{ marginBottom: '30px' }}>
                  <Button
                    variant="link"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      backgroundColor: '#007bff',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                    onClick={() => navigate('/gestion-docentes')}
                  >
                    Gestión Personal Docentes
                  </Button>
                </li>
                <li style={{ marginBottom: '30px' }}>
                  <Button
                    variant="link"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      backgroundColor: '#007bff',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                    onClick={() => navigate('/gestion-no-docente')}
                  >
                    Gestión Personal no Docente
                  </Button>
                </li>
                <li style={{ marginBottom: '30px' }}>
                  <Button
                    variant="link"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      backgroundColor: '#007bff',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                    onClick={() => navigate('/otras-gestiones')}
                  >
                    Agregar Carreras y otras Gestiones
                  </Button>
                </li>
                <li style={{ marginBottom: '30px' }}>
                  <Button
                    variant="link"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      backgroundColor: '#007bff',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                    onClick={async () => {
                      const db = (await import('../data/db')).default;
                      const lista = await db.table('personalDocentes').toArray();
                      setShowListaDocentes(true);
                      setDocentes(lista);
                    }}
                  >
                    Listar todos los Docentes
                  </Button>
                </li>
                <li style={{ marginBottom: '30px' }}>
                  <Button
                    variant="link"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      backgroundColor: '#007bff',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                    onClick={async () => {
                      const db = (await import('../data/db')).default;
                      const lista = await db.table('personalNoDocentes').toArray();
                      setShowListaNoDocentes(true);
                      setNoDocentes(lista);
                    }}
                  >
                    Listar todos los no Docentes
                  </Button>
                </li>
      {/* Modal listado docentes */}
      {showListaDocentes && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'linear-gradient(120deg, #f0f8ff 60%, #e3eefe 100%)', borderRadius: 18, width: '700px', maxWidth: '95vw', padding: '32px 36px 18px 36px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ fontWeight: 700, color: '#00509e', fontSize: 22, margin: 0 }}>Listado de Docentes</h3>
              <button onClick={() => setShowListaDocentes(false)} style={{ background: 'none', border: 'none', fontSize: 22, color: '#00509e', cursor: 'pointer', fontWeight: 700 }}>×</button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {docentes.map((doc, idx) => (
                <li key={doc.dni || idx} style={{ marginBottom: 10, background: '#e3eefe', borderRadius: 12, padding: '10px 18px', fontWeight: 500, color: '#00509e', fontSize: 16 }}>
                  {doc.nombre} {doc.apellido} - DNI: {doc.dni}
                </li>
              ))}
              {docentes.length === 0 && <div style={{ color: '#00509e', fontWeight: 500, fontSize: 16, textAlign: 'center', marginTop: 24 }}>No hay docentes registrados.</div>}
            </ul>
          </div>
        </div>
      )}
      {/* Modal listado no docentes */}
      {showListaNoDocentes && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'linear-gradient(120deg, #f0f8ff 60%, #e3eefe 100%)', borderRadius: 18, width: '700px', maxWidth: '95vw', padding: '32px 36px 18px 36px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ fontWeight: 700, color: '#00509e', fontSize: 22, margin: 0 }}>Listado de No Docentes</h3>
              <button onClick={() => setShowListaNoDocentes(false)} style={{ background: 'none', border: 'none', fontSize: 22, color: '#00509e', cursor: 'pointer', fontWeight: 700 }}>×</button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {noDocentes.map((nd, idx) => (
                <li key={nd.dni || idx} style={{ marginBottom: 10, background: '#e3eefe', borderRadius: 12, padding: '10px 18px', fontWeight: 500, color: '#00509e', fontSize: 16 }}>
                  {nd.nombre} {nd.apellido} - DNI: {nd.dni}
                </li>
              ))}
              {noDocentes.length === 0 && <div style={{ color: '#00509e', fontWeight: 500, fontSize: 16, textAlign: 'center', marginTop: 24 }}>No hay personal no docente registrado.</div>}
            </ul>
          </div>
        </div>
      )}
              </ul>
            )}
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: '#f0f8ff',
              padding: '20px',
              overflowY: 'auto',
            }}
          >
            <Container>
              <Row>
                <Col md={8} className="mb-4 text-start d-flex flex-column justify-content-start">
                  <Button
                    variant="danger"
                    className="btn-volver btn-danger-important"
                    style={{
                      fontSize: '0.7rem',
                      padding: '3px 8px',
                      marginTop: '0',
                      alignSelf: 'flex-start',
                    }}
                    onClick={() => navigate('/')}
                  >
                    Cerrar Sesión
                  </Button>
                  <h2 style={{ marginBottom: '0.5rem', color: '#003366' }}>
                    {user?.genero === 'F'
                      ? 'Bienvenida'
                      : user?.genero === 'M'
                      ? 'Bienvenido'
                      : 'Bienvenido/a'}
                    {`, ${user?.nombre || defaultNombre}`}
                  </h2>
                  <p style={{ marginBottom: 0, color: '#003366' }}>
                    Con tu Rol de: <strong style={{ fontSize: '1.15em' }}>{defaultRol}</strong>
                  </p>
                  <h4 style={{
                    margin: '0px 0 0 70%',
                    color: '#222',
                    fontWeight: 700,
                    fontSize: '2.2em',
                    transform: 'translateX(-50%)',
                    width: 'max-content',
                    textAlign: 'center',
                  }}>Gestión de Alumnos</h4>
                </Col>
                <Col md={4} className="mb-4 d-flex justify-content-end gap-3">
                  <Button
                    variant="link"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      backgroundColor: '#007bff', // Celeste más intenso
                      padding: '10px',
                      borderRadius: '50%', // Hacer el botón redondo
                      width: '100px', // Ajustar el ancho para mantener la forma redonda
                      height: '100px', // Ajustar la altura para mantener la forma redonda
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                    onClick={handleShowModal}
                  >
                    {profilePic ? (
                      <img src={profilePic} alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      'Opciones personales'
                    )}
                  </Button>
                </Col>
              </Row>
              <Row>
                {/* Renderizar carreras reales con botones Ver, Editar y Eliminar */}
                {mensajeCarrera && (
                  <div style={{ textAlign: 'center', color: '#1976d2', fontWeight: 600, marginBottom: 16 }}>{mensajeCarrera}</div>
                )}
                {loadingCarreras ? (
                  <div style={{ textAlign: "center", marginTop: 40 }}><span>Cargando carreras...</span></div>
                ) : (
                  [...carreras, ...carrerasEjemploNormalizadas].map((carrera, idx) => (
                    <Col md={4} key={carrera.id || idx} className="mb-4">
                      <Card className="card" style={{ borderColor: '#003366' }}>
                        <Card.Header style={{ backgroundColor: '#00509e', color: '#ffffff', paddingRight: 8 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <span>{carrera.nombre}</span>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginTop: 8 }}>
                            <Button variant="info" size="sm" style={{ borderRadius: 6, fontSize: '0.72em', padding: '1px 6px', minWidth: 0, lineHeight: 1, width: '100%' }} onClick={() => handleVerCarrera({ ...carrera, id: carrera.id })}>Ver</Button>
                            <Button variant="primary" size="sm" style={{ borderRadius: 6, fontSize: '0.72em', padding: '1px 6px', minWidth: 0, lineHeight: 1, width: '100%' }} onClick={() => handleEditarCarrera({ ...carrera, id: carrera.id })}>Editar</Button>
                            <Button variant="danger" size="sm" style={{ borderRadius: 6, fontSize: '0.72em', padding: '1px 6px', minWidth: 0, lineHeight: 1, width: '100%' }} onClick={() => handleEliminarCarrera({ ...carrera, id: carrera.id })}>Eliminar</Button>
                            <div></div>
                          </div>
                        </Card.Header>
                        <Card.Body style={{ minHeight: '150px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div className="row">
                            <div className="col-12 mb-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                              {Array.from({ length: carrera.cantidadAnios || 4 }).map((_, i) => (
                                <Button
                                  key={i}
                                  className="btn-anio"
                                  variant="outline-primary"
                                  style={{ borderColor: '#00509e', color: '#00509e', whiteSpace: 'nowrap', borderRadius: 12, minWidth: 80, fontSize: '0.95em', padding: '2px 10px', width: '100%' }}
                                  onClick={() => handleAnioClick(carrera.nombre, i + 1)}
                                >
                                  {i + 1}° Año
                                </Button>
                              ))}
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                )}
      {/* Botón para agregar carrera nueva */}
      <div style={{ textAlign: 'center', margin: '24px 0' }}>
        <Button variant="success" style={{ borderRadius: 16, fontWeight: 600, fontSize: '1.1em', padding: '8px 24px' }} onClick={() => setShowNuevaCarrera(true)}>
          Agregar nueva carrera
        </Button>
      </div>
      {/* Modal para agregar carrera nueva */}
      {showNuevaCarrera && (
        <ModalVerCarrera
          show={showNuevaCarrera}
          onHide={() => setShowNuevaCarrera(false)}
          carrera={{ id: Date.now(), nombre: '', cantidadAnios: 4, anios: Array.from({ length: 4 }, () => ({ materias: [] })) }}
          editable={true}
          onSave={handleAgregarCarrera}
        />
      )}
      {/* Modal de edición de carrera */}
      {/* Modal planilla editable solo para flujo visual */}
      {showEditarCarrera && (
        <ModalVerCarrera
          show={showEditarCarrera}
          onHide={() => { setShowEditarCarrera(false); setCarreraEditando(null); }}
          carrera={carreraEditando}
          editable={true}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      {showConfirmEliminar && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'linear-gradient(120deg, #f0f8ff 60%, #e3eefe 100%)', borderRadius: 18, width: '400px', maxWidth: '95vw', padding: '32px 36px 18px 36px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
            <h4 style={{ fontWeight: 700, color: '#00509e', fontSize: 20, marginBottom: 18 }}>¿Eliminar carrera?</h4>
            <div style={{ color: '#222', fontWeight: 500, marginBottom: 24 }}>
              ¿Está seguro que desea eliminar la carrera <span style={{ color: '#00509e', fontWeight: 700 }}>{carreraEliminando?.nombre}</span>?
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <Button variant="secondary" onClick={() => { setShowConfirmEliminar(false); setCarreraEliminando(null); }} style={{ borderRadius: 16 }}>Cancelar</Button>
              <Button variant="danger" onClick={confirmarEliminarCarrera} style={{ borderRadius: 16 }}>Eliminar</Button>
            </div>
          </div>
        </div>
      )}
              </Row>
            </Container>
          </div>
        </div>
      </div>

      <ModalEditarPerfil
        show={showModal}
        onHide={handleCloseModal}
        datos={datosPerfil}
        onSave={handleSavePerfil}
      />
      <ModalVerCarrera show={showVerCarrera} onHide={() => setShowVerCarrera(false)} carrera={carreraSeleccionada} />
    </>
  );
};

export default DashboardCommon;
