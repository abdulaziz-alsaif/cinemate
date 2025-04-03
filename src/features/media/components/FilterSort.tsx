"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  value: string;
  label: string;
};

type FilterProps = {
  options: Option[];
  searchParamsField: string;
  defaultValue: string;
  placeholder: string;
};

function Filter({
  options,
  searchParamsField,
  defaultValue,
  placeholder,
}: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeFilter = searchParams.get(searchParamsField) ?? defaultValue;

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set(searchParamsField, filter);

    router.replace(`${pathname}?${params.toString()}`);
  }

  console.log(placeholder)

  return (
    <Select
      {...(activeFilter !== defaultValue ? { defaultValue: activeFilter } : {})}
      onValueChange={(value) => handleFilter(value)}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder={placeholder} />
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
