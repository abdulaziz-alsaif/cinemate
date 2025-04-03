"use client";

import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Search as SearchIcon } from "lucide-react";

import { Button } from "./ui/button";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

import { getSearchResults } from "@/features/media/services/tmbd-services";
import type { BaseMediaType, Status } from "@/types/global.types";

type SearchProps = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Search({ isOpen, setIsOpen }: SearchProps) {
  const [query, setQuery] = useState("");
  // status = ready | loading | done | error, status is used here to avoid impossible states
  const [status, setStatus] = useState<Status>("ready");
  const [mediaResults, setMediaResults] = useState<BaseMediaType[]>([]);

  function handleChange(query: string) {
    setQuery(query);
  }

  // this function closing of input in mobile view
  function handleClose() {
    setIsOpen(false);
    setQuery("");
  }

  useEffect(
    function () {
      if (query.length < 2) {
        setMediaResults([]);
        setStatus("ready");
        return;
      }

      const abortRequest = new AbortController();
      const debounce = setTimeout(async function fetchMedia() {
        try {
          setStatus("loading");
          const mediaResults = await getSearchResults(query, abortRequest);
          setMediaResults(mediaResults);
          setStatus("done")
        } catch (err) {
          if ((err as Error).name !== "AbortError") {
            toast({
              variant: "destructive",
              title: "Something Went Wrong!",
              description: `Could not get any results for "${query}". Please try again later.`,
            });
            setStatus("error");
            setMediaResults([]);
          }
        }
      }, 500);

      return () => {
        clearTimeout(debounce);
        abortRequest.abort();
      };
    },
    [query],
  );

  return (
    <>
      <div
        className={`z-1 absolute left-0 top-0 h-full w-full flex-1 items-center sm:relative sm:flex sm:h-auto sm:max-w-lg ${isOpen ? "flex" : "hidden"}`}
      >
        <SearchInput
          inputValue={query}
          onChange={handleChange}
          onClose={handleClose}
        />
        <SearchResults status={status} results={mediaResults}/>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="ml-auto sm:hidden [&_svg]:size-5"
        aria-label="Open Search"
        onClick={() => setIsOpen(true)}
      >
        <SearchIcon />
      </Button>
    </>
  );
}

export default Search;
