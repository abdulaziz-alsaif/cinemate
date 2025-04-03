import { z } from "zod";

import { EpisodeSchema } from "./tv-episode.types";


export const SeasonSchema = z.object({
  air_date: z.string().nullable().optional(),
  episode_count: z.number(),
  id: z.number(),
  name: z.string(),
  overview: z.string().nullable().optional(),
  poster_path: z.string().nullable().optional(),
  season_number: z.number(),
  vote_average: z.number(),
});


export type SeasonType = z.infer<typeof SeasonSchema>

export const SeasonDetailsSchema = z.object({
  _id: z.string(),
  air_date: z.string().nullable().optional(),
  episodes: z.array(EpisodeSchema),
  name: z.string(),
  overview: z.string().nullable().optional(),
  id: z.number(),
  poster_path: z.string().nullable().optional(),
  season_number: z.number(),
  vote_average: z.number(),
});

export type SeasonDetails = z.infer<typeof SeasonDetailsSchema>;