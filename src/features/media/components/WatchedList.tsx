import HorizontalCard from "./HorizontalCard";
import UpdateUserButton from "./UpdateRatingButton";

import { getUserSavedMedia } from "../services/supabaseApi";
import RemoveMediaButton from "./RemoveMediaButton";

import { FilterValueType, SortByValueType } from "@/types/global.types";

type WatchedListProps = {
  filterValue: FilterValueType,
  sortByValue: SortByValueType
}

async function WatchedList({ filterValue, sortByValue }: WatchedListProps) {
  const mediaList = await getUserSavedMedia(
    "watched",
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
      {mediaList.map(({ media, userRating }) => (
        <HorizontalCard media={media} key={media.tmdbId}>
          <div className="mt-4 flex items-center justify-end gap-0.5">
            <UpdateUserButton
              title={media.title}
              tmdbId={media.tmdbId}
              currentRating={userRating || 0}
            />
            <RemoveMediaButton showIconOnly tmdbId={media.tmdbId}>
              Remove from watched
            </RemoveMediaButton>
          </div>
        </HorizontalCard>
      ))}
    </div>
  );
}

export default WatchedList;
