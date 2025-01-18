import ScrollAreaX from "@/features/media/components/ScrollAreaX";
import LoginPrompt from "@/features/auth/components/LoginPrompt";
import VerticalCard from "./VerticalCard";

import { createClient } from "@/lib/supabase/server";
import { getUserSavedMedia } from "@/features/media/services/supabaseApi";

async function WatchlistScrollX() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <LoginPrompt />;

  const mediaList = await getUserSavedMedia("watchlist", null, null, 15);

  if (mediaList.length === 0)
    return (
      <div className="flex items-center justify-center py-6">
        No saved media in your watchlist
      </div>
    );

  return (
    <ScrollAreaX
      mediaList={mediaList}
      render={(item, _) => (
        <VerticalCard
          media={item.media}
          href={`${item.media.mediaType}/${item.media.tmdbId}`}
          key={item.media.tmdbId}
        />
      )}
    />
  );
}

export default WatchlistScrollX;
