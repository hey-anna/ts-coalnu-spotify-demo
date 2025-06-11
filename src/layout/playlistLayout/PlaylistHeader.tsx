import React from "react";
import { Box, Typography, Avatar, Stack, styled } from "@mui/material";

interface PlaylistHeaderProps {
  imageUrl?: string;
  name: string;
  ownerName: string;
  totalTracks: number;
}
const HeaderContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: 320,
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  padding: theme.spacing(5),
  gap: theme.spacing(4),
  color: "white",
  background: "linear-gradient(to bottom, #2a2a2a, #000000)",
  overflow: "hidden",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
}));

const BackgroundImage = styled("img")(() => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0.25,
  zIndex: 0,
}));

const PlaylistAvatar = styled(Avatar)(({ theme }) => ({
  //   width: 224,
  //   height: 224,
  //   backgroundColor: "#444",
  //   fontSize: 48,
  //   zIndex: 1,
  width: 224,
  height: 224,
  backgroundColor: "#444",
  //   borderRadius: theme.shape.borderRadius,
  borderRadius: 8,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,

  [theme.breakpoints.down("md")]: {
    width: 160,
    height: 160,
  },

  //   img: {
  //     width: "100%",
  //     height: "100%",
  //     objectFit: "cover",
  //     display: "block",
  //   },
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({
  imageUrl,
  name,
  ownerName,
  totalTracks,
}) => {
  return (
    <HeaderContainer>
      {/* 배경 이미지 */}
      {imageUrl && <BackgroundImage src={imageUrl} alt="background" />}

      {/* 아바타 */}
      <PlaylistAvatar variant="square" src={imageUrl} />

      {/* 텍스트 */}
      <Stack spacing={1} zIndex={1}>
        <Typography
          variant="caption"
          sx={{ textTransform: "uppercase", fontWeight: 600 }}
        >
          Playlist
        </Typography>
        <Typography
          variant="h3"
          component="h1"
          sx={(theme) => ({
            fontWeight: 700,
            wordBreak: "break-word",
            [theme.breakpoints.down("md")]: {
              fontSize: theme.typography.h4.fontSize,
            },
          })}
        >
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ccc" }}>
          <Typography component="span" sx={{ fontWeight: 600, color: "#fff" }}>
            {ownerName}
          </Typography>{" "}
          · {totalTracks} songs
        </Typography>
      </Stack>
    </HeaderContainer>
  );
};

export default PlaylistHeader;
