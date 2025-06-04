import { styled, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
// import theme from "../theme/theme";
import { Box } from "@mui/material";
import { Home, Search } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Library from "./Library";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
});

// mui 나 우리가 정한 theme 값 가져오기
const Sidebar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "8px",
  // marginBottom: "8px",
  marginRight: "8px",
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: "16px",
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

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
                {({ isActive }) => (
                  <NavItem isActive={isActive}>
                    <Home />
                    <Typography variant="h2" fontWeight={700}>
                      Home
                    </Typography>
                  </NavItem>
                )}
              </StyledRouterLink>
            </li>
            <li>
              <StyledRouterLink to="/search">
                {({ isActive }) => (
                  <NavItem isActive={isActive}>
                    <Search />
                    <Typography variant="h2" fontWeight={700}>
                      Search
                    </Typography>
                  </NavItem>
                )}
              </StyledRouterLink>
            </li>
          </NavList>
        </ContentBox>
        {/* === 라이브러리 영역 (Your Library + 플레이리스트) === */}
        <ContentBox height="100%">
          <Library />
        </ContentBox>
      </Sidebar>
      <Outlet />
    </Layout>
  );
};

export default AppLayout;
