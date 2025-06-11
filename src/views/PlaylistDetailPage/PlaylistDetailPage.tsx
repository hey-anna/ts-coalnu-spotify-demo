import { Navigate, useParams } from "react-router-dom";
import useGetplaylist from "../../hooks/useGetplaylist";
import PlaylistHeader from "../../layout/playlistLayout/PlaylistHeader";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import ErrorMessage from "../../components/Alert/ErrorMessage";
import DesktopPlaylistItem from "../../layout/playlistLayout/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to="/" />; // 예외처리
  const {
    data: playlist,
    isLoading: isPlaylistLoaing,
    error: playlistError,
  } = useGetplaylist({ playlist_id: id }); // 중요한게 파라미터 값을 넣어줘야 함
  const {
    data: playlistItems,
    isLoading: isPlaylist,
    error: playlistItemsLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT, offset: 0 });

  console.log("playlistDetail", playlist);
  console.log("playlistItems", playlistItems);
  if (!playlist) return <div>Loading...로딩스피너</div>;
  if (playlistError)
    return <ErrorMessage errorMessage={playlistError.message} />;

  return (
    <>
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
      {playlist?.tracks?.total === 0 ? (
        <Typography>써치</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Date added</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* 넘버링 붙여주기 */}
            {playlistItems?.pages.map((page, pageIndex) =>
              page.items.map((item, itemIndex) => {
                return (
                  <DesktopPlaylistItem
                    item={item}
                    key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    // pageIndex * PAGE_LIMIT 11 12
                    // itemIndex(0) + 1
                  />
                );
              }),
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default PlaylistDetailPage;
