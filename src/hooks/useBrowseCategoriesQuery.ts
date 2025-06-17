// hooks/useBrowseCategoriesQuery.ts
import { useQuery } from "@tanstack/react-query";
import { getBrowseCategories } from "../apis/categoryApi";
import { GetBrowseCategoriesRequest } from "../models/category";
import { PAGE_LIMIT12 } from "../configs/commonConfig";
import useClientCredentialToken from "./useClientCredentialToken";

const useBrowseCategoriesQuery = (
  params: GetBrowseCategoriesRequest = { limit: PAGE_LIMIT12, offset: 0 },
) => {
  const token = useClientCredentialToken();

  return useQuery({
    queryKey: ["browse-categories", params],
    enabled: !!token, // 토큰이 있을 때만 실행
    queryFn: async () => {
      if (!token) throw new Error("No token available");
      return getBrowseCategories(token, params);
    },
  });
};

export default useBrowseCategoriesQuery;
