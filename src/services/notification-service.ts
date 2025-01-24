import { rescheduleTransactionSchema } from "@/components/notification/reschedule-transaction";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";
import { z } from "zod";

type Notification = {
  _id: string;
  message: string;
  is_server_notification: boolean;
};

type AllNotifications = {
  status: string;
  message: string;
  data: Notification[];
};
export const fetchAllNotifications = async (): Promise<AllNotifications> => {
  const response = await apiClient.get(
    API_ROUTES.NOTIFICATION.ALL_NOTIFICATIONS
  );
  return response.data;
};

type UpdateNotification = {
  id: string;
  action: "ESTIMATED" | "CANCEL_RECURRING";
};
export const updateNotification = async ({
  id,
  action,
}: UpdateNotification) => {
  console.log("action", action);
  const response = await apiClient.post(
    API_ROUTES.NOTIFICATION.UPDATE_NOTIFICATION + id,
    { action }
  );
  return response.data;
};

type RescheduleRecurringTransaction = {
  data: z.infer<typeof rescheduleTransactionSchema>;
  id: string;
};

export const rescheduleRecurringTransaction = async ({
  data,
  id,
}: RescheduleRecurringTransaction) => {
  console.log("data in service", data);
  const response = await apiClient.post(
    API_ROUTES.NOTIFICATION.RESCHEDULE_RECURRING_TRANSCTION +
      id +
      "/re-schedule-recurring",
    data
  );
  return response.data;
};