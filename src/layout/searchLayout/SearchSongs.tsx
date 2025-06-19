import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { TrackObject } from "../../models/track";
import PlayButton from "../../components/button/PlayButton";
import { HoverOverlay, PlusOverlay } from "../../components/card/Card.styled";
import { AddCircleOutlineOutlined } from "@mui/icons-material";

const SearchSongs = ({
  list,
  onAddClick,
}: {
  list: TrackObject[];
  onAddClick?: (song: TrackObject, anchorEl: HTMLElement) => void;
}) => {
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
              "&:hover .plus-overlay": {
                opacity: 1,
              },
            })}
          >
            {/* 왼쪽 썸네일 + 재생 */}
            <Box position="relative">
              <ListItemAvatar
                sx={{
                  minWidth: "auto", // 기본 56px 제거
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
            {/* 가운데 곡 제목 + 아티스트 */}
            <ListItemText
              primary={song.name}
              secondary={song.artists?.[0]?.name}
              sx={{ ml: 2 }}
            />
            {/* 오른쪽 Plus 버튼 + 시간 */}
            <Box display="flex" alignItems="center" gap={4}>
              <PlusOverlay className="plus-overlay">
                <IconButton
                  onClick={(e) => onAddClick?.(song, e.currentTarget)}
                  size="small"
                  // sx={{
                  //   opacity: 0,
                  //   transition: "opacity 0.2s ease",
                  // }}
                >
                  <AddCircleOutlineOutlined sx={{ color: "white" }} />
                </IconButton>
              </PlusOverlay>
              <Typography
                variant="body2"
                color="text.secondary"
                whiteSpace="nowrap"
              >
                {Math.floor((song.duration_ms ?? 0) / 60000)}:
                {String(
                  Math.floor(((song.duration_ms ?? 0) / 1000) % 60),
                ).padStart(2, "0")}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchSongs;
