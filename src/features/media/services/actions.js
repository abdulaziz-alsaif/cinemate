"use server";

import { revalidatePath } from "next/cache";

import { addMedia, getMedia, getUserWatchedMediaCount } from "./supabaseApi";
import { isTmdbIdExists as isTmdbIdExistsFn } from "./tmbd-services";
import { createClient } from "@/lib/supabase/server";

// to prevent user from using a huge list of watched media when using ai recommendation
const MAX_WATCHED_MEDIA = 50;

export async function addToUserSavedMedia(
  tmdbId,
  mediaType,
  listType,
  userRating = null,
) {
  try {
    if (listType !== "watched" && listType !== "watchlist") {
      throw new Error("unsupported list type");
    }

    if (mediaType !== "movie" && mediaType !== "tv") {
      throw new Error("unsupported media type");
    }

    if (listType === "watched" && userRating <= 0) {
      throw new Error("invalid rating");
    }

    const isTmdbIdExists = await isTmdbIdExistsFn(tmdbId, mediaType);
    if (!isTmdbIdExists) {
      throw new Error("media tmdb Id does not exists");
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { id: userId } = user;

    if (listType === "watched") {
      const numOfUserWatchedMedia = await getUserWatchedMediaCount(userId);
      if (numOfUserWatchedMedia >= MAX_WATCHED_MEDIA)
        throw new Error(
          `You can't save more than ${MAX_WATCHED_MEDIA} media as watched`,
        );
    }

    // this rarely will not exists unless media is have not been saved by any user
    const mediaData = await getMedia(tmdbId);
    let newMedia;
    if (mediaData.length === 0) {
      newMedia = await addMedia(tmdbId, mediaType);
    } else {
      newMedia = mediaData.at(0);
    }

    const { error } = await supabase
      .from("user_saved_media")
      .upsert(
        { userId, mediaId: newMedia.tmdbId, listType, rating: userRating },
        { onConflict: "userId, mediaId", ignoreDuplicates: false },
      );

    if (error) {
      throw new Error("could not add or update user saved media");
    }

    revalidatePath("/watchlist");
    revalidatePath(`/movie/${tmdbId}`);
    revalidatePath(`/tv/${tmdbId}`);
    return {
      success: true,
      message: `Successfully Added to your ${listType}.`,
    };

    // is needed when user is in watchlist page and made one of media watched
  } catch (err) {
    return {
      success: false,
      message: err.message || `Something went wrong! Could not add to your ${listType}.`,
    };
  }
}

export async function updateUserRating(tmbdId, newRating) {
  try {
    if (newRating <= 0) {
      throw new Error("invalid new rating");
    }
    // just update user rating without needing to check if tmbdId exists since if does't no row will match
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { id: userId } = user;

    const { error } = await supabase
      .from("user_saved_media")
      .update({ rating: newRating })
      .eq("mediaId", tmbdId)
      .eq("userId", userId);

    if (error) {
      throw new Error("could not add or update user saved media");
    }

    revalidatePath("/watched");
    return {
      success: true,
      message: "Rating has been updated Successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: `Something went wrong! Could not update your rating.`,
    };
  }
}

export async function removeUserSavedMedia(tmbdId) {
  try {
    // just update user rating without needing to check if tmbdId exists since if does't no row will match
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { id: userId } = user;

    const { error } = await supabase
      .from("user_saved_media")
      .delete()
      .eq("mediaId", tmbdId)
      .eq("userId", userId);

    if (error) {
      throw new Error("could not remove saved media from user list");
    }

    // removing this media from user media will affects anyone of them
    revalidatePath("/watched");
    revalidatePath("/watchlist");
    revalidatePath(`/movie/${tmbdId}`);
    revalidatePath(`/tv/${tmbdId}`);

    return {
      success: true,
      message: "Media has been removed Successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: "Something went wrong! Could not remove media from your list.",
    };
  }
}
