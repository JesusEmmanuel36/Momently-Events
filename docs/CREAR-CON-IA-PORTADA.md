> El estudio ahora genera invitaciones completas. Consulta [CREAR-CON-IA.md](./CREAR-CON-IA.md) para el flujo actual. Los apartados de portada describen la etapa inicial.

# Crear con IA — estudio independiente de portadas

Ruta admin: `/admin/crear-con-ia`. Enlaces en el encabezado de `/admin` y en la navegación lateral. El creador convencional y su asistente de propuestas se conservan.

## Uso

1. Completa nombres, subtítulo y fecha como quieras mostrarlos. Si prefieres, deja los campos vacíos y proporciona los datos en el prompt.
2. Sube una imagen con el control de Cloudinary o abre Generar imagen con IA y describe el fondo. La generación de imagen es una llamada pagada independiente; no se regenera al corregir solo el código.
3. Escribe instrucciones y pulsa Crear portada con IA. La API produce HTML y CSS originales, no una configuración de la plantilla existente.
4. Revisa móvil/escritorio y repite la animación. Escribe otro prompt para corregir el código anterior, o edítalo manualmente desde Código y actualiza la vista previa. Deshacer conserva hasta cinco versiones de diseño durante la sesión.
5. El borrador se restaura desde localStorage en ese mismo navegador y origen. Se puede descargar un HTML de revisión. No hay creación de evento, enlace público ni publicación.

## Referencia de composición

Se revisó `components/events/fabiola-juan-pablo/FabiolaJuanPabloTemplate.js`, su sección hero y estilos asociados. La instrucción describe: foto a pantalla completa, posición vertical inicial al 25%, degradado sutil sin ocultar la foto, subtítulo espaciado encima, nombres centrados en Allura por líneas con & pequeño, fecha debajo e indicador al pie. El modelo genera su propio HTML/CSS siguiendo esa composición o las correcciones del usuario. No copia datos privados de esa invitación ni envía su código completo al proveedor.

## Servicios y configuración

- `OPENAI_API_KEY`: clave exclusivamente servidor ya utilizada por el primer asistente.
- `OPENAI_TEXT_MODEL`: predeterminado `gpt-6.1-sol`, Responses API, salida estructurada de HTML/CSS, entrada de foto opcional y código anterior.
- `OPENAI_IMAGE_MODEL`: predeterminado `gpt-image-2.5-sunburst`, Images API, una imagen vertical de calidad media por clic.
- Cloudinary usa las variables y carga firmada existentes. Las imágenes generadas se guardan en `momently-events/ai-cover-drafts/<admin.uid>`. Las subidas manuales usan la biblioteca de borradores existente.
- Las fotos elegidas y prompts se envían a OpenAI y las imágenes se almacenan en Cloudinary con autorización explícita del usuario. Las imágenes son recursos alojados, aunque no exista una invitación publicada. No incluir contraseñas en prompts.
- `maxDuration` del endpoint de imágenes es 300 segundos; confirmar que el plan de alojamiento permite esa duración. No hay reintentos automáticos para evitar duplicar costos.

## Aislamiento

El código se visualiza en un iframe con sandbox vacío, sin scripts, sin acceso al admin ni almacenamiento, y CSP que bloquea conexiones, formularios, marcos, audio y objetos. Se admiten HTML/CSS y animaciones CSS; no JS generado. Las fuentes públicas locales tienen CORS habilitado para funcionar dentro del iframe aislado. No se guarda código ejecutable en archivos del proyecto ni se modifica código de invitaciones publicadas.

Endpoints POST `/api/admin/ai/cover` y `/api/admin/ai/cover-image`: requieren admin y origen válido, límites por usuario y validación de entrada/salida. El borrador no incluye datos de invitados ni credenciales.

## Validación realizada

14 pruebas unitarias entre esquema de código y asistente anterior; ESLint y git diff --check. APIs sin sesión devuelven 401 y las fuentes permiten CORS para el sandbox. Generación real de HTML/CSS con datos ficticios, imagen real abstracta mediante Images API, carga real a Cloudinary y generación real de código con esa imagen como entrada: HTTP 200 y código validado. Prueba de navegador móvil/escritorio: código real, edición contextual, deshacer, generación/carga de imagen interceptadas, restauración del borrador local y ausencia de publicación. La ruta temporal de prueba y su borrador local fueron retirados. No se crearon eventos ni confirmaciones de prueba.

