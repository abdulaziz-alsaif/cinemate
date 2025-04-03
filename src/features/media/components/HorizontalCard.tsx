import { Children } from "react";

import Link from "next/link";

import StarRating from "./StarRating";
import Separator from "@/components/Separator";

import { BASE_IMG_URL } from "@/utils/constants";
import MediaImgWithFallback from "@/features/media/components/MediaImgWithFallback";

import { SupabaseMediaType } from "@/app/db/databaseSchema";

type PartialSupabaseMedia = Omit<SupabaseMediaType, "genre" | "created_at"> & Partial<Pick<SupabaseMediaType, "genre" | "created_at">>;


type MediaType = (Pick<Partial<SupabaseMediaType>, "tmdbId"> & Omit<PartialSupabaseMedia, "tmdbId"> & {id: number}) | PartialSupabaseMedia & {id?: number}

type HorizontalCardProps = {
  media: MediaType
  children?: React.ReactNode
}

function HorizontalCard({ media, children }: HorizontalCardProps) {
  const {
    posterPath,
    title,
    releaseDate,
    rating,
    overview,
    mediaType,
    tmdbId,
    id,
  } = media;

  // check if media has tmdbId or id, they are the same thing
  const mediaId = tmdbId || id;
  const releaseYear = releaseDate?.split("-")[0] || "Release Date Unknown";

  const href = `/${mediaType}/${mediaId}`;

  // check if children (actions) is passed to this component, this changes styles of overview <p />
  const isChildrenNull = Children.count(children) === 0;

  return (
    <div className="flex items-start overflow-hidden rounded-md border border-zinc-200 shadow-md">
      <Link href={href} className="relative block aspect-[2/3] w-28 shrink-0">
        <MediaImgWithFallback
          src={posterPath ? `${BASE_IMG_URL}/w342${posterPath}`: ""}
          alt={`poster of ${title}`}
          fill
          className="object-cover"
          quality={100}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 342px"
        />
      </Link>

      <div className="flex flex-col px-6 py-2">
        <Link href={href}>
          <h2 className="line-clamp-1 text-lg font-medium hover:underline">
            {title}
          </h2>
        </Link>
        <div className="mb-2 mt-1 flex space-x-1">
          <StarRating size={18} rating={rating} ratingClassName="text-sm" />
          <div className="flex items-center space-x-1 text-sm text-zinc-500">
            <Separator />
            <span>{releaseYear}</span>
          </div>
        </div>
        <p
          className={`${isChildrenNull ? "line-clamp-4" : "line-clamp-2"} text-sm text-zinc-500`}
        >
          {overview}
        </p>

        {children}
      </div>
    </div>
  );
}

export default HorizontalCard;
