import { z } from "zod";

import { SeasonSchema } from "./tv-seasons.types";
import { CreditsSchema } from "./credits.types";

export const TvShowDetailsSchema = z.object({
  backdrop_path: z.string().nullable().optional(),
  created_by: z.array(
    z.object({
      id: z.number(),
      credit_id: z.string(),
      name: z.string(),
      gender: z.number().nullable().optional(),
      profile_path: z.string().nullable().optional(),
    })
  ),
  episode_run_time: z.array(z.number()).nullable().optional(),
  first_air_date: z.string().nullable().optional(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })).nullable().optional(),
  homepage: z.string().nullable().optional(),
  id: z.number(),
  in_production: z.boolean(),
  languages: z.array(z.string()).nullable().optional(),
  last_air_date: z.string().nullable().optional(),
  last_episode_to_air: z
    .object({
      air_date: z.string().nullable().optional(),
      episode_number: z.number(),
      id: z.number(),
      name: z.string(),
      overview: z.string().nullable().optional(),
      production_code: z.string().nullable().optional(),
      season_number: z.number(),
      still_path: z.string().nullable().optional(),
      vote_average: z.number(),
      vote_count: z.number(),
    })
    .nullable()
    .optional(),
  name: z.string(),
  next_episode_to_air: z
    .object({
      id: z.number(),
      name: z.string(),
      overview: z.string().nullable().optional(),
      vote_average: z.number(),
      vote_count: z.number(),
      air_date: z.string().nullable().optional(),
      episode_number: z.number(),
      production_code: z.string().nullable().optional(),
      runtime: z.number().nullable().optional(),
      season_number: z.number(),
      show_id: z.number(),
      still_path: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  networks: z
    .array(
      z.object({
        id: z.number(),
        logo_path: z.string().nullable().optional(),
        name: z.string(),
        origin_country: z.string(),
      })
    )
    .nullable()
    .optional(),
  number_of_episodes: z.number(),
  number_of_seasons: z.number(),
  origin_country: z.array(z.string()).nullable().optional(),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string().nullable().optional(),
  popularity: z.number(),
  poster_path: z.string().nullable().optional(),
  production_companies: z
    .array(
      z.object({
        id: z.number(),
        logo_path: z.string().nullable().optional(),
        name: z.string(),
        origin_country: z.string(),
      })
    )
    .nullable()
    .optional(),
  production_countries: z
    .array(
      z.object({
        iso_3166_1: z.string(),
        name: z.string(),
      })
    )
    .nullable()
    .optional(),
  seasons: z.array(SeasonSchema).nullable().optional(),
  spoken_languages: z
    .array(
      z.object({
        iso_639_1: z.string(),
        name: z.string(),
      })
    )
    .nullable()
    .optional(),
  status: z.string().nullable().optional(),
  tagline: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type TvShowDetails = z.infer<typeof TvShowDetailsSchema>;

export const TvShowDetailsWithCreditsSchema = TvShowDetailsSchema.extend({
    credits: CreditsSchema
})

export type TvShowDetailsWithCreditsType = z.infer<typeof TvShowDetailsWithCreditsSchema>