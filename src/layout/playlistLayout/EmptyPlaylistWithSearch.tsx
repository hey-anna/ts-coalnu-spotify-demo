import { useState } from "react";
import {
  Typography,
  IconButton,
  Box,
  InputBase,
  CircularProgress,
} from "@mui/material";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import SearchResultList from "../searchLayout/SearchResultList";
import { Close, Search } from "@mui/icons-material";

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const {
    data: searchResult,
    error,
    isLoading,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track], // 이놈 ~! 타입 들고 오기
  });
  console.log("SEARCH_TYPE.Track", searchResult); // "SEARCH_TYPE.Album" 결과값을 선택해서 다이나믹하게 찾아 올 수 있다

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleClear = () => {
    setKeyword("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        // alignItems: "center",
        // position: "relative", // 대형 X 버튼 위치 고정
        // px: 3,
        mb: 2,
        mt: 2,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        mb={2}
        sx={{ alignSelf: "flex-start" }}
      >
        Let's find something for your playlist
      </Typography>
      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#2A2A2A",
          borderRadius: 1,
          width: "40%",
          px: 2,
          py: 1,
          mb: 2,
          height: 52,
        }}
      >
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
      </Box>
      {/* Search Result List */}
      <Box width="100%">
        {!keyword ? null : // ) //   <Typography sx={{ mt: 2 }}> 검색어를 입력하세요.</Typography> // (
        isLoading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ mt: 2 }}>
            검색 중 문제가 발생했습니다.
          </Typography>
        ) : searchResult?.pages.every((page) => !page.tracks?.items.length) ? (
          <Typography sx={{ mt: 2 }}>
            검색 결과가 없습니다. "<strong>{keyword}</strong>"
          </Typography>
        ) : (
          searchResult?.pages.map((page) =>
            page.tracks?.items.length ? (
              <SearchResultList
                key={page.tracks.href}
                list={page.tracks.items}
              />
            ) : null,
          )
        )}
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
    </Box>
  );
};

export default EmptyPlaylistWithSearch;
