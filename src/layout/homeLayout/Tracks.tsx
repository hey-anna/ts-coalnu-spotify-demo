import { Typography, Grid, Box } from "@mui/material";
import { TrackObject } from "../../models/track";
import BasicCard from "../../components/card/BasicCard";

interface TracksProps {
  tracks: TrackObject[];
  maxItems?: number;
}

export const Tracks = ({ tracks, maxItems = 6 }: TracksProps) => {
  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        Tracks
      </Typography>

      <Grid container spacing={0.5}>
        {tracks.slice(0, 6).map((track) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={track.id}>
            <BasicCard
              image={track.album?.images?.[0]?.url ?? "/fallback.png"}
              name={track.name ?? "Unknown"}
              artistsName={track.artists?.[0]?.name ?? "Unknown"}
              onPlayClick={() => console.log(`트랙 재생: ${track.name}`)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
