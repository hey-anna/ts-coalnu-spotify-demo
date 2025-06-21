import { Home, Search } from "@mui/icons-material";
import { styled, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavListWrapper = styled("ul")(({ theme }) => ({
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
  [theme.breakpoints.down("sm")]: {
    display: "none",
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

const NavbarPC = () => {
  return (
    <NavListWrapper>
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
    </NavListWrapper>
  );
};

export default NavbarPC;
