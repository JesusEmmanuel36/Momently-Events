# Sobres de las invitaciones

El usuario ha reportado varias veces que el sobre abierto aparece en una esquina o aplastado. Evitar este problema en nuevas invitaciones y correcciones:

- Usar como referencia las capas `openEnvelopeLayer` y `openEnvelopeArtwork` de RogelioBlancaBautizoTemplate y CatalinaJorgeTemplate.
- Para el sobre abierto, usar una imagen con `width` y `height` originales, CSS `width: 100%` y `height: auto`, dentro de una capa posicionada. No usar `Image fill` ni estirar la altura de la imagen.
- Centrar la capa con `left: 50%` y un margen izquierdo igual a la mitad negativa de su ancho. No centrar con `transform`, porque la animación de apertura modifica esa propiedad.
- Calibrar el ancho y la posición inferior según el cuerpo visible de cada imagen y su margen transparente; no copiar porcentajes entre imágenes distintas.
- Comprobar que el cuerpo abierto quede centrado, tenga un ancho similar al cerrado y conserve sus proporciones en móvil y escritorio.
- Si solo se pide corregir el abierto, conservar la imagen y presentación del sobre cerrado.

## Recursos de invitaciones de clientes

Por indicación del usuario, las nuevas invitaciones de clientes deben usar imágenes generadas con IA para los sobres y arreglos florales, como las invitaciones anteriores. No sustituirlos por `CssEnvelope` ni `CssFloralArrangement`; esos componentes se reservan para el creador de invitaciones del admin. Conservar las fotografías proporcionadas por el cliente. Esta preferencia no autoriza cambios retroactivos en otras invitaciones.
