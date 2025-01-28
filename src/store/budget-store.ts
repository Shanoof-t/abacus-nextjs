import { create } from "zustand";

interface BudgetStore {
  isOpen: boolean;
  id: string;
  onOpen: () => void;
  onClose: () => void;
  mode: "create" | "edit";
  setMode: (mode: "create" | "edit") => void;
  setId: (id: string) => void;
}

export const useBudgetStore = create<BudgetStore>((set) => ({
  isOpen: false,
  mode: "create",
  id: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setMode: (mode) => set({ mode: mode }),
  setId: (id) => set({ id }),
}));

interface BudgetDrawerStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  setId: (id: string) => void;
}

export const useBudgetDrawerStore = create<BudgetDrawerStore>((set) => ({
  isOpen: false,
  id: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setId: (id: string) => set({ id }),
}));
