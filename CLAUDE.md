# Metis Design System - Kontekst for AI-assistenter

> **STATUS:** Produksjon
> **REPO:** https://github.com/Metis-Utdanning/metis-design_system
> **DEMO:** https://metis-utdanning.github.io/metis-design_system/

---

## Hurtigoversikt

Dette repoet inneholder CSS-stilark og design tokens for Metis Utdanning sine skoler og tjenester.

**Nøkkelfunksjoner:**
- Multi-tenant theming (flere skoler, samme kodebase)
- CSS Custom Properties for dynamisk temabytte
- CDN-klar distribusjon via GitHub Pages/jsDelivr

---

## Arkitektur

```
┌─────────────────────────────────────────────────────────────────┐
│  LAG 1: BASE (delt)                        dist/metis-base.css  │
│  • Reset, typografi, knapper, komponenter                       │
│  • Bruker kun semantiske CSS-variabler (--metis-*)              │
│  → Disse filene endres SJELDEN                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  LAG 2: TOKENS (per tema)                  dist/themes/*.css    │
│  • Definerer CSS Custom Properties                              │
│  • Farger, fonter, shadows per skole/tjeneste                   │
│  → Disse filene endres ved rebranding                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Temaer og status

| Tema-ID | Dekker | Primærfarge | Status |
|---------|--------|-------------|--------|
| `bpg` | Bergen Private Gymnas | #1F4739 | ✅ Komplett |
| `metis-vgs` | Metis Videregående Skole | #EE2737 | ✅ Komplett |
| `privatist` | Alle privatist-enheter (MPB, MPO, MPSS) | #00b398 | ✅ Komplett |
| `privatlarer` | Alle privatlærer-enheter (MPL, MPLO, MPLS) | #FF8000 | ✅ Komplett |
| `metis` | Metis Utdanning (generell/fallback) | #188AAD | ✅ Komplett |

### Enheter som dekkes av hvert tema

```
bpg          → Bergen Private Gymnas
metis-vgs    → Metis Videregående Skole
privatist    → Metis Privatist Bergen (MPB)
               Metis Privatist Oslo (MPO)
               Metis Privatist Stavanger/Sandnes (MPSS)
privatlarer  → Metis Privatlærer (MPL)
               Metis Privatlærer Oslo (MPLO)
               Metis Privatlærer Stavanger (MPLS)
metis        → Metis Utdanning AS (morselskap)
               Metis Skolen (MS)
               Metis Film & Spill (MFS)
               Fallback for ukjente enheter
```

---

## CSS Variable Namespace

```
--metis-{kategori}-{egenskap}[-{variant}]

Kategorier:
├── color    : --metis-primary, --metis-primary-hover, --metis-secondary
├── text     : --metis-text-primary, --metis-text-muted, --metis-text-inverse
├── font     : --metis-font-heading, --metis-font-body, --metis-font-size-h1
├── space    : --metis-space-1, --metis-space-4, --metis-space-8
├── radius   : --metis-radius-sm, --metis-radius-md, --metis-radius-lg
├── shadow   : --metis-shadow-sm, --metis-shadow-md, --metis-shadow-lg
├── border   : --metis-border-subtle, --metis-border-default
├── z-index  : --metis-z-modal, --metis-z-tooltip
└── duration : --metis-duration-fast, --metis-duration-normal
```

---

## Tema-applikasjon

```html
<!-- Metode 1: data-theme attributt (anbefalt) -->
<html data-theme="bpg">

<!-- Metode 2: JavaScript loader -->
<script src="dist/loader.js" data-theme="bpg"></script>

<!-- Metode 3: Manuell CSS-import -->
<link rel="stylesheet" href="dist/metis-base.css">
<link rel="stylesheet" href="dist/themes/bpg.css">
```

---

## Påkrevde tokens per tema

Alle temaer MÅ definere disse variablene:

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

---

## Filrelasjoner

```
dist/metis-base.css
  └── Importerer ingenting, bruker --metis-* variabler
      └── Forventer at tema-CSS er lastet først eller samtidig

dist/themes/bpg.css
  └── Definerer alle --metis-* variabler for BPG
  └── Scoped til [data-theme="bpg"]

dist/loader.js
  └── Laster metis-base.css + valgt tema dynamisk
  └── Setter data-theme på <html>
```

---

## Vanlige oppgaver

### Legge til nytt tema

1. Opprett `src/tokens/{tema-id}.css`
2. Definer alle påkrevde tokens (se over)
3. Kopier til `dist/themes/{tema-id}.css`
4. Oppdater `THEMES` i `dist/loader.js`
5. Oppdater `THEME-STATUS.md`
6. Test i `demo/index.html`

### Endre farge for eksisterende tema

1. Finn `src/tokens/{tema-id}.css`
2. Endre relevant CSS-variabel
3. Kopier til `dist/themes/`
4. Test i demo

### Bruke i ny app

```html
<script src="https://cdn.jsdelivr.net/gh/Metis-Utdanning/metis-design_system@latest/dist/loader.js"
        data-theme="bpg"></script>
```

---

## Filer du bør lese

- `THEME-STATUS.md` - Hvilke temaer som finnes/mangler
- `dist/themes/*.css` - Faktiske tema-definisjoner
- `demo/index.html` - Live eksempel på alle komponenter

---

## Relaterte systemer

| System | Beskrivelse | Relevans |
|--------|-------------|----------|
| MetisDB | Elevregister | Organisasjons-IDer (BPG, MVS, MPB, etc.) |
| school-data | Fagdata | Skolekonfigurasjoner |

---

## Fremtidig: Database-integrasjon

Det planlegges å kunne hente tema-overrides fra MetisDB API.
Se `docs/DATABASE-PLAN.md` for detaljer.

**VIKTIG:** Dette repoet inneholder INGEN database-credentials eller sensitiv info.
