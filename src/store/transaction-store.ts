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

type EditTransactionStore = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  setID: (id: string) => void;
};

export const useEditTransactionStore = create<EditTransactionStore>((set) => ({
  id: "",
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setID: (id) => set({ id }),
}));