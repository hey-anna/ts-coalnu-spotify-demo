import authApiInstance from "../utils/api/authApiInstance";
import {
  GetBrowseCategoriesRequest,
  GetBrowseCategoriesResponse,
} from "../models/category";
import { PAGE_LIMIT20 } from "../configs/commonConfig";

export const getBrowseCategories = async (
  params: GetBrowseCategoriesRequest = { limit: PAGE_LIMIT20, offset: 0 },
): Promise<GetBrowseCategoriesResponse> => {
  const response = await authApiInstance.get<GetBrowseCategoriesResponse>(
    "/browse/categories",
    {
      params,
    },
  );

  return response.data;
};
