import {
  Box,
  Button,
  ButtonProps,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import { getSpotifyAuthUrl } from "../../utils/auth";
// import useLogin from "../../hooks/useLogin";
import { Login, Logout } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import theme from "../../theme/theme";

interface LoginAuthButtonProps {
  isLoggedIn: boolean;
  onClick: () => void;
}

interface StyledButtonProps extends ButtonProps {
  isLoggedIn: boolean;
  isMobile: boolean;
}

const LoginButton = ({ isLoggedIn, onClick }: LoginAuthButtonProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const StyledButton = styled(
    ({ isLoggedIn, isMobile, ...props }: StyledButtonProps) => (
      <Button {...props} />
    ),
  )(({ isLoggedIn }) => ({
    position: "relative",
    minWidth: isMobile ? "auto" : 120,
    borderRadius: 20,
    fontWeight: 700,
    textTransform: "none",
    padding: isMobile ? 0 : "6px 16px",
    backgroundColor: "transparent",
    color: isLoggedIn ? "#CBD5E0" : "#1DB954",
    // border: `1px solid ${isLoggedIn ? "#4A5568" : "#1DB954"}`,
    border: isMobile
      ? "none"
      : `1px solid ${isLoggedIn ? "#4A5568" : "#1DB954"}`,
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    justifyContent: "center",
    fontSize: isMobile ? 10 : 14,

    "& .MuiButton-startIcon": {
      margin: isMobile ? 0 : undefined,
      // marginBottom: isMobile ? "4px" : 0,
      "& > *:first-of-type": {
        // fontSize: 60, // 원하는 크기 지정
        [theme.breakpoints.down("sm")]: {
          fontSize: 36,
        },
      },
    },

    "&:hover": {
      backgroundColor: isLoggedIn
        ? isMobile
          ? "transparent"
          : "#2D3748"
        : "#1DB954",
      color: "#fff",
      borderColor: "transparent",
    },
  }));

  // spotufy에서 제공하는 페이지, 유저가 알아서 로그인하게 해주고, 결과값만 받아 오는 형태
  // const login = () => {
  //   getSpotifyAuthUrl();
  // };

  // const login = useLogin();

  return (
    <StyledButton
      variant="contained"
      isLoggedIn={isLoggedIn}
      isMobile={isMobile}
      onClick={onClick}
      size={isMobile ? "large" : "medium"}
      startIcon={isLoggedIn ? <Logout /> : <Login />}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </StyledButton>
  );
};

export default LoginButton;
