import { create } from "zustand";

type NewBudgetStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewBudgetStore = create<NewBudgetStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
