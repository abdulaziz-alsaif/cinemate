import { Suspense } from "react";

import FilterSort from "@/features/media/components/FilterSort";
import Watchlist from "@/features/media/components/Watchlist";
import UserMediaListSkeleton from "@/features/media/components/HorizontalCardSkeleton";
import { FilterValueType, SortByValueType } from "@/types/global.types";

export const metadata = {
  title: "Your Watchlist",
  description:
    "Track and organize all the movies and TV shows you want to watch. Use filters and sorting options to view your list the way you prefer.",
};

const filterOptions = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "tv", label: "TV Shows" },
];

const sortOptions = [
  { value: "list-order", label: "List Order" },
  { value: "highest-rating", label: "Highest Rating" },
  { value: "release-date", label: "Release Date" },
];

type Params = Promise<{ filter: FilterValueType; sortBy: SortByValueType }>;

export default async function WatchlistPage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const params = await searchParams;
  const filterValue = params?.filter ?? "all";
  const sortByValue = params?.sortBy ?? "list-order";

  return (
    <div className="container space-y-8">
      <div className="space-y-2">
        <h1 className="text-xl font-normal">Your Watchlist</h1>
        <p className="text-zinc-500">
          Your Watchlist is the place to track the titles you want to watch. You
          can sort or filter your Watchlist in the order you want to see them.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex space-x-3 sm:justify-end">
          <FilterSort
            options={filterOptions}
            searchParamsField="filter"
            defaultValue="all"
            placeholder="Filter By"
          />
          <FilterSort
            options={sortOptions}
            searchParamsField="sortBy"
            defaultValue="list-order"
            placeholder="Sort By"
          />
        </div>

        {/* that ket is wried i know but it is needed to render fallback if filter or sortBy */}
        <Suspense
          fallback={<UserMediaListSkeleton />}
          key={`${filterValue},${sortByValue}`}
        >
          <Watchlist filterValue={filterValue} sortByValue={sortByValue} />
        </Suspense>
      </div>
    </div>
  );
}
