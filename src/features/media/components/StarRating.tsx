import { Star } from "lucide-react";

const MAX_RATING = 10;

type StarRatingType = {
  rating?: number | string | null | undefined,
  size?: number,
  showMaxRating?: boolean,
  className?: string,
  ratingClassName?: string
}

function StarRating({
  rating,
  size = 20,
  showMaxRating = false,
  className = "",
  ratingClassName = "",
}: StarRatingType) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Star strokeWidth={0} size={size} className="fill-yellow-500" />
      <span className={`text-base font-medium ${ratingClassName}`}>
        {rating ? Number(rating).toFixed(1): "N/A"}
      </span>
      {showMaxRating && <span className="text-zinc-500">/{MAX_RATING}</span>}
    </div>
  );
}

export default StarRating;
