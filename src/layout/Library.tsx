import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import LibraryHead from "./sidebar/LibraryHead";
import EmptyPlaylist from "./sidebar/EmptyPlaylist";
import Test from "./sidebar/Test";

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
      <Test />
      <LibraryHead />
      <EmptyPlaylist />
    </LibraryContainer>
  );
};

export default Library;
