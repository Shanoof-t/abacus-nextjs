import {
  fetchAllNotifications,
  updateNotification,
} from "@/services/notification-service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllNotification = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchAllNotifications,
    enabled: true,
  });
};
export const useUpdateNotification = () => {
  return useMutation({
    mutationFn: updateNotification,
  });
};
