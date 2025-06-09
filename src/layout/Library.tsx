import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import LibraryHead from "./sidebar/LibraryHead";
import EmptyPlaylist from "./sidebar/EmptyPlaylist";
import useGetCurrentUserPlaylists from "../hooks/useGetCurrentUserPlaylists";
import { useEffect, useState } from "react";
import PlaylistList from "./sidebar/PlaylistList";

const LibraryContainer = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.background.paper,
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
  background: "rgba(255, 0, 0, 0.1)",
  flexGrow: 1, // ** 스크롤 필수
  overflowY: "auto", // ** 스크롤 필수
  paddingRight: "4px",
  minHeight: 0, // ** flex item scroll 시 필수
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[700],
    borderRadius: "4px",
  },
}));

const Library = () => {
  const { data: playlist, isLoading } = useGetCurrentUserPlaylists({
    limit: 30,
    offset: 0,
  });
  console.log("data : useGetCurrentUserPlaylists", playlist);
  console.log({ ddd: playlist });

  if (isLoading) return <div>로딩 중...</div>; // 스켈리톤 추가해야댐

  const playlists = playlist?.items ?? []; // 진짜 우리가 쓰는 배열

  return (
    <LibraryContainer>
      <LibraryHead />
      <ScrollArea>
        {playlists.length > 0 ? (
          <PlaylistList playlists={playlists} />
        ) : (
          <EmptyPlaylist />
        )}
      </ScrollArea>
    </LibraryContainer>
  );
};

export default Library;

// limit 데이터 10개만 보여주겠다
// offset 0번 쩨 데이터 부터 시작
