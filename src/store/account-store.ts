import { create } from "zustand";

type NewAccount = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};
export const useAccountStore = create<NewAccount>((set) => ({
  isOpen: false,
  error: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));