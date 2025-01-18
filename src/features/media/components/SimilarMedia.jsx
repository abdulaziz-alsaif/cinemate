import { getSimilarMedia } from "../services/tmbd-services";
import ScrollAreaX from "./ScrollAreaX";

async function SimilarMedia({ mediaType, mediaId }) {
  const similarMediaList = await getSimilarMedia(mediaType, mediaId);

  return <ScrollAreaX mediaList={similarMediaList} />;
}

export default SimilarMedia;
