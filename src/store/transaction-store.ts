import { create } from "zustand";

type NewTransaction = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};
export const useNewTransactionStore = create<NewTransaction>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
