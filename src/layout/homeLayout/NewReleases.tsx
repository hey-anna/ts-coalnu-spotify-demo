import { Grid, Typography } from "@mui/material";
import useGetNewReleases from "../../hooks/useGetNewReleases";
import Spinner from "../../components/spinner/CommonSpinner";
import ErrorMessage from "../../components/Alert/ErrorMessage";
import BasicCard from "../../components/card/BasicCard";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();
  console.log("데이터 확인", data);
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        New Released Albums
      </Typography>
      {data && data.albums.items.length > 0 ? (
        <Grid container spacing={0.5}>
          {data.albums.items.map((album) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
              <BasicCard
                image={album.images[0].url}
                name={album.name}
                artistsName={album.artists[0].name}
                onPlayClick={() => console.log(`재생: ${album.name}`)}
              />
              {/* <img src={album.images[0].url} />
              <Typography>{album.name}</Typography>
              <Typography>{album.artists[0].name}</Typography> */}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}
    </div>
  );
};

export default NewReleases;
