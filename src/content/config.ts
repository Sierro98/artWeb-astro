import { defineCollection, reference, z } from "astro:content";

export const collections = {
  posts: defineCollection({
    type: "content",
    schema: z.object({
      author: reference("authors"),
      date: z.date(),
      image: z.string(),
      title: z.string().max(60, {
        message: "Title must be 60 characters or less."
      }),
      description: z.string().max(200, {
        message: "The description must be 200 characters or less."
      }),
      relatedPosts: z.array(reference("posts")).optional()
    }),
  }),
  authors: defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
        role: z.enum(["ADMIN", "CREATOR", "USER"]),
        bio: z.string().max(400),
        email: z.string().email()
    })
  })
};
