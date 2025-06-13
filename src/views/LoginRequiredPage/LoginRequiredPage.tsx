import { Box, Button, Typography } from "@mui/material";
import useLogin from "../../hooks/useLogin";
// import { useNavigate } from "react-router-dom";

const LoginRequiredPage = () => {
  //   const navigate = useNavigate();
  const login = useLogin();
  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        다시 로그인 하세요
      </Typography>
      <Button variant="contained" onClick={login}>
        Log in
      </Button>
    </Box>
  );
};

export default LoginRequiredPage;
