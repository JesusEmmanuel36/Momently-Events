
## Confirmación breve y música
Formulario RSVP habilitado con nombre, asistencia, mensaje para los novios y «¿Qué canción no puede faltar?» (título y artista opcionales). Sin número de acompañantes, preferencia de menú ni alergias. Ajustes activados en Firebase; se conserva el botón de WhatsApp. No se crearon cuentas ni confirmaciones de prueba. ESLint y diff correctos. Publicación de código en Vercel pendiente.

Corrección: «¿Qué canción no puede faltar?» es ahora una sección independiente, con nombre de canción, artista y botón Sugerir canción, siguiendo la referencia del usuario. Se retiraron los campos musicales del RSVP. Primero se confirma asistencia y luego se guarda la sugerencia usando el token de edición de esa confirmación; no crea una respuesta duplicada. Sugerencia visible en el panel.
