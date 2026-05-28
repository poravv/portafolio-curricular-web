/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          deep: '#050506',
          base: '#0A0A0F',
          elevated: '#0F0F1A',
          glass: 'rgba(15, 15, 26, 0.6)',
        },
        primary: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          dark: '#7C3AED',
          glow: 'rgba(139, 92, 246, 0.25)',
        },
        secondary: {
          DEFAULT: '#06B6D4',
          light: '#22D3EE',
          dark: '#0891B2',
          glow: 'rgba(6, 182, 212, 0.25)',
        },
        accent: {
          cyan: '#06B6D4',   // mantener por compatibilidad
          green: '#22C55E',
          amber: '#F59E0B',
          rose: '#F43F5E',
        },
        surface: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          hover: 'rgba(255, 255, 255, 0.08)',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          glass: 'rgba(139, 92, 246, 0.15)',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk Variable', 'Space Grotesk', 'sans-serif'],
        body: ['Inter Variable', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-mobile': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h1': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1-mobile': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'h2-mobile': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
        'label': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '600' }],
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'float-delayed': 'float 25s ease-in-out infinite 5s',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'blob-1': 'blob 25s ease-in-out infinite',
        'blob-2': 'blob 30s ease-in-out infinite 5s',
        'blob-3': 'blob 20s ease-in-out infinite 10s',
        'grain': 'grain 0.5s steps(1) infinite',
        'status-pulse': 'status-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -30px) rotate(5deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(-3deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'fade-up': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          'from': { opacity: '0', transform: 'translateX(-50px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          'from': { opacity: '0', transform: 'translateX(50px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        'blob': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(40px, -60px) scale(1.1)' },
          '50%': { transform: 'translate(-30px, 30px) scale(0.95)' },
          '75%': { transform: 'translate(20px, 50px) scale(1.05)' },
        },
        'scroll-progress': {
          'from': { transform: 'scaleX(0)' },
          'to': { transform: 'scaleX(1)' },
        },
        'grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 2%)' },
          '30%': { transform: 'translate(-1%, 4%)' },
          '40%': { transform: 'translate(4%, -1%)' },
          '50%': { transform: 'translate(-3%, 3%)' },
          '60%': { transform: 'translate(2%, -4%)' },
          '70%': { transform: 'translate(-4%, 1%)' },
          '80%': { transform: 'translate(1%, -2%)' },
          '90%': { transform: 'translate(3%, 4%)' },
        },
        'status-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        'section': '6rem',
        'section-mobile': '3rem',
      },
      maxWidth: {
        'container': '1280px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glow-sm': '0 0 15px rgba(139, 92, 246, 0.15)',
        'glow-md': '0 0 30px rgba(139, 92, 246, 0.2)',
        'glow-lg': '0 0 60px rgba(139, 92, 246, 0.25)',
        'glow-cyan-sm': '0 0 15px rgba(6, 182, 212, 0.2)',
        'glow-cyan-md': '0 0 30px rgba(6, 182, 212, 0.25)',
        'glow-rose-sm': '0 0 15px rgba(244, 63, 94, 0.2)',
        'inner-highlight': 'inset 0 1px 0 rgba(255, 255, 255, 0.12)',
      },
    },
  },
  plugins: [],
};
