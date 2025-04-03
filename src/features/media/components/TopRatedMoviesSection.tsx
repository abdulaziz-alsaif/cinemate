import ScrollAreaX from "@/features/media/components/ScrollAreaX";
import VerticalCard from "./VerticalCard";

import { getMedia } from "@/features/media/services/tmbd-services";

async function TopRatedMoviesSection() {
  const { data: topRatedMovies } = await getMedia("movie", "top-rated");

  return (
    <div className="space-y-4">
      <h1 className="border-l-a4 border-zinc-900 pl-2 text-3xl font-bold">
        Top Rated Movies
      </h1>
      <ScrollAreaX mediaList={topRatedMovies} render={(media) => <VerticalCard media={media} key={media.id} />} />
    </div>
  );
}

export default TopRatedMoviesSection;
