import { effect, signal } from "@preact/signals-react";
import { getItemsCategoriesUseCase } from "@/core/use-cases/items";
import {IItem, IItemCategory} from "@/lib/interfaces";
import {useRef} from "react";

interface CategoryWithPage extends IItemCategory {
    page: number;
}

export const useCategories = () => {
    const LOCAL_CATEGORY_KEY = "categories";

    const currentCategoryPage = signal(1);
    const categories = signal<CategoryWithPage[]>([]);
    const totalCategoryPages = signal(1);
    const isFetchingCategoryPage = signal(false);

    const cachedItems = useRef<{ [page: number]: IItem[] }>({});


    // Fetch categories when currentCategoryPage changes
    effect(() => {
        async function loadCategories() {
            const pageToLoad = currentCategoryPage.value;
            if (!categories.value.some(cat => cat.page === pageToLoad) && !isFetchingCategoryPage.value) {
                try {
                    isFetchingCategoryPage.value = true;
                    const response = await getItemsCategoriesUseCase(pageToLoad);
                    const itemsCategoriesData = response?.data;
                    if (itemsCategoriesData) {
                        const newCategories: CategoryWithPage[] = itemsCategoriesData.categories.map(cat => ({
                            ...cat,
                            page: pageToLoad
                        }));

                        // Ensure we're not adding duplicate categories
                        const uniqueNewCategories = newCategories.filter(newCat =>
                            !categories.value.some(existingCat => existingCat.id === newCat.id)
                        );

                        categories.value = [...categories.value, ...uniqueNewCategories];
                        totalCategoryPages.value = itemsCategoriesData.last_page;

                        // Save to localStorage
                        localStorage.setItem(LOCAL_CATEGORY_KEY, JSON.stringify(categories.value));
                    }
                } catch (error) {
                    console.error('Error fetching categories:', error);
                } finally {
                    isFetchingCategoryPage.value = false;
                }
            }
        }

        loadCategories();
    });

    const loadNextPage = () => {
        if (currentCategoryPage.value < totalCategoryPages.value) {
            currentCategoryPage.value += 1;
        }
    };

    return {
        categories: categories.value,
        totalCategoryPages: totalCategoryPages.value,
        isFetchingCategoryPage: isFetchingCategoryPage.value,
        currentCategoryPage: currentCategoryPage.value,
        loadNextPage
    };
};