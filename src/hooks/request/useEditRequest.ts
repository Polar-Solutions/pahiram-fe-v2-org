import { create } from 'zustand';
import { IItem } from '@/lib/interfaces/get-specific-transaction-interface';

// Define the store interface
interface TransactionState {
  isEditing: boolean;
  transactionData: any;
  editedDetails: {
    endorser: string;
    purpose: string;
    specifyPurpose: string;
  };
  editedItems: IItem[];
  setIsEditing: (value: boolean) => void;
  setEditedDetails: (details: any) => void;
  setEditedItems: (items: IItem[]) => void;
  setTransactionData: (data: any) => void;
}

// Define the store
export const useEditRequest = create<TransactionState>((set) => ({
  isEditing: false,
  transactionData: null,
  editedDetails: {
    endorser: '',
    purpose: '',
    specifyPurpose: ''
  },
  editedItems: [],
  setIsEditing: (value) => set({ isEditing: value }),
  setEditedDetails: (details) => set((state) => ({ editedDetails: { ...state.editedDetails, ...details } })),
  setEditedItems: (items) => set({ editedItems: items }),
  setTransactionData: (data) => set({ transactionData: data }),
}));
