# Crear y publicar con IA

El creador clásico permanece disponible en `/admin/bodas/nueva`. El estudio `/admin/crear-con-ia` genera código y permite guardar y publicar eventos independientes con la plantilla `ai-designed`.

## Fotos por nombre en secciones personalizadas

Las nuevas cargas conservan `fileName` con extensión y un `id` estable. En el editor de galería de IA aparecen nombre de referencia editable, descripción y orden. El prompt puede pedir «Pon foto-1.jpg en una sección titulada Este día nos conocimos». La IA recibe solo `id`, índice, nombre y descripción; no recibe los píxeles ni URLs de galería. No debe inferir el contenido visual que no se haya descrito.

El HTML puede usar `data-gallery-photo="ID"` en una imagen o contenedor; el runtime coloca la original de Cloudinary y permite ampliarla. `data-photo-section` marca la sección que se retira si se elimina esa foto. Los grupos pueden usar `data-gallery-ids="ID1,ID2"`; una galería sin lista muestra solo las fotos no colocadas ya, evitando repeticiones. `data-gallery-include-used="true"` permite repetirlas cuando se solicita expresamente.

Se guardan IDs y nombres en servidor y borrador local. Cambiar el orden o el nombre conserva la referencia. Los borradores antiguos sin IDs se migran determinísticamente por URL y siguen mostrando su galería; se puede ajustar el nombre de referencia si ya no se conoce el archivo original. Los nombres técnicos no se convierten en títulos públicos automáticamente.

Verificación: generación real con nombres ficticios; navegador con cargas/API interceptadas verifica nombre de archivo, ID al modelo sin URL, foto individual con título, resto en galería, visor, reordenamiento, recarga y eliminación. No se publicaron eventos ni se subieron fotos reales en estas pruebas.

## Botón de música

El prompt puede solicitar explícitamente cambiar el botón de música a iconos play/pausa, texto o ambos, tamaño acotado, borde redondeado, sombra y posición izquierda/derecha. La respuesta `musicControl` solo admite colores HEX y opciones delimitadas, nunca código ejecutable. El endpoint conserva la geometría anterior o la original cuando el prompt no pide expresamente un cambio de diseño del reproductor; únicamente actualiza sus colores. El estilo se conserva en el borrador y publicación y se muestra también en la vista previa. Reproducción, pausa, apertura y errores siguen en el reproductor nativo.

## Apariencia y campos de las funciones

Cada generación ahora devuelve `featureAppearance` con estilos para RSVP, pases y fotos, aunque estén apagados. El prompt principal puede cambiar la paleta, fuentes, superficies, bordes, botones, radios y espaciado. Los tres estilos se guardan dentro del diseño y se aplican inmediatamente al activar los toggles, sin otra llamada a OpenAI. En borradores antiguos sin ese objeto, se muestra una indicación para modificar el diseño con IA una vez.

Solo se admiten HEX de seis dígitos, fuentes de una lista y tamaños acotados. La hoja CSS del componente es propia y está delimitada por `.momently-native-feature`; nunca se inserta CSS ni JS del modelo en el documento del panel o la página anfitriona. La vista previa y la publicación comparten esos tokens. La pantalla de subida de fotos también recibe la paleta.

Los campos opcionales del RSVP tienen toggles para acompañantes, menú, alergias, mensaje y canción. Nombre y asistencia siguen siendo obligatorios. En pases se conservan los lugares asignados y se aplica el toggle de mensaje; el resto de toggles corresponde al formulario general. El servidor descarta valores de campos desactivados en eventos IA y conserva el comportamiento de invitaciones anteriores.

La apertura de fotos tiene tres opciones: día del evento, siete días antes o desde ahora. Las dos primeras requieren fecha; se calculan a medianoche en el centro de México y se validan en el servidor antes de acceder al almacenamiento. El QR y su enlace se pueden compartir antes de la apertura; lo que se bloquea es la subida y el álbum.

Verificación adicional: una llamada real con datos ficticios devolvió los tres diseños aunque los toggles estaban apagados. Navegador con APIs interceptadas comprobó activación sin regenerar, estilos calculados, campos visibles/ocultos, persistencia, RSVP/pase publicados en móvil y fecha de apertura. Pruebas verifican rechazo de CSS/URL/fuentes arbitrarias, campos ignorados por servidor y cálculo de fechas entre meses y años.

