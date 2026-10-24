# Asistente de invitaciones — conexión inicial

## Activación local

1. En https://platform.openai.com crea un proyecto para Momently y habilita la facturación de API.
2. Crea una clave en https://platform.openai.com/api-keys. No la pegues en conversaciones ni la subas a Git.
3. Agrégala a `.env.local` en la raíz del proyecto:

```
OPENAI_API_KEY=tu_clave
OPENAI_TEXT_MODEL=gpt-6.1-sol
```

4. Reinicia `npm run dev` y entra como administrador a Crear invitación.
5. Pega los datos y pulsa Generar propuesta. Revisa el resumen y los campos; pulsa Aplicar al formulario. Revisa la vista previa y guarda usando los controles habituales.

## Producción

En Vercel, proyecto Momently → Settings → Environment Variables, agrega OPENAI_API_KEY y OPENAI_TEXT_MODEL en los entornos donde quieras usarlo. Luego realiza un nuevo despliegue. La clave es exclusivamente del servidor y no lleva prefijo NEXT_PUBLIC_. Configura presupuesto y alertas en OpenAI; las alertas no sustituyen un límite de gasto implementado en la aplicación.

## Alcance de esta etapa

Datos, frases, paleta, opciones de RSVP/pases e itinerario. No genera imágenes ni publica automáticamente. Las imágenes de IA se conectarán en una etapa posterior. La propuesta se valida y solo admite campos conocidos; no puede modificar cuentas, claves, rutas o invitados. No modifica el slug existente. No se envía la lista de invitados ni contraseñas. El prompt y los campos relevantes se envían a OpenAI con autorización expresa del administrador. Se usa store:false; esto no equivale a una garantía de retención cero del proveedor.

Endpoint GET/POST /api/admin/ai/invitation, protegido por sesión de administrador y comprobación de origen para POST. Límite de 10 intentos por ventana de 15 minutos mediante el mecanismo existente. No hay reintentos automáticos de generación. Modelo configurable; máximo 7000 tokens de salida y tiempo de espera limitado. Se muestra consumo de la respuesta, no una factura ni gasto acumulado.

El costo incluye llamadas aunque no se apliquen sus resultados. La API se factura aparte de las suscripciones de ChatGPT/Codex.

## Verificación de implementación

Pruebas unitarias de límites y esquema; ESLint de archivos modificados; endpoint sin sesión devuelve 401. Prueba de navegador con respuesta simulada: revisión antes de aplicar, nombres, fecha y hora, selectores HEX, opciones e itinerario actualizados en el formulario sin guardarlo ni publicarlo. No se realizó ninguna llamada pagada: pendiente de configurar OPENAI_API_KEY y probar con una sesión de admin. Página temporal de prueba eliminada.

El botón Generar propuesta solo se deshabilita durante la generación. Una comprobación inicial negativa no bloquea reintentos; el servidor comprueba la clave en cada petición. Hay un botón para volver a comprobar configuración, solicitudes GET sin caché y mensajes que distinguen localhost de Vercel. Prueba de regresión: estado inicial configured:false, clic sin texto muestra instrucciones sin llamar a la API; con texto se genera y aplica correctamente una propuesta simulada.
