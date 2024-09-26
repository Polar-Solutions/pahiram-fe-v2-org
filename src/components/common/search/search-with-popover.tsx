import React, { useState } from "react";
import { SearchBar } from "./search-bar";
import { SearchResultPopover } from "./search-result-popover";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { IEndorserSearch } from "@/lib/interfaces/search-endorser";
import {
  IApiResponse,
  IHandleApiServerSideErrorResponse,
} from "@/lib/interfaces";

interface ISearchWithPopover {
  currentValue: string;
  onChangeInput: (input: string) => void;
  fetcher: (input: string) => any;
  isLoading: boolean;
  onSelectOption: (value: string) => void;
  placeholder?: string;
  // selectedItem?: string;
}

export const SearchWithPopover: React.FC<ISearchWithPopover> = ({
  currentValue,
  onChangeInput,
  fetcher,
  isLoading,
  onSelectOption,
  placeholder = "Type to search...",
}) => {
  // const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState<IEndorserSearch[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const fetchHandler = async (input: string) => {
    const { data: searchData } = await fetcher(input);

    if (searchData?.data) {
      setSearchResult(searchData.data);
      console.log(searchData);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsPopoverOpen(open); // Only set open when needed (based on user interaction)
  };

  return (
    <Popover
      open={isPopoverOpen} // Ensures it only opens with content or loading
      onOpenChange={handleOpenChange}
    >
      <PopoverTrigger>
        <SearchBar
          input={currentValue}
          onChangeHandler={onChangeInput}
          fetcher={(input: string) => fetchHandler(input)}
          placeholder={placeholder}
        />
      </PopoverTrigger>

      {searchResult.length > 0 && (
        <SearchResultPopover
          searchResult={searchResult}
          onSelectOption={onSelectOption}
          isLoading={isLoading}
          handleClosePopover={() => handleOpenChange(false)}
        />
      )}
    </Popover>
  );
};
