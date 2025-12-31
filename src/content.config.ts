import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			// Transform string to Date object
			pubDate: z.coerce.date().optional(),
			date: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			image: image().optional(),
			author: z.string().optional(),
			slug: z.string().optional(),
		}).transform(data => ({
			...data,
			pubDate: data.pubDate || data.date || new Date(),
			heroImage: data.heroImage || data.image,
			description: data.description || "",
		})),
});

export const collections = { blog };
