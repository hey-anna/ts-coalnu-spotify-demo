import { TableCell, TableRow } from "@mui/material";
import { PlaylistTrack } from "../../models/playlist";
import { EpisodeObject, TrackObject } from "../../models/track";

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}
const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (
    track: TrackObject | EpisodeObject,
  ): track is EpisodeObject => {
    return "description" in track;
  };

  const track = item.track;
  return (
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track?.name || "no name"}</TableCell>
      {/* <TableCell>{item.track?.album?.display_name}</TableCell> */}
      <TableCell>
        {!track ? "Unknown" : isEpisode(track) ? "N/A" : track.album?.name}
      </TableCell>
      <TableCell>{item.added_at || "Unknown"}</TableCell>
      <TableCell>{item.track?.duration_ms || "Unknown"}</TableCell>
    </TableRow>
  );
};

export default DesktopPlaylistItem;
