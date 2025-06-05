import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { styled } from "@mui/system";

const StyledPlayButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   backgroundColor: "rgba(0, 255, 0, 0.8)",
  backgroundColor: theme.palette.primary.main,
  color: "white",
  zIndex: 2,
  "&:hover": {
    backgroundColor: "green",
  },
}));

const PlayButton = () => {
  return (
    <StyledPlayButton>
      <PlayArrowIcon />
    </StyledPlayButton>
  );
};

export default PlayButton;

// import { styled } from "@mui/material";
// import React from "react";

// const PlayButtonContainer = styled("button")(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   border: "none",
//   borderRadius: "50%",
//   width: "50px",
//   height: "50px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   cursor: "pointer",
//   boxShadow: "rgba(0, 0, 0, 0.3) 0px 8px 8px 0px",
//   "&:focus": {
//     outline: "none",
//   },
// }));

// const PlayButton: React.FC = ({ onClick }: PlayButtonProps) => {
//   return (
//     <PlayButtonContainer onClick={onClick}>
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path d="M8 5v14l11-7z" fill="black" />
//       </svg>
//     </PlayButtonContainer>
//   );
// };

// export default PlayButton;
