import React from "react";
import { Box, Typography, Avatar, Stack, styled } from "@mui/material";
import { MusicNote } from "@mui/icons-material";

interface PlaylistHeaderProps {
  imageUrl?: string;
  name: string;
  ownerName: string;
  totalTracks: number;
}
const HeaderContainer = styled(Box)<{ hasImage?: boolean }>(
  ({ theme, hasImage }) => ({
    position: "relative",
    width: "100%",
    minHeight: 320,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    padding: theme.spacing(5),
    gap: theme.spacing(4),
    color: "white",
    // background: "linear-gradient(to bottom, #2a2a2a, #000000)",
    background: hasImage
      ? "linear-gradient(to bottom, #2a2a2a, #000000)" // 이미지 있을 때
      : "linear-gradient(to bottom, #f1e4e8, #a79a9f)", // 이미지 없을 때 밝은 그라데이션

    overflow: "hidden",

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }),
);

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
    <HeaderContainer hasImage={!!imageUrl}>
      {/* 배경 이미지 */}
      {imageUrl && <BackgroundImage src={imageUrl} alt="background" />}

      {/* 아바타 */}
      {imageUrl ? (
        <PlaylistAvatar variant="square" src={imageUrl} />
      ) : (
        <Box
          sx={(theme) => ({
            width: 224,
            height: 224,
            // background: "linear-gradient(to bottom, #f1e4e8, #a79a9f)",
            background: "linear-gradient(to top, #f1e4e8, #a79a9f)",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            [theme.breakpoints.down("md")]: {
              width: 160,
              height: 160,
            },
          })}
        >
          <MusicNote sx={{ fontSize: 64, color: "#3b3b3b" }} />
        </Box>
      )}

      {/* {imageUrl ? (
        <img src={imageUrl} alt="playlist" />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MusicNote sx={{ fontSize: 64, color: "#fff" }} />
        </Box>
      )} */}

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
