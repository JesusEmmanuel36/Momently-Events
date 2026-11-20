# API de invitaciones V2 para un trabajador de IA

La API crea y modifica **invitaciones del formato `ai-designed`**, compatibles con V1 y V2. Usa los mismos prompts, generación de imágenes, HTML/CSS validado y componentes nativos de RSVP, pases, música y QR. No ejecuta código arbitrario, no administra contraseñas y no modifica invitaciones estáticas del repositorio. No requiere commits para cada invitación.

## Configuración

En el servidor (Vercel y/o `.env.local`):

- `MOMENTLY_WORKER_API_KEY`: secreto aleatorio de al menos 32 caracteres, exclusivo del trabajador. Puedes crearlo con `openssl rand -hex 32` y guardarlo como secreto; no compartirlo con clientes ni incluirlo en el prompt.
- `OPENAI_API_KEY`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: las variables ya utilizadas por el creador.
- `OPENAI_TEXT_MODEL`, `OPENAI_IMAGE_MODEL`, `AI_USD_TO_MXN`: configuración existente opcional.

El trabajador recibe el mismo secreto mediante su entorno y llama con `Authorization: Bearer ...`. Esta clave tiene acceso privilegiado a invitaciones IA: conservarla únicamente en un servidor del trabajador. No usarla en frontends, formularios públicos ni conversaciones con clientes. No se cambian roles de Firebase ni se crean cuentas de administradores.

También se admite la sesión de un administrador en el mismo origen; las escrituras con sesión mantienen comprobación de origen. Una cabecera Bearer incorrecta nunca cae a la sesión como alternativa. Firestore mantiene los trabajos privados mediante la regla de denegación general existente.

## Una sola operación desde tu trabajador

Se incluye un cliente que crea el trabajo, ejecuta sus etapas y devuelve el resultado:

```js
import {createInvitationWorker} from './lib/ai/worker/client.js';
const worker = createInvitationWorker({
  baseUrl: process.env.MOMENTLY_WORKER_BASE_URL,
  token: process.env.MOMENTLY_WORKER_API_KEY,
  onProgress: job => console.log(job.jobId, job.status, job.step)
});
const result = await worker.create({
  prompt: 'XV de Ana, 28 de noviembre de 2026. Tema mariposas, lila y dorado. Misa a las 6 p. m. en Capilla del Rosario. Incluye RSVP breve, pases personalizados y QR para fotos el día del evento. Sin datos inventados.',
  publish: false
}, {idempotencyKey: 'cliente-123-invitacion-001'});
console.log(result.invitationUrl, result.previewUrl, result.editUrl);
```

`publish:false` es el valor predeterminado. Para crear **y publicar**, enviar `publish:true`; entonces `published:true` confirma publicación. En un borrador, `invitationUrl` indica la ruta reservada pero no significa que sea públicamente visible. `previewUrl` abre la secuencia completa (sobre, hoja, portada y secciones) y requiere inicio de sesión de admin. `previewHtmlUrl` devuelve el documento de secciones con autenticación Bearer o sesión, útil para herramientas del trabajador; el sobre animado se ve en `previewUrl`.

Las etapas no dependen de que quede abierta la pantalla de V2. Cada `POST /run` hace una sola etapa y guarda el avance, evitando una petición de más de varios minutos. El cliente mantiene el ciclo. **No hay un proceso autónomo en segundo plano ni una cola externa instalada**: si detienes el trabajador se conserva el trabajo, pero no sigue generando solo. Puedes continuarlo con `resume(jobId)`.

## Rutas HTTP

`GET /api/ai/v2` devuelve las capacidades y el esquema JSON de entrada al trabajador autenticado.

