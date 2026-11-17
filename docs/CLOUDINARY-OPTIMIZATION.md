# Entrega optimizada de medios

Se aplica al renderizar. Nunca guardar las variantes de entrega en Firebase. No hay migración, borrado ni actualización de medios originales. Los enlaces de descarga del panel conservan sus URLs originales y fl_attachment.

## Imágenes activas por defecto

`lib/media/cloudinary.js` centraliza validación y entrega: `c_limit,w_{480|800|1200|1600}/f_auto/q_auto`. Son cuatro anchos canónicos, no una transformación por cada medida de pantalla; hay tolerancia de 5% para evitar crear un salto grande por los breakpoints de Next (por ejemplo, 828 → 800). `c_limit` conserva proporción y no amplía originales pequeños. `f_auto` negocia formato con el navegador y conserva transparencia; no se fuerza JPEG ni se aplana sobre blanco.

Solo se transforman uploads públicos simples de Cloudinary con JPG/JPEG/PNG/WebP/AVIF. Locales, otros proveedores, GIF, SVG, PDF, query strings, hashes, firmas, private/authenticated/fetch, cadenas de transformación, overlays y transformaciones nombradas se dejan intactos. Puede utilizarse el interruptor global si una cuenta requiere exclusivamente transformaciones permitidas.

`OptimizedImage` conserva geometría, fill, estilos, eventos y texto de Next Image. Usa srcset/sizes y un loader directo de Cloudinary, evitando encadenar el optimizador de Vercel. Si falla una derivada, reintenta con el comportamiento original una sola vez. Los archivos locales mantienen su comportamiento anterior.

`design-delivery.js` procesa copias del HTML/CSS al crear el documento del iframe: fotos responsive, originales para fallback, fondos a 1200px, floral a 800px, fotos de galería a 800px y lightbox a 1600px. Las referencias de fotos mantienen sus IDs; los nombres privados de archivos no se incorporan al HTML público. No se reescribe el diseño almacenado.

El runtime aplica lazy loading a las fotos y floral, no precarga videos completos y recupera el original ante errores en imágenes/fondos/video. Los fondos decorativos CSS siguen la lógica visual existente; no se difieren indiscriminadamente fondos necesarios para animaciones. No cambia RSVP, pases, textos, posiciones ni animaciones.

## Audio y video: despliegue conservador

La lógica está integrada en componentes y runtime, pero las transcodificaciones de audio y video son **opt-in** para evitar generar cientos de derivadas nuevas de golpe y consumir créditos de procesamiento. La muestra de MP3 aumentó con recompresión; forzar 128k universalmente sería contraproducente. Por defecto se mantienen sus archivos originales, con preload none en los componentes compartidos (metadata explícita del editor se conserva).

Activar por separado solo tras revisar el consumo:

- `NEXT_PUBLIC_CLOUDINARY_AUDIO_OPTIMIZATION=on`: candidato MP3 a 128 kbps para MP3/WAV/FLAC/AIFF originales simples. Dos HEAD sin cuerpo verifican una reducción mínima del 3%. Solo se selecciona mientras el elemento está inactivo y no ha comenzado; el usuario nunca espera esa comprobación para reproducir. Timeout de 8 segundos, fallo → original.
- `NEXT_PUBLIC_CLOUDINARY_VIDEO_OPTIMIZATION=on`: candidato MP4 H.264/AAC, q_auto y máximo 1280px para MP4/MOV/MPEG simples. Los componentes React comprueban el ahorro igual que audio. Dentro del iframe se usa la derivada al reproducir con fallback original, manteniendo connect-src none, sin autoplay ni precarga de cuerpo. No se recorta ni se altera la duración. WebM y formatos desconocidos conservan original.

Las comprobaciones HEAD pueden generar una derivada, aunque no descarguen su cuerpo. Este procesamiento también consume créditos. Las variantes se reutilizan por URL; no hay timestamps aleatorios ni generación masiva/prewarm de las 400 invitaciones.

## Reversión

En Vercel, establecer `NEXT_PUBLIC_CLOUDINARY_OPTIMIZATION=off` y volver a desplegar. Es un flag de compilación Next, no basta cambiarlo sin redeploy. Restituye las URLs originales sin tocar datos. También se pueden apagar imágenes con `NEXT_PUBLIC_CLOUDINARY_IMAGES_OPTIMIZATION=off`, o audio/video con sus flags en off. Para rollback inmediato sin esperar build, restaurar el deployment anterior desde Vercel.

## Validación

Ver `docs/reports/cloudinary-delivery-2026-11-16.md`. Pruebas de unidad/regresión en `tests/cloudinary-delivery.test.mjs`; ejecutar `node --conditions=react-server --test tests/*.test.mjs`, lint y build. La página de QA usada fue temporal y se retiró antes del build final.

Una transformación nueva puede consumir créditos la primera vez; una entrega cacheada sigue contando bandwidth. El ahorro futuro no elimina el consumo ya acumulado de los últimos 30 días. No se modificó el plan, las reglas de seguridad ni el almacenamiento de Cloudinary.

## Archivos de esta implementación

- `components/WeddingInvitation.js`
- `components/admin/AiCoverPreview.js`
- `components/admin/AiCoverStudio.js`
- `components/admin/CloudinaryFields.js`
- `components/ai/PublishedAiInvitation.js`
- `components/cinematic/CinematicInvitation.js`
- `components/cinematic/Scenes.js`
- `components/events/caleb-ciriam/photos/GuestPhotoGallery.js`
- `components/events/caleb-ciriam/photos/GuestPhotoUpload.js`
- `components/events/shared/PhotographicEnvelope.js`
- `components/events/shared/TraditionalCover.js`
- `components/media/OptimizedImage.js`
- `components/media/OptimizedMedia.js`
- `components/panel/IsabelaGuestPhotos.js`
- `components/sections/CountdownStory.js`
- `components/sections/EventDetails.js`
- `components/sections/Gallery.js`
- `components/sections/IntroHero.js`
- `components/wedding/CoverBackground.js`
- `components/wedding/FlexibleInvitation.js`
- `docs/CLOUDINARY-OPTIMIZATION.md`
- `docs/reports/cloudinary-delivery-2026-11-16.md`
- `lib/ai/cover-code.js`
- `lib/media/cloudinary.js`
- `lib/media/design-delivery.js`
- `public/ai/invitation-runtime.js`
- `tests/ai-artwork.test.mjs`
- `tests/cloudinary-delivery.test.mjs`
