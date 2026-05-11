# Påkrevde tokens per tema

Alle temaer MÅ definere disse CSS-variablene:

```css
[data-theme="eksempel"] {
  /* PÅKREVD - Primærpalett */
  --metis-primary: <farge>;
  --metis-primary-hover: <farge>;
  --metis-primary-light: <farge>;
  --metis-primary-rgb: <r>, <g>, <b>;

  /* PÅKREVD - Sekundærpalett */
  --metis-secondary: <farge>;
  --metis-secondary-muted: <farge>;

  /* PÅKREVD - Tekst */
  --metis-text-primary: <farge>;
  --metis-text-secondary: <farge>;
  --metis-text-muted: <farge>;
  --metis-text-inverse: <farge>;

  /* PÅKREVD - Utvidet palett */
  --metis-dark: <farge>;
  --metis-peach: <farge>;
  --metis-peach-light: <farge>;

  /* PÅKREVD - Shadows (må bruke primærfarge) */
  --metis-shadow-xs: 0 1px 2px rgba(<primary-rgb>, 0.04);
  --metis-shadow-sm: 0 2px 4px rgba(<primary-rgb>, 0.06);
  --metis-shadow-md: 0 4px 12px rgba(<primary-rgb>, 0.08);
  --metis-shadow-lg: 0 8px 24px rgba(<primary-rgb>, 0.12);
  --metis-shadow-xl: 0 16px 48px rgba(<primary-rgb>, 0.16);

  /* PÅKREVD - Borders */
  --metis-border-subtle: rgba(<primary-rgb>, 0.08);
  --metis-border-default: rgba(<primary-rgb>, 0.12);
  --metis-border-strong: rgba(<primary-rgb>, 0.2);
}
```
