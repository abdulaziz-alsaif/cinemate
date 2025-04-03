"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import StarRating from "./StarRating";
import MediaImgWithFallback from "@/features/media/components/MediaImgWithFallback";

import { BASE_IMG_URL } from "@/utils/constants";

import { BaseMediaType } from "@/types/global.types";

import { MediaType } from "../services/types/index.types";

type MediaProps = {
    id: number;
    title: string;
    posterPath: string | null;
    releaseDate: string | null;
    rating: number | null | undefined;
    mediaType: MediaType;
}

type VerticalCardType<T extends MediaProps> =
  | {
      media: T;
      href?: string;
    }
  | {
      media: Omit<T, "id">;
      href: string;
    };

function VerticalCard<T extends MediaProps>({ media, href: customHref }: VerticalCardType<T>) {
  const pathname = usePathname();
  const { posterPath, title, releaseDate, rating, mediaType } = media;

  let id = "id" in media ? media.id : "";

  const releaseYear = releaseDate?.split("-")[0] || "N/A";

  const href =
    customHref || (pathname === "/" ? `${mediaType}/${id}` : `${id}`);

  return (
    <Link
      className="w-[200px] overflow-hidden rounded-md border border-zinc-200 shadow-sm"
      href={href}
    >
      <div className="relative aspect-[2/3]">
        <MediaImgWithFallback
          src={posterPath ? `${BASE_IMG_URL}/w342${posterPath}` : ""}
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
        <div className="flex items-center justify-between">
          <StarRating size={18} rating={rating} ratingClassName="font-normal" />
          <span className="text-sm text-zinc-500">{releaseYear}</span>
        </div>
      </div>
    </Link>
  );
}

export default VerticalCard;
