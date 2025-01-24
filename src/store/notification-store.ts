import { create } from "zustand";

type TransactionRescheduleStore = {
  notification_id: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setNotificationId: (id: string) => void;
};
export const useTransactionRescheduleStore = create<TransactionRescheduleStore>(
  (set) => ({
    isOpen: false,
    notification_id: "",
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setNotificationId: (id) => set({ notification_id: id }),
  })
);
