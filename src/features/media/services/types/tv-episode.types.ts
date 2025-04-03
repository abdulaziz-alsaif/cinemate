import { z } from "zod";

import { CrewSchema } from "./credits.types";

const GuestStarSchema = z.object({
  credit_id: z.string(),
  order: z.number(),
  character: z.string(),
  adult: z.boolean(),
  gender: z.number().nullable().optional(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable().optional(),
});

export type GuestStar = z.infer<typeof GuestStarSchema>;

export const EpisodeSchema = z.object({
  air_date: z.string().nullable().optional(),
  episode_number: z.number(),
  crew: z.array(CrewSchema),
  guest_stars: z.array(GuestStarSchema),
  id: z.number(),
  name: z.string(),
  overview: z.string().nullable().optional(),
  production_code: z.string().nullable().optional(),
  season_number: z.number(),
  still_path: z.string().nullable().optional(),
  vote_average: z.number(),
  vote_count: z.number(),
  runtime: z.number().nullable().optional(),
  show_id: z.number(),
});
export type Episode = z.infer<typeof EpisodeSchema>;
