import { create } from "zustand";

type ConsentCreationStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export const useConsentCreationStore = create<ConsentCreationStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
