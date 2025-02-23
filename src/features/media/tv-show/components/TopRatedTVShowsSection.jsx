import ScrollAreaX from "@/features/media/components/ScrollAreaX";

import { getMedia } from "@/features/media/services/tmbd-services";

async function TopRatedTVShowsSection() {
  const { data: topRatedTVShows } = await getMedia("tv", "top-rated");

  return (
    <div className="space-y-4">
      <h1 className="border-l-a4 border-zinc-900 pl-2 text-3xl font-bold">
        Top Rated TV Shows
      </h1>
      <ScrollAreaX mediaList={topRatedTVShows} />
    </div>
  );
}

export default TopRatedTVShowsSection;
