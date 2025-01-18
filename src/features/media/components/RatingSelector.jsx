"use client";

import { useState } from "react";

import StarSelector from "./StarSelector";

function RatingSelector({
  maxRating = "10",
  textColor = "text-yellow-500",
  strokeColor = "stroke-yellow-500",
  fillColor = "fill-yellow-500",
  size = 28,
  className = "",
  rating,
  onSetRating,
}) {
  const [tempRating, setTempRating] = useState(0);

  function handleClick(rating) {
    if (onSetRating && rating) {
      onSetRating((cur) => (rating === cur ? 0 : rating));
      if (rating === tempRating) {
        setTempRating(0);
      }
    }
  }

  function handleHover(rating) {
    setTempRating(rating);
  }

  function handleMouseLeave() {
    setTempRating(0);
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex">
        {Array.from({ length: maxRating }, (_, i) => (
          <StarSelector
            key={i}
            isFilled={tempRating ? tempRating > i : rating > i}
            onClick={() => handleClick(i + 1)}
            onHover={() => handleHover(i + 1)}
            onMouseLeave={handleMouseLeave}
            size={size}
            fillColor={fillColor}
            strokeColor={strokeColor}
            className="pr-1 last:pr-0"
          />
        ))}
      </div>
      <p className={`${textColor} hidden w-4 text-sm min-[400px]:block`}>
        {tempRating || rating || ""}
      </p>
    </div>
  );
}

export default RatingSelector;
