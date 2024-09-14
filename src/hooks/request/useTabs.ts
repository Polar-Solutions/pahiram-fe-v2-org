import { create } from 'zustand';

interface RequestStore {
    activeTab: string;
    selectedFilterTab: string;
    setActiveTab: (tab: string) => void;
    setSelectedFilterTab: (filter: string) => void;
}

export const useTabsStore = create<RequestStore>((set) => ({
    activeTab: 'Request',
    selectedFilterTab: 'Pending',

    setActiveTab: (tab) => {
        const defaultFilter = tab === 'Request' ? 'Pending' : 'Approved';
        set({
            activeTab: tab,
            selectedFilterTab: defaultFilter,
        });
    },

    // Function to manually set the filter tab
    setSelectedFilterTab: (filter) => set({ selectedFilterTab: filter }),
}));