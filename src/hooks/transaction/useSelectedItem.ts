import create from 'zustand';
import { IOfficeSpecificTransaction } from '@/lib/interfaces/get-specific-transaction-interface';


interface BorrowedItem {
  id: string;
  item_group_id: string;
  model_name: string;
  quantity: number;
  start_date: string;
  due_date: string;
  borrowed_item_status: string;
}

// Define the Zustand store
interface SelectedItemsStore {
  selectedItems: BorrowedItem[]; // Store selected items as an array
  setSelectedItems: (items: BorrowedItem[]) => void; // Function to set selected items
  clearSelectedItems: () => void; // Function to clear selected items
}

// Create the Zustand store
export const useSelectedItemsStore = create<SelectedItemsStore>((set) => ({
  selectedItems: [],
  setSelectedItems: (items: BorrowedItem[]) => set({ selectedItems: items }),
  clearSelectedItems: () => set({ selectedItems: [] }),
}));