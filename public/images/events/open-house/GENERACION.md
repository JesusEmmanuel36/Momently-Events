# Open House — recursos de IA

Generados con la herramienta integrada `image_gen`, sin CLI ni API externa. Se conservan PNG originales y versiones WebP con alfa para la web. Ninguna imagen representa una foto real del domicilio.

Archivos finales de este directorio:
- `hero.png` / `hero.webp`: portada vertical 1024 × 1536.
- `envelope-closed.png` / `envelope-closed.webp`: un sobre cerrado, 1536 × 1024, transparente.
- `envelope-open.png` / `envelope-open.webp`: un sobre abierto, 1536 × 1024, transparente.
- `floral.png` / `floral.webp`: arreglo floral horizontal, 1536 × 1024, transparente.

La apertura utiliza capas de las imágenes del sobre, no dibujos de sobre ni flores CSS. Abierto: ancho 107.5%, desplazamiento inferior 7.3%, centrado mediante left y margen negativo. Los archivos WebP suman aproximadamente 1.27 MB frente a 9.95 MB de PNG.

## Datos extraídos de la imagen

Open House. “Un nuevo hogar, una nueva historia”. Sábado 5 de diciembre de 2026. Cda. Valle Paraíso, Fraccionamiento Hda. Santo Tomás, Nicolás Romero.

- 4:00–4:30 p. m.: bienvenida, recepción de invitados y entrega de kit de fiesta.
- 4:30–5:00 p. m.: corte de listón y brindis.
- 5:00–5:30 p. m.: fotos y buenos recuerdos, lluvia de sobres y foto del recuerdo.
- 5:30–7:00 p. m.: comida y convivencia.
- 7:00–10:00 p. m.: Grupo “Los primos ADC”.
- 10:00 p. m.–2:00 a. m.: Sonido Constelación; termina el domingo 6 de diciembre.

Temática: “Un toque de azul”. Lluvia de sobres con un mensaje o deseo bonito. Confirmación antes del 15 de noviembre de 2026, por formulario breve al no existir número de contacto. El límite de backend es el 14 de noviembre a las 23:59:59.999 en America/Mexico_City. El registro de Firebase para recibir confirmaciones sigue pendiente de activación. Sin fotografías personales ni música.

## Prompts finales

### Sobre cerrado (fondo transparente)
Use case: product-mockup. Create ONE photorealistic premium CLOSED invitation envelope, isolated on a genuinely transparent background, wide landscape composition 1536x1024. Front-facing straight camera. Pale powder blue handmade paper, royal blue satin ribbon tied in an elegant bow across its center, small round dark navy wax seal with only the letters OH in tasteful embossed lettering. Refined asymmetrical clusters of pale blue hydrangeas, small white roses and a few navy-blue leaves at the lower corners. Cool blue and white palette only, elegant and welcoming for a new-home Open House party. Entire SINGLE closed envelope visible with generous transparent margin, its main lower body broadly rectangular and at least 75% of canvas width. No second envelope, no open envelope, no table or background, no extra text.

### Sobre abierto (edición del cerrado, fondo transparente)
Edit the reference into ONE OPEN envelope only, for a smooth opening animation. Preserve exact powder blue handmade paper, delicate lower-corner pale blue hydrangeas, white roses and navy leaves, front-facing camera and broad straight rectangular geometry. Remove blue ribbon, bow and OH wax seal entirely. Fold the top triangular flap fully UP behind the envelope showing royal blue lining, visibly OPEN. Keep the main lower body bottom at88% image height, body width roughly90% canvas, top of body near45% imageheight, flap reaches8%. Entire SINGLE opened envelope visible on genuine transparent background, landscape1536x1024 with generous transparent margins. No closed envelope, no second envelope, no inset, no collage, no card, no letters or text. Photorealistic product styling matching reference.

### Arreglo floral (fondo transparente)
Use case: product-mockup. ONE photorealistic horizontal floral arrangement as a transparent PNG cutout for an elegant Open House invitation. Pale ice blue and sky blue hydrangeas, white roses, tiny cobalt flowers, delicate blue-green eucalyptus, subtle deep navy leaves. Airy tasteful composition, organic and asymmetric but balanced, entire arrangement visible, wide landscape1536x1024. Main garland occupies center 80% width with transparent margin. Palette icy blue #EAF8FF, pale sky #B3E2F8, vivid blue #168BE0 and deep navy #12385E, white. Soft realistic studio lighting. No text, no envelope, no vase, no background, no fake checkerboard.

### Portada
Use case: stylized-concept. Premium dreamy photorealistic architectural artwork for an elegant blue Open House digital invitation, portrait1024x1536. A welcoming beautiful new home in pale blue and ivory, arched navy front door, gentle sky-blue hydrangeas and white roses around the doorway, soft warm interior light suggesting a new beginning. No people. Airy, tasteful refined blue-themed celebration, powder blue, cyan highlights, royal blue and deep navy accents. House sits mostly in upper-middle frame, restrained pale blue sky and wall area with generous visual breathing room, darker soft blue lower area for later HTML text overlay. No letters, no typography, no logos, no collage or spreadsheet. Realistic textures, fine architectural details, high-end invitation artwork, beautiful natural lighting.
