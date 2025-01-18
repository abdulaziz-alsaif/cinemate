import Separator from "@/components/Separator";
import StarRating from "@/features/media/components/StarRating";
import MediaImgWithFallback from "../../components/MediaImgWithFallback";

import { BASE_IMG_URL } from "@/utils/constants";

function EpisodeCard({ episode, seasonNumber }) {
  const {
    backdropPath,
    title,
    releaseDate,
    rating,
    overview,
    runtime,
    episodeNumber,
  } = episode;

  return (
    <div className="flex flex-col gap-1 overflow-hidden rounded-md border border-zinc-200 shadow-sm sm:flex-row sm:items-start">
      <div className="relative aspect-video shrink-0 flex-grow sm:w-48 sm:flex-grow-[unset]">
        <MediaImgWithFallback
          src={backdropPath ? `${BASE_IMG_URL}/original${backdropPath}`: ""}
          alt={`poster of ${title}`}
          fill
          className="object-cover"
          quality={100}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 828px"
        />
      </div>

      <div className="flex flex-grow-[3] flex-col px-4 py-2">
        <h2 className="line-clamp-1 text-lg font-medium">
          S{seasonNumber} E{episodeNumber} - {title}
        </h2>
        <div className="mt-1 flex items-center space-x-1 text-sm">
          <StarRating rating={rating} ratingClassName="text-sm" size={16} />
          <div className="flex items-center space-x-1 text-zinc-500">
            <Separator />
            <span>{releaseDate ? releaseDate: "Release Date Unknown"}</span>
            <Separator />
            <span>{runtime}m</span>
          </div>
        </div>
        <p className="mt-2 text-zinc-500">{overview}</p>
      </div>
    </div>
  );
}

export default EpisodeCard;
