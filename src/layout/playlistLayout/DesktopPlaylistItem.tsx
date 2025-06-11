import { styled, TableCell, TableRow } from "@mui/material";
import { PlaylistTrack } from "../../models/playlist";
import { EpisodeObject, TrackObject } from "../../models/track";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover td": {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toISOString().split("T")[0];
};

const formatDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (
    track: TrackObject | EpisodeObject,
  ): track is EpisodeObject => {
    return "description" in track;
  };

  const track = item.track;
  return (
    <StyledTableRow
      sx={{
        "& td": {
          borderBottom: "none",
          //   padding: "4px 16x",
        },
      }}
    >
      <TableCell>{index}</TableCell>
      <TableCell>{item.track?.name || "no name"}</TableCell>
      {/* <TableCell>{item.track?.album?.display_name}</TableCell> */}
      <TableCell>
        {!track ? "Unknown" : isEpisode(track) ? "N/A" : track.album?.name}
      </TableCell>
      <TableCell>
        {item.added_at ? formatDate(item.added_at) : "Unknown"}
      </TableCell>
      <TableCell>
        {track?.duration_ms ? formatDuration(track.duration_ms) : "Unknown"}
      </TableCell>
    </StyledTableRow>
  );
};

export default DesktopPlaylistItem;
