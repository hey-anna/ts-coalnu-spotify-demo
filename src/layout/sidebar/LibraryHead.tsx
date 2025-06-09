// layout/components/LibraryHead.tsx
import { Box, Button, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Bookmark, Add } from "@mui/icons-material";

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px",
  paddingLeft: 0,
  paddingRight: 0,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));

const IconTextWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
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
  return (
    <HeaderContainer>
      <IconTextWrapper>
        <Bookmark />
        <Typography variant="h2" fontWeight={700} fontSize="1rem">
          Your Library
        </Typography>
      </IconTextWrapper>
      <AddButtonWrapper>
        <Add sx={{ color: "#77d36f" }} />
      </AddButtonWrapper>
    </HeaderContainer>
  );
};

export default LibraryHead;
