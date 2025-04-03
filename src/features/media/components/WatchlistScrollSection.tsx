import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "@/components/ErrorFallback";
import ScrollXSkeleton from "./ScrollXSkeleton";
import WatchlistScrollX from "./WatchlistScrollX";

function WatchlistScrollSection() {
  return (
    <div className="space-y-4">
      <h1 className="border-l-4 border-zinc-900 pl-2 text-3xl font-bold">
        From Your Watchlist
      </h1>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<ScrollXSkeleton />}>
          <WatchlistScrollX />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default WatchlistScrollSection;
