# 📚 Documentación Técnica - Sistema de Gestión Institucional

## Descripción General

Este sistema es una aplicación web 100% reactiva desarrollada con React, TypeScript, Vite y Bootstrap. Permite la gestión académica institucional, con autenticación, roles, dashboards y planillas de alumnos, lista para integrarse con backend y base de datos.

## Funcionalidades Principales

- **Autenticación**: Login y registro de usuarios con roles (Profesor, Administrador, Directivo).
- **Dashboard de Profesor**: Visualización de carreras, años y acceso a planillas de alumnos.
- **Planilla de Alumnos**: Visualización, edición, búsqueda y gestión de alumnos por carrera y año.
- **Responsive Design**: Adaptable a cualquier dispositivo.
- **Estilos institucionales**: Navbar con logos, gradientes y diseño moderno.
- **Buscador avanzado**: Filtrado de alumnos por cualquier campo.
- **Accesibilidad**: Navegación con teclado y foco automático en tablas.

## Estructura de Carpetas

```
src/
├── App.tsx                # Rutas y navegación principal
├── main.tsx               # Punto de entrada
├── index.css              # Estilos globales y variables
├── components/
│   └── NavbarInstitucional.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── AuthPage.tsx
│   ├── DashboardProfesor.tsx
│   └── PlanillaAlumnos.tsx
├── data/
│   └── alumnosEjemplo.ts  # Datos simulados para pruebas
└── assets/                # Imágenes y recursos
```

## Flujo de Usuario

1. **Inicio**: Página institucional con acceso a login.
2. **Login**: Acceso por rol (simulado como Profesor por defecto).
3. **Dashboard**: Selección de carrera y año.
4. **Planilla**: Visualización y gestión de alumnos, búsqueda y edición.

## Integración con Backend

- Los puntos de conexión están listos para recibir datos reales vía API REST.
- Los datos de alumnos, carreras y roles pueden ser reemplazados fácilmente por respuestas del backend.
- El sistema está preparado para validaciones, autenticación y persistencia real.

## Personalización y Extensión

- Variables CSS para adaptar colores y estilos institucionales.
- Fácil integración de nuevos roles, carreras y funcionalidades.
- Documentación y estructura clara para desarrolladores backend y frontend.

## Recomendaciones para Producción

- Reemplazar los datos simulados por integración real con base de datos.
- Configurar autenticación y autorización según los roles definidos.
- Validar y proteger los endpoints de la API.
- Realizar pruebas de usabilidad y accesibilidad.

## Contacto y Soporte

Para dudas técnicas, mejoras o soporte, contactar al equipo de desarrollo institucional.

---

**Desarrollado con ❤️ y las mejores prácticas de React, TypeScript y Bootstrap.**
