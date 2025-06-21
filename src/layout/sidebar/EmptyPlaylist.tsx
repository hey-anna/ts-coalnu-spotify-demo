import { Add } from "@mui/icons-material";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import BasicTooltip from "../../components/tooltip/BasicTooltip";
import { useNavigate } from "react-router-dom";

const EmptyBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#242424",
  borderRadius: "8px",
  padding: "20px",
  color: theme.palette.text.primary,
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  [theme.breakpoints.down("md")]: {
    padding: "12px",
    background: "none",
  },
}));

const TypographyGroup = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

const CreatePlaylistButton = styled(Button)(({ theme }) => ({
  borderRadius: "9999px",
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  fontWeight: 700,
  textTransform: "none",
  width: "fit-content",
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
  [theme.breakpoints.down("md")]: {
    backgroundColor: "none",
  },
}));

// 88px 사이드바에서 보여질 버튼
const FloatingIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
  alignSelf: "flex-start", // 왼쪽 정렬
}));

const EmptyPlaylist = () => {
  const navigate = useNavigate();
  // const login = useLogin();
  // const navigate = useNavigate();
  // const login = () => {
  //   return () => {
  //     navigate("/login-required");
  //   };
  // };

  const handleLoginClick = () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      navigate("/login-required");
    } else {
      console.log("로그인된 사용자: 다른 동작 가능"); // 예: createPlaylist()
    }
  };

  const [openTooltip, setOpenTooltip] = useState(true);
  return (
    <EmptyBox>
      <TypographyGroup sx={{ display: { sm: "none", md: "flex" } }}>
        <Typography variant="h2" fontSize="1rem" fontWeight={700}>
          Create your first playlist
        </Typography>
        <Typography variant="body2">It's easy, we'll help you</Typography>
      </TypographyGroup>
      <BasicTooltip>
        <CreatePlaylistButton
          variant="contained"
          sx={{ display: { xs: "none", md: "inline-flex" } }}
          onClick={handleLoginClick}
        >
          Create playlist
        </CreatePlaylistButton>
      </BasicTooltip>
      <BasicTooltip>
        <FloatingIconButton
          sx={{ display: { xs: "inline-flex", md: "none" } }}
          onClick={handleLoginClick}
        >
          <Add />
        </FloatingIconButton>
      </BasicTooltip>
    </EmptyBox>
  );
};

export default EmptyPlaylist;
