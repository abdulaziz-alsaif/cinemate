import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import VerticalCard from "./VerticalCard";

function ScrollAreaX({ mediaList, render, className }) {
  if (!mediaList?.length) {
    return null;
  }

  return (
    <ScrollArea>
      <div className={`mb-4 flex space-x-6 ${className}`}>
        {mediaList.map((media, index) =>
          render ? (
            render(media, index)
          ) : (
            <VerticalCard media={media} key={media.id} />
          ),
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default ScrollAreaX;
