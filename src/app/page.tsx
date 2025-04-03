import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import ScrollXSkeleton from "@/features/media/components/ScrollXSkeleton";

import MediaCarouselSection, {
  MediaCarouselSectionSkeleton,
} from "@/features/media/components/MediaCarouselSection";
import ErrorFallback from "@/components/ErrorFallback";
import PopularMoviesSection from "@/features/media/components/PopularMoviesSection";
import TopRatedMoviesSection from "@/features/media/components/TopRatedMoviesSection";
import TopRatedTVShowsSection from "@/features/media/tv-show/components/TopRatedTVShowsSection";
import PopularTVShowsSection from "@/features/media/tv-show/components/PopularTVShowsSection";
import WatchlistScrollSection from "@/features/media/components/WatchlistScrollSection";

export default function Home() {
  return (
    <div className="container space-y-14">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<MediaCarouselSectionSkeleton />}>
          <MediaCarouselSection />
        </Suspense>
      </ErrorBoundary>

      <div className="space-y-12">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<ScrollXSkeleton />}>
            <PopularMoviesSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<ScrollXSkeleton />}>
            <TopRatedMoviesSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<ScrollXSkeleton />}>
            <TopRatedTVShowsSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<ScrollXSkeleton />}>
            <PopularTVShowsSection />
          </Suspense>
        </ErrorBoundary>

        <WatchlistScrollSection />
      </div>
    </div>
  );
}
