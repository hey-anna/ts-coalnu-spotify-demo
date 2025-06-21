import {
  ListItemAvatar,
  Avatar,
  Button,
  ListItemText,
  ListItem,
  List,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { TrackObject } from "../../models/track";
import useAddTrackToPlaylist from "../../hooks/useAddTrackToPlaylist";
import { AddTrackToPlaylistRequest } from "../../models/playlist";

interface SearchResultListProps {
  list: TrackObject[];
}
const SearchResultList = ({
  list,
  playlist_id,
}: SearchResultListProps & { playlist_id: string }) => {
  const { mutate } = useAddTrackToPlaylist();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAddTrack = (track: TrackObject) => {
    if (!track.uri) {
      console.warn("유효하지 않은 트랙: URI가 없음");
      return;
    }
    const payload: AddTrackToPlaylistRequest = {
      playlist_id, // 상위에서 props로 받아옴
      uris: [track.uri], // string[]로 변환
      position: 0, // optional
    };

    console.log("추가할 트랙:", track);
    console.log("URI:", track.uri); // → 실제로 API에 전달할 값

    mutate(payload);
  };
  return (
    <List>
      {list.map((item) => (
        <ListItem
          key={item.id}
          divider
          secondaryAction={
            <Button variant="outlined" onClick={() => handleAddTrack(item)}>
              추가하기
            </Button>
          }
        >
          <ListItemAvatar>
            <Avatar src={item.album?.images[0]?.url} variant="square" />
          </ListItemAvatar>
          <ListItemText
            primary={item.name}
            // secondary={`${item.artists?.[0]?.name} · ${item.album?.name}`}
            secondary={
              !isMobile
                ? `${item.artists?.[0]?.name} · ${item.album?.name}`
                : item.artists?.[0]?.name
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SearchResultList;
