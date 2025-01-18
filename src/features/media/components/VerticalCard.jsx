"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import StarRating from "./StarRating";
import MediaImgWithFallback from "@/features/media/components/MediaImgWithFallback";

import { BASE_IMG_URL } from "@/utils/constants";

function VerticalCard({ media, href: customHref }) {
  const pathname = usePathname();
  const { id, posterPath, title, releaseDate, rating, mediaType } = media;

  const releaseYear = releaseDate.split("-")[0];

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
