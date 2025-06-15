import { useEffect, useState } from "react";
import {
  Typography,
  IconButton,
  Box,
  InputBase,
  CircularProgress,
  styled,
  Box as MuiBox,
} from "@mui/material";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import SearchResultList from "../searchLayout/SearchResultList";
import { Close, Search } from "@mui/icons-material";
import { useInView } from "react-intersection-observer";
import { PAGE_LIMIT20 } from "../../configs/commonConfig";

const Wrapper = styled(MuiBox)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const SearchBar = styled(MuiBox)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#2A2A2A",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  marginBottom: theme.spacing(2),
  height: 52,
}));

const EmptyPlaylistWithSearch = ({ playlist_id }: { playlist_id: string }) => {
  const [keyword, setKeyword] = useState<string>("");

  // 교차점 감지를 위한 ref, inView (무한스크롤용)
  const { ref, inView } = useInView();

  // 검색 API 호출 + 무한 스크롤 관련 상태
  const {
    data: searchResult,
    error,
    isLoading,
    fetchNextPage, // 다음 페이지 호출 함수
    hasNextPage, // 다음 페이지 존재 여부
    isFetchingNextPage, // 다음 페이지 요청 중 여부
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track], // 이놈 ~! 타입 들고 오기
    limit: PAGE_LIMIT20,
  });
  console.log("SEARCH_TYPE.Track", searchResult); // "SEARCH_TYPE.Album" 결과값을 선택해서 다이나믹하게 찾아 올 수 있다

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleClear = () => {
    setKeyword("");
  };

  // 무한 스크롤 조건 감지 시 다음 페이지 호출
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allTracks =
    searchResult?.pages.flatMap((page) => page.tracks?.items || []) || [];

  return (
    <Wrapper>
      <Typography
        variant="h6"
        fontWeight={600}
        mb={2}
        sx={{ alignSelf: "flex-start" }}
      >
        Let's find something for your playlist
      </Typography>
      {/* Search Bar */}
      <SearchBar>
        <Search sx={{ color: "gray" }} />
        <InputBase
          sx={{ ml: 1, flex: 1, color: "white" }}
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={handleSearchKeyword}
        />
        {keyword && (
          <IconButton onClick={handleClear}>
            <Close sx={{ color: "white" }} />
          </IconButton>
        )}
      </SearchBar>
      {/* Search Result List */}
      <Box width="100%">
        {!keyword ? null : isLoading ? ( // ) //   <Typography sx={{ mt: 2 }}> 검색어를 입력하세요.</Typography> // (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ mt: 2 }}>
            검색 중 문제가 발생했습니다.
          </Typography>
        ) : allTracks.length === 0 ? (
          <Typography sx={{ mt: 2 }}>
            검색 결과가 없습니다. "<strong>{keyword}</strong>"
          </Typography>
        ) : (
          <SearchResultList list={allTracks} playlist_id={playlist_id} />
        )}

        {/* 무한스크롤 트리거 + 다음 페이지 로딩 표시 */}
        <div ref={ref}>
          {isFetchingNextPage && (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          )}
        </div>
      </Box>
      {/* 우측 X */}
      {/* <IconButton
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
        onClick={() => {
          console.log("모달 닫기 또는 페이지 나가기 동작");
        }}
      >
        <Close sx={{ fontSize: 32, color: "white" }} />
      </IconButton> */}
    </Wrapper>
  );
};

export default EmptyPlaylistWithSearch;
