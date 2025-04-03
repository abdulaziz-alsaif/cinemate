"use client";

import { useState } from "react";

import { useToast } from "@/hooks/use-toast";

import { CircleCheck, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
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

import { updateUserRating } from "../services/actions";
import SpinnerMini from "@/components/SpinnerMini";

type UpdateUserButtonProps = {
  title: string,
  tmdbId: number,
  currentRating: number,
}

function UpdateUserButton({ title, tmdbId, currentRating }: UpdateUserButtonProps) {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(currentRating);

  async function handleUpdateRating() {
    if (rating <= 0 || rating === currentRating) {
      return;
    }
    setIsLoading(true);
    const actionData = await updateUserRating(tmdbId, rating);
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
        <Button variant="outline" size="sm">
          <Star />
          <span>Rate ({currentRating})</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Update your rating and let us know what you think!
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
            onClick={handleUpdateRating}
          >
            {isLoading && <SpinnerMini className="w-4" />} Update Your Rating
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateUserButton;
