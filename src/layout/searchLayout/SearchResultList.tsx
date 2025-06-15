import {
  ListItemAvatar,
  Avatar,
  Button,
  ListItemText,
  ListItem,
  List,
} from "@mui/material";
import { TrackObject } from "../../models/track";

interface SearchResultListProps {
  list: TrackObject[];
}
const SearchResultList = ({ list }: SearchResultListProps) => {
  const handleAddTrack = (track: TrackObject) => {
    console.log("추가할 트랙:", track);
    console.log("URI:", track.uri); // → 실제로 API에 전달할 값
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
            secondary={`${item.artists?.[0]?.name} · ${item.album?.name}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SearchResultList;
