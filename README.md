# Portafolio — Andrés Vera

Portafolio profesional estático. Todo el contenido (perfil, experiencia, skills,
proyectos, certificaciones) vive en un único JSON: **`data/portfolio.json`**.

- **Producción**: https://andres.mindtechpy.net
- **Stack**: Astro 6 (output estático) · React 19 · Tailwind CSS 3 · Framer Motion 12 · TypeScript
- **Node**: 24.20.0 LTS (fijado en `.nvmrc` y `.node-version`)

## Correr en local

```bash
nvm use          # lee .nvmrc → 24.20.0
npm ci
npm run dev      # http://localhost:4321
```

| Comando | Qué hace |
| :------ | :------- |
| `npm run dev` | Dev server con HMR en `localhost:4321` |
| `npm run build` | Compila el sitio estático a `./dist/` |
| `npm run preview` | Sirve `./dist/` para revisar el build antes de desplegar |

## Estructura

```text
data/portfolio.json      Fuente única de contenido
src/
├── lib/portfolio.ts     Acceso tipado al JSON + años de experiencia derivados
├── layouts/Layout.astro <head>, JSON-LD, canonical, tema oscuro por defecto
├── pages/
│   ├── index.astro      Página única, ensambla todas las secciones
│   └── 404.astro        Requerida por Cloudflare (not_found_handling)
├── components/
│   ├── astro/           Navbar, Footer — sin JS en el cliente
│   └── react/           Secciones interactivas, hidratadas con client:visible
├── hooks/               Hooks de React compartidos
└── styles/global.css    Capa base + utilidades
public/                  Assets servidos tal cual: CV, favicons, robots.txt, llms.txt
```

## Configuración clave

| Archivo | Para qué |
| :------ | :------- |
| `astro.config.mjs` | `site:` es la **fuente única del dominio** — de ahí salen el canonical, el `url` del JSON-LD y el sitemap. Cambiarlo propaga los tres. |
| `wrangler.jsonc` | Config del Worker de Cloudflare. `name` debe coincidir exactamente con el Worker del dashboard. |
| `.npmrc` | `legacy-peer-deps=true`. `@astrojs/tailwind@6` declara peer `astro <=5` pero funciona con Astro 6; sin esto `npm ci` falla con ERESOLVE. Se elimina al migrar a Tailwind 4 + `@tailwindcss/vite`. |
| `.node-version` / `.nvmrc` | Misma versión de Node. Cloudflare lee el primero, `nvm` el segundo. |

`public/robots.txt` y `public/llms.txt` son estáticos: si cambia el dominio hay
que editarlos a mano además de `astro.config.mjs`.

### Años de experiencia

No están hardcodeados. Salen de `profile.careerStartYear` en el JSON y se
calculan en cada build sobre el año en `America/Asuncion`, no en el timezone de
la máquina que compila. El texto del summary usa el placeholder `{years}`.

## Despliegue

Automático: **push a `main`** → Cloudflare Workers Builds compila y publica.

| Ajuste en Cloudflare | Valor |
| :------------------- | :---- |
| Comando de compilación | `npm run build` |
| Comando de implementación | `npx wrangler deploy` |
| Directorio raíz | `/` |
| Rama de producción | `main` |

La versión de Node la toma de `.node-version`, no hace falta declarar
`NODE_VERSION` en el dashboard.

Para validar el deploy sin publicar nada:

```bash
npm run build && npx wrangler deploy --dry-run
```

## Docker (opcional)

Stack local tipo producción: build de Astro servido por Nginx.

```bash
docker compose up --build              # http://localhost:3000
docker compose --profile https up      # + Caddy con HTTPS local en :443
```

Healthcheck en `/healthz`.
