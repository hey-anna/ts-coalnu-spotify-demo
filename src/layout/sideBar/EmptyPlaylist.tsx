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

const CreatePlaylistButton = styled(Button)(({ theme }) => ({
  borderRadius: "9999px",
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  fontWeight: 700,
  textTransform: "none",
  width: "fit-content",
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
}));

const EmptyPlaylist = () => {
  return (
    <EmptyBox>
      <TypographyGroup>
        <Typography variant="h2" fontSize="1rem" fontWeight={700}>
          Create your first playlist
        </Typography>
        <Typography variant="body2">It's easy, we'll help you</Typography>
      </TypographyGroup>
      <CreatePlaylistButton variant="contained">
        Create playlist
      </CreatePlaylistButton>
    </EmptyBox>
  );
};

export default EmptyPlaylist;
