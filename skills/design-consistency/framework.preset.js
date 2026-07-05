/**
 * Tailwind CSS Preset — Design Consistency
 *
 * Maps the design tokens from tokens.css into Tailwind theme extensions.
 * Replace values with your brand's actual design tokens.
 *
 * Usage in tailwind.config.js:
 *   import designPreset from 'path/to/framework.preset.js';
 *   export default { presets: [designPreset], ... };
 */

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      /* ─── Colors ─── */
      colors: {
        bg: {
          DEFAULT:  'var(--bg)',
          elevated: 'var(--bg-elevated)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          muted:   'var(--ink-muted)',
          faint:   'var(--ink-faint)',
        },
        accent: {
          DEFAULT:   'var(--accent-primary)',
          secondary: 'var(--accent-secondary)',
          subtle:    'var(--accent-subtle)',
        },
        status: {
          success:    'var(--status-success)',
          successBg:  'var(--status-success-bg)',
          warning:    'var(--status-warning)',
          warningBg:  'var(--status-warning-bg)',
          error:      'var(--status-error)',
          errorBg:    'var(--status-error-bg)',
          info:       'var(--status-info)',
          infoBg:     'var(--status-info-bg)',
        },
        dataviz: {
          1: 'var(--dataviz-1)',
          2: 'var(--dataviz-2)',
          3: 'var(--dataviz-3)',
          4: 'var(--dataviz-4)',
          5: 'var(--dataviz-5)',
          6: 'var(--dataviz-6)',
        },
      },

      /* ─── Typography ─── */
      fontFamily: {
        display: ['var(--font-display)'],
        body:    ['var(--font-body)'],
        mono:    ['var(--font-mono)'],
      },
      fontSize: {
        // Marketing scale
        'display': ['var(--t-display)', { lineHeight: '1.1' }],
        'h1':      ['var(--t-h1)',      { lineHeight: '1.2' }],
        'h2':      ['var(--t-h2)',      { lineHeight: '1.25' }],
        'h3':      ['var(--t-h3)',      { lineHeight: '1.3' }],

        // App scale
        'app-h1':    ['var(--t-app-h1)',    { lineHeight: '1.25' }],
        'app-h2':    ['var(--t-app-h2)',    { lineHeight: '1.3' }],
        'app-h3':    ['var(--t-app-h3)',    { lineHeight: '1.35' }],
        'app-body':  ['var(--t-app-body)',  { lineHeight: '1.5' }],
        'app-small': ['var(--t-app-small)', { lineHeight: '1.4' }],
        'app-mono':  ['var(--t-app-mono)',  { lineHeight: '1.4' }],
      },

      /* ─── Spacing ─── */
      spacing: {
        'ds-1':  'var(--space-1)',
        'ds-2':  'var(--space-2)',
        'ds-3':  'var(--space-3)',
        'ds-4':  'var(--space-4)',
        'ds-5':  'var(--space-5)',
        'ds-6':  'var(--space-6)',
        'ds-8':  'var(--space-8)',
        'ds-10': 'var(--space-10)',
        'ds-12': 'var(--space-12)',
        'ds-16': 'var(--space-16)',
        'ds-20': 'var(--space-20)',
      },

      /* ─── Border radius ─── */
      borderRadius: {
        'ds-sm':   'var(--radius-sm)',
        'ds-md':   'var(--radius-md)',
        'ds-lg':   'var(--radius-lg)',
        'ds-full': 'var(--radius-full)',
      },

      /* ─── Shadows ─── */
      boxShadow: {
        'ds-sm': 'var(--shadow-sm)',
        'ds-md': 'var(--shadow-md)',
        'ds-lg': 'var(--shadow-lg)',
        'ds-xl': 'var(--shadow-xl)',
      },

      /* ─── Transitions ─── */
      transitionTimingFunction: {
        'ds-out': 'var(--ease-out)',
      },
      transitionDuration: {
        'ds-fast': 'var(--duration-fast)',
        'ds-md':   'var(--duration-md)',
        'ds-slow': 'var(--duration-slow)',
      },

      /* ─── Z-index ─── */
      zIndex: {
        'dropdown':  'var(--z-dropdown)',
        'sticky':    'var(--z-sticky)',
        'fixed':     'var(--z-fixed)',
        'modal-bg':  'var(--z-modal-bg)',
        'modal':     'var(--z-modal)',
        'popover':   'var(--z-popover)',
        'tooltip':   'var(--z-tooltip)',
      },
    },
  },
};
