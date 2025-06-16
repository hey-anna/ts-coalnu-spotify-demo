import { Typography } from "@mui/material";
import useBrowseCategoriesQuery from "../../hooks/useBrowseCategoriesQuery";

const SearchPage = () => {
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useBrowseCategoriesQuery();

  if (isCategoryLoading) return <Typography>로딩 중...</Typography>;
  if (isCategoryError) return <Typography>에러 발생</Typography>;

  console.log("카테고리 데이터:", categoryData?.categories.items);

  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        Browse all
      </Typography>
    </div>
  );
};

export default SearchPage;
