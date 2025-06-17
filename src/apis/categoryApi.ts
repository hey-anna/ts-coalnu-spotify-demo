import authApiInstance from "../utils/api/authApiInstance";
import {
  GetBrowseCategoriesRequest,
  GetBrowseCategoriesResponse,
} from "../models/category";
import { PAGE_LIMIT12 } from "../configs/commonConfig";
import clientApiInstance from "../utils/api/clientApiInstance";

export const getBrowseCategories = async (
  token: string,
  params: GetBrowseCategoriesRequest = { limit: PAGE_LIMIT12, offset: 0 },
): Promise<GetBrowseCategoriesResponse> => {
  const response = await clientApiInstance.get<GetBrowseCategoriesResponse>(
    "/browse/categories",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    },
  );

  return response.data;
};
