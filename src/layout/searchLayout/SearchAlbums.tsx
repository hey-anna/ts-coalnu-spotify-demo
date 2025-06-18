import { Box, Grid, Typography } from "@mui/material";
import BasicCard from "../../components/card/BasicCard";
import { TrackObject } from "../../models/track";
import { SimplifiedAlbum } from "../../models/album";

interface SearchAlbumsProps {
  list: TrackObject[];
}

const SearchAlbums = ({ list }: { list: SimplifiedAlbum[] }) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Albums
      </Typography>
      <Grid container spacing={2}>
        {list.slice(0, 6).map((album) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
            <BasicCard
              image={album.images?.[0]?.url}
              name={album.name}
              artistsName={album.artists?.[0]?.name}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchAlbums;

// 트랙에 들어오면, 20개의 트랙정보가 있고
// 앨범에 들어오면
// L 앨범.image
// L 앨범.name: 앨범명
// L 앨범.artists[0].name: 가수명
