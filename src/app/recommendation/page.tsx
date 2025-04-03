import AIRecommendations from "@/features/AI-recommendations/components/AIRecommendations";
import RecommendationsIntro from "@/features/AI-recommendations/components/RecommendationsIntro";

import { getUserSavedMedia } from "@/features/media/services/supabaseApi";

export const metadata = {
  title: "AI-Powered Movie & TV Show Recommendations",
};

export default async function Page() {
  const userWatchedList = await getUserSavedMedia("watched");

  // extract data to specific format the same as in server action
  // can be done on server action but not need to sent unused data to client then sent back to server action
  const extractUserWatchedList = userWatchedList.map((watched) => ({
    title: watched.media.title,
    tmdbRating: watched.media.rating,
    userRating: watched.userRating,
    genres: watched.media.genre,
  }));

  return (
    <div className="container space-y-8 pt-3">
      <RecommendationsIntro />
      {userWatchedList.length !== 0 ? (
        <AIRecommendations watchedList={extractUserWatchedList} />
      ) : (
        <p className="pt-8 text-center">
          Start adding media to your watched list to get recommendations
        </p>
      )}
    </div>
  );
}
