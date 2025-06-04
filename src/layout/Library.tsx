import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import LibraryHead from "./sideBar/LibraryHead";
import EmptyPlaylist from "./sideBar/EmptyPlaylist";

const LibraryContainer = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.background.paper,
  padding: "12px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));

const Library = () => {
  return (
    <LibraryContainer>
      <LibraryHead />
      <EmptyPlaylist />
    </LibraryContainer>
  );
};

export default Library;
