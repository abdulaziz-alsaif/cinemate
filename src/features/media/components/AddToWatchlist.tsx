"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import { addToUserSavedMedia } from "../services/actions";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpinnerMini from "@/components/SpinnerMini";

import { MediaType } from "../services/types/index.types";

type AddToWatchlistProps = {
  mediaId: number,
  mediaType: MediaType,
}

function AddToWatchlist({ mediaId, mediaType }: AddToWatchlistProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function handleAddToWatchlist() {
    setIsLoading(true);
    const actionData = await addToUserSavedMedia(
      mediaId,
      mediaType,
      "watchlist",
    );
    setIsLoading(false);

    if (!actionData.success) {
      toast({
        variant: "destructive",
        title: "Something Went Wrong!",
        description: actionData.message,
      });
      return;
    }

    toast({
      variant: "success",
      description: actionData.message,
    });
  }

  return (
    <Button
      className="max-w-xs flex-grow sm:max-w-md sm:flex-grow-0"
      variant="outline"
      disabled={isLoading}
      onClick={handleAddToWatchlist}
    >
      {isLoading ? <SpinnerMini className="w-4" /> : <Bookmark />} Add to
      Watchlist
    </Button>
  );
}

export default AddToWatchlist;
