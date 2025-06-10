import { Box } from "@mui/material";
import PlaylistItem from "./PlaylistItem";
import { SimplifiedPlaylist } from "../../models/playlist";
import { useNavigate } from "react-router-dom";

interface PlaylistListProps {
  playlists: SimplifiedPlaylist[];
}

const PlaylistList = ({ playlists }: PlaylistListProps) => {
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/playlist/${id}`);
  };

  return (
    <>
      {playlists.map((playlist) => (
        <PlaylistItem
          id={playlist.id || ""}
          key={playlist.id}
          imageUrl={playlist.images?.[0]?.url || ""}
          name={playlist.name || "No name"}
          ownerName={playlist.owner?.display_name || "Unknown"}
          handleClick={handleClick}
        />
      ))}
    </>
  );
};

export default PlaylistList;
