import { create } from 'zustand';
import { IItem } from '@/lib/interfaces';

interface SearchStore {
  searchQuery: string;
  filterCategory: string;
  filterOffice: string;
  sortBy: string;
  searchResults: IItem[];
  setSearchQuery: (query: string) => void;
  setFilterCategory: (category: string) => void;
  setFilterOffice: (office: string) => void;
  setSortBy: (sortBy: string) => void;
  setSearchResults: (results: IItem[]) => void;
}

export const useSearch = create<SearchStore>((set) => ({
  searchQuery: '',
  filterCategory: '',
  filterOffice: '',
  sortBy: 'Name',
  searchResults: [],
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterCategory: (category) => set({ filterCategory: category }),
  setFilterOffice: (office) => set({ filterOffice: office }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchResults: (results) => set({ searchResults: results }),
}));