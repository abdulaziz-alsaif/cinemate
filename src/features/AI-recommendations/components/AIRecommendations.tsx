"use client";

import { Sparkles } from "lucide-react";

import { useRecommendations } from "@/context/RecommendationsContext";

import { Button } from "@/components/ui/button";

import Spinner from "@/components/Spinner";
import SpinnerMini from "@/components/SpinnerMini";
import MediaList from "@/features/media/components/MediaList";

import { WatchedListRecommendationType } from "@/types/global.types";

type AIRecommendationsType = {
  watchedList: WatchedListRecommendationType[]
}

function AIRecommendations({ watchedList }: AIRecommendationsType) {
  const { mediaResults, prevRecommendations, status, fetchRecommendations } =
    useRecommendations();

  const isFirstTime = prevRecommendations.length === 0;


  async function handleClick() {
    await fetchRecommendations(watchedList);
  }

  return (
    <div className="space-y-6">
      {status === "loading" && (
        <div className="text-center">
          <Spinner className="mb-2" />
          <span className="text-xs text-zinc-500">
            Please wait. It might take a long time.
          </span>
        </div>
      )}

      {status === "done" && mediaResults.length !== 0 && (
        <MediaList list={mediaResults} />
      )}

      <div className="text-center">
        <Button onClick={handleClick} disabled={status === "loading"}>
          {status === "loading" && (
            <>
              <SpinnerMini /> Getting Recommendations
            </>
          )}
          {status !== "loading" && (
            <>
              <Sparkles /> Get {!isFirstTime && "New"} Recommendations
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default AIRecommendations;
