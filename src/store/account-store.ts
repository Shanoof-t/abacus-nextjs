import { create } from "zustand";

type NewAccount = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};
export const useNewAccountStore = create<NewAccount>((set) => ({
  isOpen: false,
  error: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

type EditAccountStore = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  setID: (id: string) => void;
};

export const useEditAccountStore = create<EditAccountStore>((set) => ({
  id: "",
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setID: (id) => set({ id }),
}));
