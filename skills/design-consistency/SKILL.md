---
name: design-consistency
description: >
  Brand-agnostic UI kit and design consistency skill for production apps and
  HTML mocks. Enforces consistent use of design tokens, primitives, surface
  kits, and brand guidelines across the project. Configure with your own brand
  identity, colors, typography, and component library.
user-invocable: true
license: MIT
---

Read [`README.md`](README.md) for full brand context. For production integration
with your framework and build tool, read [`INTEGRATION.md`](INTEGRATION.md).

If the user invokes this skill without guidance, ask what they want to build
(app screen, marketing page, or component) and act as an on-brand UI designer.

---

## Architecture (three layers)

1. **Tokens** — Design tokens CSS file + optional framework preset (Tailwind,
   Stitches, etc.)
2. **Primitives** — Shared UI atoms: Button, Input, Badge, Card, Modal, etc.
3. **Surface kits**
   - **App / dashboard** — Shell, tables, alerts, forms, login, navigation
   - **Marketing / website** — Hero, services, about, footer, CTAs

---

## Agent workflow

### Phase 1 — Tokens

- Import the project's design tokens CSS (variables, color palette, type scale).
- For Tailwind projects, apply the framework preset per `INTEGRATION.md`.
- Use the **marketing type scale** for landing pages and the **app type scale**
  for dashboards and internal tools.

### Phase 2 — Primitives

- Compose UI from the shared primitives component library.
- All primitives should use design tokens — no hardcoded colors, font sizes, or
  spacing values.

### Phase 3 — Surface

- **Product / dashboard** → Use the app surface kit components.
- **Marketing / website** → Use the website surface kit sections.

---

## File index (template — adapt to your project)

| Path                     | Purpose                                            |
|--------------------------|----------------------------------------------------|
| `README.md`              | Brand voice, visual foundations, component catalog  |
| `SKILL.md`               | This file — agent skill manifest                   |
| `INTEGRATION.md`         | Framework integration guide                        |
| `tokens.css`             | Design tokens (colors, type scales, spacing, status)|
| `framework.preset.js`    | Framework theme mapping (Tailwind, etc.)            |
| `fonts/`                 | Self-hosted font files                             |
| `assets/logos/`          | Logo and symbol variants                           |
| `assets/gradients/`      | Brand gradient assets                              |
| `assets/brand-elements/` | Additional brand textures and elements             |
| `preview/`               | Foundation and component specimens                 |
| `ui_kits/primitives/`    | Shared UI atoms                                    |
| `ui_kits/app/`           | Dashboard / app kit                                |
| `ui_kits/website/`       | Marketing / website kit                            |
| `styles.css`             | Single import entry for all CSS layers             |

---

## Working rules

### Typography

- **Display font:** Used for titles, headings, and emphasis. Define weight and
  style in the brand configuration.
- **Body font:** Used for body text, UI elements, and labels.
- **Mono font:** Used for code, tags, numerals, and small labels (often
  UPPERCASE).

### Color

- Define a **primary neutral palette** (background, ink, muted) and a
  **secondary accent palette** (used sparingly).
- Status colors use dedicated `--status-*` tokens derived from the brand
  palette, not generic red/amber/green.
- Data visualization uses a `--dataviz-1…N` sequence.

### Voice and content

- Match the project's established tone and language.
- Maintain consistency within each surface (app vs. marketing may differ in
  register).

### Visual identity

- Define the overall aesthetic: editorial, minimal, bold, corporate, playful,
  etc.
- Set rules for corners, borders, shadows, motion, and states.
- Use real brand assets — do not recreate logos or brand elements by hand.

### Icons

- Choose a consistent icon library (e.g. Lucide, Heroicons, Material Symbols).
- Define standard stroke width and size to match the brand weight.

### Data visualization

- Define a chart library (Chart.js, Recharts, D3, etc.).
- Use the `--dataviz-*` token sequence for series colors.
- Follow consistent chart styling: grid, axes, tooltips, legends.

---

## HTML mock scaffold

For throwaway prototypes in the user's workspace (not inside the skill folder):

```
{mock-name}/
├── index.html
├── tokens.css            ← copy from skill root
├── primitives.css        ← copy from ui_kits/primitives/
├── app.css or site.css   ← copy kit CSS as needed
├── fonts/                ← copy entire fonts/
└── assets/               ← copy only variants the mock uses
```

Use relative paths only. Do not embed base64 unless the user explicitly
requests a single portable HTML file.

---

## Production code

1. Follow `INTEGRATION.md` to wire tokens and framework preset into the project.
2. Copy/adapt primitives into the project's component directory
   (e.g. `src/components/ui/`).
3. Copy/adapt surface kit patterns as needed.
4. Match existing project conventions — this skill is the brand source of truth,
   not a runtime dependency.

---

## Customization for your project

When adopting this skill, create your own brand-specific versions of:

| Item                  | What to define                                      |
|-----------------------|-----------------------------------------------------|
| `tokens.css`          | CSS custom properties: colors, type scale, spacing   |
| `framework.preset.js` | Tailwind/Stitches/etc. theme extension              |
| `fonts/`              | Your brand typefaces                                 |
| `assets/`             | Logos, gradients, brand textures                     |
| `ui_kits/primitives/` | Your shared atoms (Button, Input, Card, etc.)        |
| `ui_kits/app/`        | Dashboard components (Shell, Tables, Stats, etc.)    |
| `ui_kits/website/`    | Marketing sections (Hero, Footer, CTA, etc.)         |
| `README.md`           | Full brand guidelines, voice, visual foundations      |
| `INTEGRATION.md`      | Step-by-step for your specific build tool + framework |

### Brand configuration checklist

Before deploying this skill, answer these questions:

1. **What are the brand's primary and secondary colors?**
2. **What typefaces are used for display, body, and mono?**
3. **What is the overall aesthetic?** (editorial, corporate, playful, minimal, etc.)
4. **What icon library matches the brand weight?**
5. **What chart library is used in the project?**
6. **What is the documentation language?** (English, Spanish, etc.)
7. **What framework and build tool is the project using?** (Vite+React, Next.js, etc.)
8. **What are the component naming conventions?** (PascalCase, kebab-case, etc.)
