import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import { TrackObject } from "../../models/track";
import PlayButton from "../../components/button/PlayButton";
import { HoverOverlay } from "../../components/card/Card.styled";

const SearchSongs = ({ list }: { list: TrackObject[] }) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Songs
      </Typography>
      <List>
        {list.slice(0, 5).map((song) => (
          <ListItem
            key={song.id}
            sx={(theme) => ({
              position: "relative",
              borderRadius: 1,
              transition: "background-color 0.3s ease, transform 0.2s ease",
              "&:hover": {
                backgroundColor: theme.palette.action.selected,
                // backgroundColor: "rgba(30, 215, 96, 0.08)", // Spotify-style green tint
                transform: "scale(1.01)",
              },
              "&:hover .hover-overlay": {
                opacity: 1,
              },
            })}
          >
            <Box position="relative">
              <ListItemAvatar
                sx={{
                  minWidth: "auto", // ✅ 기본 56px 제거
                  mr: 0, // 필요 시 마진 제거
                }}
              >
                <Avatar src={song.album?.images?.[0]?.url} variant="rounded" />
              </ListItemAvatar>
              <HoverOverlay
                className="hover-overlay"
                sx={{
                  paddingLeft: 0,
                  left: 0,
                }}
              >
                <PlayButton
                  sx={{
                    left: "20px",
                    padding: "20px",
                    backgroundColor: "transparent", // 배경 투명
                    color: "white", // 아이콘 색상 흰색
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    width: 32,
                    height: 32,
                  }}
                />
              </HoverOverlay>
            </Box>
            <ListItemText
              primary={song.name}
              secondary={song.artists?.[0]?.name}
            />
            <Typography variant="body2" color="text.secondary">
              {Math.floor((song.duration_ms ?? 0) / 60000)}:
              {String(
                Math.floor(((song.duration_ms ?? 0) / 1000) % 60),
              ).padStart(2, "0")}
              {/* {Math.floor((song.duration_ms ?? 0) / 60000)}:
              {((song.duration_ms ?? 0) / 1000) % 60 < 10 ? "0" : ""}
              {Math.floor(((song.duration_ms ?? 0) / 1000) % 60)} */}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchSongs;
