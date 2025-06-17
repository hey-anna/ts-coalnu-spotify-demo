import { Box, Grid, Typography } from "@mui/material";
import useBrowseCategoriesQuery from "../../hooks/useBrowseCategoriesQuery";
import CategoryCard from "../../layout/searchLayout/CategoryCard";
import { colorPalette } from "../../constants/colorPalette";

const getRandomColor = () => {
  return colorPalette[Math.floor(Math.random() * colorPalette.length)];
};

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
    <Box px={3}>
      <Typography variant="h1" paddingTop="8px" sx={{ mb: 2 }}>
        Browse all
      </Typography>

      <Grid container spacing={2}>
        {categoryData?.categories.items.map((category) => (
          <Grid
            size={{
              //  xs: 6,
              sm: 6,
              md: 4,
            }}
            key={category.id}
          >
            <CategoryCard
              title={category.name}
              imageUrl={category.icons[0]?.url}
              bgColor={getRandomColor()}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchPage;
