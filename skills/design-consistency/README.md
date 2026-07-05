# Design Consistency — README

## What is this?

A reusable, brand-agnostic agent skill that enforces consistent use of design
tokens, UI primitives, and brand guidelines across any project. It provides a
structured framework for organizing your design system so the AI agent produces
on-brand output every time.

## Quick start

1. Copy this `design-consistency/` folder into your project's skills directory
   (e.g. `.agents/skills/design-consistency/`).
2. Create your brand-specific files following the customization checklist below.
3. The agent will use these as the source of truth for all UI work.

## Directory structure (template)

```
your-project/
└── .agents/
    └── skills/
        └── design-consistency/
            ├── SKILL.md               ← Agent skill manifest
            ├── README.md              ← Brand context (this file — customize)
            ├── INTEGRATION.md         ← Framework integration guide
            ├── tokens.css             ← Design tokens (colors, type, spacing)
            ├── framework.preset.js    ← Tailwind / Stitches / etc. preset
            ├── styles.css             ← Single CSS import entry
            ├── fonts/                 ← Self-hosted typefaces
            ├── assets/
            │   ├── logos/             ← Brand logos and marks
            │   ├── gradients/         ← Brand gradient assets
            │   └── brand-elements/    ← Textures, patterns, etc.
            ├── preview/               ← Visual specimens
            └── ui_kits/
                ├── primitives/        ← Shared atoms (Button, Input, etc.)
                ├── app/               ← Dashboard / app kit
                └── website/           ← Marketing / website kit
```

## How to customize

### 1. Define your tokens (`tokens.css`)

```css
:root {
  /* Primary palette */
  --bg:           #F5F5F5;
  --ink:          #1A1A1A;
  --ink-muted:    #666666;

  /* Accent palette */
  --accent-1:     #2563EB;
  --accent-2:     #7C3AED;

  /* Status */
  --status-success: #16A34A;
  --status-warning: #D97706;
  --status-error:   #DC2626;
  --status-info:    #0284C7;

  /* Type scale */
  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;

  /* Spacing (8pt grid) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;

  /* Data visualization */
  --dataviz-1: #2563EB;
  --dataviz-2: #7C3AED;
  --dataviz-3: #DB2777;
  --dataviz-4: #D97706;
  --dataviz-5: #16A34A;
  --dataviz-6: #0284C7;
}
```

### 2. Write your brand context (`README.md`)

Replace this file with your brand's specific guidelines covering:
- Who the brand is and what it does
- Brand pillars and personality
- Voice and tone guidelines
- Visual foundations (color rationale, typography choices, spacing philosophy)
- Iconography conventions
- Data visualization rules
- Component catalog

### 3. Create the integration guide (`INTEGRATION.md`)

Document how to connect the design tokens and components to your specific
framework and build tool (Vite, Next.js, Webpack, etc.).

### 4. Build your UI kits

Populate the `ui_kits/` directories with your actual components:
- `primitives/` — Framework-specific shared atoms
- `app/` — Dashboard and internal tool patterns
- `website/` — Marketing and public-facing sections

## License

MIT
