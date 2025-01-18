import { Star } from "lucide-react";

function StarSelector({
  isFilled,
  onClick,
  onHover,
  onMouseLeave,
  size,
  fillColor,
  strokeColor,
  className,
}) {
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
