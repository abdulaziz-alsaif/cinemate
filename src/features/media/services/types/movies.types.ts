import { z } from "zod";

import { CreditsSchema } from "./credits.types";

export const MovieDetailsSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable().optional(),
  belongs_to_collection: z
    .object({
      id: z.number(),
      name: z.string(),
      poster_path: z.string().nullable().optional(),
      backdrop_path: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  budget: z.number(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  homepage: z.string().nullable().optional(),
  id: z.number(),
  imdb_id: z.string().nullable().optional(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string().nullable().optional(),
  popularity: z.number(),
  poster_path: z.string().nullable().optional(),
  production_companies: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      logo_path: z.string().nullable().optional(),
      origin_country: z.string(),
    }),
  ),
  production_countries: z.array(
    z.object({ iso_3166_1: z.string(), name: z.string() }),
  ),
  release_date: z.string().nullable().optional(),
  revenue: z.number(),
  runtime: z.number().nullable().optional(),
  spoken_languages: z.array(
    z.object({ iso_639_1: z.string(), name: z.string() }),
  ),
  status: z.string(),
  tagline: z.string().nullable().optional(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type MovieDetails = z.infer<typeof MovieDetailsSchema>

export const MovieDetailsWithCreditsSchema = MovieDetailsSchema.extend({
    credits: CreditsSchema
})

export type MovieDetailsWithCreditsType = z.infer<typeof MovieDetailsWithCreditsSchema>