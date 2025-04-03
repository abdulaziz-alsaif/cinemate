import Link from "next/link";

import StarRating from "@/features/media/components/StarRating";
import Separator from "@/components/Separator";

import { BASE_IMG_URL } from "@/utils/constants";
import MediaImgWithFallback from "@/features/media/components/MediaImgWithFallback";

import { BaseMediaType } from "@/types/global.types";

function SearchResultItem({ media }: {media: BaseMediaType}) {
  const { id, posterPath, title, releaseDate, rating, overview, mediaType } =
    media;

  const releaseYear = releaseDate.split("-")[0];

  return (
    <Link className="flex items-start gap-4" href={`/${mediaType}/${id}`}>
      <div className="relative aspect-[2/3] w-12 shrink-0 overflow-hidden rounded-md">
        <MediaImgWithFallback
          fallbackSize={32}
          src={posterPath ? `${BASE_IMG_URL}/w342${posterPath}` : ""}
          alt={`poster of ${title}`}
          fill
          className="object-cover"
          quality={100}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 342px"
        />
      </div>

      <div className="flex flex-grow flex-col gap-y-1">
        <h2 className="line-clamp-1 text-lg font-medium">{title}</h2>
        <div className="flex items-center space-x-1 space-y-0 text-sm">
          <StarRating rating={rating} ratingClassName="text-sm" size={16} />
          {releaseYear && <Separator />}
          <p className="text-xs">{releaseYear}</p>
        </div>
        <p className="line-clamp-2">{overview}</p>
      </div>
    </Link>
  );
}

export default SearchResultItem;
