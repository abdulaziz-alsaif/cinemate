import ScrollAreaX from "@/features/media/components/ScrollAreaX";
import VerticalCard from "../../components/VerticalCard";

import { getMedia } from "@/features/media/services/tmbd-services";

async function PopularTVShowsSection() {
  const { data: popularTVShows } = await getMedia("tv", "popular");

  return (
    <div className="space-y-4">
      <h1 className="border-l-a4 border-zinc-900 pl-2 text-3xl font-bold">
        Popular TV Shows
      </h1>
      <ScrollAreaX mediaList={popularTVShows} render={(media) => <VerticalCard media={media} key={media.id} />} />
    </div>
  );
}

export default PopularTVShowsSection;
