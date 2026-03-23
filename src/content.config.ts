import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const reviews = defineCollection({
	loader: glob({ base: './src/content/reviews', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishedAt: z.date(),
		nombre: z.string(),
		marca: z.string(),
		tipo: z.string(),
		anio: z.number().optional(),
		generoEstilo: z.string(),
		estacionesIdeales: z.array(z.string()),
		rendimiento: z.string(),
		ocasionUso: z.string(),
		puntuacion: z.number().min(0).max(10),
		imagen: z.string(),
		slug: z.string()
	})
});

const comparativas = defineCollection({
	loader: glob({ base: './src/content/comparativas', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishedAt: z.date(),
		slug: z.string()
	})
});

const rankings = defineCollection({
	loader: glob({ base: './src/content/rankings', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishedAt: z.date(),
		slug: z.string()
	})
});

const articulos = defineCollection({
	loader: glob({ base: './src/content/articulos', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishedAt: z.date(),
		slug: z.string()
	})
});

export const collections = {
	reviews,
	comparativas,
	rankings,
	articulos
};