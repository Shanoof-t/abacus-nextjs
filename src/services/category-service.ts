import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

export type CategoryInputs = {
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

type FetchCategories = {
  status: string;
  message: string;
  data: CategoryInputs[];
};
export const fetchAllCategories = async (): Promise<FetchCategories> => {
  const response = await apiClient.get(API_ROUTES.CATEGORY.GET_ALL_CATEGORY);
  return response.data;
};

export const deleteCategories = async (ids: string[]) => {
  const response = await apiClient.post(
    API_ROUTES.CATEGORY.BULK_DELETE_CATEGORY,
    ids
  );
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await apiClient.delete(
    API_ROUTES.CATEGORY.DELETE_CATEGORY + id
  );
  return response.data;
};

export const fetchCategory = async (id: string): Promise<CategoryInputs> => {
  const response = await apiClient.get(API_ROUTES.CATEGORY.GET_CATEGORY + id);
  return response.data.data;
};

type EditCategory = { values: CategoryInputs; id: string };

export const editCategory = async ({ values, id }: EditCategory) => {
  const response = await apiClient.put(
    API_ROUTES.CATEGORY.EDIT_CATEGORY + id,
    values
  );
  return response.data;
};
