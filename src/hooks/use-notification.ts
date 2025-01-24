import {
  fetchAllNotifications,
  rescheduleRecurringTransaction,
  updateNotification,
} from "@/services/notification-service";
import { useTransactionRescheduleStore } from "@/store/notification-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";

export const useGetAllNotification = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchAllNotifications,
    enabled: true,
  });
};
export const useUpdateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNotification,
    onSuccess: (data) => {
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useRescheduleRecurringTransaction = () => {
  const { onClose } = useTransactionRescheduleStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rescheduleRecurringTransaction,
    onSuccess: (data) => {
      onClose();
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
