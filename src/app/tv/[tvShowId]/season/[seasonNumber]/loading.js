import { Skeleton } from "@/components/ui/skeleton";
import EpisodeCardSkeleton from "@/features/media/tv-show/components/EpisodeCardSkeleton";

export default function Loading() {
  return (
    <div className="container space-y-20">
      <div className="flex items-start gap-5">
        <Skeleton className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-md" />
        <div className="flex-grow">
          <Skeleton className="mb-1.5 h-4 w-full max-w-40 rounded-full" />
          <Skeleton className="mb-6 h-2 w-20 rounded-full" />

          <Skeleton className="mb-1 h-3 w-full max-w-md rounded-full" />
          <Skeleton className="mb-1 h-3 w-full max-w-md rounded-full" />
          <Skeleton className="h-3 w-full max-w-md rounded-full" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-4 w-32 rounded-full" />
        </div>

        <ul className="space-y-6">
          <EpisodeCardSkeleton />
          <EpisodeCardSkeleton />
          <EpisodeCardSkeleton />
        </ul>
      </div>
    </div>
  );
}
