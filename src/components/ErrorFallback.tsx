"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { RotateCw } from "lucide-react";

import { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const router = useRouter();

  const [isResetting, setIsResetting] = useState(false);

  function retry() {
    setIsResetting(true);

    startTransition(() => {
      router.refresh();
      resetErrorBoundary();
      setIsResetting(false);
    });
  }

  return (
    <div
      className="mx-auto max-w-lg rounded border-l-4 border-red-500 bg-red-100 p-4 shadow-md"
      role="alert"
      aria-live="assertive"
    >
      <h2 className="text-lg font-semibold text-red-700">
        Something went wrong
      </h2>
      <p className="mt-1 text-sm text-red-600">
        {error?.message ||
          "Something went wrong, but we're not sure what. Try refreshing the page or come back later."}
      </p>
      <Button
        variant="destructive"
        className="h-8 mt-4"
        onClick={retry}
        disabled={isResetting}
        aria-label="Retry loading the content"
      >
        <RotateCw /> Retry Again
      </Button>
    </div>
  );
}
