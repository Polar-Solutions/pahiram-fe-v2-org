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
                let defaultFilter = '';
                
                // Setting default filter based on active tab
                if (tab === 'REQUEST') {
                    defaultFilter = 'PENDING';
                } else if (tab === 'APPROVED') {
                    defaultFilter = 'FOR_APPROVAL';
                }
                else if (tab === 'PENDING') {
                    defaultFilter = 'FOR_RELEASE'
                }
                else if (tab === 'ACTIVE') {
                    defaultFilter = 'ON_GOING'
                } 
                else if (tab === 'COMPLETED') {
                    defaultFilter = 'RETURNED';
                }

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
