import { Skeleton } from "@/components/ui/skeleton";
import MediaCarousel from "./MediaCarousel";

import { getTrendingMedia } from "../services/tmbd-services";

async function MediaCarouselSection() {
  const trendingMedia = await getTrendingMedia();

  return (
    <div className="h-[700px] overflow-hidden rounded-xl min-[940px]:h-[32rem]">
      <MediaCarousel mediaItems={trendingMedia} />
    </div>
  );
}

// Skelton Version of this component
export function MediaCarouselSectionSkeleton() {
  return (
    <Skeleton className="h-[700px] overflow-hidden rounded-xl min-[940px]:h-[32rem]" />
  );
}

export default MediaCarouselSection;
