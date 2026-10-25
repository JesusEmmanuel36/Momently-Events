# Liz y Eduardo — oro champagne

Herramienta: `imagegen` integrada (sin CLI ni API key del proyecto). Nuevos recursos, sin reemplazar las tres fotografías originales.

## Recursos

- `envelope-closed.webp`: 1536 × 1024, transparencia real.
- `envelope-open.webp`: 1536 × 1024, transparencia real; editado desde el cerrado para conservar papel, moño y perspectiva.
- `floral.webp`: 1774 × 887, transparencia real.
- Originales de generación conservados en `.codex/generated_images/01a0dad2-7345-7bb2-8f92-545958b109b2`.

## Prompts finales

### Sobre cerrado

Generate a single isolated CLOSED wedding invitation envelope as a premium photorealistic stationery product cutout, front view with very subtle natural perspective. Warm ivory cotton paper, champagne gold satin narrow ribbon tied into a delicate bow near left side, restrained champagne-gold embossed edge, round wax seal bearing only elegant intertwined initials L & E. Color palette warm ivory #FAF7F1, champagne beige #D6C1A3, soft gold #B89A62 and a tiny touch of muted olive #969B83. Fully closed triangular flap pointing down, clean horizontal rectangular envelope body. Centered entire envelope with generous transparent margins on all sides, no cropping. Landscape 3:2 asset canvas, envelope body occupies about 76 percent of canvas width and sits in lower half, very soft realistic small drop shadow. No people, no backgrounds, no hands, no other envelope, no open envelope, no extra paper, no other letters or wording. True transparent background. This is the closed state for a wedding invitation opening animation.

### Sobre abierto (edición del cerrado)

Edit the reference stationery envelope into its OPEN state, same single envelope, same warm ivory cotton paper, champagne gold fine edging, delicate champagne satin ribbon bow on the left, same width and same bottom position of the rectangular envelope BODY, same frontal perspective. Raise its triangular flap straight upward so the envelope is fully open with an empty ivory interior pocket visibly open. No wax seal obstructing the opening, no letter or insert visible: a digital letter will be composited later. Keep the entire open envelope including raised triangular flap and bow within the canvas, generous transparent margins, landscape 3:2 canvas. The BODY must remain exactly as wide and in the same lower position as the closed reference; do not shrink or flatten it to fit the flap, use transparent headroom. One isolated OPEN envelope only, no closed envelope anywhere. True transparent background, no white matte or dark background, only a small soft natural shadow directly around paper edges. No words, no extra objects, no hands. This is the matching second state in a wedding-envelope animation.

### Arreglo floral

Create one exquisite photorealistic wedding floral arrangement cutout for a digital wedding invitation, warm ivory and champagne roses, miniature white blossoms, delicate eucalyptus in desaturated muted olive green, a few subtle champagne-gold leaves and fine airy stems. Palette ivory #FAF7F1, champagne beige #D6C1A3, soft gold #B89A62, muted olive #969B83. Horizontal gently curved organic arrangement, richly detailed natural petals but tasteful restrained composition, center lower with airy tapering sides. Entire arrangement visible on landscape canvas, no vase, no paper, no envelope, no hands, no frame, no lettering, no background. True transparent background, not white, no checkerboard. Premium elegant romantic photographic realism, soft daylight.

## Datos y decisiones

Sábado 12 de diciembre de 2026. Recepción 5:30 p. m., cierre 12:00 a. m. Sin ceremonia ni información importante. Destino del enlace de Maps: Jardín de fiestas Los Rosales, Manzana 029, La Conchita, Chalco de Díaz Covarrubias, Méx. Mesa Amazon `1GRDYAWWOKABX`. RSVP breve, sin WhatsApp, plazo, menú ni alergias inventados.

El usuario confirmó conservar los diez horarios del itinerario de la imagen, incluido tiempo de comida a las 7:10 (aprox. 40 minutos) y brindis a las 7:20. Colores a evitar: beige, verde, dorado y blanco; círculos de referencia taupe, champagne y salvia.

Bienvenida: se reutiliza directamente `WelcomeSection` y el texto de `config/wedding.js`; únicamente cambian nombres. Dos fotos actuales en galería y foto infantil aparte, sin fechas ni acontecimientos inventados.

Sobres calibrados por sus cuerpos opacos: abierto al 106.3% y posición inferior 9.1%; botón del sello al 63%. No se usa `Image fill` para el abierto.

Se publican solo los WebP optimizados, conservando el alfa. Los PNG de la herramienta quedan en su ubicación original para evitar duplicar recursos pesados en el despliegue.

## Verificación final

Bienvenida y firma comprobadas en navegador, tres fotos originales, diez horarios e iconos, enlaces de Amazon/Maps y calendario con cierre a medianoche. Sobres alineados en móvil con diferencia inferior a un píxel entre sus cuerpos visibles. Música real comprobada con el navegador silenciado. RSVP probado con respuesta interceptada sin registros ficticios y registro del evento habilitado con `scripts/activate-liz-eduardo-rsvp.mjs --activate`, sin crear cuentas de propietario. Sin ceremonia ni sección de información importante.

Pendiente desplegar el código y recursos a Vercel.
