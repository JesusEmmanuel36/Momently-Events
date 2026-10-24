# Luis Antonio y Erika

Ruta: `/eventos/luis-y-erika`.
Novios: Luis Antonio Marín López y Erika Mendoza Castellanos.
Domingo 27 de junio de 2027, Villa de Zaachila, Oaxaca. Cuenta regresiva al comienzo del día; no se asume definitivo el horario de misa.

## Lugares y horarios
- Parroquia de Santa María de la Natividad, Santa María Zaachila. Misa 10:00 a. m. expresamente por confirmar. Maps: https://maps.app.goo.gl/RB3TGKeGbFBc2hwF7?g_st=iw
- Calenda 11:30 a. m., de la iglesia al salón, condicionada a la confirmación de la misa de las 10:00. Sección destacada invita a que asistan muchas personas y explica el deseo de conservar en video el recorrido.
- Recepción 1:00 p. m., Salón Los Encinos, Calle Zetobaa 514, San Jacinto, 71310 Villa de Zaachila, Oaxaca. Maps: https://maps.app.goo.gl/jeQijnSPW3iLp4eT7?g_st=iw
- Comida 2:00 p. m., brindis 4:00 p. m., baile de los novios 4:30 p. m., apertura de pista 6:00 p. m. Sin hora de término inventada.

## Familia
Papás del novio: Jesús Marín Velazco y Josefina López García.
Mamá de la novia: Victorina Mendoza Castellanos.
Tíos de la novia: Edith Coache Mendoza y José Eduardo Ormachea Mendoza.
Padrinos de velación: Javier Monroy Carreño y Ana María Maza Barrera.

## Diseño y recursos
Temática oaxaqueña inspirada en Guelaguetza, azul y blanco, bordados, calenda y textil. Sobres cerrado/abierto y cinco elementos IA: portada, arreglo floral, calenda, iglesia conceptual y franja textil. La ilustración de iglesia no se presenta como fotografía exacta de la parroquia.
Sin fotografías personales. Música existente `/audio/luis-y-erika.mp3`, etiqueta «Nuestra canción», reproducción al abrir y control de pausa. No se inventó título del audio de TikTok.
No se proporcionaron vestimenta, regalos ni contacto: se omiten.

## Pases y fotografías
Pases personalizados activados en Firebase; `/eventos/luis-y-erika/pase/[token]` muestra nombre y número de lugares contando a la persona titular, con confirmación y mensaje. La ruta pública orienta al enlace personal. No se crearon cuentas ni invitados ni confirmaciones reales de prueba.
QR estable a `/eventos/luis-y-erika/fotos`, se puede guardar antes del evento. La carga se bloquea en cliente y servidor hasta `2027-06-27T00:00:00-06:00`. Sin cierre posterior inventado. Álbum público aislado por carpeta, y galería/descarga de fotos disponibles desde el panel del evento.

## Verificación
39 pruebas correctas de pases, seguridad y fotos, incluidas pruebas nuevas de asignación, actualización sin duplicados, apertura en la fecha de Oaxaca y aislamiento del álbum. API real de subida devuelve 403 `photos_not_open` antes de fecha sin contactar al almacenamiento.
Vista móvil 390 px y escritorio 1440 px sin desbordamiento; sobre abierto centrado y de proporciones naturales. Audio real probado en silencio. Nombres, itinerario, notas provisionales, Maps y QR verificados en navegador.
Publicación de código en Vercel pendiente.

Pase probado en navegador con datos ficticios de 4 lugares y petición interceptada: selección limitada a los lugares asignados y estado de confirmación guardada correcto. Sin escrituras reales. Ruta temporal de QA retirada al terminar.
