# Tema-status

> Oversikt over alle temaer i Metis Design System.

---

## Alle temaer komplett!

| Tema-ID | Navn | Primærfarge | Sekundærfarge | Kilde | Fil |
|---------|------|-------------|---------------|-------|-----|
| `bpg` | Bergen Private Gymnas | #1F4739 (mørkegrønn) | #E8F5A3 (lime) | bpg-brand.css | `dist/themes/bpg.css` |
| `metis-vgs` | Metis Videregående | #EE2737 (rød) | #F6E948 (gul) | Squarespace | `dist/themes/metis-vgs.css` |
| `privatist` | Metis Privatist | #00b398 (teal) | #f9f3e6 (beige) | Squarespace | `dist/themes/privatist.css` |
| `privatlarer` | Metis Privatlærer | #FF8000 (oransje) | #18405F (mørk blå) | metispl.no | `dist/themes/privatlarer.css` |
| `metis` | Metis Utdanning | #188AAD (cyan-blå) | #D6E4EB (lys blå) | metisutdanning.no | `dist/themes/metis.css` |

---

## Enhet → Tema mapping

| Enhet | Kortnavn | Type | Tema |
|-------|----------|------|------|
| Metis Utdanning AS | MU | parent | `metis` ✅ |
| Bergen Private Gymnas | BPG | school | `bpg` ✅ |
| Metis Videregående Skole | MVS | school | `metis-vgs` ✅ |
| Metis Privatist Bergen | MPB | commercial | `privatist` ✅ |
| Metis Privatist Oslo | MPO | commercial | `privatist` ✅ |
| Metis Privatist Stavanger/Sandnes | MPSS | commercial | `privatist` ✅ |
| Metis Privatlærer | MPL | commercial | `privatlarer` ✅ |
| Metis Privatlærer Oslo | MPLO | commercial | `privatlarer` ✅ |
| Metis Privatlærer Stavanger | MPLS | commercial | `privatlarer` ✅ |
| Metis Skolen | MS | school | `metis` ✅ |
| Metis Film & Spill | MFS | department | `metis` ✅ |

---

## Fargekilder

Fargene er hentet fra eksisterende Squarespace-sider via `/site.css`:

| Tema | Kilde-URL | Metode |
|------|-----------|--------|
| `bpg` | Eksisterende bpg-brand.css | Manuelt definert |
| `metis-vgs` | Squarespace eksport | Eksisterende |
| `privatist` | Squarespace eksport | Eksisterende |
| `privatlarer` | https://metispl.no/site.css | HSL → Hex konvertering |
| `metis` | https://www.metisutdanning.no/site.css | HSL → Hex konvertering |

---

## Hvordan oppdatere farger

1. Hent farger fra Squarespace:
   ```
   https://{side}.no/site.css
   ```

2. Finn HSL-verdier (søk etter `--darkAccent-hsl`, `--accent-hsl`, etc.)

3. Konverter til Hex og oppdater `src/tokens/{tema}.css`

4. Kopier til `dist/themes/`

5. Test i `demo/index.html`
