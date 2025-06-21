import { Box, useMediaQuery, useTheme } from "@mui/material";
import LoginButton from "../components/button/LoginButton";
import useGetCurrentUserProfile from "../hooks/useGetCurrentUserProfile";
import { AccountCircle, ArrowForward } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";
import useAuthStore from "../store/useAuthStore";
import useLogin from "../hooks/useLogin";
import UserProfileInfo from "./headerArea/UserProfileInfo";
// import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import HeaderSearchBar from "./headerArea/HeaderSearchBar";
import LibraryHead from "./sidebar/LibraryHead";

const Haderbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname.startsWith("/search");
  // const isPlaylistPage = location.pathname.includes("/playlist");
  const isPlaylistPage = location.pathname === "/playlist";

  const [keyword, setKeyword] = useState<string>("");

  // 검색어 입력
  const handleSearchKeyword = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = e.target.value;
    setKeyword(value);
    if (value.trim()) {
      navigate(`/search/${value.trim()}`);
    }
  };

  // on search
  // const handleSearch = () => {
  //   if (keyword.trim()) {
  //     navigate(`/search/${keyword.trim()}`);
  //   }
  // };

  const handleClear = (): void => {
    setKeyword("");
  };

  const { hasAccessToken, clearToken } = useAuthStore(); // 사용자 - 리팩토 해야 됨
  const login = useLogin();
  // const queryClient = useQueryClient();
  const {
    data: userProfile,
    isLoading,
    isFetching,
  } = useGetCurrentUserProfile();
  console.log("userProfile", userProfile);
  // 로딩 중일 때 아무것도 렌더링하지 않음
  // isFetching까지 고려해 미세한 깜빡임 방지
  const isLoadingProfile = isLoading || isFetching;

  // 토큰 생성 시각 확인
  const accessToken = localStorage.getItem("access_token");
  const createdAt = Number(localStorage.getItem("token_created_at"));
  const now = Date.now();
  // const isTokenStale = createdAt && now - createdAt >= 55 * 60 * 1000;
  const isTokenStale = Boolean(createdAt) && now - createdAt >= 55 * 60 * 1000;
  // const isTokenStale = Boolean(createdAt) && now - createdAt >= 10 * 1000; // 10초

  // const isLoggedIn = hasAccessToken; // 이거 관련된 코드 사용성 테스트 후 불필요하면 삭제하기 !!Check
  const isLoggedIn = Boolean(accessToken) && !isTokenStale;

  const handleAuthAction = () => {
    if (isLoggedIn) {
      clearToken();
      navigate("/login-required");
      // window.location.reload();
      // queryClient.removeQueries({ queryKey: ["current-user-profile"] }); // 쿼리 삭제
    } else {
      login();
    }
  };

  console.log("isTokenStale:", isTokenStale, typeof isTokenStale);

  const getFallbackImage = (email?: string): string | null => {
    if (!email) return null;
    if (email === "heyannawp@gmail.com") return "/images/profile-anna.png";
    if (email === "tallshe1008@gmail.com") return "/images/profile-coalnu.jpg";
    return null;
  };

  const profileImgSrc =
    userProfile?.images?.[0]?.url || getFallbackImage(userProfile?.email);

  // 바운스
  const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
`;

  const BouncingWrapper = styled("div")`
    display: flex;
    align-items: center;
    gap: 6px;
    animation: ${bounce} 1s infinite;
    color: #a0aec0;
    font-size: 12px;
  `;
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="64px"
      px={2}
      // gap={30}
    >
      {isMobile && isPlaylistPage && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <LibraryHead />
        </Box>
      )}
      <Box flexGrow={1} pr={2} alignItems="center">
        {/* 왼쪽: 검색 페이지일 경우 검색바 */}
        {isSearchPage && (
          <HeaderSearchBar
            keyword={keyword}
            onChange={handleSearchKeyword}
            // onSearch={handleSearch}
            onClear={handleClear}
            // width="100%"
          />
        )}
      </Box>
      {isLoadingProfile ? (
        <Box width={48} height={24} /> // 스켈리톤으로 대응하려했으나, 조건분기 및 토큰만료 시간으로 처리 함
      ) : !userProfile || isTokenStale ? ( // 여기로 로그인 버튼 조건분기를 올기고, 토큰만료 전 화면표시
        <Box display="flex" alignItems="flex-end" gap={1.5}>
          {isTokenStale && (
            <BouncingWrapper>
              <span style={{ fontSize: 12, color: "#a0aec0", marginTop: 4 }}>
                세션이 만료되었습니다. 다시 로그인해주세요.
              </span>
              <ArrowForward sx={{ fontSize: 16 }} />
            </BouncingWrapper>
          )}
          {/* <BouncingArrow /> */}
          <LoginButton isLoggedIn={isLoggedIn} onClick={handleAuthAction} />
        </Box>
      ) : (
        <Box display="flex" alignItems="center" gap={1.5}>
          {accessToken && (
            <UserProfileInfo
              displayName={userProfile.display_name}
              profileImgSrc={profileImgSrc}
            />
          )}
          <LoginButton isLoggedIn={isLoggedIn} onClick={handleAuthAction} />
        </Box>
      )}
    </Box>
  );
};

export default Haderbar;
