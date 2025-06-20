import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import useGetNewReleases from "../../hooks/useGetNewReleases";
import useGetSeveralAlbums from "../../hooks/useGetSeveralAlbums";
import BasicCard from "../../components/card/BasicCard";

const Albums = () => {
  const { data: newReleases } = useGetNewReleases();

  // New Releases 응답에서 album_type === 'album' 인 ID들 중 최대 6개만 추출
  const albumIds =
    newReleases?.albums.items
      .filter((item) => item.album_type === "album")
      .slice(0, 6)
      .map((item) => item.id) ?? [];

  const {
    data: detailedAlbums,
    isLoading,
    error,
  } = useGetSeveralAlbums(albumIds);

  useEffect(() => {
    if (detailedAlbums) {
      console.log("GetSeveralAlbums 응답 확인:", detailedAlbums);
    }
  }, [detailedAlbums]);

  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        Albums
      </Typography>
      {detailedAlbums && detailedAlbums?.length > 0 ? (
        <Grid container spacing={0.5}>
          {detailedAlbums
            ?.filter((album) => album.album_type === "album") //  먼저 album 타입만 걸러주고
            .slice(0, 6) //  그 다음 6개만 자르기
            .map((album) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
                <BasicCard
                  image={album.images[0]?.url ?? ""}
                  name={album.name}
                  artistsName={album.artists[0]?.name}
                  onPlayClick={() => console.log(`앨범 재생: ${album.name}`)}
                />
              </Grid>
            ))}
        </Grid>
      ) : (
        <Typography variant="h2">No Albums Found</Typography>
      )}
    </div>
  );
};

export default Albums;
