// hooks/useBrowseCategoriesQuery.ts
import { useQuery } from "@tanstack/react-query";
import { getBrowseCategories } from "../apis/categoryApi";
import { GetBrowseCategoriesRequest } from "../models/category";
import { PAGE_LIMIT12 } from "../configs/commonConfig";

const useBrowseCategoriesQuery = (
  params: GetBrowseCategoriesRequest = { limit: PAGE_LIMIT12, offset: 0 },
) => {
  return useQuery({
    queryKey: ["browse-categories", params],
    queryFn: () => getBrowseCategories(params),
  });
};

export default useBrowseCategoriesQuery;
