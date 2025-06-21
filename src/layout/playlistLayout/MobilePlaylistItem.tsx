import { Box, Avatar, Typography, useTheme } from "@mui/material";
import { MusicNoteRounded } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { PlaylistTrack } from "../../models/playlist";
import { EpisodeObject, TrackObject } from "../../models/track";

interface MobilePlaylistItemProps {
  item: PlaylistTrack;
}

const ItemBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 16px",
  //   borderBottom: `1px solid ${theme.palette.divider}`,
}));

const TextBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const MobilePlaylistItem = ({ item }: MobilePlaylistItemProps) => {
  const theme = useTheme();
  const track = item.track;

  const isEpisode = (t: TrackObject | EpisodeObject): t is EpisodeObject =>
    "description" in t;

  if (!track || isEpisode(track)) return null;

  const albumImage = track.album?.images?.[2]?.url; // 64x64 이미지 사용

  return (
    <ItemBox>
      <Avatar
        src={albumImage || undefined}
        variant="square"
        sx={{
          width: 48,
          height: 48,
          bgcolor: albumImage ? "transparent" : "#e0e0e0",
          color: "#757575",
        }}
      >
        {!albumImage && <MusicNoteRounded fontSize="small" />}
      </Avatar>
      <TextBox>
        <Typography
          fontSize="15px"
          fontWeight={600}
          color="text.primary"
          noWrap
        >
          {track.name}
        </Typography>
        <Typography fontSize="13px" color="text.secondary" noWrap>
          {track.artists?.[0]?.name || "Unknown Artist"}
        </Typography>
      </TextBox>
    </ItemBox>
  );
};

export default MobilePlaylistItem;
