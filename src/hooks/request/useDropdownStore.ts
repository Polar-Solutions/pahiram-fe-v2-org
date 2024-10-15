import create from 'zustand';

interface DropdownStore {
  dropdownStates: { [key: number]: boolean };
  selectedQuantities: { [key: number]: number };
  selectedModels: { [key: number]: string };
  toggleDropdownState: (index: number) => void;
  setQuantity: (index: number, value: number) => void;
  setModel: (index: number, model: string) => void;
}

export const useDropdownStore = create<DropdownStore>((set) => ({
  dropdownStates: {},
  selectedQuantities: {},
  selectedModels: {},
  toggleDropdownState: (index) => set((state) => ({
    dropdownStates: {
      ...state.dropdownStates,
      [index]: !state.dropdownStates[index],
    },
  })),
  setQuantity: (index, value) => set((state) => ({
    selectedQuantities: {
      ...state.selectedQuantities,
      [index]: value,
    },
    dropdownStates: {
      ...state.dropdownStates,
      [index]: false, // Close dropdown after selection
    },
  })),
  setModel: (index, model) => set((state) => ({
    selectedModels: {
      ...state.selectedModels,
      [index]: model,
    },
    dropdownStates: {
      ...state.dropdownStates,
      [index]: false, // Close dropdown after selection
    },
  })),
}));
