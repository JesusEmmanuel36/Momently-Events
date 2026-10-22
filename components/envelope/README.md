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

## Variante sencilla

Usar `variant="simple"` para papel plano, moño de color sólido, sello detallado, sombra interior y sombra leve en el cierre; sin flores ni texturas en el papel. `showBow={false}` oculta el moño conservando el sello como botón. En el creador, el interruptor se guarda como `decorations.envelopeBow`. Conserva la apertura y accesibilidad. `colors.paper`, `colors.ribbon`, `colors.seal` y `colors.sealText` controlan papel, moño, botón e iniciales. En admin se guarda como `decorations.envelopeVariant`; la variante anterior sigue siendo la predeterminada. Disponible en la plantilla flexible y en `/sobreprueba`.

El color de la hoja que sale del sobre se controla con `colors.letter`, independientemente del papel exterior, en ambas variantes. En el creador corresponde a `decorations.letterColor` (selector “Hoja interior del sobre”); en `/sobreprueba`, a “Hoja interior”. Si no se configura, conserva el aspecto anterior.
