"use client";

import { useCallback, useEffect, useState } from "react";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import CarouselItemMedia from "./CarouselItem";
import Thumbs from "./Thumbs";

function MediaCarousel({ mediaItems }) {
  const [api, setApi] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // useCallback is recommend here from library owners even if i use react 19 compiler
  const onSelect = useCallback((api) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;

    onSelect(api);
    api.on("reInit", onSelect).on("select", onSelect);
  }, [api, onSelect]);

  function onThumbClick(index) {
    // Navigate to clicked media
    if (!api) return;
    api.scrollTo(index);

    // reset duration when scrolling to media that clicked from thumbs to prevent autoplay from immediately navigating to next carousel
    const autoplay = api.plugins()?.autoplay;
    if (!autoplay) return;
    autoplay.reset();
  }

  return (
    <Carousel
      setApi={setApi}
      plugins={[Autoplay()]}
      opts={{ loop: true }}
      className="h-full overflow-hidden border border-zinc-200"
    >
      <CarouselContent className="h-full" classNameParent="h-full">
        {mediaItems.map((mediaItem) => (
          <CarouselItem key={mediaItem.id} className="h-full">
            <CarouselItemMedia media={mediaItem} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <Thumbs
        mediaItems={mediaItems}
        selectedIndex={selectedIndex}
        onThumbClick={onThumbClick}
      />
    </Carousel>
  );
}

export default MediaCarousel;
