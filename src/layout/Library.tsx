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
  height: "100%",
  // width: "100%",
  // maxWidth: "400px", // 또는 "100%" / "30vw" 등 원하는 크기
  // width: 349,
  // transition: "width 0.3s ease",
  // overflow: "hidden",
  // height: "100vh",
  [theme.breakpoints.down("md")]: {
    padding: "8px",
  },
  // [theme.breakpoints.down("sm")]: {
  //   display: "none", // 모바일에서는 숨김
  // },
}));

const Library = () => {
  const { data: playlist, isLoading } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });
  console.log("data : useGetCurrentUserPlaylists", playlist);
  console.log({ ddd: playlist });

  if (isLoading) return <div>로딩 중...</div>; // 스켈리톤 추가해야댐

  const playlists = playlist?.items ?? []; // 진짜 우리가 쓰는 배열

  return (
    <LibraryContainer>
      <LibraryHead />
      {playlists.length > 0 ? (
        <PlaylistList playlists={playlists} />
      ) : (
        <EmptyPlaylist />
      )}
    </LibraryContainer>
  );
};

export default Library;

// limit 데이터 10개만 보여주겠다
// offset 0번 쩨 데이터 부터 시작
