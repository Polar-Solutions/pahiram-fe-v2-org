import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PopoverContent } from "@/components/ui/popover";
import { IEndorserSearch } from "@/lib/interfaces/search-endorser";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

import React from "react";

interface ISearchResultPopover {
  searchResult: IEndorserSearch[];
  onSelectOption: (input: string) => void;
  isLoading: boolean;
  handleClosePopover: () => void;
  selectedItem?: string;
}

export const SearchResultPopover: React.FC<ISearchResultPopover> = ({
  searchResult,
  onSelectOption,
  handleClosePopover,
  isLoading,
  selectedItem = "",
}) => {
  return (
    <PopoverContent
      onOpenAutoFocus={(e) => e.preventDefault()}
      className="w-[100%]"
      style={{ width: "var(--radix-popover-trigger-width)" }}
    >
      <ul>
        {searchResult.map((option) => (
          <li
            key={option.apc_id}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              onSelectOption(`${option.full_name} + ${option.apc_id}`);
              handleClosePopover();
            }}
          >
            {option.full_name}
          </li>
        ))}
      </ul>
    </PopoverContent>
  );
};
