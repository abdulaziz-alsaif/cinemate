import { Search, X } from "lucide-react";
import { Input } from "./ui/input";

type SearchInputProps = {
  inputValue: string,
  onChange: (query: string) => void
  onClose: (event?: React.MouseEvent<HTMLButtonElement>) => void
}

function SearchInput({ inputValue, onChange, onClose }: SearchInputProps) {
  return (
    <div className="relative flex-1">
      <Search
        size={18}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500"
        aria-hidden="true"
      />
      <Input
        placeholder="Search..."
        className="h-auto border-zinc-300 bg-zinc-100 py-1.5 pl-8"
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 sm:hidden"
        onClick={onClose}
        aria-label="Close Search"
      >
        <X size={18} />
      </button>
    </div>
  );
}

export default SearchInput;
