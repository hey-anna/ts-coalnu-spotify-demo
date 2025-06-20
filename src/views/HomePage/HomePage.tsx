import useGetNewReleases from "../../hooks/useGetNewReleases";
import useGetSeveralAlbums from "../../hooks/useGetSeveralAlbums";
import Albums from "../../layout/homeLayout/Albums";
import NewReleases from "../../layout/homeLayout/NewReleases";
import { Tracks } from "../../layout/homeLayout/Tracks";
import { SimplifiedAlbum } from "../../models/album";
import { TrackObject } from "../../models/track";

// import Tracks from "../../layout/homeLayout/Tracks";

const HomePage = () => {
  const { data: newReleases } = useGetNewReleases();
  const albumIds = newReleases?.albums.items.map((a) => a.id) ?? [];
  const { data: detailedAlbums } = useGetSeveralAlbums(albumIds);

  const allTracks: TrackObject[] =
    detailedAlbums?.flatMap((album) =>
      album.tracks.items.map((track) => ({
        ...track,
        album: {
          album_type: album.album_type,
          total_tracks: album.total_tracks,
          available_markets: album.available_markets,
          external_urls: album.external_urls,
          href: album.href,
          id: album.id,
          images: album.images,
          name: album.name,
          release_date: album.release_date,
          release_date_precision: album.release_date_precision,
          type: album.type,
          uri: album.uri,
          artists: album.artists,
          restrictions: album.restrictions, // optional
        },
      })),
    ) ?? [];

  return (
    <div>
      <NewReleases />
      <Albums />
      <Tracks tracks={allTracks} />
    </div>
  );
};

export default HomePage;
