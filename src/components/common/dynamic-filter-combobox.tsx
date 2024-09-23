import React, {useCallback, useEffect, useState} from 'react';
import {useComputed, useSignal} from '@preact/signals-react';
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {IItemCategory} from "@/lib/interfaces";
import {getItemsCategoriesUseCase} from "@/core/use-cases/items";
import {LoadingSpinner} from "@/components/icons";

const CATEGORY_CACHE_KEY = "categoryCache";
const CURRENT_PAGE_KEY = "currentCategoryPage";
const TOTAL_PAGES_KEY = "totalCategoryPages";

export function DynamicFilterCombobox({handleFilterChange, filter}: {
    handleFilterChange: (filter: string) => void;
    filter: string
}) {
    const value = useSignal("");
    const categories = useSignal<IItemCategory[]>([]);
    const currentPage = useSignal(parseInt(localStorage.getItem(CURRENT_PAGE_KEY) || "1", 10));
    const totalPages = useSignal(parseInt(localStorage.getItem(TOTAL_PAGES_KEY) || "1", 10));
    const isFetchingCategories = useSignal(false);
    const [open, setOpen] = useState(false);
    const [, forceUpdate] = useState({});

    const categoryCache = useSignal<{ [page: number]: IItemCategory[] }>(
        JSON.parse(localStorage.getItem(CATEGORY_CACHE_KEY) || "{}")
    );

    const selectedCategory = useComputed(() => {
        const category = categories.value.find((category) => category.category_name === value.value);
        return category ?? {category_name: "All Categories"};
    });

    const fetchCategories = useCallback(async (pageNum: number) => {
        if (categoryCache.value[pageNum]) {
            return categoryCache.value[pageNum];
        }

        isFetchingCategories.value = true;
        forceUpdate({});

        try {
            const response = await getItemsCategoriesUseCase(pageNum);
            const fetchedCategories = response.data?.categories || [];
            if (fetchedCategories.length > 0) {
                categoryCache.value = {...categoryCache.value, [pageNum]: fetchedCategories};
                localStorage.setItem(CATEGORY_CACHE_KEY, JSON.stringify(categoryCache.value));
                totalPages.value = response.data.last_page;
                localStorage.setItem(TOTAL_PAGES_KEY, totalPages.value.toString());
                return fetchedCategories;
            }
            return [];
        } catch (error) {
            console.error(error);
            return [];
        } finally {
            isFetchingCategories.value = false;
            forceUpdate({});
        }
    }, []);

    const loadAllCachedCategories = useCallback(() => {
        const allCachedCategories = Object.values(categoryCache.value).flat();
        categories.value = allCachedCategories;
        currentPage.value = Object.keys(categoryCache.value).length;
        localStorage.setItem(CURRENT_PAGE_KEY, currentPage.value.toString());
        forceUpdate({});
    }, [categoryCache]);

    const loadCategories = useCallback(async (pageNum: number) => {
        const newCategories = await fetchCategories(pageNum);
        categories.value = [...categories.value, ...newCategories.filter(
            newCat => !categories.value.some(existingCat => existingCat.category_name === newCat.category_name)
        )];
        currentPage.value = pageNum;
        localStorage.setItem(CURRENT_PAGE_KEY, currentPage.value.toString());
        forceUpdate({});
    }, [fetchCategories]);

    useEffect(() => {
        loadAllCachedCategories();
        if (Object.keys(categoryCache.value).length === 0) {
            loadCategories(1);
        }
    }, [loadAllCachedCategories, loadCategories]);

    const handleShowMore = async () => {
        if (currentPage.value < totalPages.value && !isFetchingCategories.value) {
            await loadCategories(currentPage.value + 1);
        }
    };

    const handleSelect = useCallback((currentValue: string) => {
        value.value = currentValue === value.value ? "" : currentValue;
        handleFilterChange(value.value);
        setOpen(false);
    }, [handleFilterChange]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedCategory.value?.category_name}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search category..."/>
                    <CommandList>
                        <CommandEmpty>{isFetchingCategories.value ? null : "No categories found"}</CommandEmpty>
                        <CommandGroup>
                            <CommandItem
                                value="All Categories"
                                onSelect={() => handleSelect("")}
                                className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        filter === "" ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                All Categories
                            </CommandItem>
                            {categories.value.map((category, index) => (
                                <CommandItem
                                    key={`${category.category_name}-${index}`}
                                    value={category.category_name}
                                    onSelect={() => handleSelect(category.category_name)}
                                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            filter === category.category_name
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {category.category_name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>

                    {currentPage.value < totalPages.value && !isFetchingCategories.value && (
                        <div className="p-2">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={handleShowMore}
                            >
                                Show More
                            </Button>
                        </div>
                    )}
                    {isFetchingCategories.value && (
                        <div className="flex items-center justify-center p-2">
                            <LoadingSpinner size={4} strokeColor="hsl(var(--primary))" className="mr-2  animate-spin"/>
                            <span>Fetching categories...</span>
                        </div>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    );
}