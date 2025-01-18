import HorizontalCard from "./HorizontalCard";
import AddToWatched from "./AddToWatched";
import RemoveMediaButton from "./RemoveMediaButton";

import { getUserSavedMedia } from "../services/supabaseApi";

async function Watchlist({ filterValue, sortByValue }) {
  const mediaList = await getUserSavedMedia(
    "watchlist",
    filterValue,
    sortByValue,
  );

  if (mediaList.length === 0) {
    return (
      <div className="space-y-1 pt-12 text-center">
        <p className="font-medium">
          You haven&apos;t saved any movies or shows yet
        </p>
        <p className="text-sm">
          Start exploring and add your favorite movies or shows to your list!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {mediaList.map(({ media }) => (
        <HorizontalCard media={media} key={media.tmdbId}>
          <div className="mt-4 flex items-center justify-end gap-0.5">
            <AddToWatched
              title={media.title}
              buttonProps={{ variant: "outline", size: "sm" }}
              mediaId={media.tmdbId}
              mediaType={media.mediaType}
            />
            <RemoveMediaButton showIconOnly tmdbId={media.tmdbId}>
              Remove from watchlist
            </RemoveMediaButton>
          </div>
        </HorizontalCard>
      ))}
    </div>
  );
}

export default Watchlist;
