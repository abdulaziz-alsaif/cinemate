import { Suspense } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Separator from "@/components/Separator";
import MediaDetails from "@/features/media/components/MediaDetails";
import ScrollXSkeleton from "@/features/media/components/ScrollXSkeleton";
import SimilarMedia from "@/features/media/components/SimilarMedia";
import StarRating from "@/features/media/components/StarRating";
import SeasonCard from "@/features/media/tv-show/components/SeasonCard";
import AddToWatched from "@/features/media/components/AddToWatched";
import AddToWatchlist from "@/features/media/components/AddToWatchlist";
import RemoveMediaButton from "@/features/media/components/RemoveMediaButton";

import { getTVShowDetails } from "@/features/media/services/tmbd-services";
import { isMediaSavedByUser } from "@/features/media/services/supabaseApi";
import { createClient } from "@/lib/supabase/server";

import { BASE_IMG_URL } from "@/utils/constants";

export async function generateMetadata({ params }) {
  const tvShowId = (await params).tvShowId;
  const tvShow = await getTVShowDetails(tvShowId);

  const { title, overview, releaseDate } = tvShow;

  return {
    title: `${title} (${releaseDate ? releaseDate : ""})`,
    description: overview,
  };
}

export default async function Page({ params }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isUserAuthenticated = !!user;

  const userId = user?.userId || ""

  const tvShowId = (await params).tvShowId;
  const tvShow = await getTVShowDetails(tvShowId);
  const { isSavedInWatched, isSavedInWatchlist } = await isMediaSavedByUser(
    tvShowId,
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
    seasons,
    totalEpisodes,
    mediaType,
  } = tvShow;

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
            <Separator />
            <span>{releaseDate}</span>
            <Separator />
            <span>{totalEpisodes} Episodes</span>
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
        <h1 className="border-l-4 border-zinc-950 pl-2 text-3xl font-bold">
          Seasons
        </h1>
        {seasons.length !== 0 ? (
          <ScrollArea>
            <div className="mb-4 flex space-x-6">
              {seasons.map((season) => (
                <SeasonCard season={season} key={season.id} tvShowId={id} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <p className="text-center">{title} has no seasons</p>
        )}
      </div>

      <div className="space-y-4">
        <h1 className="border-l-4 border-zinc-900 pl-2 text-3xl font-bold only:hidden">
          More Like This
        </h1>
        <Suspense fallback={<ScrollXSkeleton />}>
          <SimilarMedia mediaType="tv" mediaId={id} />
        </Suspense>
      </div>
    </div>
  );
}
