import Separator from "@/components/Separator";
import StarRating from "@/features/media/components/StarRating";
import EpisodeCard from "@/features/media/tv-show/components/EpisodeCard";
import SeasonSelect from "@/features/media/tv-show/components/SeasonSelect";
import MediaImgWithFallback from "@/features/media/components/MediaImgWithFallback";

import {
  getTVShowDetails,
  getTVShowSeasonDetails,
} from "@/features/media/services/tmbd-services";

import { BASE_IMG_URL } from "@/utils/constants";

type PageProps = {
  params: Promise<{
    seasonNumber: number;
    tvShowId: number;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { tvShowId, seasonNumber } = await params;

  const { seasons } = await getTVShowDetails(tvShowId); // cached
  const tvShowSeason = await getTVShowSeasonDetails(tvShowId, seasonNumber);

  const numberOfSeasons = seasons.length;

  const { title, releaseDate, overview, posterPath, rating, episodes } =
    tvShowSeason;

  const numberOfEpisodes = episodes.length;

  return (
    <div className="container space-y-20">
      <div className="flex items-start gap-5">
        <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-md">
          <MediaImgWithFallback
            src={posterPath ? `${BASE_IMG_URL}/w342${posterPath}` : ""}
            alt={`poster of ${title} season ${seasonNumber}`}
            fill
            className="object-cover"
            quality={100}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 342px"
          />
        </div>

        <div className="flex-grow">
          <h2 className="text-xl font-medium">{title}</h2>
          <div className="mt-0.5 flex flex-wrap items-center space-x-1 space-y-0 text-sm">
            <StarRating rating={rating} ratingClassName="text-sm" size={16} />
            {releaseDate && (
              <>
                <Separator />
                <p>{releaseDate}</p>
              </>
            )}
          </div>
          <p className="mt-2 max-w-2xl text-zinc-500">{overview}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium">
            Episodes <span className="text-zinc-500">{numberOfEpisodes}</span>
          </div>

          <div>
            <SeasonSelect
              currentSeasonNum={seasonNumber}
              numOfSeasons={numberOfSeasons}
            />
          </div>
        </div>

        <ul className="space-y-6">
          {episodes.map((episode) => (
            <EpisodeCard
              episode={episode}
              key={episode.id}
              seasonNumber={seasonNumber}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
