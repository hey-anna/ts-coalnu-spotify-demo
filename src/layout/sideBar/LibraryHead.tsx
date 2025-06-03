// layout/components/LibraryHead.tsx
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Bookmark, Add } from "@mui/icons-material";

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px",
  color: theme.palette.text.primary,
}));

const IconTextWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

const LibraryHead = () => {
  return (
    <HeaderContainer>
      <IconTextWrapper>
        <Bookmark />
        <Typography variant="h2" fontWeight={700} fontSize="1rem">
          Your Library
        </Typography>
      </IconTextWrapper>
      <Add sx={{ color: "#77d36f" }} />
    </HeaderContainer>
  );
};

export default LibraryHead;
