import {
  createAnswer,
  getChats,
  ICreateAnswer,
  IGetChats,
} from "@/services/chatbot-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnswer,
    onSuccess: (data) => {
      const newData = data.data;
      queryClient.setQueryData<IGetChats>(["chats"], (prev) => {
        if (!prev) {
          return {
            status: data.status,
            message: data.message,
            data: [newData],
          };
        }

        return {
          ...prev,
          data: [...prev.data.filter((chat) => !chat.is_temp), newData],
        };
      });
    },
  });
};

export const userGetChats = (enabled: boolean) => {
  return useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
    enabled,
  });
};
