"use client";

import { createContext, useContext, useState } from "react";
import { toast } from "@/hooks/use-toast";

import { getAIRecommendations } from "@/features/AI-recommendations/services/actions";

const RecommendationsContext = createContext({
  status: "ready",
  mediaResults: [],
  prevRecommendations: [],
  fetchRecommendations: async () => {},
});

function RecommendationsProvider({ children }) {
  // status = ready | loading | done | error, status is used here to avoid impossible states
  const [status, setStatus] = useState("ready");
  const [mediaResults, setMediaResults] = useState([]);
  const [prevRecommendations, setPrevRecommendations] = useState([]);

  async function fetchRecommendations(watchedList) {
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
