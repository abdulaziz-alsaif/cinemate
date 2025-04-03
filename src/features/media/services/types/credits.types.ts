import { z } from "zod";

export const CastSchema = z.object({
  adult: z.boolean(),
  gender: z.number().nullable().optional(), 
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable().optional(), 
  cast_id: z.number().nullable().optional(), 
  character: z.string().nullable().optional(),
  credit_id: z.string(),
  order: z.number(),
});

export type Cast = z.infer<typeof CastSchema>

export const CrewSchema = z.object({
  adult: z.boolean(),
  gender: z.number().nullable().optional(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable().optional(),
  credit_id: z.string(),
  department: z.string(),
  job: z.string(),
});

export type Crew = z.infer<typeof CrewSchema>

export const CreditsSchema = z.object({
  cast: z.array(CastSchema),
  crew: z.array(CrewSchema),
});

export type Credits = z.infer<typeof CreditsSchema>