## Enlace y funciones

- El slug convierte espacios y acentos a guiones y letras simples. Se valida contra rutas del proyecto y reservas de Firestore de forma transaccional. Después del primer guardado se conserva para no romper pases ni QR.
- La fecha del evento alimenta la generación y el bloqueo de fotos a medianoche, hora del centro de México. Sin fecha se puede publicar si no se activa ese bloqueo.
- Toggles de RSVP, pases personalizados y fotos con QR. Con pases activos, las confirmaciones se reciben exclusivamente desde el pase individual y respetan sus lugares asignados.
- Guardar borrador no publica. Guardar y publicar crea el evento y luego utiliza la publicación del administrador. Si falla publicar, el borrador se conserva para reintentar.
- Los eventos publicados muestran “Guardar cambios publicados”: guardar actualiza el enlace público existente. Los propietarios, respuestas y pases permanecen intactos.
- En Administrar evento se puede editar con IA, administrar pases, dar acceso al cliente y descargar fotos. En el panel del cliente aparecen confirmaciones, pases y fotos.
- Empezar otra invitación limpia el borrador local y abre el estudio vacío; no elimina el evento guardado.

## Vista previa y publicación

La vista previa nunca registra respuestas. Incluye una demostración local de las funciones elegidas; al publicar se sustituyen por componentes nativos con validaciones del servidor. La IA no ejecuta JS ni obtiene acceso al panel: su HTML/CSS vive en un iframe aislado con CSP y sin acceso al origen. Un runtime propio calcula calendario, cuenta regresiva, galería y comunica únicamente altura/navegación de confirmación al contenedor. El audio permanece fuera del iframe y empieza al abrir el sobre o pulsar reproducir.

Los álbumes de IA requieren un evento publicado y el toggle activo, y usan carpetas Cloudinary por ID de evento. La fecha se aplica en el servidor antes de procesar o subir archivos. Se reutilizan límites, recodificación y firmas existentes. El panel de fotos requiere propietario o administrador; permite descarga por foto. Despublicar o desactivar fotos revoca sus rutas públicas.

El HTML descargado sigue siendo un archivo de revisión sin backend. La publicación funcional se hace con el botón del estudio.

## Verificación de esta ampliación

Pruebas unitarias de schemas/fechas/recursos, transacciones simuladas y reserva concurrente de slugs, preservación de propietarios y respuestas, bloqueo por fecha y aislamiento de carpetas. Pruebas existentes del creador clásico, pases y fotos. Navegador con API interceptada: toggles, slug con espacios, guardar/publicar, petición de RSVP nativo, móvil, altura estable del iframe y omisión de formularios de demostración al publicar. No se crearon ni publicaron eventos reales durante estas pruebas.

---

# Crear con IA — invitación completa

En `/admin`, abre **Crear con IA**. El creador normal y el asistente de propuestas permanecen disponibles aparte.

## Flujo principal

Pega todos los datos del evento y el diseño en **Datos y diseño de la invitación**, al inicio de la pantalla. Puedes hacerlo sin rellenar los datos rápidos ni subir imagen de portada. Pulsa **Generar invitación completa**; para corregir el diseño, cambia el prompt y pulsa **Modificar invitación con IA**.

El modelo escribe HTML/CSS original e iconos SVG inline. El prompt central está en `lib/ai/invitation-instructions.js`, basado en las secciones reales de `components/events/fabiola-juan-pablo/FabiolaJuanPabloTemplate.js`: portada, bienvenida, pensamiento, versículo, calendario/contador, familia, galería, lugares, itinerario, avisos, celebración adicional, vestimenta, regalos/transferencia, confirmación y cierre. Los apartados se incluyen solo cuando corresponden al encargo y existen sus datos.

## Datos faltantes

No se inventan nombres, fechas/años, horarios, direcciones, enlaces, contactos, padres/padrinos, bancos ni restricciones. Se omite el campo desconocido y las secciones que no puedan mostrar contenido real. No se escribe «por confirmar», «pendiente» u otro relleno público salvo que el usuario lo indique expresamente. Las advertencias administrativas de omisiones están fuera del HTML. El servidor rechaza resultados con rellenos no solicitados.

