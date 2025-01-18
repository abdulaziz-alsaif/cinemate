import Image from "next/image";
import Link from "next/link";

import StarRating from "../../components/StarRating";

import { BASE_IMG_URL } from "@/utils/constants";
import Separator from "@/components/Separator";
import MediaImgWithFallback from "../../components/MediaImgWithFallback";

function SeasonCard({ season, tvShowId }) {
  const { posterPath, title, releaseDate, rating, episodeCount, seasonNumber } =
    season;

  const releaseYear = releaseDate?.split("-")[0];

  //
  return (
    <Link
      className="w-[200px] overflow-hidden rounded-md border border-zinc-200 shadow-sm"
      href={`${tvShowId}/season/${seasonNumber}`}
    >
      <div className="relative aspect-[2/3]">
        <MediaImgWithFallback
          src={posterPath ? `${BASE_IMG_URL}/w342${posterPath}`: ""}
          alt={`poster of ${title}`}
          fill
          className="object-cover"
          quality={100}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 342px"
        />
      </div>

      <div className="space-y-1 px-2 py-3 md:px-3">
        <h2 className="line-clamp-1 text-lg">{title}</h2>
        <StarRating size={18} rating={rating} ratingClassName="font-normal" />
        <div className="flex items-center space-x-1 text-sm text-zinc-500">
          <span>{releaseYear}</span>
          <Separator />
          <span>{episodeCount} episodes</span>
        </div>
      </div>
    </Link>
  );
}

export default SeasonCard;