| Método y ruta | Función |
| --- | --- |
| `POST /api/ai/v2/jobs` | Crear un trabajo; requiere `Idempotency-Key` estable de 12–128 caracteres. Devuelve 202 y `jobId`. |
| `GET /api/ai/v2/jobs/{jobId}` | Estado, etapa, recursos, advertencias, consumo y enlaces. |
| `POST /api/ai/v2/jobs/{jobId}/run` | Ejecutar la siguiente etapa; cuerpo `{}`. |
| `POST /api/ai/v2/jobs/{jobId}/run` con `{"retry":true}` | Reintento **explícito** de una etapa fallida, después de revisar consumo. |
| `POST /api/ai/v2/jobs/{jobId}/publish` | Aprobar y publicar el mismo diseño terminado, sin regenerar ni volver a pagar imágenes. |
| `POST /api/ai/v2/jobs/{jobId}/cancel` | Detener etapas futuras; no borra imágenes ya generadas ni revierte cambios ya aplicados. |
| `GET /api/ai/v2/jobs/{jobId}/preview` | HTML de vista previa privado cuando el diseño está listo. |
| `GET /api/ai/v2/invitations/{eventId}` | Leer diseño y configuración editable de una invitación IA, sin invitados ni contraseñas. |
| `POST /api/ai/v2/uploads` | Firma para subir fotos, música y videos directamente a Cloudinary. |

Un trabajo en curso devuelve 409 si otra llamada intenta ejecutar otra etapa simultáneamente. Consulta el estado y espera. Un trabajo fallido no se reanuda automáticamente. Si una función termina sin confirmar el recurso, se detiene y exige revisión antes de reintentar: la generación podría haber tenido costo. Recursos completados y guardados no se regeneran al continuar.

La idempotencia evita crear dos trabajos/eventos por repetir la misma solicitud. Reutiliza la clave con el mismo JSON; usarla con otros datos produce 409. Los trabajos pertenecen a la identidad derivada de la clave. Al rotar la clave cambia esa identidad; un admin con sesión puede seguir consultando los trabajos anteriores.

## Editar con un prompt

```json
{
  "eventId": "ID_DEL_EVENTO_IA",
  "prompt": "Cambia la recepción a las 7 p. m. y el título a Nuestra gran noche. Regenera la portada con temática de mariposas. Mantén las fotos, los sobres y el RSVP actuales.",
  "publish": true
}
```

La IA identifica qué imágenes debe regenerar. Cambiar solo texto no regenera recursos. El sobre abierto y cerrado se regeneran como pareja cuando se solicita cambiar el sobre. Cada recurso nuevo incorpora **elementos reconocibles de la temática**, no únicamente su color. Respeta instrucciones de ausencia de flores, moño u ornamentos.

`publish:true` en una invitación ya publicada **aplica los cambios a la invitación visible**. Con `publish:false`, una edición publicada se conserva como propuesta privada en el trabajo (`applied:false`, `invitationUrl:null`), sin sobrescribir la invitación. Para aplicar exactamente esa propuesta posteriormente llama a `POST /api/ai/v2/jobs/{jobId}/publish`, o `worker.publish(jobId)`. Reutiliza el diseño ya generado sin costo adicional de generación; puede producir consumo de almacenamiento/escrituras normales. También sirve para publicar un borrador nuevo. Rechaza invitaciones que cambiaron después de la propuesta.

Si alguien edita la invitación mientras se genera otra versión, el guardado se rechaza para no sobrescribir sus cambios. El slug de una invitación existente se mantiene para proteger pases y QR. Las invitaciones nuevas eligen un slug disponible y resuelven colisiones al guardar. Se conservan propietarios, invitados, pases emitidos y respuestas existentes.

## Cambios estructurados opcionales

`changes` tiene prioridad sobre la extracción del prompt. Sus campos son los del editor:

- `name1`, `name2`, `occasion`, `dateLabel`, `eventDate` (`YYYY-MM-DD`), `slug` (solo nueva).
- `imageUrl`, `coverImageSource` (`uploaded`, `generated`, `unknown`), `imagePrompt` (descripción visual compartida).
- `gallery`: reemplazo explícito y ordenado de la galería, con `url`, `fileName`, `alt`, `id` opcional y `source` opcional. Lee primero el evento si quieres conservar fotos no mencionadas.
- `videos`: lista con `id`, `url`, `fileName`, `title`.
- `musicUrl`, `musicName`: música seleccionada; string vacío la quita.
- `artwork`: URLs de `envelope-closed`, `envelope-open`, `floral`. Para quitar sobres proporciona ambos vacíos o pídelo en el prompt.
- `showFloral`, `envelopeLayout` (`openWidth`, `openBottom`).
- `features`: cambios parciales de `rsvp`, `passes`, `photos`, `photoOpening` (`event`, `week-before`, `now`), `maxCompanions`, `rsvpTitle`, `showInitials`, `askAgeCounts`, `askCompanions`, `askMenuPreference`, `askAllergies`, `askMessage`, `askSongSuggestion`. Los campos no indicados se conservan en ediciones.

