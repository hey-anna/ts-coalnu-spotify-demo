import { styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Library from "./Library";
import Haderbar from "./Haderbar";
import TestLoginModal from "../components/modal/TestLoginModal";
import NavbarPC from "./navbar/NavbarPC";
import NavbarMobile from "./navbar/NavbarMobile";

const Layout = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100vh",
  padding: "8px",
  gap: "8px",

  [theme.breakpoints.down("sm")]: {
    // gap: 0,
    padding: 0,
  },
}));

// mui 나 우리가 정한 theme 값 가져오기
const Sidebar = styled("div")(({ theme }) => ({
  maxWidth: 374,
  width: "100%",
  height: "100%", // ** 스크롤 필수
  display: "flex",
  flexDirection: "column", // ** 스크롤 필수
  gap: "8px",
  overflow: "hidden", // ** 스크롤 필수
  transition: "width 0.3s ease",
  // xl 이상: 더 넓게
  [theme.breakpoints.up("xl")]: {
    maxWidth: 397,
  },

  // lg ~ xl
  [theme.breakpoints.between("lg", "xl")]: {
    maxWidth: 374,
  },

  // md ~ lg
  [theme.breakpoints.between("md", "lg")]: {
    maxWidth: 320,
  },

  // sm ~ md
  [theme.breakpoints.between("sm", "md")]: {
    width: 88, // 축소형 사이드바
  },
  [theme.breakpoints.down("sm")]: {
    display: "none", // 모바일에서는 숨김
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "8px",
  // marginBottom: "8px",
  // marginRight: "8px",
  // display: "flex",
  // gap: "10px",
}));

// if (isLoadingProfile) {
//   return <CommonSpinner />;
// }

const accessToken = localStorage.getItem("access_token");
const shouldShowLoginModal = !accessToken; // 토큰 없고, 로딩 끝났을 때만

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        {/* === 네비게이션 영역 NavbarPC (Home, Search) === */}
        <ContentBox>
          <NavbarPC />
        </ContentBox>
        {/* === 라이브러리 영역 사이드바 (Your Library + 플레이리스트) === */}
        <ContentBox height="100%" sx={{ flexGrow: 1, overflow: "hidden" }}>
          <Library />
        </ContentBox>
      </Sidebar>
      {/* === 컨텐츠 영역 === */}
      <ContentBox
        sx={{
          overflowX: "auto",
          paddingBottom: { xs: "80px", sm: "0" },
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
          // paddingBottom: "24px",
        }}
      >
        <Haderbar />
        <Outlet />
      </ContentBox>
      {/* === 네비게이션 영역 NavbarMobile (Home, Search, library) === */}
      <NavbarMobile />
      <TestLoginModal open={shouldShowLoginModal} />
    </Layout>
  );
};

export default AppLayout;
