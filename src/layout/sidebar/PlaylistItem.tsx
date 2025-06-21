import { MusicNoteRounded } from "@mui/icons-material";
import { Box, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

const PlaylistBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ selected, theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "8px 12px",
  cursor: "pointer",
  borderRadius: 4,
  backgroundColor: selected ? "rgba(119, 211, 111, 0.3)" : "transparent",
  "&:hover": {
    backgroundColor: theme.palette.action.selected, // 항상 동일한 색으로 hover 처리
  },
  [theme.breakpoints.down("md")]: {
    paddingRight: 0, // md 이하일 때 제거
    paddingLeft: 0,
  },
}));

interface PlaylistItemProps {
  imageUrl: string | null;
  name: string;
  ownerName: string | null;
  id: string;
  handleClick: (id: string) => void; // 리턴값 없으니 void이다
  selected?: boolean;
}

const TextBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  // gap: "6px",
  overflow: "hidden",
});

const PlaylistItem = ({
  imageUrl,
  name,
  ownerName,
  id,
  handleClick,
  selected,
}: PlaylistItemProps) => {
  return (
    <PlaylistBox onClick={() => handleClick(id)} selected={selected}>
      <Avatar
        variant="square"
        // src={imageUrl ? imageUrl : "no image"}
        src={imageUrl || undefined}
        sx={{
          width: 46,
          height: 46,
          borderRadius: 0.5,
          bgcolor: imageUrl ? "transparent" : "#e0e0e0",
          color: "#757575",
        }}
      >
        {!imageUrl && <MusicNoteRounded fontSize="small" />}
      </Avatar>
      <TextBox>
        <Typography
          fontSize="16px"
          fontWeight={600}
          noWrap
          sx={{
            display: { xs: "block", sm: "none", md: "block" },
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
