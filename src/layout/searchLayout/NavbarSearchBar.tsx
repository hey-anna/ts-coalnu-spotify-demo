import { Box, IconButton, InputBase } from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface NavbarSearchBarProps {
  keyword: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
  width?: string | number;
}

const SearchBarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#2A2A2A",
  borderRadius: theme.shape.borderRadius,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  height: 52,
}));

const NavbarSearchBar = ({
  keyword,
  onChange,
  onClear,
  placeholder = "검색어를 입력하세요",
  width = "40%",
}: NavbarSearchBarProps) => {
  return (
    <SearchBarContainer sx={{ width, mb: 2 }}>
      <Search sx={{ color: "gray" }} />
      <InputBase
        sx={{ ml: 1, flex: 1, color: "white" }}
        placeholder={placeholder}
        value={keyword}
        onChange={onChange}
      />
      {keyword && (
        <IconButton onClick={onClear}>
          <Close sx={{ color: "white" }} />
        </IconButton>
      )}
    </SearchBarContainer>
  );
};

export default NavbarSearchBar;
