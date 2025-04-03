import { Star } from "lucide-react";

type StarSelectorType = {
  isFilled: boolean,
  onClick: (event?: React.MouseEvent<HTMLSpanElement>) => void
  onHover: (event?: React.MouseEvent<HTMLSpanElement>) => void
  onMouseLeave: (event?: React.MouseEvent<HTMLSpanElement>) => void
  size: number,
  fillColor: string,
  strokeColor: string,
  className: string
}

function StarSelector({
  isFilled,
  onClick,
  onHover,
  onMouseLeave,
  size,
  fillColor,
  strokeColor,
  className,
}: StarSelectorType) {
  return (
    <span
      role="button"
      className={`block cursor-pointer ${className}`}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onMouseLeave}
    >
      <Star size={size} className={`${isFilled ? fillColor : ""} ${strokeColor}`} />
    </span>
  );
}

export default StarSelector;