## Galería

La sección Galería permite subir varias fotos, reordenarlas, describirlas y quitarlas usando la carga firmada existente de Cloudinary. Se conserva aparte de la portada. Las fotos quedan en el borrador del navegador y se usan al generar/actualizar la invitación. El modelo recibe índices y descripciones, no los archivos ni las URLs de la galería. La portada, cuando existe, mantiene el flujo de análisis visual ya autorizado. El modelo crea el lugar y estilo de la galería y el sistema inserta las fotos reales; el visor permite ampliarlas y avanzar/retroceder.

## Recursos de imágenes

No se modificaron los prompts de portada/sobres/arreglo. Sus botones usan el campo de estilo de imágenes existente y se generan independientemente del código de toda la invitación. La apertura cerrado → abierto → hoja → invitación se conserva.

## Interacciones de la vista previa

El modelo genera marcado y CSS, nunca JavaScript ejecutable. El runtime propio `public/ai/invitation-runtime.js` calcula el calendario y la fecha marcada, actualiza contadores, revela secciones al hacer scroll, construye la galería y su visor, copia datos y permite agregar la fecha al calendario de Google. Los enlaces HTTPS se abren aparte.

Los formularios de RSVP/canciones en esta etapa son de prueba: validan y muestran un mensaje explícito de que no se guardó ni envió nada. No se crea un evento publicado ni se conectan pases/QR ficticios. Para recibir confirmaciones reales se requiere un futuro paso de guardado/publicación y vinculación con un evento, fuera de esta revisión.

La vista previa usa iframe sin `allow-same-origin`. Solo se carga el runtime propio permitido en CSP; no se admite JS del modelo, eval, imports ni manejadores de eventos. `connect-src 'none'` bloquea conexiones y `form-action 'none'` impide envíos nativos. `allow-forms` permite que los eventos de formulario locales funcionen; el runtime siempre cancela el envío. Los borradores antiguos de portada siguen sin scripts hasta generar la nueva versión completa.

## Persistencia y pruebas

El borrador se guarda en el mismo navegador/origen, incluida galería, código, datos de la hoja y recursos generados. Deshacer y descargar HTML siguen disponibles. La exportación incluye el runtime de este dominio: es un archivo de revisión y no constituye una publicación.

Se verificó una generación real sin imagen con doce secciones y doce SVG, fecha marcada, contador, familia, galería, lugares, itinerario, avisos, vestimenta, regalos y RSVP. Se comprobó que la ceremonia sin hora no mostrara rellenos, ni se inventaran padrinos, teléfono o Maps. Pruebas de navegador con cargas/API interceptadas: subida múltiple, orden, persistencia, calendario, contador en marcha, visor, copia y formulario local sin envíos, móvil/escritorio, aislamiento del admin. Pruebas unitarias de los esquemas, protocolo permitido, SVG, formularios locales y reglas de omisión.

También se probó una generación real con solo nombre y estilo, sin fecha, lugares, familia, regalos ni confirmación. El modelo entregó tres secciones, dejó la fecha vacía y omitió calendario, contador, galería y formulario; no hubo datos inventados ni rellenos públicos. La ruta temporal de prueba se retiró y no se crearon eventos ni respuestas.


## Costos de la sesión
El creador muestra tokens de texto y el costo estimado de cada generación completada de código, portada, sobre cerrado, sobre abierto y arreglo floral. Usa el consumo que devuelve OpenAI y tarifas estándar verificadas el 25 de octubre de 2026. Cada sobre cuenta por separado. Se muestra el acumulado de la pantalla actual, incluso antes de generar código. Se reinicia al recargar; no es historial de facturación y no incluye solicitudes fallidas, generaciones anteriores, impuestos ni Cloudinary. Si falta el desglose de tokens o la tarifa del modelo, informa costo no disponible. `AI_USD_TO_MXN` permite cambiar la conversión de referencia (19 por defecto). El cobro definitivo se consulta en OpenAI Usage.
