/* eslint-disable @next/next/no-img-element */

import { BASE_IMG_URL } from "@/utils/constants";

function Thumbs({ mediaItems, selectedIndex, onThumbClick }) {
  return (
    <div className="hide-scrollbar absolute bottom-3 left-4 right-0 select-none overflow-x-auto sm:left-[calc(100%-330px)]">
      <div className="flex gap-4">
        {mediaItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onThumbClick(index)}
            className={`aspect-[2/3] w-28 shrink-0 overflow-hidden rounded-md transition-all ${index === selectedIndex ? "brightness-100" : "brightness-50"}`}
          >
            <img
              src={`${BASE_IMG_URL}/w154${item.posterPath}`}
              alt={`poster of ${item.title}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Thumbs;