## Generación coordinada de recursos

El mismo campo «Describe solo la imagen» define estilo y paleta para los botones Generar portada, Generar sobres (cerrado y abierto) y Generar arreglo floral. Los prompts de trabajo están centralizados en lib/ai/artwork-prompts.js, visibles también en Ver los prompts base. Se utilizan los criterios habituales: sobre único centrado, papel texturizado, moño y sello, proporciones horizontales naturales; abierto como edición del cerrado conservando material y flores; arreglo floral horizontal sin fondo, sin texto ni objetos extra.

El proveedor lib/ai/artwork-provider.js usa Images API /generations o /edits con archivo de referencia. Sobres/floral:1536x1024 y background transparent, WebP conservando alfa. Portada:1024x1536 opaca. La portada actual orienta los colores del cerrado; el cerrado se usa como referencia del abierto y preferentemente del arreglo. La descripción compartida acompaña cada solicitud.

La pareja son dos solicitudes consecutivas. El cerrado se guarda inmediatamente y se limpia el abierto anterior para no conservar una pareja descoordinada. Si falla el abierto se conserva el cerrado nuevo y se permite Generar solo abierto. No hay reintentos automáticos. La biblioteca muestra los tres recursos con enlaces para ver cada imagen. Se conservan en el borrador local al recargar. Al cambiar la descripción se avisa de recursos generados con una descripción anterior; no se regeneran automáticamente.

El arreglo generado puede mostrarse/ocultarse en la portada con un toggle y también se incluye en el HTML descargado. Los sobres se muestran en la biblioteca y también se usan en la apertura interactiva de la vista previa. No se publican invitaciones.

Verificación:19 pruebas unitarias; navegador móvil/escritorio con generación/carga interceptadas, pareja secuencial, fallo parcial del abierto, reintento sin regenerar cerrado, misma descripción en todas las peticiones, referencia del cerrado, floral y toggle, persistencia local y cambio de descripción sin cargos automáticos. Además se generaron realmente un cerrado, su abierto por edición y un arreglo con la misma paleta de prueba, conservando transparencia y guardados en Cloudinary como borradores de prueba. La ruta temporal y los datos ficticios del navegador fueron retirados.

## Apertura completa en la vista previa

AiCoverPreview muestra primero el sobre cerrado cuando existe. El sello y el botón Abrir invitación activan la transición al abierto y la salida de una hoja con nombres, subtítulo y fecha. A los 4.2 segundos se monta el iframe de portada, de modo que las animaciones del HTML/CSS empiezan después de la apertura. Repetir apertura restablece la secuencia completa. Sin sobre se conserva la vista directa de portada; si falta el abierto se informa y no se habilita una apertura incompleta. Los recursos se precargan y se ofrecen mensajes de carga/error.

La apertura es código React propio fuera del iframe; el código generado sigue aislado con sandbox sin scripts. No se habilita JS del modelo ni se regenera código o imágenes al abrir o repetir. Se respetan preferencias de movimiento reducido. El HTML descargado sigue siendo el de portada, indicado en el botón.

La alineación del abierto se calcula a partir del cuerpo opaco de ambos WebP, descartando los márgenes transparentes y sombras. Ancho natural y centrado con left50% y margen negativo, sin usar transform para centrar. Si no se puede leer el alfa se usa un ajuste inicial aproximado; los sliders de ancho y posición permiten corregir cualquier generación distinta y se conservan por pareja en el borrador.

Verificación de esta revisión:22 pruebas unitarias, ESLint, imágenes reales calibradas (100.4% de ancho y 4.8% de posición inferior para la pareja de prueba), navegador móvil/escritorio con clic real en el sello, hoja visible con texto, abierto centrado y proporción1.5, portada ausente hasta terminar la apertura, repetición y sandbox conservado. No hubo llamadas de IA ni nuevas imágenes en esta prueba. Ruta temporal y borrador ficticio retirados.
