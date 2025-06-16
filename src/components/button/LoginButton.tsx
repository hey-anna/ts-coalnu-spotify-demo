import { Button, ButtonProps } from "@mui/material";
// import { getSpotifyAuthUrl } from "../../utils/auth";
// import useLogin from "../../hooks/useLogin";
import { Login, Logout } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import theme from "../../theme/theme";

interface LoginAuthButtonProps {
  isLoggedIn: boolean;
  onClick: () => void;
}

interface StyledButtonProps extends ButtonProps {
  isLoggedIn: boolean;
}

const LoginButton = ({ isLoggedIn, onClick }: LoginAuthButtonProps) => {
  const StyledButton = styled(({ isLoggedIn, ...props }: StyledButtonProps) => (
    <Button {...props} />
  ))(({ isLoggedIn }) => ({
    minWidth: 120,
    borderRadius: 20,
    fontWeight: 700,
    textTransform: "none",
    padding: "6px 16px",
    backgroundColor: "transparent",
    color: isLoggedIn ? "#CBD5E0" : "#1DB954",
    border: `1px solid ${isLoggedIn ? "#4A5568" : "#1DB954"}`,
    "&:hover": {
      backgroundColor: isLoggedIn ? "#2D3748" : "#1DB954",
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
      onClick={onClick}
      startIcon={isLoggedIn ? <Logout /> : <Login />}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </StyledButton>
  );
};

export default LoginButton;
