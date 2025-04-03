"use client";

import { createContext, useContext, useState } from "react";
import { toast } from "@/hooks/use-toast";

import { getAIRecommendations } from "@/features/AI-recommendations/services/actions";

import { BaseMediaType, Status, WatchedListRecommendationType } from "@/types/global.types";

type RecommendationContextType = {
  status: Status,
  mediaResults: BaseMediaType[],
  prevRecommendations: string[],
  fetchRecommendations(watchedList: WatchedListRecommendationType[]): Promise<void>
}

const RecommendationsContext = createContext<RecommendationContextType>({
  status: "ready",
  mediaResults: [],
  prevRecommendations: [],
  fetchRecommendations: async () => {},
});

function RecommendationsProvider({ children }: {children: React.ReactNode}) {
  // status = ready | loading | done | error, status is used here to avoid impossible states
  const [status, setStatus] = useState<Status>("ready");
  const [mediaResults, setMediaResults] = useState<BaseMediaType[]>([]);
  const [prevRecommendations, setPrevRecommendations] = useState<string[]>([]);

  async function fetchRecommendations(watchedList: WatchedListRecommendationType[]) {
    setStatus("loading");
    const { success, data, message } = await getAIRecommendations(
      watchedList,
      prevRecommendations,
    );

    if (!success) {
      setStatus("error");
      toast({
        variant: "destructive",
        title: "Something Went Wrong!",
        description: message,
      });
      return;
    }

    setMediaResults(data);
    setPrevRecommendations((prev) => {
      const currentRecommendations = data.map((media) => media.title);
      return [...prev, ...currentRecommendations];
    });
    setStatus("done");
  }

  return (
    <RecommendationsContext.Provider
      value={{
        status,
        mediaResults,
        prevRecommendations,
        fetchRecommendations,
      }}
    >
      {children}
    </RecommendationsContext.Provider>
  );
}

function useRecommendations() {
  const context = useContext(RecommendationsContext);

  if (context === undefined)
    throw new Error("Recommendations Context was used outside of provider");

  return context;
}

export { RecommendationsProvider, useRecommendations };
