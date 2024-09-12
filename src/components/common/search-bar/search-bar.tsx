"use-client";

import { useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/borrow/useSearch"; // Import the Zustand store

interface SearchBarProps {
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  }, [onSearchChange, setSearchQuery]);
  
  const handleSearchKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onSearchChange) {
      onSearchChange(searchQuery);
    }
  }, [searchQuery, onSearchChange]);
  

  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <Search className="h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search items by Name, Office, or Category"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleSearchKeyDown}
        className="flex-grow min-w-[42dvh]"
      />
    </div>
  );
};
