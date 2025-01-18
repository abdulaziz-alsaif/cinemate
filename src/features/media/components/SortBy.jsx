"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SortBy({ options }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeSort = searchParams.get("sortBy") ?? "list-order";

  function handleSort(sort) {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", sort);

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Select
      {...(activeSort !== "list-order" ? { defaultValue: activeSort } : {})}
      onValueChange={(value) => handleSort(value)}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Sort By" />
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

export default SortBy;
