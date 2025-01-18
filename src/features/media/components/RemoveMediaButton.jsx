"use client";

import { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SpinnerMini from "@/components/SpinnerMini";
import { Button } from "@/components/ui/button";

import { removeUserSavedMedia } from "@/features/media/services/actions";

function RemoveMediaButton({
  tmdbId,
  showIconOnly = false,
  className = "",
  buttonProps = {},
  children,
}) {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  async function handleRemoveFromList() {
    setIsLoading(true);
    const actionData = await removeUserSavedMedia(tmdbId);
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          {...buttonProps}
          variant={showIconOnly ? "ghost" : "destructive"}
          size={showIconOnly ? "sm" : undefined}
          className={`${showIconOnly ? "text-red-500 hover:bg-red-500/90 hover:text-zinc-50" : "max-w-xs flex-grow sm:max-w-md sm:flex-grow-0"} ${className}`}
          disabled={isLoading}
        >
          <Trash2 className={`${showIconOnly ? "h-4 w-4" : ""}`} />
          <span className={`${showIconOnly ? "sr-only" : ""}`}>{children}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Removal</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this item from your list? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            disabled={isLoading}
            onClick={handleRemoveFromList}
          >
            {isLoading && <SpinnerMini className="w-4" />} {children}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RemoveMediaButton;
