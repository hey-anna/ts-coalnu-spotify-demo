import { Avatar, Box, Typography } from "@mui/material";
import { TrackObject } from "../../models/track";
import { ArtistObject } from "../../models/artists";
import { SimplifiedAlbum } from "../../models/album";
import { CardWrapper, HoverOverlay } from "../../components/card/Card.styled";
import PlayButton from "../../components/button/PlayButton";

interface SearchTopResultProps {
  topResult: ArtistObject | TrackObject | SimplifiedAlbum | null;
}

const SearchTopResult = ({ topResult }: SearchTopResultProps) => {
  if (!topResult) return null;

  const isArtist = (item: any): item is ArtistObject => !!item.followers;
  const isTrack = (item: any): item is TrackObject => !!item.album;
  const isAlbum = (item: any): item is SimplifiedAlbum =>
    !!item.release_date || !!item.total_tracks;

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Top result
      </Typography>
      <CardWrapper>
        {/* 이미지 */}
        <Avatar
          src={
            isTrack(topResult)
              ? topResult.album?.images?.[0]?.url
              : topResult.images?.[0]?.url
          }
          variant={isArtist(topResult) ? "circular" : "rounded"}
          sx={{ width: 140, height: 140, mb: 2 }}
        />
        {/* ▶️ Hover Play Button (only for track) */}
        <HoverOverlay className="hover-overlay">
          <PlayButton />
        </HoverOverlay>
        {/* 제목 */}
        <Typography variant="h4" fontWeight={700}>
          {topResult.name}
        </Typography>
        {/* 하위 설명 */}
        {isTrack(topResult) && (
          <Typography variant="body2">
            {topResult.artists?.map((a) => a.name).join(", ")}
          </Typography>
        )}
        {isArtist(topResult) && (
          <Typography variant="body2">
            Followers: {topResult.followers?.total.toLocaleString()}
          </Typography>
        )}
        {isAlbum(topResult) && (
          <Typography variant="body2">
            {topResult.artists?.map((a) => a.name).join(", ")}
          </Typography>
        )}
      </CardWrapper>
    </Box>
  );
};

export default SearchTopResult;
