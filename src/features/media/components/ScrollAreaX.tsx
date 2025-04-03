import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type ScrollAreaXType<T> = {
  mediaList: T[];
  render: (media: T, index?: number) => React.ReactNode;
  className?: string;
};

function ScrollAreaX<T>({ mediaList, render, className }: ScrollAreaXType<T>) {
  if (!mediaList?.length) {
    return null;
  }

  return (
    <ScrollArea>
      <div className={`mb-4 flex space-x-6 ${className}`}>
        {mediaList.map((media, index) => render(media, index))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default ScrollAreaX;
