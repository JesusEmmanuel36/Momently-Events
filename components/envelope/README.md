# Sobre reutilizable, sin imágenes

`CssEnvelope` dibuja papel, moño, sello y flores con HTML y CSS. No usa imágenes, SVG, canvas ni generación IA. Las paletas se aíslan por instancia mediante variables CSS; no cambian otros sobres ni estilos globales.

Uso mínimo:

```jsx
import { CssEnvelope } from '@/components/envelope/CssEnvelope';

<CssEnvelope color="#77815A" monogram="A&E" />
```

`color` cambia el moño y las rosas de acento. Brillos, sombras y relieve se calculan automáticamente. `monogram` admite una inicial o iniciales de pareja, como `D`, `A&E` o `M&J`; el tamaño se adapta al número de caracteres.

Paleta y tarjeta completas:

```jsx
<CssEnvelope
  monogram="A&E"
  colors={{
    paper: '#F2ECDF',
    ribbon: '#77815A',
    seal: '#BC994D',
    flowers: '#F0E6CB',
    accentFlowers: '#E9D5C5',
    leaves: '#7D927E',
  }}
  letter={{
    eyebrow: 'Nuestra boda',
    title: 'Ana & Eduardo',
    message: 'Te esperamos con mucho cariño',
    footer: '24 de octubre de 2026',
  }}
  onOpened={() => mostrarInvitacion()}
/>
```

`colors` acepta colores hex `#RGB` o `#RRGGBB`; los valores omitidos o inválidos conservan la paleta predeterminada. Si se usa también `color`, los valores explícitos de `colors` tienen prioridad.

Apertura controlada desde una invitación:

```jsx
const [open, setOpen] = useState(false);
<CssEnvelope open={open} onOpenChange={setOpen} monogram="A&E" />
<button onClick={() => setOpen(false)}>Cerrar</button>
```

Sin `open`, el componente maneja su propia apertura al tocar el sello. `defaultOpen` permite iniciar abierto. `onOpenChange(true)` ocurre al tocarlo; `onOpened` se ejecuta al terminar la animación, se cancela si se cierra o desmonta y respeta la reducción de movimiento. También admite `children` para reemplazar el contenido de la tarjeta, `showFlowers`, `maxWidth`, `className`, `openLabel` y `disabled`.

El componente ocupa el ancho disponible y reserva el espacio superior necesario para abrir la solapa. El contenedor padre controla su posición dentro de una invitación. Su ancho máximo predeterminado es 880px.

La ruta `/sobreprueba` permite probar iniciales, cuatro paletas y cada uno de los seis colores. Las invitaciones existentes conservan sus sobres actuales hasta que se integre explícitamente este componente en cada una.
