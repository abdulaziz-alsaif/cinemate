import MediaDetailsSkeleton from "@/features/media/components/MediaDetailsSkeleton";

export default function Loading() {
  return (
    <div className="container min-h-screen space-y-20">
      <MediaDetailsSkeleton />
    </div>
  );
}
