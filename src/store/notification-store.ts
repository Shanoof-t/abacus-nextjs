import { create } from "zustand";

type TransactionRescheduleStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export const useTransactionRescheduleStore = create<TransactionRescheduleStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
