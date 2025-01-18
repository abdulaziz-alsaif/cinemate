import Link from "next/link";

import { BookmarkPlus, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

function LoginPrompt() {
  return (
    <div className="flex flex-col items-center p-6">
      <div className="mb-3 flex items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 p-3">
        <BookmarkPlus size={36} className="stroke-zinc-900" />
      </div>
      <h2 className="mb-1 text-xl font-bold">login to access your Watchlist</h2>
      <p className="mb-5 text-base text-zinc-500">
        Save shows and movies to keep track of what you want to watch.
      </p>
      <Button className="h-8" asChild>
        <Link href="/login">
          <Mail /> Login with Email
        </Link>
      </Button>
    </div>
  );
}

export default LoginPrompt;
