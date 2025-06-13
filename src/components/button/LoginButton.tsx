import { Button } from "@mui/material";
// import { getSpotifyAuthUrl } from "../../utils/auth";
// import useLogin from "../../hooks/useLogin";
interface LoginAuthButtonProps {
  isLoggedIn: boolean;
  onClick: () => void;
}
const LoginButton = ({ isLoggedIn, onClick }: LoginAuthButtonProps) => {
  // spotufy에서 제공하는 페이지, 유저가 알아서 로그인하게 해주고, 결과값만 받아 오는 형태
  // const login = () => {
  //   getSpotifyAuthUrl();
  // };

  // const login = useLogin();
  return (
    <Button
      variant="contained"
      color={isLoggedIn ? "warning" : "secondary"}
      size="large"
      onClick={onClick}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </Button>
  );
};

export default LoginButton;
