import { z, defineCollection } from "astro:content";
const projectsSchema = z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.string().optional(),
    heroImage: z.string().optional(),
    badges: z.array(z.any()).optional(),
    tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
        message: 'tags must be unique',
    }).optional(),
    custom_link_label: z.array(
        z.object(
            {
                name: z.string(),
                url: z.string(),
                icon: z.string()
            }
        )
    ).optional()
});


export type ProjectsSchema = z.infer<typeof projectsSchema>;

const projectsCollection = defineCollection({ schema: projectsSchema });

export const collections = {
    'projects': projectsCollection
}