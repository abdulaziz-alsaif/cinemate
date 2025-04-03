import { Suspense } from "react";

import Separator from "@/components/Separator";
import MediaDetails from "@/features/media/components/MediaDetails";
import ScrollXSkeleton from "@/features/media/components/ScrollXSkeleton";
import SimilarMedia from "@/features/media/components/SimilarMedia";
import StarRating from "@/features/media/components/StarRating";
import AddToWatched from "@/features/media/components/AddToWatched";
import AddToWatchlist from "@/features/media/components/AddToWatchlist";
import RemoveMediaButton from "@/features/media/components/RemoveMediaButton";

import { getMovieDetails } from "@/features/media/services/tmbd-services";
import { isMediaSavedByUser } from "@/features/media/services/supabaseApi";
import { createClient } from "@/lib/supabase/server";

import { BASE_IMG_URL } from "@/utils/constants";

type PageProps = {
  params: Promise<{
    movieId: number;
  }>;
};

export async function generateMetadata({ params }: PageProps) {
  const movieId = (await params).movieId;
  const movie = await getMovieDetails(movieId);

  const { title, overview, releaseDate } = movie;

  return {
    title: `${title} (${releaseDate ? releaseDate : ""})`,
    description: overview,
  };
}

export default async function MoviePage({ params }: PageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isUserAuthenticated = !!user;

  const userId = user?.id || "";

  const movieId = (await params).movieId;
  const movie = await getMovieDetails(movieId);
  const { isSavedInWatched, isSavedInWatchlist } = await isMediaSavedByUser(
    movieId,
    userId,
  );

  const {
    id,
    posterPath,
    backdropPath,
    title,
    overview,
    releaseDate,
    rating,
    genre,
    directors,
    topCast,
    runtime,
    mediaType,
  } = movie;

  return (
    <div className="container space-y-20">
      <MediaDetails>
        <MediaDetails.Info>
          <h1 className="text-3xl md:text-4xl md:tracking-tight">{title}</h1>
          <div className="flex flex-wrap items-center space-x-1 text-sm text-zinc-500">
            <StarRating
              ratingClassName="text-zinc-900"
              size={18}
              rating={rating}
            />
            {releaseDate && (
              <>
                <Separator />
                <span>{releaseDate}</span>
              </>
            )}
            <Separator />
            <span>{runtime}m</span>
          </div>

          <p className="text-xs text-zinc-500">{genre}</p>
        </MediaDetails.Info>

        <MediaDetails.Images
          backDropImage={
            backdropPath ? `${BASE_IMG_URL}/w1280${backdropPath}` : ""
          }
          posterImage={posterPath ? `${BASE_IMG_URL}/w342${posterPath}` : ""}
        />

        {isUserAuthenticated && (
          <MediaDetails.Actions>
            {!isSavedInWatched && (
              <AddToWatched title={title} mediaId={id} mediaType={mediaType} />
            )}
            {!isSavedInWatchlist && (
              <AddToWatchlist mediaId={id} mediaType={mediaType} />
            )}

            {(isSavedInWatched || isSavedInWatchlist) && (
              <RemoveMediaButton tmdbId={id}>
                Remove From {isSavedInWatched ? "watched" : "watchlist"}
              </RemoveMediaButton>
            )}
          </MediaDetails.Actions>
        )}

        <MediaDetails.Overview>
          <p>{overview}</p>
        </MediaDetails.Overview>

        <MediaDetails.Director>{directors}</MediaDetails.Director>
        <MediaDetails.TopActors>{topCast}</MediaDetails.TopActors>
      </MediaDetails>

      <div className="space-y-4">
        <h1 className="border-l-4 border-zinc-900 pl-2 text-3xl font-bold only:hidden">
          More Like This
        </h1>
        <Suspense fallback={<ScrollXSkeleton />}>
          <SimilarMedia mediaType="movie" mediaId={id} />
        </Suspense>
      </div>
    </div>
  );
}
