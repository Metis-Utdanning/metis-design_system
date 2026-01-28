# Metis Design System

> **Design tokens og CSS-temaer for Metis Utdanning sine skoler og tjenester.**

**[Se Live Demo](https://metis-utdanning.github.io/metis-design_system/)**

---

## Hurtigstart

### Enkel integrasjon (Squarespace, statiske sider)

```html
<script src="https://cdn.jsdelivr.net/gh/Metis-Utdanning/metis-design_system@latest/dist/loader.js"
        data-theme="bpg"></script>
```

### Manuell import

```html
<!-- Base-stiler (alltid inkluder denne) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Metis-Utdanning/metis-design_system@latest/dist/metis-base.css">

<!-- Velg ett tema -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Metis-Utdanning/metis-design_system@latest/dist/themes/bpg.css">
```

### Programmatisk bytte

```javascript
// Last et tema
MetisTheme.load('metis-vgs');

// Hent tilgjengelige temaer
MetisTheme.getAvailable();
// → [{ id: 'bpg', name: 'Bergen Private Gymnas' }, ...]

// Lytt på tema-endringer
window.addEventListener('metis-theme-change', (e) => {
  console.log('Nytt tema:', e.detail.theme);
});
```

---

## Tilgjengelige temaer

| Tema-ID | Navn | Primærfarge | Status |
|---------|------|-------------|--------|
| `bpg` | Bergen Private Gymnas | #1F4739 (grønn) | ✅ Produksjon |
| `metis-vgs` | Metis Videregående | #EE2737 (rød) | ✅ Produksjon |
| `privatist` | Metis Privatist (alle) | #00b398 (teal) | ✅ Produksjon |
| `privatlarer` | Metis Privatlærer (alle) | #FF8000 (oransje) | ✅ Produksjon |
| `metis` | Metis Utdanning (generell) | #188AAD (cyan-blå) | ✅ Produksjon |

Se [THEME-STATUS.md](THEME-STATUS.md) for detaljer om hva som mangler.

---

## Mappestruktur

```
metis-design_system/
├── dist/                    # CDN-klare filer
│   ├── metis-base.css       # Base-komponenter
│   ├── themes/              # Tema-filer
│   │   ├── bpg.css
│   │   ├── metis-vgs.css
│   │   ├── privatist.css
│   │   ├── privatlarer.css  # TODO
│   │   └── metis.css        # TODO
│   └── loader.js            # Dynamisk tema-laster
│
├── src/                     # Kildefiler
│   ├── base/                # Base-stiler
│   └── tokens/              # Design tokens per tema
│
├── demo/                    # Live demo
│   └── index.html
│
├── docs/                    # Dokumentasjon
│   ├── GETTING-STARTED.md
│   └── DATABASE-PLAN.md
│
├── CLAUDE.md                # AI-kontekst
└── THEME-STATUS.md          # Oversikt over tema-status
```

---

## CSS Custom Properties

Alle temaer bruker samme variabel-namespace:

```css
/* Farger */
--metis-primary
--metis-primary-hover
--metis-primary-light
--metis-secondary
--metis-secondary-muted

/* Tekst */
--metis-text-primary
--metis-text-secondary
--metis-text-muted
--metis-text-inverse

/* Typografi */
--metis-font-heading
--metis-font-body
--metis-font-size-h1 ... --metis-font-size-h6

/* Spacing */
--metis-space-1 ... --metis-space-20

/* Shadows */
--metis-shadow-xs ... --metis-shadow-xl

/* Border radius */
--metis-radius-sm ... --metis-radius-full
```

Se [docs/TOKENS.md](docs/TOKENS.md) for komplett referanse.

---

## Bruk med Squarespace

1. Gå til **Settings → Advanced → Code Injection**
2. Lim inn i **Header**:

```html
<script src="https://cdn.jsdelivr.net/gh/Metis-Utdanning/metis-design_system@latest/dist/loader.js"
        data-theme="bpg"></script>
```

3. Bruk CSS-klassene i Squarespace:

```html
<button class="metis-btn metis-btn-primary">Søk nå</button>
```

---

## For AI-assistenter

Se [CLAUDE.md](CLAUDE.md) for maskinlesbar kontekst om dette designsystemet.

---

## Relaterte prosjekter

| Repo | Beskrivelse |
|------|-------------|
| [Metis-Utdanning/MetisDB](https://github.com/Metis-Utdanning/MetisDB) | Elevregister og API |
| [fredeids-metis/school-data](https://github.com/fredeids-metis/school-data) | Fagdata og studieplanlegger |

---

## Lisens

Intern bruk - Metis Utdanning AS
