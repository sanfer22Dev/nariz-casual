# Nariz Casual (Astro)

Web estática de contenido sobre perfumes: reviews reales, comparativas y rankings.

## Stack

- Astro (sitio estático)
- Markdown para artículos
- Deploy recomendado: Cloudflare Pages o Vercel

## Páginas iniciales

- Inicio
- Reviews
- Comparativas
- Rankings
- Sobre mí
- Contacto
- Política de privacidad

## Modelo de datos (reviews)

Cada review usa estos campos en frontmatter:

- `nombre`
- `marca`
- `tipo`
- `anio` (opcional)
- `generoEstilo`
- `estacionesIdeales`
- `rendimiento`
- `ocasionUso`
- `puntuacion`
- `imagen`
- `slug`

Configuración en `src/content.config.ts`.

## Estructura de contenido

- `src/content/reviews/*.md`
- `src/content/comparativas/*.md`
- `src/content/rankings/*.md`

## Comandos

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
