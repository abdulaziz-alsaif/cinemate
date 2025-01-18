import { Skeleton } from "@/components/ui/skeleton"

function MediaDetailsSkeleton() {
    return <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="mb-1 h-4 w-40 rounded-full" />
          <Skeleton className="w-30 h-3 rounded-full" />
          <Skeleton className="w-30 h-3 rounded-full" />
        </div>

        <Skeleton className="aspect-video sm:aspect-auto sm:h-[315px] md:h-[360px] lg:h-[420px]" />

        <div className="max-w-[850px] space-y-2">
          <h2 className="text-lg font-medium">Overview</h2>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="flex items-start gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 flex-1" />
        </div>
      </div>
}

export default MediaDetailsSkeleton
