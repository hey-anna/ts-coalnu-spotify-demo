import { Box, IconButton, InputBase } from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface NavbarSearchBarProps {
  keyword: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // onSearch: () => void;
  onClear: () => void;
  placeholder?: string;
  width?: string | number;
}

const SearchBarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#2A2A2A",
  borderRadius: 9999, // pill 형태
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  height: 52,
}));

const NavbarSearchBar = ({
  keyword,
  onChange,
  // onSearch,
  onClear,
  placeholder = "어떤 콘텐츠를 감삼하고 싶으세요?",
  width,
}: NavbarSearchBarProps) => {
  // const handleSearch = () => {
  //   if (keyword.trim()) {
  //     navigate(`/search/${keyword.trim()}`);
  //   }
  // };

  return (
    <SearchBarContainer sx={{ width }}>
      <Search sx={{ color: "#b3b3b3" }} />
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          color: "white",
          fontSize: "1.2rem", // 입력된 텍스트 크기
          "& input::placeholder": {
            color: "#b3b3b3",
            fontSize: "1.2rem", // placeholder 텍스트 크기
            opacity: 1, // 일부 브라우저에서 흐릿하게 나오는 것 방지
          },
        }}
        placeholder={placeholder}
        value={keyword}
        onChange={onChange}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     onSearch();
        //   }
        // }}
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
