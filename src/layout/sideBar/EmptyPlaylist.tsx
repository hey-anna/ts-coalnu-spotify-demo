import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const EmptyBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#242424",
  borderRadius: "8px",
  padding: "20px",
  color: theme.palette.text.primary,
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));

const TypographyGroup = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

const EmptyPlaylist = () => {
  return (
    <EmptyBox>
      <TypographyGroup>
        <Typography variant="h2" fontSize="1rem" fontWeight={700}>
          Create your first playlist
        </Typography>
        <Typography variant="body2">It's easy, we'll help you</Typography>
      </TypographyGroup>
      <Button
        variant="contained"
        sx={{
          borderRadius: "9999px",
          backgroundColor: "#fff",
          color: "#000",
          fontWeight: 700,
          textTransform: "none",
          width: "fit-content",
          "&:hover": {
            backgroundColor: "#e6e6e6",
          },
        }}
      >
        Create playlist
      </Button>
    </EmptyBox>
  );
};

export default EmptyPlaylist;
