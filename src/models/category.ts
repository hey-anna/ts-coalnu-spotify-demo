import { ApiResponse } from "./apiResponse";
import { Images } from "./commonType";

export interface GetBrowseCategoriesRequest {
  locale?: string; // ex) "ko_KR"
  limit?: number; // 기본 20, 최대 50
  offset?: number; // 기본 0
}

export interface GetBrowseCategoriesResponse {
  categories: ApiResponse<CategoryItem>;
}

export interface CategoryItem {
  id: string;
  name: string;
  href: string;
  icons: Images[];
}
