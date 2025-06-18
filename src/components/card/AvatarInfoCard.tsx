import { Box, Stack, Typography } from "@mui/material";
import { Bolt, MusicNote, People } from "@mui/icons-material";
import { CardImage, CardWrapper, HoverOverlay } from "./Card.styled";
import PlayButton from "../button/PlayButton";

interface AvatarInfoCardProps {
  name?: string;
  imageUrl?: string;
  followers: number;
  popularity?: number;
}

const formatNumber = (num: number): string => {
  if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  return num.toString();
};

const AvatarInfoCard = ({
  name,
  imageUrl,
  followers,
  popularity,
}: AvatarInfoCardProps) => {
  const IMAGE_SIZE = "100%";

  return (
    <CardWrapper>
      {imageUrl ? (
        <CardImage
          src={imageUrl}
          alt={name}
          sx={{
            aspectRatio: "1 / 1",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            objectFit: "cover",
            mx: "auto",
            mb: 1,
          }}
        />
      ) : (
        <Box
          sx={(theme) => ({
            aspectRatio: "1 / 1",
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, #f1e4e8, #a79a9f)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
            flexShrink: 0,
          })}
        >
          <MusicNote sx={{ fontSize: 40, color: "#3b3b3b" }} />
        </Box>
      )}
      <HoverOverlay className="hover-overlay">
        <PlayButton
          sx={{
            backgroundColor: "#e305b6",
          }}
        />
      </HoverOverlay>
      <Typography
        variant="body2"
        mt={1}
        noWrap
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <People sx={{ fontSize: 10, color: "text.secondary" }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: 11 }}
          >
            {formatNumber(followers)}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.3}>
          <Bolt sx={{ fontSize: 10, color: "text.secondary" }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: 11 }}
          >
            {popularity}
          </Typography>
        </Stack>
      </Stack>
    </CardWrapper>
  );
};

export default AvatarInfoCard;
