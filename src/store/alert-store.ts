import { create } from "zustand";

type AlertStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  title: string;
  description: string;
  setContent: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => void;
};
export const useAlertStore = create<AlertStore>((set) => ({
  isOpen: false,
  title: "",
  description: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setContent: ({ title, description }) => set({ title, description }),
}));
