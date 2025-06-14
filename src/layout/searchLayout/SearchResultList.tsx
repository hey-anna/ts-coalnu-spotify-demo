import { Typography } from "@mui/material";
import { TrackObject } from "../../models/track";

interface SearchResultListProps {
  list: TrackObject[];
}
const SearchResultList = ({ list }: SearchResultListProps) => {
  return (
    <div>
      {list.map((track) => (
        <Typography variant="h2">{track.name}</Typography>
      ))}
    </div>
  );
};

export default SearchResultList;
