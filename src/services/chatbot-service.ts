import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";
import { IChatbot } from "@/types/chatbot-types";

interface IFetch {
  status: string;
  message: string;
}

export interface ICreateAnswer extends IFetch {
  data: IChatbot;
}


export const createAnswer = async (data: {
  prompt: string;
}): Promise<ICreateAnswer> => {
  const response = await apiClient.post(API_ROUTES.CHATBOT.CREATE_ANSWER, data);
  return response.data;
};

export interface IGetChats extends IFetch {
  data: IChatbot[];
}

export const getChats = async (): Promise<IGetChats> => {
  const response = await apiClient.get(API_ROUTES.CHATBOT.CREATE_ANSWER);
  return response.data;
};
