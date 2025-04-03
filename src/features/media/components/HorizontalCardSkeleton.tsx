import { Skeleton } from "@/components/ui/skeleton";

function HorizontalCardSkeleton({ numOfItems = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: numOfItems }).map((_, i) => (
        <div
          key={i}
          className="flex items-start overflow-hidden rounded-md border border-zinc-200 shadow-md"
        >
          <Skeleton className="relative aspect-[2/3] w-28 shrink-0 rounded-none" />

          <div className="flex flex-col px-6 py-2 flex-1">
            <Skeleton className="h-4 max-w-40 rounded-full" />
            <div className="mb-8 mt-1 flex items-center space-x-1">
              <Skeleton className="h-2 w-10 rounded-full" />
              <Skeleton className="h-2 w-10 rounded-full" />
            </div>
            <Skeleton className="mb-1 h-3 rounded-full" />
            <Skeleton className="mb-1 h-3 rounded-full" />
            <Skeleton className="mb-1 h-3 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default HorizontalCardSkeleton;
