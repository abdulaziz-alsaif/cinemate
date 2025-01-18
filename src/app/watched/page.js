import { Suspense } from "react";

import Filter from "@/features/media/components/Filter";
import SortBy from "@/features/media/components/SortBy";
import HorizontalCardSkeleton from "@/features/media/components/HorizontalCardSkeleton";
import WatchedList from "@/features/media/components/WatchedList";

export const metadata = {
  title: "Your Watched List",
  description:
    "Track and organize all the movies and TV shows you've watched. Use filters and sorting options to view your list the way you prefer.",
};


const filterOptions = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "tv", label: "TV Shows" },
];

const sortOptions = [
  { value: "list-order", label: "List Order" },
  { value: "highest-rating", label: "Highest Rating" },
  { value: "user-highest-rating", label: "Your Highest Rating" },
  { value: "release-date", label: "Release Date" },
];

export default async function WatchedPage({ searchParams }) {
  const params = await searchParams;
  const filterValue = params?.filter ?? "all";
  const sortByValue = params?.sortBy ?? "list-order";

  return (
    <div className="container space-y-8">
      <div className="space-y-2">
        <h1 className="text-xl font-normal">Your Watched list</h1>
        <p className="text-zinc-500">
          Your Watched list is the place to track the titles you have watched.
          You can sort or filter your Watched list in the order you want to see
          them.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex space-x-3 sm:justify-end">
          <Filter options={filterOptions} />
          <SortBy options={sortOptions} />
        </div>

        {/* that ket is wried i know but it is needed to render fallback if filter or sortBy */}
        <Suspense
          fallback={<HorizontalCardSkeleton />}
          key={`${filterValue},${sortByValue}`}
        >
          <WatchedList filterValue={filterValue} sortByValue={sortByValue} />
        </Suspense>
      </div>
    </div>
  );
}
