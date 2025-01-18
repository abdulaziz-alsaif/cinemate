import { createClient } from "@/lib/supabase/server";

import { getMovieDetails, getTVShowDetails } from "./tmbd-services";

export async function getUserSavedMedia(
  listType,
  filterValue,
  sortByValue,
  limit = 0,
) {
  if (listType !== "watched" && listType !== "watchlist") {
    throw new Error("unsupported list type");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { id: userId } = user;

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

  const { data, error } = await query;

  if (error) {
    throw new Error("could not load user saved media");
  }
  return data;
}

export async function addMedia(tmdbId, mediaType) {
  let mediaData;
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
    genre = "",
  } = mediaData;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("media")
    .insert([
      {
        title,
        releaseDate,
        tmdbId,
        rating,
        releaseDate,
        overview,
        posterPath,
        mediaType,
        genre,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error("media could not be created");
  }

  return data;
}

export async function getMedia(tmdbId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("media")
    .select("*")
    .eq("tmdbId", tmdbId);

  if (error) {
    throw new Error("could not get media data");
  }

  return data;
}

export async function isMediaSavedByUser(tmdbId, userId) {
  if (!userId) return { isSavedInWatchlist: false, isSavedInWatched: false };

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_saved_media")
    .select("*")
    .eq("mediaId", tmdbId)
    .eq("userId", userId);

  if (error) {
    throw new Error("could not check if user has saved media before");
  }

  return {
    isSavedInWatchlist: data.at(0)?.listType === "watchlist",
    isSavedInWatched: data.at(0)?.listType === "watched",
  };
}

export async function getUserWatchedMediaCount(userId) {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("user_saved_media")
    .select("*", { count: "exact", head: true })
    .eq("listType", "watched")
    .eq("userId", userId);

  if (error) {
    throw new Error("could not get number of user watched media");
  }

  return count;
}
