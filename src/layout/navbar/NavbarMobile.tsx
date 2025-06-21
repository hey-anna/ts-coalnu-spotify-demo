import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home, Search, LibraryMusic } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const NavbarMobile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", sm: "none" }, //  모바일에만 표시
        zIndex: 1000,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
      >
        <BottomNavigationAction label="Home" value="/" icon={<Home />} />
        <BottomNavigationAction
          label="Search"
          value="/search"
          icon={<Search />}
        />
        <BottomNavigationAction
          label="playlist" // pc버전 Library
          value="/playlist"
          icon={<LibraryMusic />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default NavbarMobile;
