import { Box } from "@mui/material";
import PlaylistItem from "./PlaylistItem";
import { SimplifiedPlaylist } from "../../models/playlist";

interface PlaylistListProps {
  playlists: SimplifiedPlaylist[];
}

const PlaylistList = ({ playlists }: PlaylistListProps) => {
  return (
    <Box>
      {playlists.map((playlist, idx) => (
        <PlaylistItem
          key={idx}
          imageUrl={playlist.images?.[0]?.url || ""}
          name={playlist.name || "No name"}
          ownerName={playlist.owner?.display_name || "Unknown"}
        />
      ))}
    </Box>
  );
};

export default PlaylistList;
