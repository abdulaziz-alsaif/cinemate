import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { signinWithGoogle } from "@/features/auth/services/actions";

export const metadata = {
  title: "Sign In",
};

type PageProps = {
  searchParams: Promise<{
    error: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const { error } = params;

  return (
    <div className="flex items-center justify-center p-2">
      <Card className="w-full max-w-md border border-zinc-200 py-2">
        <CardHeader className="pb-1">
          <CardTitle className="text-center text-4xl font-medium">
            Welcome
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-sm text-zinc-500">
            Sign in to access your account
          </p>
          <form action={signinWithGoogle}>
            <Button className="w-full" size="lg">
              <Mail className="h-5 w-5" />
              Sign in with Google
            </Button>
          </form>
          {error && <p className="text-sm font-medium text-red-500">{error}</p>}
          <p className="px-4 text-center text-xs text-zinc-500">
            By signing in, you agree to our{" "}
            <a href="#" className="underline hover:text-zinc-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-zinc-700">
              Privacy Policy
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
