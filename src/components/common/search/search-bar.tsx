import { CommandInput } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { InputSearch } from "@/components/ui/input-search-bar";
import { PopoverTrigger } from "@/components/ui/popover";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ISearchBar {
  input: string;
  onChangeHandler: (value: string) => void;
  fetcher: (input: string) => any;
  props?: any;
  placeholder?: string;
}
export const SearchBar: React.FC<ISearchBar> = ({
  input,
  onChangeHandler,
  fetcher,
  props,
  placeholder = "Type to search...",
}) => {
  // Debouncer
  useEffect(() => {
    const getData = setTimeout(() => {
      if (input) {
        fetcher(input);
      }
    }, 800);

    return () => clearTimeout(getData);
  }, [input]);

  const [inputName] = input.split(" + ");
  
  return (
    <InputSearch
      type="string"
      placeholder={placeholder}
      startIcon={Search}
      value={inputName}
      onChange={(e) => onChangeHandler(e.target.value)}
      {...props}
    />
  );
};
