# Configuración de Firebase para Momently Events

La aplicación usa Firebase Authentication, Cloud Firestore y Firebase Storage. Las operaciones privilegiadas pasan por Firebase Admin SDK en rutas Node.js del servidor. Nunca agregues un archivo `service-account.json` al repositorio.

Las imágenes, el audio y los videos del editor se suben directamente a Cloudinary mediante cargas firmadas. Firebase Storage puede conservarse para compatibilidad, pero el editor principal ya no obliga a copiar enlaces ni depende de él para archivos nuevos.

## 1. Crear el proyecto

1. Entra a [Firebase Console](https://console.firebase.google.com/).
2. Crea un proyecto y registra una aplicación Web.
3. En **Authentication → Sign-in method**, habilita **Email/Password**.
4. En **Firestore Database**, crea la base de datos en modo producción.
5. En **Storage**, crea el bucket predeterminado.
6. Si está disponible en tu proyecto, activa **Email Enumeration Protection** en Authentication.

## 2. Variables locales

Copia `.env.example` como `.env.local` y completa:

```bash
cp .env.example .env.local
```

Las variables `NEXT_PUBLIC_FIREBASE_*` se obtienen en **Project settings → Your apps → SDK setup and configuration**. La API key web no es un secreto; la seguridad depende de Authentication, Rules y validación del servidor.

Para Firebase Admin ve a **Project settings → Service accounts → Generate new private key**. Copia únicamente los campos necesarios a las variables:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` — en una sola línea, conservando `\n`
- `FIREBASE_STORAGE_BUCKET`

No guardes el JSON descargado dentro del proyecto. Define también un valor largo y aleatorio para `RATE_LIMIT_PEPPER`.

## 3. Configurar Cloudinary

1. Crea una cuenta en [Cloudinary](https://cloudinary.com/) y abre el **Dashboard** de tu product environment.
2. Copia **Cloud name**, **API Key** y **API Secret**.
3. Agrégalos únicamente a `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

Reinicia `npm run dev` después de cambiar estas variables. `CLOUDINARY_API_SECRET` nunca debe llevar el prefijo `NEXT_PUBLIC_`, publicarse en Git ni enviarse al navegador. La aplicación genera la firma en una ruta protegida que exige una sesión administrativa.

## 4. Reglas e índices

Los archivos listos para desplegar son:

- `firestore.rules`
- `storage.rules`
- `firestore.indexes.json`
- `firebase.json`

Con Firebase CLI instalado y autenticado:

```bash
firebase use --add
firebase deploy --only firestore:rules,firestore:indexes,storage
```

También puedes copiar el contenido de `firestore.rules` y `storage.rules` en sus editores de Firebase Console. No reemplaces estas reglas por `allow read, write: if true`.

Configura una política TTL para el campo `expiresAt` de la colección `rateLimits` si deseas que Firebase elimine esos documentos automáticamente.

## 5. Crear el primer administrador

1. En Firebase Console abre **Authentication → Users**.
2. Crea tu usuario con correo y contraseña.
3. Copia el UID o usa su correo.
4. Con `.env.local` configurado ejecuta:

```bash
npm run set-admin -- UID_DEL_USUARIO
```

También funciona con correo:

```bash
npm run set-admin -- admin@ejemplo.com
```

El script agrega el Custom Claim `{ admin: true }`. Cierra sesión y vuelve a iniciarla para obtener un ID token actualizado.

## 6. Ejecutar y probar

```bash
npm install
npm run dev
```

1. Abre `/admin/login` e inicia sesión con el administrador.
2. En `/admin` selecciona **Crear boda**.
3. Completa los datos y guarda el borrador.
4. En edición puedes subir imágenes, audio o video y copiar sus URLs a la configuración.
5. Abre **Vista previa**; funciona aunque la boda sea borrador.
6. Pulsa **Publicar** en el listado de bodas.
7. Abre `/boda/tu-slug` y envía un RSVP.
8. En edición, crea un enlace desde **Acceso al panel** y compártelo con los novios.
9. El cliente abre `/panel/activar?...`, crea su cuenta o inicia sesión.
10. En `/panel` verá confirmaciones en tiempo real y podrá exportarlas en CSV.

## 7. Vercel

En **Project Settings → Environment Variables** agrega todas las variables de `.env.example`. Usa como `APP_URL` la URL pública exacta, por ejemplo `https://eventos.midominio.com`, sin slash final. La private key debe mantenerse solo en variables del servidor; nunca uses prefijo `NEXT_PUBLIC_` para credenciales Admin.

Después de cambiar variables, vuelve a desplegar. Verifica que `/admin/login`, `/panel/login` y una invitación publicada funcionen.

## 8. Emuladores opcionales

`firebase.json` incluye Auth, Firestore y Storage:

```bash
firebase emulators:start
```

Para usarlos, define las variables estándar `FIREBASE_AUTH_EMULATOR_HOST`, `FIRESTORE_EMULATOR_HOST` y `FIREBASE_STORAGE_EMULATOR_HOST` antes de iniciar Next.js.

## Colecciones creadas

- `events/{eventId}`: boda, propietarios, estado, datos públicos y configuración.
- `events/{eventId}/rsvps/{rsvpId}`: confirmaciones privadas.
- `events/{eventId}/guests/{guestId}`: lista privada de invitados.
- `slugs/{slug}`: reserva única del enlace público.
- `ownerInvites/{inviteId}`: invitaciones de acceso con token hasheado.
- `auditLogs/{logId}`: acciones administrativas sin datos sensibles del RSVP.
- `rateLimits/{hash}`: contadores temporales; nunca almacena la IP original.

## Seguridad importante

- Firebase Admin nunca se importa en componentes cliente.
- Admin se valida con Custom Claims en cada endpoint.
- Los propietarios se verifican contra `ownerUids` en cada operación.
- RSVP público pasa por servidor, Zod, honeypot, deadline y rate limit.
- Los tokens de edición e invitación se guardan únicamente como SHA-256.
- Firestore permite al panel leer sus datos, pero bloquea toda escritura directa.
- Storage permite lectura pública de media del evento y escritura únicamente a administradores autenticados.
