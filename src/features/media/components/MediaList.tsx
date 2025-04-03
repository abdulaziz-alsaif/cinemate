import HorizontalCard from "./HorizontalCard";

import { BaseMediaType } from "@/types/global.types";

type MediaListType = {
  list: BaseMediaType[]
}

function MediaList({ list }: MediaListType) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {list.map((media) => (
        <HorizontalCard media={media} key={media.id} />
      ))}
    </div>
  );
}

export default MediaList;
