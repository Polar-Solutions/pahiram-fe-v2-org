import { signal, effect, computed } from "@preact/signals-react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { IItemCategory } from "@/lib/interfaces";
import { getItemsCategoriesUseCase } from "@/core/use-cases/items";

const open = signal(false);
const value = signal("");
const categories = signal<IItemCategory[]>([]);
const page = signal(1);
const totalPage = signal(1);
const isFetchingCategories = signal(false);
const cachedCategories = signal<{ [page: number]: IItemCategory[] }>({});

const uniqueCategories = computed(() => {
    const categoryMap = new Map();
    categories.value.forEach(category => {
        categoryMap.set(category.category_name, category);
    });
    return Array.from(categoryMap.values());
});

async function fetchCategories() {
    if (cachedCategories.value[page.value]) {
        categories.value = [...categories.value, ...cachedCategories.value[page.value]];
    } else {
        isFetchingCategories.value = true;
        try {
            const response = await getItemsCategoriesUseCase(page.value);
            categories.value = [...categories.value, ...response.data.categories];
            cachedCategories.value = { ...cachedCategories.value, [page.value]: response.data.categories };
            totalPage.value = response.data.last_page;
        } catch (error) {
            console.error(error);
        } finally {
            isFetchingCategories.value = false;
        }
    }
}

effect(() => {
    fetchCategories();
});

export function DynamicFilterCombobox() {
    return (
        <Popover open={open.value} onOpenChange={(isOpen) => (open.value = isOpen)}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open.value}
                    className="w-[200px] justify-between"
                >
                    {value.value
                        ? uniqueCategories.value.find(
                            (category) => category.category_name === value.value
                        )?.category_name
                        : "Select category..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                        <CommandEmpty>No categories found.</CommandEmpty>
                        <CommandGroup>
                            {uniqueCategories.value.map((category, key) => (
                                <CommandItem
                                    key={key}
                                    value={category.category_name}
                                    onSelect={(currentValue) => {
                                        value.value = currentValue === value.value ? "" : currentValue;
                                        open.value = false;
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value.value === category.category_name
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {category.category_name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>

                    {page.value < totalPage.value && (
                        <div className="p-2">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => {
                                    page.value++;
                                }}
                                disabled={isFetchingCategories.value}
                            >
                                {isFetchingCategories.value ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    "Show more"
                                )}
                            </Button>
                        </div>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    );
}