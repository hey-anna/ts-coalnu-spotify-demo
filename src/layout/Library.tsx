import { Box, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import LibraryHead from "./sidebar/LibraryHead";
import EmptyPlaylist from "./sidebar/EmptyPlaylist";
import useGetCurrentUserPlaylists from "../hooks/useGetCurrentUserPlaylists";
import { useEffect, useState } from "react";
// import PlayList from "./sidebar/PlayList";
import useGetCurrentUserProfile from "../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";
import CommonSpinner from "../components/spinner/CommonSpinner";
import { PAGE_LIMIT10 } from "../configs/commonConfig";
import PlayList from "./sidebar/PlayList";

const LibraryContainer = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.background.paper,
  // minWidth: 374,
  // width: "100%",
  padding: "12px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  flexGrow: 1,
  height: "100%", // ** 스크롤 필수
  overflow: "hidden", // 전체 레이아웃 기준
  [theme.breakpoints.down("md")]: {
    padding: "8px",
  },
}));

const ScrollArea = styled(Box)(({ theme }) => ({
  // background: "rgba(255, 0, 0, 0.1)",
  flexGrow: 1, // ** 스크롤 필수
  overflowY: "auto", // ** 스크롤 필수
  paddingRight: "4px",
  minHeight: 0, // ** flex item scroll 시 필수
  "&::-webkit-scrollbar": {
    // width: "6px",
    display: "none",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[700],
    borderRadius: "4px",
  },
  [theme.breakpoints.down("md")]: {
    paddingRight: 0, // md 이하일 때 제거
  },
}));

const Library = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { ref, inView } = useInView();

  // 다음 함수 페칭할 수 있는 함수도 제공하는 친구
  const {
    data: playlist,
    isLoading,
    hasNextPage, // 다음페이지 있어?
    isFetchingNextPage, // 다음 페이지 부르는 중이야? (다음 데이터 불러오는 중인데, 데이터 가져오면 안되니깐, 재호출 하면 안됨)
    fetchNextPage, // next page 호출하는 함수
  } = useGetCurrentUserPlaylists({
    limit: PAGE_LIMIT10,
    offset: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage(); // fetchNextPage 함수는 자동으로 호출, offset을 바꿔서 10, 20
    }
  }, [inView]);

  console.log("data : useGetCurrentUserPlaylists", playlist);
  console.log({ aaa: playlist });

  // if (isLoading) return <div>로딩 중...</div>; // 스켈리톤 추가해야댐

  const { data: user } = useGetCurrentUserProfile();
  if (!user) return <EmptyPlaylist />;

  // const playlists = playlist?.items ?? []; // 진짜 우리가 쓰는 배열
  const playlists = playlist?.pages.flatMap((page) => page.items) ?? [];
  return (
    <LibraryContainer>
      {/* PC - LibraryHead */}
      {!isMobile && <LibraryHead />}
      <ScrollArea>
        {!playlist || playlist?.pages[0].total === 0 ? (
          <EmptyPlaylist />
        ) : (
          <PlayList playlists={playlists} />
        )}
        <div ref={ref}>{isFetchingNextPage && <CommonSpinner />}</div>
      </ScrollArea>
    </LibraryContainer>
  );
};

export default Library;

// limit 데이터 10개만 보여주겠다
// offset 0번 쩨 데이터 부터 시작
