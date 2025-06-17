import { Box, Typography } from "@mui/material";
import SearchTopResult from "./SearchTopResult";
import SearchSongs from "./SearchSongs";
import SearchArtists from "./SearchArtists";
import SearchAlbums from "./SearchAlbums";
import { TrackObject } from "../../models/track";

interface SearchResultsLayoutProps {
  list: TrackObject[];
}

const SearchResultsLayout = ({ list }: SearchResultsLayoutProps) => {
  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 2 }}>
        검색 결과 화면!~!
      </Typography>
      {/* <SearchTopResult list={list} />
      <SearchSongs list={list} />
      <SearchArtists list={list} />
      <SearchAlbums list={list} /> */}
    </Box>
  );
};

export default SearchResultsLayout;
