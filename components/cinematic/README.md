# Momently Cinema

Ruta: `/cinematic-demo`. Demo independiente dentro del App Router existente; pareja ficticia Valeria y Mateo y datos de muestra. No modifica las rutas de invitaciones ni los paneles.

## Escenas
1. Mesa, habitación y portarretrato. La foto se coloca dentro del marco real de la imagen.
2. Entrada en el retrato de la pareja y presentación de nombres y fecha.
3. Jardín y recorrido de su historia.
4. Manos, anillo y promesa.
5. Retrato íntimo junto a una ventana.
6. Arco de boda al atardecer; después aparecen lugares y confirmación.

## Archivos
- `config/cinematic/demo.js`: nombres, fecha, lugares, música, paleta, escenas y coordenadas del marco.
- `config/cinematic/image-prompts.js`: siete prompts detallados. Las escenas con pareja usaron el retrato 02 como referencia de identidad.
- `lib/animation/cinematic-timeline.js`: GSAP + ScrollTrigger, contexto propio y limpieza en desmontaje. No elimina triggers de otras páginas.
- `Scenes.js`: composición del cuadro y escenas reutilizables.
- `EventDetails.js`: detalles y formulario de demostración.
- `public/images/cinematic-demo/`: siete WebP optimizados, incluidas versiones de habitación para móvil y escritorio.

## Reemplazar contenido
Cambiar la configuración; conservar IDs para identificar escenas. Los presets están definidos por la secuencia de cámara y la posición de la escena. Al cambiar la habitación hay que medir el interior del marco y actualizar `frame` y `frameMobile`. El retrato dentro del cuadro y la segunda escena deben usar la misma imagen para que la transición conserve continuidad. La versión móvil se selecciona mediante picture; sus coordenadas y zoom son independientes.

## Comportamiento
Scroll nativo, stage sticky, scrub de cámara, escala/parallax y revelación de textos. Los enlaces a detalles y el salto accesible funcionan sin bloquear el scroll. Con reducción de movimiento o sin JavaScript, las escenas aparecen como una secuencia estática legible. No se usa captura de rueda ni smooth-scroll artificial. Música opcional, activada por el usuario, nunca automática.

El formulario final es demo: valida un nombre, muestra una confirmación y NO envía solicitudes, no usa Firebase ni guarda datos. Integrar con un evento real antes de comercializar una versión para una pareja.

## Verificación
`npm run lint`
`npm run typecheck:cinematic`
`npm run build`

El proyecto sigue en JavaScript. El typecheck con TypeScript verifica los módulos de datos y animación mediante JSDoc y declaraciones; los componentes JSX se verifican con ESLint y el build de Next.

Para QA visual: comprobar entrada y zoom al marco, todas las escenas en ambas direcciones, 390/820/1440 px, enlaces de salto, reducción de movimiento y formulario demo. Los assets están comprimidos conservando su resolución nativa. Las fotografías son generadas con image_gen integrada; no representan personas reales.

## Posibles siguientes mejoras
Sustituir datos y lugares de muestra por los de un evento real, conectar su formulario a un panel autorizado, dirigir más variaciones de acción de la pareja y producir imágenes nativas mayores si se necesita máxima nitidez en pantallas 4K. El zoom actual conserva el encuadre al cubrir cada viewport y se revisó en navegador; no es una escena WebGL ni vídeo.
