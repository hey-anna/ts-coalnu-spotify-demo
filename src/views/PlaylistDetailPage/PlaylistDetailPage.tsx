import { Navigate, useParams } from "react-router-dom";
import useGetplaylist from "../../hooks/useGetplaylist";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return <Navigate to="/" />; // 예외처리
  const { data: playlist } = useGetplaylist({ playlist_id: id }); // 중요한게 파라미터 값을 넣어줘야 함
  console.log("playlistDetail", playlist);

  return <div>PlaylistDetailPage</div>;
};

export default PlaylistDetailPage;
