import { styled, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
// import theme from "../theme/theme";
import { Box } from "@mui/material";
import { Home, Search } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Library from "./Library";
import Navbar from "./Navbar";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
  gap: "8px",
});

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

const NavList = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: "16px",
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  transition: "width 0.3s ease",
  [theme.breakpoints.down("md")]: {
    gap: "20px",
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const StyledRouterLink = styled(NavLink)({
  textDecoration: "none",
});

const NavItem = styled("div")<{ isActive?: boolean }>(
  ({ theme, isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "20px",
    color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,

    "&:hover": {
      color: theme.palette.text.primary,
    },
  }),
);

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        {/* === 네비게이션 영역 (Home, Search) === */}
        <ContentBox>
          <NavList>
            <li>
              <StyledRouterLink to="/" end>
                {({ isActive }: { isActive: boolean }) => (
                  <NavItem isActive={isActive}>
                    <Home
                      sx={{
                        fontSize: { xs: "1.75rem", md: "1.5rem" },
                      }}
                    />
                    <Typography
                      variant="h2"
                      fontWeight={700}
                      sx={{ display: { xs: "none", md: "block" } }}
                    >
                      Home
                    </Typography>
                  </NavItem>
                )}
              </StyledRouterLink>
            </li>
            <li>
              <StyledRouterLink to="/search">
                {({ isActive }: { isActive: boolean }) => (
                  <NavItem isActive={isActive}>
                    <Search
                      sx={{
                        fontSize: { xs: "1.75rem", md: "1.5rem" },
                      }}
                    />
                    <Typography
                      variant="h2"
                      fontWeight={700}
                      sx={{ display: { xs: "none", md: "block" } }}
                    >
                      Search
                    </Typography>
                  </NavItem>
                )}
              </StyledRouterLink>
            </li>
          </NavList>
        </ContentBox>
        {/* === 라이브러리 영역 (Your Library + 플레이리스트) === */}
        <ContentBox height="100%" sx={{ flexGrow: 1, overflow: "hidden" }}>
          <Library />
        </ContentBox>
      </Sidebar>
      {/* === 컨텐츠 영역 === */}
      <ContentBox>
        <Navbar />
        <Outlet />
      </ContentBox>
    </Layout>
  );
};

export default AppLayout;
