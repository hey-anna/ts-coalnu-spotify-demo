import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import LibraryHead from "./sidebar/LibraryHead";
import EmptyPlaylist from "./sidebar/EmptyPlaylist";
import useGetCurrentUserPlaylists from "../hooks/useGetCurrentUserPlaylists";

const LibraryContainer = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.background.paper,
  padding: "12px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));

const Library = () => {
  const { data } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
  console.log("data : useGetCurrentUserPlaylists", data);
  console.log({ ddd: data });
  return (
    <LibraryContainer>
      <LibraryHead />
      <EmptyPlaylist />
    </LibraryContainer>
  );
};

export default Library;

// limit 데이터 10개만 보여주겠다
// offset 0번 쩨 데이터 부터 시작
