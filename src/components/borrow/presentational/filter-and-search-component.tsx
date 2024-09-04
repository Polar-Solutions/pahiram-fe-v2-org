import React, {useCallback, useMemo, useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {LENDING_OFFICES, OFFICES_CONSTANTS} from "@/CONSTANTS/OFFICES_CONSTANTS";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";
import {updateURLParams} from "@/helper/borrow/updateURLParams";
import {getURLParams} from "@/helper/borrow/getURLParams";


export default function FilterAndSearchComponent({showFilters}: { showFilters: boolean } ) {

    const router = useRouter();
    const {
        sortBy,
        filterCategory,
        filterSearch,
        filterOffice
    } = getURLParams();

    const LIST_OF_OFFICES = useMemo(() => Object.keys(LENDING_OFFICES), []);

    const handleSortChange = useCallback((sortOption: string) => {
        // setSortBy(sortOption);
        const newUrl = updateURLParams({sort: sortOption});
        router.push(newUrl);
    }, []);

    const handleCategoryChange = useCallback((categoryOption: string) => {
        // setFilterCategory(categoryOption);
        const newUrl = updateURLParams({category: categoryOption});
        router.push(newUrl);
    }, []);

    const handleOfficeChange = useCallback((officeOption: string) => {
        // setFilterOffice(officeOption);
        const newUrl = updateURLParams({office: officeOption});
        router.push(newUrl);
    }, []);


    const [searchQuery, setSearchQuery] = useState(filterSearch || "");

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === "") {
            const newUrl = updateURLParams({ q: '' });
            router.push(newUrl);
        }
    }, [router]);

    const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const newUrl = updateURLParams({ q: searchQuery });
            router.push(newUrl);
        }
    }, [searchQuery, router]);

    const renderCategoryItems = useMemo(() => (
        ["Electronics", "Stationery", "Equipment"].map((category) => (
            <DropdownMenuItem
                key={category}
                onSelect={() => {
                    handleCategoryChange(category)
                }}
                className="[&[data-highlighted]]:bg-accent [&[data-highlighted]]:text-accent-foreground"
            >
                {category}
            </DropdownMenuItem>
        ))
    ), [handleCategoryChange]);

    const renderOfficeItems = useMemo(() => (
        LIST_OF_OFFICES.map((office: string) => (
            <DropdownMenuItem
                key={office}
                onSelect={() => {
                    handleOfficeChange(OFFICES_CONSTANTS[office].acronym)
                }}
                className="[&[data-highlighted]]:bg-accent [&[data-highlighted]]:text-accent-foreground"
            >
                {`${OFFICES_CONSTANTS[office].acronym} | ${OFFICES_CONSTANTS[office].office}`}
            </DropdownMenuItem>
        ))
    ), [LIST_OF_OFFICES, handleOfficeChange]);

    // TODO: Mobile view of filters and search
    if (!showFilters) return null;

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
                        <DropdownMenuItem onSelect={() => handleSortChange("Name")}>Name</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleSortChange("Office")}>Office</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                            {filterCategory || "All Categories"}
                            <ChevronDownIcon className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem
                            onSelect={() => {
                                handleCategoryChange("")
                            }}
                            className="[&[data-highlighted]]:bg-accent [&[data-highlighted]]:text-accent-foreground"
                        >
                            All Categories
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        {renderCategoryItems}
                    </DropdownMenuContent>
                </DropdownMenu>
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
                            All Offices
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        {renderOfficeItems}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Search className="h-5 w-5 text-muted-foreground"/>
                <Input
                    type="search"
                    placeholder="Search items by Name, Office, or Category"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown}
                    className="flex-grow min-w-[42dvh]"
                />
            </div>
        </div>
    );
}