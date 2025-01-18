import { Button } from "@/components/ui/button";
import Link from "next/link";

function NotFound() {
  return (
    <main className="mt-4 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>

      <Button variant="link" asChild>
        <Link href="/">Go back home page</Link>
      </Button>
    </main>
  );
}

export default NotFound;
