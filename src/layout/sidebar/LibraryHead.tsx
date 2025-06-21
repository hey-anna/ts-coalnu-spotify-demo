import { Box, Button, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Bookmark, Add } from "@mui/icons-material";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px",
  paddingLeft: 0,
  paddingRight: 0,
  color: theme.palette.text.primary,
  // [theme.breakpoints.down("md")]: {
  //   justifyContent: "center",
  // },
  [theme.breakpoints.down("sm")]: {
    gap: "20px",
  },
}));

const IconTextWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  // [theme.breakpoints.down("md")]: {
  //   display: "none",
  // },
  // [theme.breakpoints.down("sm")]: {
  //   display: "none",
  // },
}));

const AddButtonWrapper = styled(Box)(({ theme }) => ({
  // 기본 스타일 (md 이상)
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  // md 이하일 때만 원형 배경 스타일 적용
  [theme.breakpoints.down("md")]: {
    backgroundColor: alpha("#77d36f", 0.1),
    borderRadius: "50%",
    padding: "8px",
  },
}));

const LibraryHead = () => {
  const { mutate: createPlaylist } = useCreatePlaylist();
  const handleCreatePlaylist = () => {
    createPlaylist({ name: "My Play List" }); // name 필수값이라 name으로 테스트
  };

  return (
    <HeaderContainer>
      <IconTextWrapper>
        <Bookmark
          sx={{
            display: { xs: "block", sm: "none", md: "block" },
          }}
        />
        <Typography
          variant="h2"
          fontWeight={700}
          fontSize="1rem"
          sx={{
            display: { xs: "block", sm: "none", md: "block" },
          }}
        >
          Your Library
        </Typography>
      </IconTextWrapper>
      <AddButtonWrapper onClick={handleCreatePlaylist}>
        <Add sx={{ color: "#77d36f" }} />
      </AddButtonWrapper>
    </HeaderContainer>
  );
};

export default LibraryHead;