`regenerate` permite forzar o impedir la generación de `cover`, `envelopes`, `floral`, con booleanos. `galleryImages` permite pedir hasta cinco imágenes adicionales, con `name` y `prompt`; quedan guardadas en la galería con nombres que puedes mencionar en el prompt para colocarlas en secciones. La IA también extrae estas peticiones del prompt si no se envía la lista explícita. Máximo 40 fotos totales y 10 videos.

`referenceEventId` toma solo la estructura visual de otra invitación IA, sin copiar sus datos. `referenceImageUrls` admite hasta tres referencias Cloudinary para leer datos o estilo. El diseño recibe también la portada para análisis visual; las fotos de galería se referencian por nombre/descripción y se insertan originales, como en V1/V2. El trabajador no debe afirmar que el modelo vio los píxeles de toda la galería.

Todas las URLs de recursos deben ser de Cloudinary en las rutas de imagen/video compatibles. No se descargan URLs arbitrarias ni se admiten archivos locales en el JSON.

## Subir fotos, música y videos

```js
const photo = await worker.upload({bytes: imageBytes, fileName: 'portada.jpg', kind: 'images'});
const music = await worker.upload({bytes: audioBytes, fileName: 'cancion.mp3', kind: 'audio'});
// En changes: {imageUrl:photo.url, coverImageSource:'uploaded', musicUrl:music.url}
```

El cliente firma la carga con la API y envía el archivo directamente a Cloudinary; no expone el secreto de Cloudinary ni el token del trabajador a ese proveedor. Límites del cliente: imágenes 15 MB, audio 25 MB, videos 150 MB; la configuración de Cloudinary también puede imponer restricciones. La firma usa el mecanismo existente del editor y no es un sistema de permisos granular para operadores no confiables. MPEG/MPG se convierte a URL de entrega MP3/MP4 compatible usando la utilidad existente.

## Ejecución desde terminal

En el entorno del trabajador configura `MOMENTLY_WORKER_BASE_URL`, `MOMENTLY_WORKER_API_KEY` y `MOMENTLY_WORKER_REQUEST_ID`. Guarda el JSON en un archivo privado y ejecuta:

```bash
node scripts/ai-invitation-worker.mjs create solicitud.json
node scripts/ai-invitation-worker.mjs status JOB_ID
node scripts/ai-invitation-worker.mjs resume JOB_ID
node scripts/ai-invitation-worker.mjs cancel JOB_ID
```

Para un fallo revisado: `resume JOB_ID --retry`. El script no reintenta automáticamente errores de generación ni peticiones que podrían haber generado costos. El resultado se imprime como JSON y el avance en stderr; no imprime claves.

## Resultado y límites prácticos

El resultado contiene `eventId`, `slug`, `published`, `applied`, `invitationUrl`, `previewUrl`, `previewHtmlUrl`, `editUrl`, `warnings`, `resources`, `consumption` y `estimatedCost`. Los costos son estimaciones con las tarifas y conversión ya configuradas en el proyecto; una respuesta fallida puede tener consumo que el proveedor no haya devuelto. No se promete un costo máximo ni contabilización exacta.

Se mantienen los límites de frecuencia existentes para generación de texto e imágenes; el trabajador no los elude. Si llega un 429, espera el plazo indicado y continúa el mismo trabajo. No se borran recursos de Cloudinary ni se migran datos existentes. No se crean cuentas de clientes, invitados, pagos, dominios ni despliegues mediante esta API. Una API que genera diseños no garantiza decisiones visuales perfectas: revisa la vista previa y las advertencias antes de publicar eventos reales.
