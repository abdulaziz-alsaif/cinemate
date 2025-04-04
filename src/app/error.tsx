"use client";

import { Button } from "@/components/ui/button";

function Error({ error, reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex flex-col items-center justify-center gap-3">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <Button className="px-6 py-3 text-lg" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}

export default Error;
