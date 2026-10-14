# Arreglo floral en CSS

Rosas por capas, botones, flores pequeñas y follaje con nervaduras. No requiere imágenes.

```jsx
import { CssFloralArrangement } from '@/components/floral/CssFloralArrangement';

<CssFloralArrangement colors={colors} />
```

Comparte el objeto `colors` del sobre: `flowers` para rosas claras, `accentFlowers` para rosas de acento y `leaves` para hojas. También admite `color` para el acento, `maxWidth`, `className` y `label` accesible. Los tonos de brillo y sombra se calculan con el mismo tema del sobre.

Vista interactiva: `/sobreprueba`.
