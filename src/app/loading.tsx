import { Skeleton } from "@/components/ui/skeleton";
import ScrollXSkeleton from "@/features/media/components/ScrollXSkeleton";

export default function Loading() {
    return (
        <div className="container space-y-14">
          <Skeleton className="h-[700px] overflow-hidden rounded-xl min-[940px]:h-[32rem]" />
    
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="border-l-4 border-zinc-950 pl-2 text-3xl font-bold">
                Trending This Week
              </h1>
              <ScrollXSkeleton />
            </div>
    
            <div className="space-y-4">
              <h1 className="border-l-4 border-zinc-950 pl-2 text-3xl font-bold">
                Top Rated Movies
              </h1>
              <ScrollXSkeleton />
            </div>
    
            <div className="space-y-4">
              <h1 className="border-l-4 border-zinc-950 pl-2 text-3xl font-bold">
                Top Rated TV Shows
              </h1>
              <ScrollXSkeleton />
            </div>
          </div>
        </div>
      );
}
