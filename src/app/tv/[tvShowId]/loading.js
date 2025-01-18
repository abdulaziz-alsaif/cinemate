import MediaDetailsSkeleton from "@/features/media/components/MediaDetailsSkeleton";
import ScrollXSkeleton from "@/features/media/components/ScrollXSkeleton";

export default function Loading() {
  return (
    <div className="container min-h-screen space-y-20">
      <MediaDetailsSkeleton />

      <div className="mt-6 space-y-4">
        <h1 className="border-l-4 border-zinc-950 pl-2 text-3xl font-bold">
          Seasons
        </h1>
        <ScrollXSkeleton />
      </div>
    </div>
  );
}
