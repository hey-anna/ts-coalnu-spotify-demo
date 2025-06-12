import { Navigate, useParams } from "react-router-dom";
import useGetplaylist from "../../hooks/useGetplaylist";
import PlaylistHeader from "../../layout/playlistLayout/PlaylistHeader";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import ErrorMessage from "../../components/Alert/ErrorMessage";
import DesktopPlaylistItem from "../../layout/playlistLayout/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import CommonSpinner from "../../components/spinner/CommonSpinner";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to="/" />; // 예외처리

  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    error: playlistError,
  } = useGetplaylist({ playlist_id: id }); // 중요한게 파라미터 값을 넣어줘야 함

  const {
    data: playlistItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isPlaylist,
    error: playlistItemsLoading,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT });

  const { ref, inView } = useInView();
  const pages = playlistItems?.pages ?? [];
  const flatItems = playlistItems?.pages.flatMap((page) => page.items) ?? [];
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  console.log("playlistDetail", playlist);
  console.log("playlistItems", playlistItems);

  // const flatItems = playlistItems?.pages.flatMap((page) => page.items) ?? [];

  if (!playlist) return <div>Loading...로딩스피너</div>;
  if (playlistError)
    return <ErrorMessage errorMessage={playlistError.message} />;

  const stickyHeaderCellSx = {
    position: "sticky",
    top: "-8px",
    backgroundColor: "background.paper",
    zIndex: 1,
  };

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
        // <Box
        //   sx={{
        //     maxHeight: "calc(100vh - 360px)", // 예: 헤더, 타이틀 영역 높이 제외한 나머지
        //     overflowY: "auto",
        //     overflowX: "auto",
        //     scrollbarWidth: "none",
        //     "&::-webkit-scrollbar": { display: "none" },
        //   }}
        // >
        // <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={stickyHeaderCellSx}>#</TableCell>
              <TableCell sx={stickyHeaderCellSx}>Title</TableCell>
              <TableCell sx={stickyHeaderCellSx}>Album</TableCell>
              <TableCell sx={stickyHeaderCellSx}>Date added</TableCell>
              <TableCell sx={stickyHeaderCellSx}>Duration</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* 넘버링 붙여주기 */}
            {flatItems.map((item, itemIndex) => {
              return (
                <DesktopPlaylistItem
                  item={item}
                  key={itemIndex}
                  // key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                  index={itemIndex + 1}
                  // pageIndex * PAGE_LIMIT 11 12
                  // itemIndex(0) + 1
                />
              );
            })}
            <TableRow>
              <TableCell colSpan={5} ref={ref}>
                {isFetchingNextPage && <CommonSpinner />}
              </TableCell>
            </TableRow>
            {!hasNextPage && pages.length > 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography sx={{ color: "text.secondary", py: 2 }}>
                    🎵 더 이상 불러올 곡이 없습니다.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        // </TableContainer>

        // </Box>
      )}
    </>
  );
};

export default PlaylistDetailPage;
