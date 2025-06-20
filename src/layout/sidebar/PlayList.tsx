import PlaylistItem from "./PlaylistItem";
import { SimplifiedPlaylist } from "../../models/playlist";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface PlaylistListProps {
  playlists: SimplifiedPlaylist[];
}

const PlayList = ({ playlists }: PlaylistListProps) => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const handleClick = (id: string) => {
    setSelectedId(id);
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
          selected={playlist.id === selectedId}
        />
      ))}
    </>
  );
};

export default PlayList;
