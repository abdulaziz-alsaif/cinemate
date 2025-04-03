import { z } from "zod";

export const SupabaseMediaSchema = z.object({
  created_at: z.string(),
  genre: z.string().nullable(),
  mediaType: z.enum(["movie", "tv"]),
  overview: z.string().nullable(),
  posterPath: z.string().nullable(),
  rating: z.number().nullable().optional(),
  releaseDate: z.string().nullable(),
  title: z.string(),
  tmdbId: z.number(),
});

export type SupabaseMediaType = z.infer<typeof SupabaseMediaSchema>;

export const SupabaseUserSavedSchema = z.object({
  created_at: z.string(),
  id: z.number(),
  listType: z.string(),
  mediaId: z.number().nullable(),
  rating: z.number().nullable(),
  userId: z.string().nullable(),
});

export type SupabaseUserSavedType = z.infer<typeof SupabaseUserSavedSchema>;

export const SupabaseUserSavedInnerMediaSchema = SupabaseUserSavedSchema.extend(
  {
    media: SupabaseMediaSchema,
  },
);
export type SupabaseUserSavedInnerMediaType = z.infer<
  typeof SupabaseUserSavedInnerMediaSchema
>;
