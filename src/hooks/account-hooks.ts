import { create } from "zustand";

type NewAccount = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};
export const useNewAccount = create<NewAccount>((set) => ({
  isOpen: false,
  error: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
