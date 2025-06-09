// components/PlaylistItem.tsx
import { Box, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

const PlaylistBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "8px 0",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.8,
  },
});

interface PlaylistItemProps {
  imageUrl: string;
  name: string;
  ownerName: string;
}

const TextBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  // gap: "6px",
  overflow: "hidden",
});

const PlaylistItem = ({ imageUrl, name, ownerName }: PlaylistItemProps) => {
  return (
    <PlaylistBox>
      <Avatar
        variant="square"
        src={imageUrl}
        sx={{ width: 46, height: 46, borderRadius: 0.5 }}
      />
      <TextBox>
        <Typography
          fontSize="16px"
          fontWeight={600}
          noWrap
          sx={{
            display: { xs: "none", md: "block" },
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
        <Typography
          fontSize="12px"
          variant="body2"
          color="textSecondary"
          noWrap
          sx={{
            display: { xs: "none", md: "block" },
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {ownerName}
        </Typography>
      </TextBox>
    </PlaylistBox>
  );
};

export default PlaylistItem;
