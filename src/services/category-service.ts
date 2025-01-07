import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

type CategoryInputs = {
  category_name: string;
  _id?: string;
  user_id?: string;
};

export const createNewCategory = async (data: CategoryInputs) => {
  const response = await apiClient.post(
    API_ROUTES.CATEGORY.CREATE_CATEGORY,
    data
  );
  return response.data;
};

export const fetchAllCategories = async () => {
  const response = await apiClient.get(API_ROUTES.CATEGORY.GET_ALL_CATEGORY);
  return response.data;
};
