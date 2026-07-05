# Integration Guide — Design Consistency

Guide to connect the design system with your project's production stack.

---

## 1. CSS Tokens

Import the design tokens CSS file in your project's entry CSS:

```css
/* src/index.css or src/global.css */
@import 'path/to/design-consistency/tokens.css';

/* If using Tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Alternative: copy `tokens.css` and `fonts/` to your project's source directory,
adjusting `@font-face` paths accordingly.

---

## 2. Framework preset (Tailwind example)

In your `tailwind.config.js`:

```js
import designPreset from 'path/to/design-consistency/framework.preset.js';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [designPreset],
  theme: { extend: {} },
  plugins: [],
};
```

Usage in components:

```tsx
<h1 className="font-display text-2xl text-ink">Page Title</h1>
<p className="text-base text-ink-muted">Description text</p>
<span className="font-mono text-xs text-ink-faint uppercase">Label</span>
```

---

## 3. Components

Component files in `ui_kits/` are **reference implementations** — they do not
compile within the skill folder. Copy them to your project's component directory
and adapt imports to match your conventions.

Recommended porting order:

1. Primitives (`Button`, `Input`, `Badge`, `Card`, `Modal`)
2. Shell (`AppShell`, `PageHeader`, `StatCard`)
3. Domain-specific (`DataTable`, `AlertRow`, `UploadZone`)

---

## 4. Fonts

Copy `fonts/` to your project's public directory and update paths in
`tokens.css` if necessary:

```css
src: url("/fonts/YourFont-Regular.woff2") format("woff2");
```

Web fonts from CDNs (Google Fonts, etc.) can be loaded via `<link>` or
`@import` — already included in `tokens.css` if configured.

---

## 5. Icons

Use your chosen icon library with the brand-standard stroke width.

Example with Lucide React:

```tsx
import { Search } from 'lucide-react';
<Search size={20} strokeWidth={1.5} />
```

---

## 6. Charts and data visualization

Use your project's chart library with the `--dataviz-1…N` palette from
`tokens.css`. See `README.md` for detailed charting guidelines.

---

## 7. Brand assets

Copy only what is needed to your project's public assets directory:

- `assets/logos/` — Logo variants for different backgrounds
- `assets/brand-elements/` — Textures, patterns, decorative elements
- `assets/gradients/` — Brand gradient assets (only if the layout uses them)
