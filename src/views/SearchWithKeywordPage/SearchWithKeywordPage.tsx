import { useParams } from "react-router-dom";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import { PAGE_LIMIT20 } from "../../configs/commonConfig";
import SearchResultsLayout from "../../layout/searchLayout/SearchResultsLayout";
import { Typography } from "@mui/material";

const SearchWithKeywordPage = () => {
  const rawKeyword = useParams().keyword;
  const keyword = rawKeyword?.trim() || "";
  console.log("검색 키워드 Test:", keyword);

  const {
    data: searchResult,
    isLoading,
    isError,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
    limit: PAGE_LIMIT20,
  });

  const trackList =
    searchResult?.pages.flatMap((page) => page.tracks?.items || []) || [];

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;
  if (trackList.length === 0) return <div>검색 결과가 없습니다.</div>;

  return (
    <>
      <Typography> “{keyword}” 검색 결과</Typography>
      <SearchResultsLayout list={trackList} />;
    </>
  );
};

export default SearchWithKeywordPage;
