import { z } from "zod";
import {
  MediaType,
  MovieSchema,
  TVSchema,
  TVWithMediaTypeSchema,
  MovieWithMediaTypeSchema,
} from "@/features/media/services/types/index.types";

export type TrendingMediaType = MediaType | "all";

export const AllMediaSchema = z.union([TVWithMediaTypeSchema, MovieWithMediaTypeSchema]);
export type AllMediaType = z.infer<typeof AllMediaSchema>


// using generics to narrow down the return type based on the value passed to the function
export const getTrendingResultSchema = <T extends TrendingMediaType>(
  mediaType: T,
) => {
  if (mediaType === "tv") {
    return TVSchema;
  } else if (mediaType === "movie") {
    return MovieSchema;
  } else if (mediaType === "all") {
    return AllMediaSchema
  }

  return z.never();
};

export const getTrendingResultsSchema = <T extends TrendingMediaType>(
  mediaType: T,
) =>
  z.object({
    page: z.number(),
    results: z.array(getTrendingResultSchema(mediaType)),
    total_pages: z.number(),
    total_results: z.number(),
});