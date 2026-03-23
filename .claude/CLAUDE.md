# Portafolio Curricular Web

## Project Overview
Sitio web de portafolio curricular profesional. Objetivo: crear la mejor web de portafolio con diseño responsivo, animaciones de alta calidad, y experiencia de usuario excepcional.

## Tech Stack
- To be defined during `/sdd-init` — likely Next.js/React + Tailwind CSS + Framer Motion

## Architecture Principles
- **Mobile-first responsive design** — every component starts from mobile
- **Performance-first animations** — GPU-accelerated, reduced motion support, no layout thrashing
- **Accessibility** — WCAG 2.1 AA minimum, semantic HTML, keyboard navigation
- **Core Web Vitals** — LCP < 2.5s, FID < 100ms, CLS < 0.1

## Development Conventions
- Use `ui-ux-pro-max` skill for all UI/UX design decisions
- Use `design-system` skill for design tokens and component specs
- Use `ui-styling` skill for Tailwind/shadcn implementation
- All animations must respect `prefers-reduced-motion`
- Responsive breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px)

## Engram & Agent Teams
- **Engram**: Active — persistent memory across sessions
- **Agent Teams Lite**: Active — orchestrator delegates all real work to sub-agents
- **Artifact Store**: `engram` mode (default)
- **Project name for engram**: `portafolio-curricular-web`

## Skills Available
See `.atl/skill-registry.md` for full skill registry with triggers.

### Core Skills for This Project
| Skill | Use For |
|-------|---------|
| `ui-ux-pro-max` | UI/UX design intelligence, styles, palettes, fonts, UX guidelines |
| `ui-styling` | shadcn/ui components, Tailwind CSS, canvas designs |
| `design-system` | Design tokens, component specs, spacing/typography scales |
| `design` | Brand identity, logos, banners, social media assets |
| `brand` | Brand voice, visual identity, messaging |
| `banner-design` | Social media banners, hero sections |
| `slides` | HTML presentations if needed |
| `explain-code` | Code explanations with diagrams |
| `sdd-*` | Spec-Driven Development workflow phases |
