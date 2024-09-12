import React, { useCallback, useMemo, useRef } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {LENDING_OFFICES, OFFICES_CONSTANTS} from "@/CONSTANTS/OFFICES_CONSTANTS";
import {Check, Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";
import {updateURLParams} from "@/helper/borrow/updateURLParams";
import {getURLParams} from "@/helper/borrow/getURLParams";
import {DynamicFilterCombobox} from "@/components/common/dynamic-filter-combobox";
import MobileFilterAndSearchComponent from "@/components/borrow/presentational/mobile-filter-and-search-component";
import {cn} from "@/lib/utils";
import { searchItemsUseCase } from '@/core/use-cases/search';
import { SearchBar } from "@/components/common/search-bar/search-bar";
import { useSearch } from '@/hooks/borrow/useSearch';



export default function FilterAndSearchComponent({ showFilters }: { showFilters: boolean }) {
    const router = useRouter();
    const {
        sortBy,
        filterCategory,
        filterSearch,
        filterOffice
    } = getURLParams();

    const { searchQuery, setSearchQuery, setSearchResults } = useSearch();
    const abortControllerRef = useRef<AbortController | null>(null);
    const LIST_OF_OFFICES = useMemo(() => Object.keys(LENDING_OFFICES), []);

    const handleSortChange = useCallback((sortOption: string) => {
        const newUrl = updateURLParams({ sort: sortOption });
        router.push(newUrl);
    }, [router]);

    const handleCategoryChange = useCallback((categoryOption: string) => {
        const newUrl = updateURLParams({ category: categoryOption });
        router.push(newUrl);
    }, [router]);

    const handleOfficeChange = useCallback(async (officeOption: string) => {
        const newUrl = updateURLParams({ office: officeOption });
        router.push(newUrl);

        try {
            const results = await searchItemsUseCase(searchQuery, filterCategory || "", officeOption);
            setSearchResults(results.data.items); // Update the search results with filtered items
        } catch (error) {
            console.error('Error fetching filtered items:', error);
        }
    }, [filterCategory, searchQuery, router]);

    const handleSearchChange = useCallback(async (query: string) => {
        setSearchQuery(query);

        const newUrl = updateURLParams({ q: query.trim() });
        router.push(newUrl);

        if (query.trim() === "") {
            setSearchResults([]); // Clear search results when query is empty
        } else {
            try {
                const results = await searchItemsUseCase(query.trim(), filterCategory || "", filterOffice || "");
                setSearchResults(results.data.items); // Update the search results
            } catch (error) {
                setSearchResults([]);
            }
        }
    }, [filterCategory, filterOffice, router, setSearchQuery, setSearchResults]);


    const renderOfficeItems = useMemo(() => (
        LIST_OF_OFFICES.map((office: string) => (
            <DropdownMenuItem
                key={office}
                onSelect={() => {
                    handleOfficeChange(OFFICES_CONSTANTS[office].acronym);
                }}
                className="[&[data-highlighted]]:bg-accent [&[data-highlighted]]:text-accent-foreground"
            >
                <Check
                    className={cn(
                        "mr-2 h-4 w-4",
                        filterOffice === OFFICES_CONSTANTS[office].acronym  ? "opacity-100" : "opacity-0"
                    )}
                />
                {`${OFFICES_CONSTANTS[office].acronym} | ${OFFICES_CONSTANTS[office].office}`}
            </DropdownMenuItem>
        ))
    ), [LIST_OF_OFFICES, handleOfficeChange, filterOffice]);

    // TODO: Mobile view of filters and search
    if (!showFilters) return <MobileFilterAndSearchComponent />;

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex flex-wrap items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                            Sort by: {sortBy || "Name"}
                            <ChevronDownIcon className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onSelect={() => handleSortChange("Name")}>
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    sortBy === "Name" ? "opacity-100" : "opacity-0"
                                )}
                            />
                            Name
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleSortChange("Office")}>
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    sortBy === "Office" ? "opacity-100" : "opacity-0"
                                )}
                            />
                            Office
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DynamicFilterCombobox handleFilterChange={handleCategoryChange} filter={filterCategory} />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                            {filterOffice || "All Offices"}
                            <ChevronDownIcon className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem
                            onSelect={() => handleOfficeChange("")}
                            className="[&[data-highlighted]]:bg-accent [&[data-highlighted]]:text-accent-foreground"
                        >
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    filterOffice === "" ? "opacity-100" : "opacity-0"
                                )}
                            />
                            All Offices
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        {renderOfficeItems}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <SearchBar onSearchChange={handleSearchChange} searchQuery={searchQuery} />
        </div>
    );
}
