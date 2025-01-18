import { Skeleton } from "@/components/ui/skeleton";

import HorizontalCardSkeleton from "@/features/media/components/HorizontalCardSkeleton";

export default function Loading() {
  return (
    <div className="container space-y-8">
      <Skeleton className="h-9 min-w-full max-w-80 rounded-full" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <HorizontalCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
