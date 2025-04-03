"use client";

import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SeasonSelectType = {
  currentSeasonNum: number,
  numOfSeasons: number
}

function SeasonSelect({ currentSeasonNum, numOfSeasons }: SeasonSelectType) {
  const router = useRouter();

  return (
    <Select
      defaultValue={String(currentSeasonNum)}
      onValueChange={(value) => router.push(value)}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {/* here is it okay to use index as key since they are not going not change, toString is needed here for two reasons. 1- to match currentSeasonNum since it's string. 2- push() need only strings */}
        {Array.from({ length: numOfSeasons }).map((_, i) => (
          <SelectItem value={(i + 1).toString()} key={i}>
            Season {i + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SeasonSelect;
