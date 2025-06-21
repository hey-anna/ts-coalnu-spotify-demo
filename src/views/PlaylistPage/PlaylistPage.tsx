import { useNavigate } from "react-router-dom";
import Library from "../../layout/Library";
import { Theme, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";

// Library 라는 이름은 일반적으로 "좋아요한 곡, 저장한 앨범, 플레이리스트" 전체를 포함하는 개념이지만
// "내 플레이리스트 목록" 전용 컴포넌트 이고
// 피시버전에서는 사이드바에 리스트가 있다.

// 모바일 전용 페이지
const PlaylistPage = () => {
  // const isMobile = useMediaQuery("(max-width:600px)"); // 직접 미디어쿼리 문자열 사용
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  useEffect(() => {
    console.log("현재 isMobile 상태:", isMobile);
    if (!isMobile) {
      // PC 화면으로 전환되면 자동 홈 리디렉션
      navigate("/", { replace: true });
    }
  }, [isMobile, navigate]);

  return isMobile ? <Library /> : null;
};

export default PlaylistPage;
