import { Box, Grid, Typography } from "@mui/material";
import { ArtistObject } from "../../models/artists";
import AvatarInfoCard from "../../components/card/AvatarInfoCard";
const SearchArtists = ({ list }: { list: ArtistObject[] }) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Artists
      </Typography>
      {/* <Box display="flex" gap={2} overflow="auto"> */}
      <Grid container spacing={3}>
        {list.slice(0, 6).map((artist) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={artist.id}>
            <AvatarInfoCard
              key={artist.id}
              name={artist.name}
              imageUrl={artist.images?.[0]?.url}
              followers={artist.followers?.total ?? 0}
              popularity={artist.popularity}
            />
          </Grid>
        ))}
      </Grid>
      {/* </Box> */}
    </Box>
  );
};

export default SearchArtists;
