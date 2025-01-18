import Image from "next/image";

import { LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";

import { signout } from "@/features/auth/services/actions";
import { useAuth } from "@/context/AuthContext";

function NavUser() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading || !isAuthenticated) {
    return null;
  }

  const { avatar_url, full_name, email } = user.user_metadata;

  return (
    <div className="flex h-12 w-full items-center gap-2">
      {/* the avatar component of shadcn/radix ui does not work properly with next images components so it can't be used here */}
      <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
        {avatar_url ? (
          <Image
            src={avatar_url}
            width={50}
            height={50}
            alt={`pic of ${full_name}`}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
            <User />
          </span>
        )}
      </div>

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{full_name}</span>
        <span className="truncate text-xs text-zinc-500">{email}</span>
      </div>

      <form action={signout}>
        <Button variant="ghost" className="h-full w-full px-3 py-1.5">
          <LogOut />
        </Button>
      </form>
    </div>
  );
}

export default NavUser;
