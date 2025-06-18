import { IconButton, IconButtonProps } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { styled } from "@mui/system";

const StyledPlayButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // backgroundColor: "rgba(0, 255, 0, 0.8)",
  backgroundColor: theme.palette.primary.main,
  color: "white",
  zIndex: 2,
  "&:hover": {
    backgroundColor: "green",
  },
}));
interface PlayButtonProps extends IconButtonProps {}
const PlayButton = (props: PlayButtonProps) => {
  return (
    <StyledPlayButton type="button" {...props}>
      <PlayArrowIcon />
    </StyledPlayButton>
  );
};

export default PlayButton;
