"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Filter({ options }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeFilter = searchParams.get("filter") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("filter", filter);

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Select
      {...(activeFilter !== "all" ? { defaultValue: activeFilter } : {})}
      onValueChange={(value) => handleFilter(value)}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Filter By" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default Filter;
