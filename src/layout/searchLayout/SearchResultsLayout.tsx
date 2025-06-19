import { Box, Grid, Snackbar, Typography } from "@mui/material";
import SearchTopResult from "./SearchTopResult";
import SearchSongs from "./SearchSongs";
import SearchArtists from "./SearchArtists";
import SearchAlbums from "./SearchAlbums";
import { TrackObject } from "../../models/track";
import { ArtistObject } from "../../models/artists";
import { SimplifiedAlbum } from "../../models/album";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import CommonSnackbar from "../../components/snackbar/CommonSnackbar";
import { MusicNoteRounded, WarningAmberRounded } from "@mui/icons-material";
import PlaylistSelectDropdown from "./searchComponents/PlaylistSelectDropdown";
import useAddTrackToPlaylist from "../../hooks/useAddTrackToPlaylist";

// interface SearchResultsLayoutProps {
//   list: TrackObject[];
//   keyword: string;
// }

interface SearchResultsLayoutProps {
  tracks: TrackObject[];
  albums: SimplifiedAlbum[];
  artists: ArtistObject[];
  keyword: string;
  topResult: TrackObject | ArtistObject | SimplifiedAlbum | null;
}

const SearchResultsLayout = ({
  tracks,
  albums,
  artists,
  keyword,
  topResult,
}: SearchResultsLayoutProps) => {
  const { mutate } = useAddTrackToPlaylist();
  const queryClient = useQueryClient();

  const [toastOpen, setToastOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackObject | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [playlistDropdownOpen, setPlaylistDropdownOpen] = useState(false);
  const [addedSnackbarOpen, setAddedSnackbarOpen] = useState(false);

  const isLoggedIn =
    !!localStorage.getItem("access_token") &&
    !!queryClient.getQueryData(["current-user-profile"]);

  const handleAddClick = (song: TrackObject, anchor: HTMLElement) => {
    if (!isLoggedIn) {
      setToastOpen(true);
      return;
    }
    if (!song.id || !song.uri) {
      console.warn("선택한 트랙에 id 또는 uri가 없습니다");
      return;
    }
    setSelectedTrack(song);
    setAnchorEl(anchor); // 드롭다운 열 위치 지정
    setPlaylistDropdownOpen(true);
  };
  return (
    <Box mt={2}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SearchTopResult topResult={topResult} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SearchSongs
            list={tracks}
            onAddClick={(track, anchor) => handleAddClick(track, anchor)}
          />
        </Grid>
      </Grid>
      <Box mt={6}>
        <SearchArtists list={artists} />
      </Box>
      <Box mt={6}>
        <SearchAlbums list={albums} />
      </Box>
      {/* 로그인 상태 아닌 경우 메시지 */}
      <CommonSnackbar
        open={toastOpen || addedSnackbarOpen}
        onClose={() => {
          setToastOpen(false);
          setAddedSnackbarOpen(false);
        }}
        message={
          <Box display="flex" alignItems="center" gap={1}>
            {toastOpen ? (
              <>
                <WarningAmberRounded sx={{ color: "#fdd835" }} />
                <Typography
                  sx={{ fontSize: "1rem", paddingTop: "3px", color: "#fff" }}
                >
                  로그인이 필요합니다
                </Typography>
              </>
            ) : (
              <>
                <MusicNoteRounded sx={{ color: "#1db954" }} />
                <Typography sx={{ fontSize: "1rem", color: "#1db954" }}>
                  플레이리스트에 추가되었습니다
                  {/* "#66bb6a" */}
                </Typography>
              </>
            )}
          </Box>
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      {/* Plus버튼 선택 시 드롭다운 */}
      <PlaylistSelectDropdown
        open={playlistDropdownOpen}
        anchorEl={anchorEl}
        track={selectedTrack}
        onClose={() => setPlaylistDropdownOpen(false)}
        onSelectPlaylist={(playlist_id) => {
          if (selectedTrack) {
            mutate(
              {
                playlist_id,
                uris: [selectedTrack.uri!],
              },
              {
                onSuccess: () => {
                  setPlaylistDropdownOpen(false);
                  setAddedSnackbarOpen(true); // 성공 스낵바
                },
              },
            );
            setPlaylistDropdownOpen(false);
          }
        }}
      />
    </Box>
  );
};

export default SearchResultsLayout;
