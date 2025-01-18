import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

function ScrollXSkeleton() {
  return (
    <ScrollArea>
      <div className="mb-4 flex space-x-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-[200px] overflow-hidden rounded-md border border-zinc-200 shadow-sm"
          >
            <Skeleton className="relative aspect-[2/3]" />

            <div className="space-y-2 px-2 py-3 md:px-3">
              <Skeleton className="w-30 h-6 rounded-full" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-16 rounded-full" />
                <Skeleton className="h-3 w-16 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default ScrollXSkeleton;
