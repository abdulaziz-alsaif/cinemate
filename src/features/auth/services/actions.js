"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function signinWithGoogle() {
  const supabase = await createClient();

  // get the site url from headers
  const headersList = await headers();
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const host = headersList.get('host');
  const siteUrl = `${protocol}://${host}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) {
    redirect("/login?error=Could not authenticate user")
  } else {
    redirect(data.url);
  }
}

export async function signout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout")
    redirect("/")
}