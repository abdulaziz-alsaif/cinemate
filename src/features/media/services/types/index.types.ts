import { z } from "zod";

export type MediaType = "movie" | "tv";

export const MovieSchema = z.object({
  id: z.number(),
  poster_path: z.string().nullable().optional(),
  adult: z.boolean(),
  overview: z.string().nullable().optional(),
  release_date: z.string().nullable().optional(),
  genre_ids: z.array(z.number()).nullable().optional(),
  original_title: z.string(),
  original_language: z.string().nullable().optional(),
  title: z.string(),
  backdrop_path: z.string().nullable().optional(),
  popularity: z.number().nullable().optional(),
  vote_count: z.number().nullable().optional(),
  video: z.boolean(),
  vote_average: z.number().nullable().optional(),
});

export type Movie = z.infer<typeof MovieSchema>;

export const MovieWithMediaTypeSchema = MovieSchema.extend({
  media_type: z.literal("movie"),
});

export type MovieWithMediaType = z.infer<typeof MovieWithMediaTypeSchema>;

export const TVSchema = z.object({
  id: z.number(),
  adult: z.boolean(),
  name: z.string(),
  first_air_date: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
  genre_ids: z.array(z.number()).nullable().optional(),
  origin_country: z.array(z.string()).nullable().optional(),
  original_language: z.string().nullable().optional(),
  original_name: z.string().nullable().optional(),
  overview: z.string().nullable().optional(),
  poster_path: z.string().nullable().optional(),
  popularity: z.number().nullable().optional(),
  vote_count: z.number().nullable().optional(),
  vote_average: z.number().nullable().optional(),
});

export type TV = z.infer<typeof TVSchema>;

export const TVWithMediaTypeSchema = TVSchema.extend({
  media_type: z.literal("tv"),
});

export type TVWithMediaType = z.infer<typeof TVWithMediaTypeSchema>;

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Genre = z.infer<typeof genreSchema>;
