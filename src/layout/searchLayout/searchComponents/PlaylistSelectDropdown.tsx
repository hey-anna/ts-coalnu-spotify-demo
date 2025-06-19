import {
  Popover,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { TrackObject } from "../../../models/track";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";

interface PlaylistSelectDropdownProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  track: TrackObject | null;
  onClose: () => void;
  onSelectPlaylist: (playlist_id: string) => void;
}

const PlaylistSelectDropdown = ({
  open,
  anchorEl,
  track,
  onClose,
  onSelectPlaylist,
}: PlaylistSelectDropdownProps) => {
  const { data, isLoading, isError } = useGetCurrentUserPlaylists({
    limit: 20,
    offset: 0,
  });

  const playlists = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }} // Popover 왼쪽 상단이 anchor에 붙음
      slotProps={{
        paper: {
          sx: {
            width: 240,
            maxHeight: 300,
            overflow: "hidden", // 전체 영역에 스크롤 방지
          },
        },
      }}
    >
      {/* 타이틀 - 고정 */}
      <Box
        sx={{
          px: 2,
          py: 1,
          bgcolor: "#333",
          fontWeight: 600,
          fontSize: "0.95rem",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        플레이리스트 선택
      </Box>
      <Box
        sx={{
          maxHeight: 260, // 전체 높이 - 타이틀 높이
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
        }}
      >
        {isLoading ? (
          <Box display="flex" justifyContent="center" py={2}>
            <CircularProgress size={20} />
          </Box>
        ) : isError ? (
          <Typography color="error">불러오는 데 실패했습니다</Typography>
        ) : playlists.length === 0 ? (
          <Typography color="text.secondary">
            생성된 플레이리스트가 없습니다
          </Typography>
        ) : (
          <List dense disablePadding>
            {playlists.map((playlist) => (
              <ListItemButton
                key={playlist.id}
                onClick={() => {
                  onSelectPlaylist(playlist.id!);
                  onClose();
                }}
              >
                <ListItemText primary={playlist.name} />
              </ListItemButton>
            ))}
          </List>
        )}
      </Box>
    </Popover>
  );
};

export default PlaylistSelectDropdown;
