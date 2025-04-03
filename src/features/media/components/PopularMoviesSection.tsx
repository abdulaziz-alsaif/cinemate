import ScrollAreaX from "@/features/media/components/ScrollAreaX";
import VerticalCard from "./VerticalCard";

import { getMedia } from "@/features/media/services/tmbd-services";

async function PopularMoviesSection() {
  const { data: popularMovies } = await getMedia("movie", "popular");

  return (
    <div className="space-y-4">
      <h1 className="border-l-a4 border-zinc-900 pl-2 text-3xl font-bold">
        Popular Movies
      </h1>
      <ScrollAreaX mediaList={popularMovies} render={(media) => <VerticalCard media={media} key={media.id} />} />
    </div>
  );
}

export default PopularMoviesSection;
