import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RequestStore {
    activeTab: string;
    selectedFilterTab: string;
    filterOffice: string;
    setActiveTab: (tab: string) => void;
    setSelectedFilterTab: (filter: string) => void;
    setFilterOffice: (office: string) => void;
}

export const useTabsStore = create<RequestStore>()(
    persist(
        (set) => ({
            activeTab: 'REQUEST',
            selectedFilterTab: 'PENDING',
            filterOffice: '',

            setActiveTab: (tab) => {
                const defaultFilter = tab === 'REQUEST' ? 'PENDING' : 'APPROVED';
                set({
                    activeTab: tab,
                    selectedFilterTab: defaultFilter,
                });
            },

            setSelectedFilterTab: (filter) => set({ selectedFilterTab: filter }),

            setFilterOffice: (office) => set({ filterOffice: office }),
        }),
        {
            name: 'tabs-store', // The name of the storage key
            getStorage: () => localStorage, // Using localStorage to persist state
        }
    )
);
