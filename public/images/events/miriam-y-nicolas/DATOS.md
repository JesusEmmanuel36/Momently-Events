# Miriam y Nicolás
Ruta `/eventos/miriam-y-nicolas`.
Fecha confirmada por el usuario: viernes 15 de enero de 2027. El 2026 del mensaje inicial fue corregido expresamente. Sin historia ni fechas de relación por petición posterior.

## Diseño y contenido
Base `app/page.js`: se reutiliza `WelcomeSection` y el mismo texto de `config/wedding.js`, firma Miriam & Nicolás, `CountdownSection`, `GallerySection`, `GiftRegistrySection` y `SongSection`. Paleta dorado, café y beige. Portada real `portada.png`, doce fotos seleccionadas sin duplicar retratos casi idénticos y sin inventar recuerdos fechados. Sobres y arreglo floral generados con image_gen; apertura calibrada openWidth 97.5%, openBottom 8.1%, sello50%.

## Lugares e itinerario
- Discurso 3:00 p. m., Salón del Reino de los Testigos de Jehová. Río Mezcala 283, Campamento Obrero, 60992 Las Guacamayas, Mich. https://maps.app.goo.gl/MAaPuxQn73RCSspk6?g_st=aw
- Recepción 4:00 p. m., HR Hacienda de Rodríguez. Palmira55, colonia Aeropuerto, Las Guacamayas, Mich. https://maps.app.goo.gl/SJAUUhjT1HcFk9eh7?g_st=aw
- Comida5:00 p. m., primer baile6:00 p. m., pastel8:00 p. m. Sin hora de término inventada.
- Vestimenta: solo reservar blanco para la novia; no se inventó formalidad.
- Regalos: lluvia de sobres y transferencia. BanCoppel, Miriam Hernández, CLABE137475105374295643. Botones para copiar CLABE y datos completos.
- WhatsApp7531420676; sin RSVP, pases ni QR de fotos no solicitados.
- Audio confirmado por usuario: `/audio/miriamynicolas.mp3`, solicitado como Niña de Nicho Hinojosa instrumental.

## Panel y canciones
Registro publicado creado para recibir sugerencias independientes de RSVP; eventId `4UpOhkZHNmTEHuqe55wK`. Sin cuenta creada. Las canciones se guardan exclusivamente en songSuggestions del evento y se consultan desde su panel autenticado. RSVP desactivado. Script reproducible `scripts/activate-miriam-nicolas.mjs`, requiere --activate para mutar y conserva propietarios al actualizar.

## Verificación
Navegador silenciado en390px y1440px, sin desbordes. Apertura centrada, bienvenida literal, firma, fecha2027, doce fotos, cinco horarios, WhatsApp correcto, CLABE copiada y audio existente. Formulario de canciones probado con fetch interceptado: no se enviaron mensajes ni respuestas reales.
