"use client";

import { useState } from "react";

import { useToast } from "@/hooks/use-toast";

import { CircleCheck } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RatingSelector from "./RatingSelector";
import SpinnerMini from "@/components/SpinnerMini";

import { addToUserSavedMedia } from "../services/actions";

import { MediaType } from "../services/types/index.types";

type AddToWatchedProps = {
  title: string,
  mediaId: number,
  mediaType: MediaType,
  buttonProps?: ButtonProps
}

function AddToWatched({ title, mediaId, mediaType, buttonProps = {} }: AddToWatchedProps) {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);

  async function handleAddToWatched() {
    if (rating <= 0) {
      return;
    }
    setIsLoading(true);
    const actionData = await addToUserSavedMedia(
      mediaId,
      mediaType,
      "watched",
      rating,
    );
    setIsLoading(false);
    setOpen(false);

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="max-w-xs flex-grow sm:max-w-md sm:flex-grow-0"
          {...buttonProps}
        >
          <CircleCheck /> Set to Watched
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Rate this media before adding it to your watched list
          </DialogDescription>
        </DialogHeader>
        <RatingSelector
          rating={rating}
          onSetRating={setRating}
          className="mx-auto mb-3"
        />

        <DialogFooter>
          <Button
            type="submit"
            disabled={rating === 0 || isLoading}
            onClick={handleAddToWatched}
          >
            {isLoading && <SpinnerMini className="w-4" />} Set To Watched
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddToWatched;
