# Verificación de entrega Cloudinary — 16 noviembre 2026

Muestra de conveniencia: ocho imágenes de invitaciones IA de esta cuenta. Descargas HTTP reales, Accept WebP, sin escribir en Firebase, sin subir ni borrar archivos. Valores en bytes; no representa una distribución de todo el tráfico.

| Tipo | Original | 800 px | 1600 px | Ahorro a 800 px |
|---|---:|---:|---:|---:|
| cover | 78125 | 45678 | 45678 | 41.5% |
| envelope | 344942 | 50580 | 327698 | 85.3% |
| floral | 334370 | 98344 | 314642 | 70.6% |
| cover | 309508 | 99014 | 303412 | 68.0% |
| envelope | 285144 | 43632 | 258812 | 84.7% |
| floral | 276516 | 83380 | 269882 | 69.8% |
| photo | 1774910 | 165674 | 307592 | 90.7% |
| photo | 142438 | 90672 | 114238 | 36.3% |

Todas las respuestas de imágenes medidas fueron 200. Se comprobaron también mediante HEAD las variantes 480 y 1200 para las ocho imágenes: 16 respuestas 200 adicionales. Total: 3,545,953 → 676,974 bytes a 800 px (80.9%); a 1600 px: 1,941,954 bytes (45.2%). No extrapolar sin ponderar por visitas, DPR y peso real. Los tamaños 480/1200 también pueden utilizarse y no están incluidos en este total.

Audio probado: 3,654,119 → 3,851,537 bytes a 128 kbps (+5.4%); q_auto tampoco mejoró ese MP3. Se conserva el original cuando no hay ahorro >=3%. Otra canción ya tenía una transformación y pasó sin cambios. **La transcodificación de audio/video está implementada pero requiere activación por tipo; no se generan derivadas audiovisuales nuevas en masa por defecto.** La reducción de precarga sí se aplica.

Video de referencia público de Cloudinary demo (no es de la cuenta): 9,094,354 → 793,977 bytes (91.3%), HTTP 200, MP4 H.264. No representa el ahorro de videos de clientes. El único recurso encontrado en el primer evento con videos era un MP3, que se conserva sin convertir a video.

Transparencia: dos sobres y dos arreglos conservaron canal alfa. Proporción 1536×1024 → 800×533, sin recorte.

Chrome: móvil 390px/DPR2 seleccionó 800px; escritorio 1440px sin desbordamiento. Apertura habilitada, lightbox funcional, música reproduciéndose tras la interacción, video con controles/playsInline/preload none. Se bloquearon intencionadamente las URLs transformadas y las imágenes del sobre y la foto regresaron al original. CSP del iframe mantuvo connect-src none. Sin excepciones JS. Los únicos 404 observados fueron favicon.ico local, ajenos a Cloudinary.

Proyección ilustrativa sobre 119.25 GB: si el 95% de bytes son imágenes y ahorran 80.9%, el total bajaría a ~27.6 GB (76.9%). Si solo el 70% son imágenes, ~51.7 GB (56.6%). La proporción de créditos por bandwidth no identifica la proporción de imágenes dentro del bandwidth. No es garantía; el historial de últimos 30 días no se borra al desplegar.
