import Link from "next/link";
import Image from "next/image";

import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";

import { BASE_IMG_URL } from "@/utils/constants";

function CarouselItem({ media }) {
  const {
    id,
    backdropPath,
    title,
    releaseDate,
    rating,
    genre,
    overview,
    mediaType,
  } = media;

  const releaseYear = releaseDate?.split("-")[0] || "Release Date Unknown";

  return (
    <div className="relative h-full w-full">
      <Image
        src={`${BASE_IMG_URL}/w1280${backdropPath}`}
        alt={`poster of ${title}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1280px"
        quality={95}
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 to-zinc-950/20"></div>

      <div className="absolute bottom-1/2 left-4 mr-auto max-w-[500px] translate-y-1/2 text-zinc-50 md:left-20">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl md:tracking-tight">
          {title}
        </h1>
        <div className="mb-3 flex items-center gap-1">
          <StarRating rating={rating} />
          <span className="text-4xl leading-[0]">&middot;</span>
          <span className="">{releaseYear}</span>
        </div>

        <p className="mb-3 text-xs text-zinc-300">{genre}</p>

        <p className="mb-6 line-clamp-3 text-zinc-300">{overview}</p>

        <Button
          className="bg-zinc-50 text-zinc-900 ring-offset-zinc-950 hover:bg-zinc-50/90 focus-visible:ring-zinc-300"
          asChild
        >
          <Link href={`${mediaType}/${id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}

export default CarouselItem;
