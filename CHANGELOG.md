# Changelog

Todos los cambios relevantes de **My Amauta** serán documentados en este archivo.  
El proyecto sigue versionado semántico (SemVer).


---

## [0.1.3-alpha] - 2026-03-06

### Added
- Navegación rápida de fechas mediante botones para avanzar o retroceder un día.
- Inputs para seleccionar rango de fechas (inicio y fin) para cálculos de asistencia.
- Cálculo de asistencias y faltas por alumno dentro de un rango de fechas.
- Exclusión automática de sábados y domingos en el cálculo de días de clase.
- Botón **Detalles** por alumno para visualizar estadísticas de asistencia mediante alerta.

### Changed
- Simplificación del flujo de visualización de estadísticas utilizando alertas en lugar de paneles dinámicos.
- Mejora en la experiencia de usuario al permitir navegar días consecutivos sin abrir el calendario manualmente.

### Improved
- Ajustes menores en estilos CSS para mejorar la legibilidad de la lista de alumnos.
- Mejora en la interacción visual de los checkboxes de asistencia.

---
## [0.1.2-alpha] - 2026-02-03

### Added
- Estilos CSS básicos para mejorar la claridad visual del sistema.
- Alineación de checkboxes con los datos del alumno.
- Efectos hover en filas para facilitar la lectura y selección.

### Changed
- Mejora de la experiencia de usuario sin modificar la lógica del sistema.


---

## [0.1.1-alpha] - 2026-02-03

### Added
- Registro de asistencia por fecha, permitiendo manejar múltiples días independientes.
- Visualización de la fecha seleccionada en la lista de alumnos.
- Actualización automática del estado de los checkboxes al cambiar de fecha.
- Separación de registros de asistencia respecto a los datos de alumnos.
- Funciones independientes para vaciar alumnos y asistencias.

### Fixed
- Corrección en el uso consistente de claves de `localStorage`.
- Persistencia correcta del estado de asistencia por alumno y fecha.
- Corrección de errores de renderizado al cambiar de fecha.
- Prevención de inconsistencias al marcar asistencia sin fecha seleccionada.

### Changed
- Redefinición del modelo de datos para que la fecha sea el núcleo del registro de asistencia.
- Refactor del renderizado para depender del contexto de fecha seleccionada.
- Mejora en la claridad visual para evitar errores humanos del usuario.

---

## [0.1.0-alpha] - 2026-01-XX

### Added
- Estructura inicial del proyecto (HTML + JavaScript).
- Registro básico de alumnos mediante formularios.
- Renderizado dinámico de alumnos en el DOM.
- Uso de arrays y objetos para modelar datos de alumnos.
- Persistencia inicial de datos usando `localStorage` y JSON.
- Implementación inicial de checkboxes para marcar asistencia.

### Notes
- Primera versión funcional del proyecto.
- Etapa de aprendizaje y exploración de manipulación del DOM, eventos y almacenamiento local.
- Base conceptual del sistema de gestión de asistencia.