import { create } from "zustand";

interface NewBudgetStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNewBudgetStore = create<NewBudgetStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

interface BudgetDrawerStore extends NewBudgetStore {
  category_name: string;
  setCategoryName: (id: string) => void;
}

export const useBudgetDrawerStore = create<BudgetDrawerStore>((set) => ({
  isOpen: false,
  category_name: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setCategoryName: (id: string) => set({ category_name: id }),
}));
