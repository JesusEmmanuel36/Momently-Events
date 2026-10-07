# Pases personalizados de Alejandra y David

Disponible únicamente para `/eventos/alejandra-y-david`.

## Activación

Usa el panel del evento. Si todavía no está activado:

```sh
npm run provision-event -- alejandra-y-david CORREO_DEL_CLIENTE https://momentlyevents.vercel.app
```

Abre el enlace de activación que entregue el comando y entra al panel con la cuenta propietaria. No hace falta ejecutar otra provisión si el evento ya está activado.

## Crear y enviar

1. En el panel del evento, abre **Invitados**. La página mostrará **Invitados y pases**.
2. Escribe el nombre que aparecerá en la invitación, por ejemplo **Familia López**, y el total de lugares asignados, por ejemplo **4**.
3. Pulsa **Crear pase** y después **Copiar enlace**. Envía ese enlace personalmente por WhatsApp u otro medio. Desde la web publicada, el enlace apunta al dominio publicado.
4. **Ver pase** permite revisar el resultado antes de enviarlo.

Los lugares incluyen a la persona titular: 4 lugares significa hasta 4 personas en total, no 4 acompañantes además del titular. Se pueden asignar entre 1 y 20 lugares por pase. Si ya había invitados creados en la lista, pulsa **Generar enlace** para convertirlos en pases.

## Qué verá el invitado

- El sobre y la invitación habitual, con su nombre y lugares reservados.
- Un apartado **Tu pase personal** para confirmar sí o no.
- Si acepta, puede elegir entre 1 y el total de lugares asignados.
- Puede dejar un mensaje y editar después su respuesta usando el mismo enlace.

La respuesta se guarda en las confirmaciones habituales del panel. El titular se cuenta como una persona y el resto como acompañantes. Cada pase utiliza una sola confirmación; responder otra vez desde otro teléfono actualiza esa confirmación.

El enlace general de Alejandra y David muestra la invitación y pide abrir el pase personalizado para confirmar. La API de confirmación general también rechaza respuestas para este evento: no permite eludir los lugares asignados.

## Modificar o revocar

- **Editar** cambia nombre o lugares y conserva el mismo enlace. El servidor toma siempre los datos actuales del pase.
- Para reducir lugares por debajo de las personas ya confirmadas, ajusta primero esa confirmación en el panel.
- **Eliminar** revoca el pase: el enlace deja de funcionar. Conserva las confirmaciones ya registradas, para que puedas revisarlas o eliminarlas desde el panel si corresponde.
- Cada enlace corresponde a una persona o familia. Quien recibe ese enlace puede consultar y actualizar su pase; no debe compartirse como enlace general.

Los teléfonos y notas de la lista son privados y no se muestran en la invitación.

## Validación

Se probaron los límites y la protección de datos, creación, edición, revocación, respuestas repetidas y acceso exclusivo del propietario a las rutas de administración. Una prueba real en Firestore guardó una respuesta y actualizó el mismo registro; el evento temporal y sus datos de prueba se eliminaron. Las funciones de fotos/QR y las invitaciones de otros eventos se mantienen.
