import { create } from 'zustand';

interface RequestStore {
    activeTab: string;
    selectedFilterTab: string;
    filterOffice: string;
    setActiveTab: (tab: string) => void;
    setSelectedFilterTab: (filter: string) => void;
    setFilterOffice: (office: string) => void;
}

export const useTabsStore = create<RequestStore>((set) => ({
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

    // Function to manually set the filter tab
    setSelectedFilterTab: (filter) => set({ selectedFilterTab: filter }),

    // Function to manually set the office filter
    setFilterOffice: (office) => set({ filterOffice: office }),
}));