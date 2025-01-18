import SearchResultItem from "./SearchResultItem";
import SpinnerMini from "./SpinnerMini";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

function SearchResults({ status, results }) {
  if (status === "ready") return null;

  if (status === "error") {
    return null;
  }

  return (
    <div className="absolute top-full z-50 w-full rounded-md border border-zinc-200 bg-zinc-50 shadow-lg sm:top-[calc(100%+0.5rem)]">
      <ScrollArea>
        {status === "loading" && <SpinnerMini className="mx-auto m-4" />}

        {status === "done" && results.length === 0 && (
          <div className="p-2 text-gray-500 text-center">No results found</div>
        )}

        {status === "done" && results.length > 0 && (
          <ul className="h-full max-h-[600px]">
            {results.map((media) => (
              <li
                key={media.id}
                className="border-b border-zinc-200 p-4 transition-all last:border-b-0 hover:bg-zinc-100"
              >
                <SearchResultItem media={media} />
              </li>
            ))}
          </ul>
        )}

        <ScrollBar />
      </ScrollArea>
    </div>
  );
}

export default SearchResults;
