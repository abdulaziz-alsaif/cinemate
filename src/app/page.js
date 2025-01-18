import { Suspense } from "react";

import MediaCarousel from "@/features/media/components/MediaCarousel";
import WatchlistScrollX from "@/features/media/components/WatchlistScrollX";
import ScrollAreaX from "@/features/media/components/ScrollAreaX";
import ScrollXSkeleton from "@/features/media/components/ScrollXSkeleton";

import {
  getMedia,
  getTrendingMedia,
} from "@/features/media/services/tmbd-services";

export default async function Home() {
  const [
    trendingMedia,
    { data: topRatedMovies },
    { data: popularMovies },
    { data: topRatedTVShows },
    { data: popularTVShows },
  ] = await Promise.all([
    getTrendingMedia(),
    getMedia("movie", "top-rated"),
    getMedia("movie", "popular"),
    getMedia("tv", "top-rated"),
    getMedia("tv", "popular"),
  ]);

  return (
    <div className="container space-y-14">
      <div className="h-[700px] overflow-hidden rounded-xl min-[940px]:h-[32rem]">
        <MediaCarousel mediaItems={trendingMedia} />
      </div>

      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="border-l-4 border-zinc-900 pl-2 text-3xl font-bold">
            Popular Movies
          </h1>
          <ScrollAreaX mediaList={popularMovies} />
        </div>

        <div className="space-y-4">
          <h1 className="border-l-4 border-zinc-900 pl-2 text-3xl font-bold">
            Top Rated Movies
          </h1>
          <ScrollAreaX mediaList={topRatedMovies} />
        </div>

        <div className="space-y-4">
          <h1 className="border-l-4 border-zinc-900 pl-2 text-3xl font-bold">
            Popular TV Shows
          </h1>
          <ScrollAreaX mediaList={popularTVShows} />
        </div>

        <div className="space-y-4">
          <h1 className="border-l-4 border-zinc-900 pl-2 text-3xl font-bold">
            Top Rated TV Shows
          </h1>
          <ScrollAreaX mediaList={topRatedTVShows} />
        </div>

        <div className="space-y-4">
          <h1 className="border-l-4 border-zinc-900 pl-2 text-3xl font-bold">
            From Your Watchlist
          </h1>
          <Suspense fallback={<ScrollXSkeleton />}>
            <WatchlistScrollX />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
