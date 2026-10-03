/** @type {import('tailwindcss').Config} */

// Colors are CSS variables (RGB channels) defined per theme in global.css,
// so light/dark is a token swap instead of per-class overrides.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: {
          DEFAULT: token('surface'),
          2: token('surface-2'),
        },
        line: {
          DEFAULT: token('line'),
          strong: token('line-strong'),
        },
        fg: {
          DEFAULT: token('fg'),
          muted: token('fg-muted'),
          subtle: token('fg-subtle'),
        },
        accent: {
          DEFAULT: token('accent'),
          fg: token('accent-fg'),
        },
        live: token('live'),
        'logo-tile': token('logo-tile'),
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        body: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.025em', fontWeight: '400' }],
        h2: ['clamp(2rem, 4vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '400' }],
        headline: ['clamp(1.75rem, 4.5vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        h3: ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '500' }],
        lede: ['clamp(1.25rem, 2.2vw, 1.625rem)', { lineHeight: '1.4', letterSpacing: '-0.005em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        body: ['1rem', { lineHeight: '1.65' }],
        'body-sm': ['0.875rem', { lineHeight: '1.55' }],
        caption: ['0.75rem', { lineHeight: '1.4' }],
        label: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
      },
      spacing: {
        section: '7rem',
        'section-sm': '4rem',
        header: '4rem',
      },
      maxWidth: {
        container: '1200px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
