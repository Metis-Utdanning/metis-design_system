# Database-integrasjon for Metis Design System

> **STATUS:** Planlagt. Ikke implementert.

---

## Oversikt

Denne dokumentasjonen beskriver hvordan design tokens KAN hentes fra MetisDB i stedet for statiske CSS-filer. Dette muliggjør:

- Admin-grensesnitt for fargejustering
- A/B-testing av design
- Dynamisk rebranding uten deploy

---

## Sikkerhetsarkitektur

```
┌─────────────────────────────────────────────────────────────────┐
│  FRONTEND (Offentlig)                                           │
│  • Kun CSS/JS som serveres til nettleser                        │
│  • Ingen API-nøkler, ingen secrets                              │
│  • Kun LESING av publiserte tema-data                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓ HTTPS
┌─────────────────────────────────────────────────────────────────┐
│  CDN / CACHE LAG                                                │
│  • Cacher tema-responser (lang TTL)                             │
│  • Rate limiting                                                │
│  • Ingen direkte database-tilgang                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓ (Internt)
┌─────────────────────────────────────────────────────────────────┐
│  API SERVER                                                     │
│  • Autentiserer admin-brukere                                   │
│  • Genererer CSS fra database-tokens                            │
│  • Publiserer til CDN ved endringer                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓ (Kun internt)
┌─────────────────────────────────────────────────────────────────┐
│  DATABASE                                                       │
│  • Credentials kun på server                                    │
│  • Ingen public endpoints                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Hva som ALDRI skal i dette repoet

- Database connection strings
- API-nøkler
- Interne IP-adresser
- Admin-passord
- Miljøvariabler med secrets

---

## Foreslått database-schema

```sql
-- Temaer
CREATE TABLE design_themes (
  id VARCHAR(50) PRIMARY KEY,           -- 'bpg', 'metis-vgs', etc.
  name VARCHAR(100) NOT NULL,           -- 'Bergen Private Gymnas'
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Design tokens per tema
CREATE TABLE design_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  theme_id VARCHAR(50) REFERENCES design_themes(id),
  token_name VARCHAR(100) NOT NULL,     -- '--metis-primary'
  token_value VARCHAR(255) NOT NULL,    -- '#1F4739'
  token_category VARCHAR(50),           -- 'color', 'font', 'spacing'
  UNIQUE(theme_id, token_name)
);

-- Mapping: organisasjon → tema
CREATE TABLE organization_themes (
  organization_id CHAR(36) PRIMARY KEY, -- Fra organizations-tabellen
  theme_id VARCHAR(50) REFERENCES design_themes(id),
  custom_overrides JSON                 -- Org-spesifikke justeringer
);
```

---

## Foreslått API-kontrakt

```typescript
// GET /api/design/themes
// Returnerer liste over tilgjengelige temaer
interface ThemeListResponse {
  themes: Array<{
    id: string;
    name: string;
    isActive: boolean;
  }>;
}

// GET /api/design/themes/:themeId
// Returnerer tema med alle tokens
interface ThemeResponse {
  id: string;
  name: string;
  tokens: Record<string, string>; // { '--metis-primary': '#1F4739', ... }
  css?: string;                   // Pre-generert CSS
  lastModified: string;
}

// GET /api/design/themes/:themeId/css
// Returnerer ren CSS-fil
// Content-Type: text/css
// Cache-Control: public, max-age=86400
```

---

## Migrasjonssti

### Fase 1: Statiske filer (NÅ)
- CSS-filer i GitHub repo
- CDN via jsDelivr
- Manuell oppdatering

### Fase 2: JSON-config
- Build-script som genererer CSS fra JSON
- JSON-filer i repo
- Automatisk build ved push

### Fase 3: Database-backed
- JSON config hentes fra MetisDB ved build
- GitHub Actions genererer CSS
- Publiseres til CDN

### Fase 4: Real-time
- Tokens lagres i database
- Admin-UI for endringer
- Automatisk re-generering og cache-invalidering

---

## Implementeringsnotater

For fremtidig implementering, se:
- MetisDB API: `https://api.metisutdanning.no`
- Organisasjoner: `GET /api/organizations`

CSS-generering kan gjøres med en enkel template:

```javascript
function generateThemeCSS(themeId, tokens) {
  return `[data-theme="${themeId}"] {
${Object.entries(tokens).map(([k, v]) => `  ${k}: ${v};`).join('\n')}
}`;
}
```
