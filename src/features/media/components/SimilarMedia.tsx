import ScrollAreaX from "./ScrollAreaX";

import { getSimilarMedia } from "../services/tmbd-services";
import VerticalCard from "./VerticalCard";

import { MediaType } from "../services/types/index.types";

type SimilarMediaType = {
  mediaType: MediaType;
  mediaId: number;
};

async function SimilarMedia({ mediaType, mediaId }: SimilarMediaType) {
  const similarMediaList = await getSimilarMedia(mediaType, mediaId);

  if(!similarMediaList) return null

  return (
    <ScrollAreaX
      mediaList={similarMediaList}
      render={(media) => <VerticalCard media={media} key={media.id} />}
    />
  );
}

export default SimilarMedia;
