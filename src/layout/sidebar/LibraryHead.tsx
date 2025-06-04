// layout/components/LibraryHead.tsx
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Bookmark, Add } from "@mui/icons-material";

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px",
  paddingLeft: 0,
  paddingRight: 0,
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
      <Button>
        <Add sx={{ color: "#77d36f" }} />
      </Button>
    </HeaderContainer>
  );
};

export default LibraryHead;
