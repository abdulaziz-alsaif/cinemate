import "./globals.css";

import { Roboto } from "next/font/google";

import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

import { AuthProvider } from "@/context/AuthContext";
import { RecommendationsProvider } from "@/context/RecommendationsContext";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Cinemate | AI-Powered Movie and TV Show Recommendations",
    template: "%s | Cinemate",
  },
  description:
    "Discover movies and TV shows tailored to your taste with Cinemate. Track your watchlist, rate what you've watched, and get AI-driven recommendations based on your viewing history.",
  keywords: [
    "movies",
    "TV shows",
    "AI recommendations",
    "watchlist",
    "Cinemate",
    "movie tracker",
    "TV show tracker",
    "personalized recommendations",
    "movie recommendations",
    "TV series recommendations",
    "media tracker",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} grid min-h-screen grid-cols-1 grid-rows-[auto_1fr] bg-zinc-50 bg-[radial-gradient(#00000021_1px,transparent_1px)] text-zinc-900 antialiased [background-size:16px_16px]`}
      >
        <AuthProvider>
          <Header />

          <RecommendationsProvider>
            <main className="flex-1 py-8">{children}</main>
          </RecommendationsProvider>

          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
