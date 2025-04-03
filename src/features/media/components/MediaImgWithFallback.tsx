/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";

import { ImageOff, Image as ImageSvg } from "lucide-react";

type MediaImgWithFallbackProps = {
  fallbackSize?: number,
  src: string,
  alt?: string
} & React.ComponentProps<typeof Image>

function MediaImgWithFallback({
  fallbackSize = 64,
  src,
  alt = "Media image",
  ...props
}: MediaImgWithFallbackProps) {
  const containerClassName =
    "w-full h-full flex items-center justify-center relative top-0 left-0 bg-zinc-200"; 

  if (!src || src?.trim() === "")
    return (
      <div
        role="img"
        aria-label={`${alt} unavailable`}
        className={containerClassName}
      >
        <ImageOff size={fallbackSize} className="text-zinc-500" />
      </div>
    );

  // w/h-full to Image to ensure it always on top when image load
  return (
    <div className={containerClassName}>
      <ImageSvg
        size={fallbackSize}
        className="text-zinc-500"
        aria-hidden="true"
      />
      <Image className="h-full w-full" src={src} alt={alt} {...props} />
    </div>
  );
}

export default MediaImgWithFallback;
