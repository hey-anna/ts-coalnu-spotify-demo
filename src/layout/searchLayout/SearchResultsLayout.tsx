import { Box, Grid, Typography } from "@mui/material";
import SearchTopResult from "./SearchTopResult";
import SearchSongs from "./SearchSongs";
import SearchArtists from "./SearchArtists";
import SearchAlbums from "./SearchAlbums";
import { TrackObject } from "../../models/track";
import { ArtistObject } from "../../models/artists";
import { SimplifiedAlbum } from "../../models/album";

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
  return (
    <Box mt={2}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SearchTopResult topResult={topResult} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SearchSongs list={tracks} />
        </Grid>
      </Grid>
      <Box mt={6}>
        <SearchArtists list={artists} />
      </Box>
      <Box mt={6}>
        <SearchAlbums list={albums} />
      </Box>
    </Box>
  );
};

export default SearchResultsLayout;
