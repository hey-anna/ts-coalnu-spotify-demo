import { Navigate, useParams } from "react-router-dom";
import useGetplaylist from "../../hooks/useGetplaylist";
import PlaylistHeader from "../../layout/playlistLayout/PlaylistHeader";
import { Box } from "@mui/material";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to="/" />; // 예외처리
  const { data: playlist } = useGetplaylist({ playlist_id: id }); // 중요한게 파라미터 값을 넣어줘야 함
  console.log("playlistDetail", playlist);
  if (!playlist) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      <PlaylistHeader
        imageUrl={playlist.images?.[0]?.url}
        name={playlist.name || "제목 없음"}
        ownerName={playlist.owner?.display_name || "알 수 없음"}
        totalTracks={playlist.tracks?.total || 0}
      />
    </Box>
  );
};

export default PlaylistDetailPage;
