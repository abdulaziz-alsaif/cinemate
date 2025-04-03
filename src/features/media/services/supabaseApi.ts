import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

import { getMovieDetails, getTVShowDetails } from "./tmbd-services";

import {
  SupabaseMediaSchema,
  SupabaseMediaType,
  SupabaseUserSavedSchema,
} from "@/app/db/databaseSchema";
import {
  ExtractedMovieDetails,
  ExtractedTvShowDetails,
  FilterValueType,
  ListType,
  SortByValueType,
} from "@/types/global.types";
import { MediaType } from "./types/index.types";

export async function getUserSavedMedia(
  listType: ListType,
  filterValue?: FilterValueType | undefined,
  sortByValue?: SortByValueType | undefined,
  limit = 0,
) {
  if (listType !== "watched" && listType !== "watchlist") {
    throw new Error("unsupported list type");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  if (!userId) {
    throw new Error("You are't logged in, try login first.");
  }

  let query = supabase
    .from("user_saved_media")
    .select(`userRating:rating, media!inner(*)`)
    .eq("userId", userId)
    .eq("listType", listType);

  if (filterValue && filterValue !== "all") {
    query.eq("media.mediaType", filterValue);
  }

  if (sortByValue && sortByValue === "highest-rating") {
    query.order("media(rating)", { ascending: false });
  }

  if (sortByValue && sortByValue === "user-highest-rating") {
    query.order("rating", { ascending: false });
  }

  if (sortByValue && sortByValue === "release-date") {
    // Use dot notation for the referenced table column
    query.order("media(releaseDate)", { ascending: false });
  }

  if (limit > 0) {
    query.limit(limit);
  }

  const { data: unSafeData, error } = await query;

  const QuerySchema = z
    .object({
      userRating: z.number().nullable(),
    })
    .extend({
      media: SupabaseMediaSchema,
    });

  const {
    success,
    data,
    error: zodErr,
  } = z.array(QuerySchema).safeParse(unSafeData);

  console.log(unSafeData, success, zodErr);

  if (error || !success) {
    throw new Error("could not load user saved media");
  }
  return data;
}

export async function addMedia(
  tmdbId: number,
  mediaType: MediaType,
): Promise<SupabaseMediaType> {
  let mediaData: ExtractedMovieDetails | ExtractedTvShowDetails;
  // in most cases movie or tv show will already be cached
  if (mediaType === "movie") {
    mediaData = await getMovieDetails(tmdbId);
  } else {
    mediaData = await getTVShowDetails(tmdbId);
  }

  const {
    title,
    releaseDate,
    rating,
    overview,
    posterPath,
    genre,
  } = mediaData;

  const supabase = await createClient();
  const { data: unSafeData, error } = await supabase
    .from("media")
    .insert([
      {
        title,
        releaseDate,
        tmdbId,
        rating: rating || 0,
        overview,
        posterPath,
        mediaType,
        genre,
      },
    ])
    .select()
    .single();

  const { success, data } = SupabaseMediaSchema.safeParse(unSafeData);

  if (error || !success) {
    throw new Error("media could not be created");
  }

  return data;
}

export async function getMedia(tmdbId: number) {
  const supabase = await createClient();

  const { data: unSafeData, error } = await supabase
    .from("media")
    .select("*")
    .eq("tmdbId", tmdbId);

  const { success, data } = z.array(SupabaseMediaSchema).safeParse(unSafeData);

  if (error || !success) {
    throw new Error("could not get media data");
  }

  return data;
}

export async function isMediaSavedByUser(tmdbId: number, userId: string) {
  if (!userId) return { isSavedInWatchlist: false, isSavedInWatched: false };

  const supabase = await createClient();

  const { data: unSafeData, error } = await supabase
    .from("user_saved_media")
    .select("*")
    .eq("mediaId", tmdbId)
    .eq("userId", userId);

  const {
    success,
    data,
    error: zodError,
  } = z.array(SupabaseUserSavedSchema).safeParse(unSafeData);

  console.log(unSafeData, success, zodError);

  if (error || !success) {
    throw new Error("could not check if user has saved media before");
  }

  return {
    isSavedInWatchlist: data.at(0)?.listType === "watchlist",
    isSavedInWatched: data.at(0)?.listType === "watched",
  };
}

export async function getUserWatchedMediaCount(userId: string) {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("user_saved_media")
    .select("*", { count: "exact", head: true })
    .eq("listType", "watched")
    .eq("userId", userId);

  if (error) {
    throw new Error("could not get number of user watched media");
  }

  return count || 0;
}
