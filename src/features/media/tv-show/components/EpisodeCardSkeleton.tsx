import { Skeleton } from "@/components/ui/skeleton";

function EpisodeCardSkeleton() {
  return (
    <div className="flex flex-col gap-1 overflow-hidden rounded-md border border-zinc-200 shadow-sm sm:flex-row sm:items-start">
      <Skeleton className="relative aspect-video shrink-0 flex-grow sm:w-48 sm:flex-grow-[unset] rounded-none" />

      <div className="flex flex-grow-[3] flex-col px-4 py-2">
        <Skeleton className="h-4 w-full max-w-40 rounded-full" />
        <div className="mt-1.5 mb-4 flex items-center space-x-1">
          <Skeleton className="h-2 w-10 rounded-full" />
          <Skeleton className="h-2 w-10 rounded-full" />
        </div>
        <Skeleton className="mb-1 h-3 w-full rounded-full" />
        <Skeleton className="mb-1 h-3 w-full rounded-full" />
        <Skeleton className="mb-1 h-3 w-full rounded-full" />
      </div>
    </div>
  );
}

export default EpisodeCardSkeleton;
