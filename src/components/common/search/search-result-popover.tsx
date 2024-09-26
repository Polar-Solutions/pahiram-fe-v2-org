import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PopoverContent } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
      className="w-[100%] max-h-72 overflow-y-auto"
      style={{ width: "var(--radix-popover-trigger-width)" }}
    >
      <ul className="rounded-md flex flex-col gap-2">
        {searchResult.map((option) => (
          <li
            key={option.apc_id}
            className=" rounded-md p-2 cursor-pointer group hover:bg-secondary"
            onClick={() => {
              onSelectOption(`${option.full_name} + ${option.apc_id}`);
              handleClosePopover();
            }}
          >
            <p className="text-[0.875rem]">{option.full_name}</p>
          </li>
        ))}
      </ul>
    </PopoverContent>
  );
};
